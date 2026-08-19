import { supabasePublic, APP_PREVIEW_BUCKET } from "@/lib/supabase";
import AppPreviewBoard, { PreviewCapture } from "@/components/review/AppPreviewBoard";

export const dynamic = "force-dynamic";

/**
 * Logger's UI captures, for reviewing away from a Mac.
 *
 * Two capture surfaces feed this board. The screens come from the XCUITest
 * walk, which drives the real signed-in app and so can only show whatever the
 * shared test account happens to contain. The components are rendered straight
 * to PNG with their data supplied as a literal, which is what makes the states
 * the walk can't reach — populated feeds, loading skeletons, offline
 * fallbacks — visible at all.
 *
 * Published by Logger's scripts/sync_app_preview.py.
 */
type CaptureRow = {
  id: string;
  surface: string;
  section: string;
  name: string;
  dark_path: string | null;
  light_path: string | null;
  verdict: string;
  comment: string | null;
};

export default async function AppPreviewPage() {
  const { data, error } = await supabasePublic()
    .from("app_preview_screens")
    .select("id, surface, section, name, dark_path, light_path, verdict, comment")
    .order("surface")
    .order("section")
    .order("sort_order");

  if (error) {
    return (
      <main className="min-h-screen bg-black p-8 font-mono text-white">
        Failed to load captures: {error.message}
      </main>
    );
  }

  const rows = (data ?? []) as unknown as CaptureRow[];

  if (rows.length === 0) {
    return (
      <main className="min-h-screen bg-black p-8 font-mono text-white">
        Nothing published yet. Run{" "}
        <code className="text-cyan-400">scripts/sync_app_preview.py</code> in the Logger
        repo after a capture.
      </main>
    );
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const publicUrl = (path: string | null) =>
    path
      ? `${supabaseUrl}/storage/v1/object/public/${APP_PREVIEW_BUCKET}/${path}`
      : null;

  const captures: PreviewCapture[] = rows.map((row) => ({
    id: row.id,
    surface: row.surface === "component" ? "component" : "screen",
    section: row.section,
    name: row.name,
    darkUrl: publicUrl(row.dark_path),
    lightUrl: publicUrl(row.light_path),
    verdict: row.verdict as PreviewCapture["verdict"],
    comment: row.comment,
  }));

  const screens = captures.filter((c) => c.surface === "screen").length;

  return (
    <main className="min-h-screen bg-black px-6 py-10 font-mono text-white">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-1 text-xl">Logger — app preview</h1>
        <p className="mb-8 max-w-2xl text-sm leading-relaxed text-white/50">
          {screens} screens walked in the real signed-in app, and{" "}
          {captures.length - screens} components rendered in isolation with mocked
          data. Every capture in both themes. Verdicts and notes save as you go and
          survive the next capture run.
        </p>
        <AppPreviewBoard captures={captures} />
      </div>
    </main>
  );
}
