import { NextRequest, NextResponse } from "next/server";
import { COOKIE_NAME, isValidReviewToken } from "@/lib/reviewAuth";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/review/login" || pathname === "/api/review/login") {
    return NextResponse.next();
  }

  const token = request.cookies.get(COOKIE_NAME)?.value;
  if (await isValidReviewToken(token)) {
    return NextResponse.next();
  }

  const loginUrl = new URL("/review/login", request.url);
  loginUrl.searchParams.set("next", pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/review/:path*", "/api/review/:path*"],
};
