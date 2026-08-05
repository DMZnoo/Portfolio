import { supabasePublic, PREVIEW_BUCKET } from "@/lib/supabase";
import ReviewBoard, { ReviewItem } from "@/components/review/ReviewBoard";
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
export default async function EquipmentReviewPage() {
  const { data, error } = await supabasePublic()
    .from("equipment_demo_previews")
    .select(
      "id, slug, name, category, video_path_side, video_path_orbit, verdict, comment, feedback_image_path"
    )
    .order("category")
    .order("name");

  if (error) {
    return (
      <main className="min-h-screen bg-black p-8 font-mono text-white">
        Failed to load previews: {error.message}
      </main>
    );
  }

  if (!data || data.length === 0) {
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

  const items: ReviewItem[] = data.map((row) => ({
    id: row.id,
    page: row.category,
    source: "equipment",
    slug: row.slug,
    name: row.name,
    verdict: row.verdict as "pending" | "pass" | "fail",
    comment: row.comment,
    videoUrlSide: row.video_path_side ? publicUrl(row.video_path_side) : null,
    videoUrlOrbit: row.video_path_orbit ? publicUrl(row.video_path_orbit) : null,
    feedbackImageUrl: row.feedback_image_path ? publicUrl(row.feedback_image_path) : null,
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
