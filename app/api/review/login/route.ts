import { NextRequest, NextResponse } from "next/server";
import { COOKIE_NAME, verifyReviewPassword } from "@/lib/reviewAuth";

export async function POST(request: NextRequest) {
  const { password } = await request.json();
  const token = await verifyReviewPassword(password ?? "");

  if (!token) {
    return NextResponse.json({ error: "Wrong password" }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  return response;
}
