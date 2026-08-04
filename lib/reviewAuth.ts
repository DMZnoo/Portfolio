const COOKIE_NAME = "review_auth";

async function computeToken(password: string): Promise<string> {
  const data = new TextEncoder().encode(`review-gate:${password}`);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function isValidReviewToken(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  const expected = await computeToken(process.env.REVIEW_PASSWORD ?? "");
  return token === expected;
}

export async function verifyReviewPassword(password: string): Promise<string | null> {
  if (password !== (process.env.REVIEW_PASSWORD ?? "")) return null;
  return computeToken(password);
}

export { COOKIE_NAME };
