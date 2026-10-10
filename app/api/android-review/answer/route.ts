import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

// Gated by middleware (/api/android-review/*). Inserts one answer or comment
// for a decision item with the service role; the tables have no public policy.
export async function POST(request: NextRequest) {
  let payload: Record<string, unknown>;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const itemId = typeof payload.itemId === "string" ? payload.itemId : "";
  const kind = payload.kind;
  const body = typeof payload.body === "string" ? payload.body.trim() : "";
  const choice =
    typeof payload.choice === "string" && payload.choice.trim() ? payload.choice.trim() : null;

  if (!/^[A-Za-z0-9_-]{1,32}$/.test(itemId) || (kind !== "answer" && kind !== "comment")) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }
  if (body.length > 4000 || (choice && choice.length > 200)) {
    return NextResponse.json({ error: "Too long" }, { status: 400 });
  }
  if (kind === "comment" ? !body || choice : !body && !choice) {
    return NextResponse.json({ error: "Nothing to save" }, { status: 400 });
  }

  const db = supabaseAdmin();
  const { data: item, error: itemError } = await db
    .from("android_review_items")
    .select("id, options")
    .eq("id", itemId)
    .maybeSingle();
  if (itemError) {
    return NextResponse.json({ error: itemError.message }, { status: 500 });
  }
  if (!item) {
    return NextResponse.json({ error: "Unknown item" }, { status: 404 });
  }
  if (choice && !((item.options as string[]) ?? []).includes(choice)) {
    return NextResponse.json({ error: "Unknown option" }, { status: 400 });
  }

  const { data, error } = await db
    .from("android_review_answers")
    .insert({ item_id: itemId, kind, body, choice })
    .select("id, item_id, kind, body, choice, created_at")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ ok: true, answer: data });
}
