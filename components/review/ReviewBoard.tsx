"use client";

import { useEffect, useMemo, useRef, useState } from "react";

export type ReviewItem = {
  id: string;
  page: string;
  slug: string;
  name: string;
  verdict: "pending" | "pass" | "fail";
  comment: string | null;
  videoUrlSide: string | null;
  videoUrlOrbit: string | null;
};

// Mounts the <video> element only while the card is near the viewport, so
// offscreen cards hold no decoder or network resources.
function LazyVideo({ src }: { src: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: "300px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="aspect-video w-full rounded bg-black">
      {visible && (
        <video
          src={src}
          muted
          loop
          playsInline
          autoPlay
          preload="metadata"
          className="aspect-video w-full rounded bg-black object-cover"
        />
      )}
    </div>
  );
}

function ViewDialog({ item, onClose }: { item: ReviewItem; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const views = [
    { label: "Side", url: item.videoUrlSide },
    { label: "Orbit", url: item.videoUrlOrbit },
  ].filter((v) => v.url);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-5xl rounded-lg border border-white/10 bg-black p-4 sm:p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm text-white sm:text-base">{item.name}</h2>
          <button
            onClick={onClose}
            className="rounded px-2 py-1 text-xs text-white/60 hover:bg-white/10 hover:text-white"
          >
            Close
          </button>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {views.map((v) => (
            <div key={v.label}>
              <p className="mb-1 text-xs uppercase tracking-wide text-white/50">{v.label}</p>
              <video
                src={v.url!}
                controls
                playsInline
                className="aspect-video w-full rounded bg-black"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Card({ item }: { item: ReviewItem }) {
  const [verdict, setVerdict] = useState(item.verdict);
  const [comment, setComment] = useState(item.comment ?? "");
  const [saving, setSaving] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  async function save(nextVerdict: typeof verdict, nextComment: string) {
    setSaving(true);
    await fetch("/api/review/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: item.id, verdict: nextVerdict, comment: nextComment }),
    });
    setSaving(false);
  }

  function setVerdictAndSave(next: "pass" | "fail") {
    const resolved = verdict === next ? "pending" : next;
    setVerdict(resolved);
    save(resolved, comment);
  }

  return (
    <div
      className={`rounded-lg border p-3 transition ${
        verdict === "pass"
          ? "border-emerald-500/50 bg-emerald-500/5"
          : verdict === "fail"
            ? "border-red-500/50 bg-red-500/5"
            : "border-white/10 bg-white/[0.02]"
      }`}
    >
      <button
        type="button"
        onClick={() => setDialogOpen(true)}
        className="group relative mb-2 block w-full"
      >
        {item.videoUrlSide && <LazyVideo src={item.videoUrlSide} />}
        <span className="absolute inset-0 flex items-center justify-center rounded bg-black/0 text-xs text-transparent transition group-hover:bg-black/40 group-hover:text-white">
          View all angles
        </span>
      </button>
      <p className="mb-2 truncate text-sm text-white/90" title={item.name}>
        {item.name}
      </p>
      <div className="mb-2 flex gap-2">
        <button
          onClick={() => setVerdictAndSave("pass")}
          className={`flex-1 rounded px-2 py-1 text-xs ${
            verdict === "pass" ? "bg-emerald-500 text-black" : "bg-white/10 text-white/70"
          }`}
        >
          Pass
        </button>
        <button
          onClick={() => setVerdictAndSave("fail")}
          className={`flex-1 rounded px-2 py-1 text-xs ${
            verdict === "fail" ? "bg-red-500 text-black" : "bg-white/10 text-white/70"
          }`}
        >
          Fail
        </button>
      </div>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        onBlur={() => save(verdict, comment)}
        placeholder="Fail comment..."
        rows={2}
        className="w-full resize-none rounded border border-white/10 bg-black/50 px-2 py-1 text-xs text-white outline-none focus:border-cyan-400"
      />
      {saving && <p className="mt-1 text-[10px] text-white/30">saving...</p>}
      {dialogOpen && <ViewDialog item={item} onClose={() => setDialogOpen(false)} />}
    </div>
  );
}

export default function ReviewBoard({ items }: { items: ReviewItem[] }) {
  const grouped = useMemo(() => {
    const map = new Map<string, ReviewItem[]>();
    for (const item of items) {
      if (!map.has(item.page)) map.set(item.page, []);
      map.get(item.page)!.push(item);
    }
    return Array.from(map.entries()).sort(([a], [b]) => a.localeCompare(b));
  }, [items]);

  return (
    <div className="space-y-10">
      {grouped.map(([page, pageItems]) => (
        <section key={page}>
          <h2 className="mb-3 text-sm uppercase tracking-wide text-white/60">
            {page} ({pageItems.length})
          </h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {pageItems.map((item) => (
              <Card key={item.id} item={item} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
