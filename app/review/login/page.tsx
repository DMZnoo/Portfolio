"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // One gate covers every private board; go back to whichever one sent us
  // here, but only to a path on this site (never "//host" or a full URL).
  const requested = searchParams.get("next") ?? "";
  const nextPath = /^\/(?!\/)/.test(requested) ? requested : "/review";
  const heading = nextPath.startsWith("/android-review")
    ? "Android Port Review"
    : nextPath.startsWith("/app-preview")
      ? "App Preview"
      : "Exercise Demo Review";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await fetch("/api/review/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    setLoading(false);
    if (!res.ok) {
      setError("Wrong password.");
      return;
    }

    router.push(nextPath);
    router.refresh();
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-lg border border-white/10 bg-white/5 p-8 font-mono"
      >
        <h1 className="mb-6 text-lg text-white">{heading}</h1>
        <input
          type="password"
          autoFocus
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="mb-4 w-full rounded border border-white/20 bg-black px-3 py-2 text-white outline-none focus:border-cyan-400"
        />
        {error && <p className="mb-4 text-sm text-red-400">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded bg-cyan-500 px-3 py-2 text-black transition hover:bg-cyan-400 disabled:opacity-50"
        >
          {loading ? "Checking..." : "Enter"}
        </button>
      </form>
    </div>
  );
}

export default function ReviewLoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
