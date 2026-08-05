import { createClient } from "@supabase/supabase-js";

export function supabasePublic() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

export function supabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

export const PREVIEW_BUCKET = "exercise-demo-previews";

// The two review surfaces write through the same endpoints. Whitelisted rather
// than passed through, so a crafted `source` can never name an arbitrary table.
export const REVIEW_TABLES = {
  rounds: "exercise_demo_reviews",
  equipment: "equipment_demo_previews",
} as const;

export type ReviewSource = keyof typeof REVIEW_TABLES;

export function reviewTable(source: unknown): string {
  return REVIEW_TABLES[(source as ReviewSource) ?? "rounds"] ?? REVIEW_TABLES.rounds;
}
