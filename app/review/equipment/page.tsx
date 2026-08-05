import { supabasePublic, PREVIEW_BUCKET } from "@/lib/supabase";
import ReviewBoard, { ReviewItem, Attachment } from "@/components/review/ReviewBoard";
import { findExerciseReference } from "@/lib/exerciseReference";

export const dynamic = "force-dynamic";

/**
 * Work-in-progress demo assets, published straight off a render.
 *
 * Deliberately separate from /review: that surface is organised around review
 * ROUNDS over the finished catalogue, so publishing one newly authored exercise
 * there means picking a round number and scoping the sync to avoid dragging
 * every other slug along. Here there are no rounds — one row per slug, replaced
 * on every rebuild.
 */
// A dynamic .select() string erases the generated row type, so state the shape
// once here rather than casting at every field.
type PreviewRow = {
  id: string;
  slug: string;
  name: string;
  category: string;
  video_path_side: string | null;
  video_path_orbit: string | null;
  verdict: string;
  comment: string | null;
  feedback_image_paths: string[] | null;
  feedback_image_path: string | null;
  feedback_history?: unknown;
};

const BASE_COLUMNS =
  "id, slug, name, category, video_path_side, video_path_orbit, verdict, comment, feedback_image_paths, feedback_image_path";

export default async function EquipmentReviewPage() {
  const load = (columns: string) =>
    supabasePublic()
      .from("equipment_demo_previews")
      .select(columns)
      .order("category")
      .order("name");

  // Deploys and migrations land independently, and a select naming a column
  // the database does not have yet fails the WHOLE page — the /review view
  // taught us that one. Ask for the archive, fall back to the base columns if
  // it isn't there.
  let { data, error } = await load(`${BASE_COLUMNS}, feedback_history`);
  if (error) ({ data, error } = await load(BASE_COLUMNS));
  const rows = (data ?? []) as unknown as PreviewRow[];

  if (error) {
    return (
      <main className="min-h-screen bg-black p-8 font-mono text-white">
        Failed to load previews: {error.message}
      </main>
    );
  }

  if (rows.length === 0) {
    return (
      <main className="min-h-screen bg-black p-8 font-mono text-white">
        Nothing published yet. Run{" "}
        <code className="text-cyan-400">scripts/publish_previews.py</code> after a render.
      </main>
    );
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const publicUrl = (path: string) =>
    `${supabaseUrl}/storage/v1/object/public/${PREVIEW_BUCKET}/${path}`;

  type ArchivedFeedback = { comment?: string | null; image_paths?: string[] | null };
  const archivedAttachments = (history: unknown): Attachment[] =>
    (Array.isArray(history) ? (history as ArchivedFeedback[]) : []).flatMap((entry, index) =>
      (entry.image_paths ?? []).map((path) => ({
        path,
        url: publicUrl(path),
        label: `build ${index + 1}`,
        own: false,
      }))
    );

  const items: ReviewItem[] = rows.map((row) => ({
    id: row.id,
    page: row.category,
    source: "equipment",
    slug: row.slug,
    name: row.name,
    verdict: row.verdict as "pending" | "pass" | "fail",
    comment: row.comment,
    videoUrlSide: row.video_path_side ? publicUrl(row.video_path_side) : null,
    videoUrlOrbit: row.video_path_orbit ? publicUrl(row.video_path_orbit) : null,
    // One row per slug, so the live attachments all belong to this card. A
    // republish clears the card and folds what it cleared into feedback_history
    // — those images stay visible, read-only, so a note that has already been
    // acted on is still there to check the new build against.
    attachments: [
      ...archivedAttachments(row.feedback_history),
      ...(row.feedback_image_paths?.length
        ? row.feedback_image_paths
        : row.feedback_image_path
          ? [row.feedback_image_path]
          : []
      ).map((path: string) => ({ path, url: publicUrl(path), own: true })),
    ],
    reference: findExerciseReference(row.name, row.slug),
  }));

  return (
    <main className="min-h-screen bg-black px-6 py-10 font-mono text-white">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-1 text-xl">Equipment Demos — work in progress</h1>
        <p className="mb-8 text-sm text-white/50">
          {items.length} assets, republished on every rebuild. Verdicts save automatically and
          survive a re-render.
        </p>
        <ReviewBoard items={items} />
      </div>
    </main>
  );
}
