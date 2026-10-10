/**
 * Shapes for /android-review. The snapshot is written by Logger's
 * scripts/android-review-publish.py (one row per publish, the page shows the
 * newest); items and answers are their own tables so answers survive a
 * republish. All three tables are service-role only: the page reads them on
 * the server behind the review gate.
 */

export type Phase = { state: string; label: string; name: string; desc: string };
export type Tile = {
  num: number;
  of?: number;
  label: string;
  bar?: { pct: number; tone: "done" | "pause" | "accent" }[];
};
export type FlowRow = {
  name: string;
  views: number;
  signed: number;
  todo: number;
  iosOnly: number;
  stale: number;
};
export type Snapshot = {
  eyebrow: string;
  title: string;
  lede: string;
  asOf: string;
  mainSha: string;
  androidNextAhead: number;
  phases: Phase[];
  tiles: Tile[];
  flows: FlowRow[];
  inFlight: { tag: string; text: string }[];
  notPorted: { path: string; tag: string }[];
  staleNote: string;
  stale: string[];
  landed: { date: string; sha: string; waves: number; text: string }[];
  footer: string;
};

export type ReviewItem = {
  id: string;
  section: string;
  title: string;
  detail: string | null;
  options: string[];
  status: "open" | "resolved";
  sort: number;
};

export type ReviewAnswer = {
  id: string;
  item_id: string;
  kind: "answer" | "comment";
  body: string;
  choice: string | null;
  created_at: string;
};

// Fixed zone on both server and client, so a timestamp renders the same
// text in both passes and never trips a hydration mismatch.
const nzTime = new Intl.DateTimeFormat("en-NZ", {
  timeZone: "Pacific/Auckland",
  day: "numeric",
  month: "short",
  hour: "numeric",
  minute: "2-digit",
});

export function formatNz(iso: string): string {
  return nzTime.format(new Date(iso));
}

export function shortDate(isoDate: string): string {
  return new Intl.DateTimeFormat("en-NZ", { day: "numeric", month: "short", timeZone: "UTC" }).format(
    new Date(`${isoDate}T00:00:00Z`)
  );
}
