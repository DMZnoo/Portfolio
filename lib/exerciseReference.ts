import referenceData from "@/data/exerciseReferences.json";

export type ExerciseReference = {
  name: string;
  equipment: string | null;
  primaryMuscles: string[];
  instructions: string[];
  images: string[];
};

type ReferenceEntry = ExerciseReference & { id: string; tokens: string[] };

const data = referenceData as { byKey: Record<string, string>; entries: ReferenceEntry[] };

const byId = new Map(data.entries.map((entry) => [entry.id, entry]));

/// Hand-pinned slugs whose display name shares no distinctive word with the
/// dataset's. Add an entry here rather than lowering MIN_SIMILARITY — the
/// board reports how many items resolved to nothing, so gaps stay visible.
const SLUG_ALIASES: Record<string, string> = {
  ohp: "Barbell_Shoulder_Press",
};

const normalize = (value: string) => value.toLowerCase().replace(/[^a-z0-9]/g, "");
const tokenize = (value: string) =>
  new Set(value.toLowerCase().match(/[a-z0-9]+/g) ?? []);

/// Below this, the best token overlap is noise, and showing an unrelated
/// exercise as "the reference" would be worse than showing nothing.
const MIN_SIMILARITY = 0.5;

/// Token weights. Plain Jaccard ties constantly in this dataset — "Barbell
/// Romanian Deadlift" scores identically against "Barbell Deadlift" and
/// "Romanian Deadlift" — so weight each token by how rare it is. "romanian"
/// then outranks "barbell", which appears in a hundred names.
const weightByToken = (() => {
  const frequency = new Map<string, number>();
  for (const entry of data.entries) {
    for (const token of entry.tokens) frequency.set(token, (frequency.get(token) ?? 0) + 1);
  }
  const weights = new Map<string, number>();
  for (const [token, count] of frequency) {
    weights.set(token, Math.log(data.entries.length / count) + 1);
  }
  return weights;
})();

const weightOf = (token: string) =>
  weightByToken.get(token) ?? Math.log(data.entries.length) + 1;

function bestFuzzyMatch(query: string): ReferenceEntry | null {
  const queryTokens = tokenize(query);
  if (queryTokens.size === 0) return null;

  let queryWeight = 0;
  for (const token of queryTokens) queryWeight += weightOf(token);

  let best: ReferenceEntry | null = null;
  let bestScore = 0;

  for (const entry of data.entries) {
    let shared = 0;
    let entryWeight = 0;
    for (const token of entry.tokens) {
      const weight = weightOf(token);
      entryWeight += weight;
      if (queryTokens.has(token)) shared += weight;
    }
    const score = shared / (queryWeight + entryWeight - shared);
    if (score > bestScore) {
      bestScore = score;
      best = entry;
    }
  }

  return bestScore >= MIN_SIMILARITY ? best : null;
}

/// Resolves a rendered demo back to its free-exercise-db source entry. Our
/// slugs are abbreviated by hand (`rdl`, `ohp`, `tbarrow`) and the display
/// names drift from the dataset's, so exact keys cover most of the catalogue
/// and a token-overlap pass picks up the rest.
export function findExerciseReference(
  name: string,
  slug: string
): ExerciseReference | null {
  const alias = SLUG_ALIASES[slug];
  if (alias) {
    const entry = byId.get(alias);
    if (entry) return toReference(entry);
  }

  for (const key of [normalize(name), normalize(slug)]) {
    const id = data.byKey[key];
    if (id) {
      const entry = byId.get(id);
      if (entry) return toReference(entry);
    }
  }

  const fuzzy = bestFuzzyMatch(name) ?? bestFuzzyMatch(slug.replace(/_/g, " "));
  return fuzzy ? toReference(fuzzy) : null;
}

function toReference(entry: ReferenceEntry): ExerciseReference {
  return {
    name: entry.name,
    equipment: entry.equipment,
    primaryMuscles: entry.primaryMuscles,
    instructions: entry.instructions,
    images: entry.images,
  };
}
