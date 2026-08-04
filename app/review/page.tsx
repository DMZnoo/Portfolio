import { supabasePublic, PREVIEW_BUCKET } from "@/lib/supabase";
import ReviewBoard, { ReviewItem } from "@/components/review/ReviewBoard";
import { findExerciseReference } from "@/lib/exerciseReference";

export const dynamic = "force-dynamic";

export default async function ReviewPage() {
  // The view already narrows to each page's own latest round, so independent
  // work streams (a fix round on existing demos vs. a new build-out wave) no
  // longer hide each other behind one global max(round).
  const { data, error } = await supabasePublic()
    .from("exercise_demo_reviews_latest")
    .select(
      "id, page, exercise_slug, exercise_name, video_path_side, video_path_orbit, verdict, comment, feedback_image_path, round"
    )
    .order("page")
    .order("exercise_name");

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
    feedbackImageUrl: row.feedback_image_path ? publicUrl(row.feedback_image_path) : null,
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
