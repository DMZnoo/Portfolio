// Regenerates data/exerciseReferences.json — the free-exercise-db reference
// photos and instructions the /review board shows next to each rendered demo.
//
//   node scripts/build-exercise-references.mjs
//
// Source of truth is the copy of free-exercise-db that ships inside the Logger
// app (public domain, same dataset the Blender pipeline poses from). Override
// the path with EXERCISES_JSON if the repo lives somewhere else.

import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const SOURCE =
  process.env.EXERCISES_JSON ??
  resolve(process.env.HOME ?? "", "Projects/Logger/Logger/Resources/exercises.json");

const IMAGE_BASE =
  "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises";

const normalize = (value) => value.toLowerCase().replace(/[^a-z0-9]/g, "");
const tokenize = (value) => Array.from(new Set(value.toLowerCase().match(/[a-z0-9]+/g) ?? []));

const source = JSON.parse(readFileSync(SOURCE, "utf8"));

const entries = source.map((exercise) => ({
  id: exercise.id,
  name: exercise.name,
  equipment: exercise.equipment ?? null,
  primaryMuscles: exercise.primaryMuscles ?? [],
  instructions: exercise.instructions ?? [],
  images: (exercise.images ?? []).map((path) => `${IMAGE_BASE}/${path}`),
  // Precomputed so the runtime lookup never re-tokenizes 873 names per request.
  tokens: tokenize(exercise.name),
}));

// Exact-match index. `id` is registered first because it is the dataset's own
// key; a name collision must not shadow it.
const byKey = {};
for (const entry of entries) {
  for (const key of [normalize(entry.id), normalize(entry.name)]) {
    if (!(key in byKey)) byKey[key] = entry.id;
  }
}

writeFileSync(
  resolve(import.meta.dirname, "../data/exerciseReferences.json"),
  `${JSON.stringify({ byKey, entries }, null, 0)}\n`
);

console.log(`Wrote ${entries.length} references (${Object.keys(byKey).length} lookup keys).`);
