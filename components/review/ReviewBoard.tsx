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
  feedbackImageUrl: string | null;
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

type FeedbackState = {
  verdict: "pending" | "pass" | "fail";
  comment: string;
  imageUrl: string | null;
  saving: boolean;
  uploading: boolean;
  setVerdictAndSave: (next: "pass" | "fail") => void;
  setComment: (value: string) => void;
  saveComment: () => void;
  uploadImage: (file: File) => void;
};

function useFeedback(item: ReviewItem): FeedbackState {
  const [verdict, setVerdict] = useState(item.verdict);
  const [comment, setComment] = useState(item.comment ?? "");
  const [imageUrl, setImageUrl] = useState(item.feedbackImageUrl);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

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

  async function uploadImage(file: File) {
    setUploading(true);
    const formData = new FormData();
    formData.append("id", item.id);
    formData.append("file", file);
    const res = await fetch("/api/review/upload", { method: "POST", body: formData });
    if (res.ok) {
      const { publicUrl } = await res.json();
      setImageUrl(publicUrl);
    }
    setUploading(false);
  }

  return {
    verdict,
    comment,
    imageUrl,
    saving,
    uploading,
    setVerdictAndSave,
    setComment,
    saveComment: () => save(verdict, comment),
    uploadImage,
  };
}

function FeedbackControls({ feedback }: { feedback: FeedbackState }) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div>
      <div className="mb-2 flex gap-2">
        <button
          onClick={() => feedback.setVerdictAndSave("pass")}
          className={`flex-1 rounded px-2 py-1 text-xs ${
            feedback.verdict === "pass" ? "bg-emerald-500 text-black" : "bg-white/10 text-white/70"
          }`}
        >
          Pass
        </button>
        <button
          onClick={() => feedback.setVerdictAndSave("fail")}
          className={`flex-1 rounded px-2 py-1 text-xs ${
            feedback.verdict === "fail" ? "bg-red-500 text-black" : "bg-white/10 text-white/70"
          }`}
        >
          Fail
        </button>
      </div>
      <textarea
        value={feedback.comment}
        onChange={(e) => feedback.setComment(e.target.value)}
        onBlur={feedback.saveComment}
        placeholder="Fail comment..."
        rows={2}
        className="w-full resize-none rounded border border-white/10 bg-black/50 px-2 py-1 text-xs text-white outline-none focus:border-cyan-400"
      />
      <div className="mt-2">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) feedback.uploadImage(file);
            e.target.value = "";
          }}
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          className="w-full rounded border border-dashed border-white/20 px-2 py-1 text-xs text-white/60 hover:border-cyan-400 hover:text-white"
        >
          {feedback.uploading ? "Uploading..." : feedback.imageUrl ? "Replace feedback image" : "Attach feedback image"}
        </button>
        {feedback.imageUrl && (
          <img
            src={feedback.imageUrl}
            alt="Feedback attachment"
            className="mt-2 max-h-40 w-full rounded object-contain"
          />
        )}
      </div>
      {(feedback.saving || feedback.uploading) && (
        <p className="mt-1 text-[10px] text-white/30">saving...</p>
      )}
    </div>
  );
}

function ViewDialog({
  item,
  feedback,
  onClose,
}: {
  item: ReviewItem;
  feedback: FeedbackState;
  onClose: () => void;
}) {
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
        <div className="mt-4 max-w-sm">
          <FeedbackControls feedback={feedback} />
        </div>
      </div>
    </div>
  );
}

function Card({ item }: { item: ReviewItem }) {
  const feedback = useFeedback(item);
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div
      className={`rounded-lg border p-3 transition ${
        feedback.verdict === "pass"
          ? "border-emerald-500/50 bg-emerald-500/5"
          : feedback.verdict === "fail"
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
      <FeedbackControls feedback={feedback} />
      {dialogOpen && (
        <ViewDialog item={item} feedback={feedback} onClose={() => setDialogOpen(false)} />
      )}
    </div>
  );
}

export default function ReviewBoard({ items }: { items: ReviewItem[] }) {
  // Partition on the verdict as loaded from the server: cards keep their
  // section for the whole visit even if the verdict changes, so approving a
  // card doesn't yank it out from under the cursor. Reload to re-partition.
  const grouped = useMemo(() => {
    const map = new Map<string, { active: ReviewItem[]; approved: ReviewItem[] }>();
    for (const item of items) {
      if (!map.has(item.page)) map.set(item.page, { active: [], approved: [] });
      const bucket = map.get(item.page)!;
      (item.verdict === "pass" ? bucket.approved : bucket.active).push(item);
    }
    return Array.from(map.entries()).sort(([a], [b]) => a.localeCompare(b));
  }, [items]);

  return (
    <div className="space-y-10">
      {grouped.map(([page, { active, approved }]) => (
        <section key={page}>
          <h2 className="mb-3 text-sm uppercase tracking-wide text-white/60">
            {page} ({active.length} to review, {approved.length} approved)
          </h2>
          {active.length > 0 ? (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {active.map((item) => (
                <Card key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <p className="text-xs text-white/30">Nothing left to review here.</p>
          )}
          {approved.length > 0 && (
            <details className="mt-3">
              <summary className="cursor-pointer select-none text-xs uppercase tracking-wide text-emerald-400/70 hover:text-emerald-300">
                Approved ({approved.length})
              </summary>
              <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {approved.map((item) => (
                  <Card key={item.id} item={item} />
                ))}
              </div>
            </details>
          )}
        </section>
      ))}
    </div>
  );
}
