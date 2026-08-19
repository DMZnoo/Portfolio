import { NextRequest, NextResponse } from "next/server";
import { COOKIE_NAME, isValidReviewToken } from "@/lib/reviewAuth";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/review/login" || pathname === "/api/review/login") {
    return NextResponse.next();
  }

  // /app-preview shares the review gate rather than carrying its own password,
  // so one sign-in covers every private surface on the site.

  const token = request.cookies.get(COOKIE_NAME)?.value;
  if (await isValidReviewToken(token)) {
    return NextResponse.next();
  }

  const loginUrl = new URL("/review/login", request.url);
  loginUrl.searchParams.set("next", pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  // `/app-preview` is listed alongside `/app-preview/:path*` because the
  // wildcard form alone does not match the bare path — which is the only URL
  // anyone actually visits, so gating just the subpaths would leave the board
  // itself wide open.
  matcher: [
    "/review/:path*",
    "/api/review/:path*",
    "/app-preview",
    "/app-preview/:path*",
  ],
};
