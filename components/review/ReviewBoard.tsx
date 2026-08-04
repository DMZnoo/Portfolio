"use client";

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import type { ExerciseReference } from "@/lib/exerciseReference";

export type ReviewItem = {
  id: string;
  page: string;
  round: number;
  slug: string;
  name: string;
  verdict: "pending" | "pass" | "fail";
  comment: string | null;
  videoUrlSide: string | null;
  videoUrlOrbit: string | null;
  feedbackImageUrl: string | null;
  reference: ExerciseReference | null;
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

// Locks the page behind a modal. Padding compensates for the scrollbar the
// lock removes, so the board underneath doesn't jump sideways as it opens.
function useScrollLock(active: boolean) {
  useLayoutEffect(() => {
    if (!active) return;
    const { body } = document;
    const previousOverflow = body.style.overflow;
    const previousPadding = body.style.paddingRight;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;

    body.style.overflow = "hidden";
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`;

    return () => {
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPadding;
    };
  }, [active]);
}

type Slide = { key: string; label: string; render: () => React.ReactNode };

function Carousel({ title, slides }: { title: string; slides: Slide[] }) {
  const [index, setIndex] = useState(0);
  const count = slides.length;

  const step = useCallback(
    (delta: number) => setIndex((current) => (current + delta + count) % count),
    [count]
  );

  if (count === 0) {
    return (
      <div>
        <p className="mb-1 text-xs uppercase tracking-wide text-white/50">{title}</p>
        <div className="flex aspect-video w-full items-center justify-center rounded bg-white/[0.03] text-xs text-white/30">
          none available
        </div>
      </div>
    );
  }

  const active = slides[Math.min(index, count - 1)];

  return (
    <div>
      <div className="mb-1 flex items-center justify-between gap-2">
        <p className="text-xs uppercase tracking-wide text-white/50">
          {title} — {active.label}
        </p>
        {count > 1 && (
          <div className="flex items-center gap-1">
            <button
              type="button"
              aria-label={`Previous ${title.toLowerCase()}`}
              onClick={() => step(-1)}
              className="rounded bg-white/10 px-2 py-0.5 text-xs text-white/70 hover:bg-white/20 hover:text-white"
            >
              ‹
            </button>
            <span className="text-[10px] tabular-nums text-white/40">
              {index + 1}/{count}
            </span>
            <button
              type="button"
              aria-label={`Next ${title.toLowerCase()}`}
              onClick={() => step(1)}
              className="rounded bg-white/10 px-2 py-0.5 text-xs text-white/70 hover:bg-white/20 hover:text-white"
            >
              ›
            </button>
          </div>
        )}
      </div>

      {/* Every slide stays mounted so videos keep their playback position and
          reference photos don't re-fetch when you flick back and forth. */}
      <div className="relative aspect-video w-full overflow-hidden rounded bg-black">
        {slides.map((slide, slideIndex) => (
          <div
            key={slide.key}
            className={`absolute inset-0 ${slideIndex === index ? "" : "invisible"}`}
          >
            {slide.render()}
          </div>
        ))}
      </div>

      {count > 1 && (
        <div className="mt-2 flex justify-center gap-1.5">
          {slides.map((slide, slideIndex) => (
            <button
              key={slide.key}
              type="button"
              aria-label={`Show ${slide.label}`}
              onClick={() => setIndex(slideIndex)}
              className={`h-1.5 w-1.5 rounded-full transition ${
                slideIndex === index ? "bg-cyan-400" : "bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// Grows with its content instead of scrolling inside two fixed rows — fail
// comments routinely run several sentences.
function AutoGrowTextarea({
  value,
  onChange,
  onBlur,
  placeholder,
  className,
}: {
  value: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  placeholder: string;
  className: string;
}) {
  const ref = useRef<HTMLTextAreaElement>(null);

  const resize = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = "auto";
    // A textarea inside a collapsed <details> — the approved-cards section —
    // measures 0. Leave it alone and re-measure once it is actually shown.
    if (el.scrollHeight > 0) el.style.height = `${el.scrollHeight}px`;
  }, []);

  useLayoutEffect(resize, [resize, value]);

  return (
    <textarea
      ref={ref}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onBlur={onBlur}
      onFocus={resize}
      placeholder={placeholder}
      rows={2}
      className={className}
    />
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
      <AutoGrowTextarea
        value={feedback.comment}
        onChange={feedback.setComment}
        onBlur={feedback.saveComment}
        placeholder="Fail comment..."
        className="block max-h-64 w-full resize-none overflow-y-auto rounded border border-white/10 bg-black/50 px-2 py-1 text-xs leading-relaxed text-white outline-none focus:border-cyan-400"
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
  useScrollLock(true);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const renderSlides: Slide[] = [
    { label: "Side", url: item.videoUrlSide },
    { label: "Orbit", url: item.videoUrlOrbit },
  ]
    .filter((view): view is { label: string; url: string } => Boolean(view.url))
    .map((view) => ({
      key: view.label,
      label: view.label,
      render: () => (
        <video
          src={view.url}
          controls
          loop
          muted
          autoPlay
          playsInline
          className="h-full w-full bg-black object-contain"
        />
      ),
    }));

  const referenceSlides: Slide[] = (item.reference?.images ?? []).map((url, imageIndex) => ({
    key: url,
    label: `Photo ${imageIndex + 1}`,
    render: () => (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={url}
        alt={`${item.reference?.name} reference ${imageIndex + 1}`}
        className="h-full w-full bg-white object-contain"
      />
    ),
  }));

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto overscroll-contain bg-black/80 p-4"
      onClick={onClose}
    >
      <div
        className="my-auto w-full max-w-5xl rounded-lg border border-white/10 bg-black p-4 sm:p-6"
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
          <Carousel title="Render" slides={renderSlides} />
          <div>
            <Carousel title="Reference" slides={referenceSlides} />
            {item.reference ? (
              <p className="mt-2 text-[10px] uppercase tracking-wide text-white/40">
                free-exercise-db · {item.reference.name}
                {item.reference.equipment ? ` · ${item.reference.equipment}` : ""}
              </p>
            ) : (
              <p className="mt-2 text-[10px] uppercase tracking-wide text-white/40">
                No reference matched for “{item.name}”
              </p>
            )}
          </div>
        </div>

        {item.reference && item.reference.instructions.length > 0 && (
          <details className="mt-4">
            <summary className="cursor-pointer select-none text-xs uppercase tracking-wide text-white/50 hover:text-white/80">
              Reference instructions
            </summary>
            <ol className="mt-2 list-decimal space-y-1 pl-5 text-xs leading-relaxed text-white/60">
              {item.reference.instructions.map((line, lineIndex) => (
                <li key={lineIndex}>{line}</li>
              ))}
            </ol>
          </details>
        )}

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
          Compare with reference
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
  // Each page carries its own round now, so the round belongs in the section
  // heading rather than in one page-wide title.
  const grouped = useMemo(() => {
    const map = new Map<
      string,
      { round: number; active: ReviewItem[]; approved: ReviewItem[] }
    >();
    for (const item of items) {
      if (!map.has(item.page)) {
        map.set(item.page, { round: item.round, active: [], approved: [] });
      }
      const bucket = map.get(item.page)!;
      // Rows are the latest per exercise, so a page can straddle rounds while
      // one wave is re-rendered and the rest sit still. Label it with the
      // newest round present.
      bucket.round = Math.max(bucket.round, item.round);
      (item.verdict === "pass" ? bucket.approved : bucket.active).push(item);
    }
    return Array.from(map.entries()).sort(([a], [b]) => a.localeCompare(b));
  }, [items]);

  return (
    <div className="space-y-10">
      {grouped.map(([page, { round, active, approved }]) => (
        <section key={page}>
          <h2 className="mb-3 text-sm uppercase tracking-wide text-white/60">
            {page} — round {round} ({active.length} to review, {approved.length} approved)
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
