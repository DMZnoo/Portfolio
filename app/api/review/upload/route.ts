import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin, PREVIEW_BUCKET, reviewTable } from "@/lib/supabase";

/**
 * Attach one or more feedback images to a review row.
 *
 * Appends to `feedback_image_paths` rather than overwriting: a reviewer
 * marking up three angles of the same fault was previously left with only the
 * last one. Read-modify-write, because PostgREST has no array_append verb —
 * safe enough here, where one person reviews one card at a time.
 */
export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const id = formData.get("id");
  const source = formData.get("source");
  const files = formData.getAll("file").filter((f): f is File => f instanceof File);

  if (typeof id !== "string" || !id || files.length === 0) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }
  if (files.some((file) => !file.type.startsWith("image/"))) {
    return NextResponse.json({ error: "Files must be images" }, { status: 400 });
  }

  const admin = supabaseAdmin();
  const table = reviewTable(source);
  const uploaded: string[] = [];

  for (const [index, file] of files.entries()) {
    const ext = file.name.split(".").pop() || "png";
    // Index in the name as well as the timestamp: a multi-file pick lands in
    // the same millisecond and would otherwise collide.
    const path = `feedback/${id}-${Date.now()}-${index}.${ext}`;
    const { error } = await admin.storage
      .from(PREVIEW_BUCKET)
      .upload(path, file, { contentType: file.type, upsert: false });
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    uploaded.push(path);
  }

  const { data: row, error: readError } = await admin
    .from(table)
    .select("feedback_image_paths")
    .eq("id", id)
    .single();

  if (readError) {
    return NextResponse.json({ error: readError.message }, { status: 500 });
  }

  const paths = [...((row?.feedback_image_paths as string[] | null) ?? []), ...uploaded];

  const { error: updateError } = await admin
    .from(table)
    // feedback_image_path stays in sync with the first attachment so anything
    // still reading the old column keeps working.
    .update({ feedback_image_paths: paths, feedback_image_path: paths[0] ?? null })
    .eq("id", id);

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  return NextResponse.json({
    ok: true,
    paths,
    publicUrls: paths.map(
      (path) => `${supabaseUrl}/storage/v1/object/public/${PREVIEW_BUCKET}/${path}`
    ),
  });
}

/** Detach one image. The stored object is left alone — only the link drops. */
export async function DELETE(request: NextRequest) {
  const { id, path, source } = await request.json();

  if (typeof id !== "string" || !id || typeof path !== "string" || !path) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const admin = supabaseAdmin();
  const table = reviewTable(source);

  const { data: row, error: readError } = await admin
    .from(table)
    .select("feedback_image_paths")
    .eq("id", id)
    .single();

  if (readError) {
    return NextResponse.json({ error: readError.message }, { status: 500 });
  }

  const paths = ((row?.feedback_image_paths as string[] | null) ?? []).filter(
    (candidate) => candidate !== path
  );

  const { error: updateError } = await admin
    .from(table)
    .update({ feedback_image_paths: paths, feedback_image_path: paths[0] ?? null })
    .eq("id", id);

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, paths });
}
