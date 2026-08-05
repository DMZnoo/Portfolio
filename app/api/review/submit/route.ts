import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin, reviewTable } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  const { id, verdict, comment, source } = await request.json();

  if (!id || !["pass", "fail", "pending"].includes(verdict)) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const { error } = await supabaseAdmin()
    .from(reviewTable(source))
    .update({
      verdict,
      comment: comment ?? null,
      reviewed_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
