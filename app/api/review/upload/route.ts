import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin, PREVIEW_BUCKET, reviewTable } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const id = formData.get("id");
  const file = formData.get("file");
  const source = formData.get("source");

  if (typeof id !== "string" || !id || !(file instanceof File)) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  if (!file.type.startsWith("image/")) {
    return NextResponse.json({ error: "File must be an image" }, { status: 400 });
  }

  const admin = supabaseAdmin();
  const ext = file.name.split(".").pop() || "png";
  const path = `feedback/${id}-${Date.now()}.${ext}`;

  const { error: uploadError } = await admin.storage
    .from(PREVIEW_BUCKET)
    .upload(path, file, { contentType: file.type, upsert: false });

  if (uploadError) {
    return NextResponse.json({ error: uploadError.message }, { status: 500 });
  }

  const { error: updateError } = await admin
    .from(reviewTable(source))
    .update({ feedback_image_path: path })
    .eq("id", id);

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const publicUrl = `${supabaseUrl}/storage/v1/object/public/${PREVIEW_BUCKET}/${path}`;

  return NextResponse.json({ ok: true, path, publicUrl });
}
