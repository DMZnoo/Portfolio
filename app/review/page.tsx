import { supabasePublic, PREVIEW_BUCKET } from "@/lib/supabase";
import ReviewBoard, { ReviewItem, Attachment } from "@/components/review/ReviewBoard";
import { findExerciseReference } from "@/lib/exerciseReference";

export const dynamic = "force-dynamic";

export default async function ReviewPage() {
  // The view already narrows to each page's own latest round, so independent
  // work streams (a fix round on existing demos vs. a new build-out wave) no
  // longer hide each other behind one global max(round).
  const { data, error } = await supabasePublic()
    .from("exercise_demo_reviews_latest")
    .select(
      "id, page, exercise_slug, exercise_name, video_path_side, video_path_orbit, verdict, comment, feedback_image_paths, feedback_image_path, round"
    )
    .order("page")
    .order("exercise_name");

  // Attachments across EVERY round, not just the latest one on show. A sync
  // writes a new row per exercise per round, so an image attached while
  // reviewing round 5 stays on the round-5 row while the page renders round 8
  // — which is how 15 uploaded images ended up visible in exactly none of them.
  const { data: attachmentRows } = await supabasePublic()
    .from("exercise_demo_reviews")
    .select("id, exercise_slug, round, feedback_image_paths, feedback_image_path")
    .order("round");

  if (error || !data) {
    return (
      <main className="min-h-screen bg-black p-8 font-mono text-white">
        Failed to load review data: {error?.message}
      </main>
    );
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const publicUrl = (path: string) =>
    `${supabaseUrl}/storage/v1/object/public/${PREVIEW_BUCKET}/${path}`;

  if (data.length === 0) {
    return (
      <main className="min-h-screen bg-black p-8 font-mono text-white">
        No review data synced yet.
      </main>
    );
  }

  // Prefer the array; fall back to the legacy single column for rows written
  // before the array existed.
  const pathsOf = (row: { feedback_image_paths?: string[] | null; feedback_image_path?: string | null }) =>
    row.feedback_image_paths?.length
      ? row.feedback_image_paths
      : row.feedback_image_path
        ? [row.feedback_image_path]
        : [];

  // Carries the source row id so each card can tell its own attachments (which
  // it may detach) from another round's (which it may only display).
  type HistoryEntry = Attachment & { rowId: string };
  const historyBySlug = new Map<string, HistoryEntry[]>();
  for (const row of attachmentRows ?? []) {
    const paths = pathsOf(row);
    if (paths.length === 0) continue;
    const list = historyBySlug.get(row.exercise_slug) ?? [];
    for (const path of paths) {
      list.push({ path, url: publicUrl(path), round: row.round, own: false, rowId: row.id });
    }
    historyBySlug.set(row.exercise_slug, list);
  }

  const items: ReviewItem[] = data.map((row) => ({
    id: row.id,
    page: row.page,
    round: row.round,
    slug: row.exercise_slug,
    name: row.exercise_name,
    verdict: row.verdict as "pending" | "pass" | "fail",
    comment: row.comment,
    videoUrlSide: row.video_path_side ? publicUrl(row.video_path_side) : null,
    videoUrlOrbit: row.video_path_orbit ? publicUrl(row.video_path_orbit) : null,
    // Images on the displayed row are editable here; everything attached to an
    // older round of the same exercise rides along read-only.
    attachments: (historyBySlug.get(row.exercise_slug) ?? []).map((attachment) => ({
      path: attachment.path,
      url: attachment.url,
      round: attachment.round,
      own: attachment.rowId === row.id,
    })),
    reference: findExerciseReference(row.exercise_name, row.exercise_slug),
  }));

  const withoutReference = items.filter((item) => !item.reference).length;

  return (
    <main className="min-h-screen bg-black px-6 py-10 font-mono text-white">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-1 text-xl">Exercise Demo Review</h1>
        <p className="mb-8 text-sm text-white/50">
          {items.length} exercises. Verdicts save automatically.
          {withoutReference > 0 && ` ${withoutReference} without a matched reference.`}
        </p>
        <ReviewBoard items={items} />
      </div>
    </main>
  );
}
