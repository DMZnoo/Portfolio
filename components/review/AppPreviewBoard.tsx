"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

/**
 * Review board for UI captures — dark/light pairs rather than demo videos.
 *
 * Deliberately standalone rather than an extra mode on ReviewBoard: that
 * component is built around video carousels and round history, and threading a
 * second media shape through it would put the working demo reviewer at risk for
 * no shared behaviour beyond a verdict and a comment box. It posts to the same
 * /api/review/submit endpoint, which routes on `source`.
 */

export type PreviewCapture = {
  id: string;
  surface: "screen" | "component";
  section: string;
  name: string;
  darkUrl: string | null;
  lightUrl: string | null;
  verdict: "pending" | "pass" | "fail";
  comment: string | null;
};

type ThemeFilter = "both" | "dark" | "light";

function useSaver(capture: PreviewCapture) {
  const [verdict, setVerdict] = useState(capture.verdict);
  const [comment, setComment] = useState(capture.comment ?? "");
  const [state, setState] = useState<"idle" | "saving" | "saved">("idle");

  const save = useCallback(
    async (nextVerdict: typeof verdict, nextComment: string) => {
      setState("saving");
      const res = await fetch("/api/review/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: capture.id,
          verdict: nextVerdict,
          comment: nextComment,
          source: "appPreview",
        }),
      });
      setState(res.ok ? "saved" : "idle");
    },
    [capture.id]
  );

  // Clear the "saved" tick so a later edit doesn't look already-saved.
  useEffect(() => {
    if (state !== "saved") return;
    const timer = setTimeout(() => setState("idle"), 1800);
    return () => clearTimeout(timer);
  }, [state]);

  return {
    verdict,
    comment,
    state,
    setComment,
    // Tapping the active verdict again clears it, matching the demo reviewer.
    toggleVerdict: (next: "pass" | "fail") => {
      const resolved = verdict === next ? "pending" : next;
      setVerdict(resolved);
      save(resolved, comment);
    },
    saveComment: () => save(verdict, comment),
  };
}

function Panes({
  capture,
  filter,
  className = "",
}: {
  capture: PreviewCapture;
  filter: ThemeFilter;
  className?: string;
}) {
  const panes = [
    { theme: "Dark", url: capture.darkUrl },
    { theme: "Light", url: capture.lightUrl },
  ].filter((p) => p.url && (filter === "both" || filter === p.theme.toLowerCase()));

  if (panes.length === 0) {
    return (
      <div className="flex h-40 items-center justify-center text-xs text-white/30">
        not captured
      </div>
    );
  }

  return (
    <div className={`grid gap-px bg-white/10 ${panes.length > 1 ? "grid-cols-2" : ""}`}>
      {panes.map((pane) => (
        <div key={pane.theme} className="relative bg-black">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={pane.url!}
            alt={`${capture.name}, ${pane.theme.toLowerCase()} mode`}
            loading="lazy"
            className={`w-full ${className}`}
          />
          <span className="absolute bottom-1.5 left-1.5 rounded bg-black/70 px-1.5 py-0.5 text-[9px] uppercase tracking-wider text-white/80">
            {pane.theme}
          </span>
        </div>
      ))}
    </div>
  );
}

function Lightbox({
  capture,
  onClose,
  onStep,
}: {
  capture: PreviewCapture;
  onClose: () => void;
  onStep: (delta: number) => void;
}) {
  const [filter, setFilter] = useState<ThemeFilter>("both");

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") onStep(1);
      if (event.key === "ArrowLeft") onStep(-1);
    };
    window.addEventListener("keydown", onKey);
    // Stop the board scrolling underneath the overlay on touch.
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [onClose, onStep]);

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/95 p-4 sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={capture.name}
      onClick={onClose}
    >
      <div
        className="mx-auto max-w-5xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="text-[10px] uppercase tracking-wider text-white/40">
              {capture.section}
            </div>
            <h2 className="text-base">{capture.name}</h2>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex overflow-hidden rounded border border-white/15">
              {(["both", "dark", "light"] as ThemeFilter[]).map((option) => (
                <button
                  key={option}
                  onClick={() => setFilter(option)}
                  className={`px-2.5 py-1 text-xs capitalize transition ${
                    filter === option
                      ? "bg-white text-black"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
            <button
              onClick={onClose}
              className="rounded border border-white/15 px-2.5 py-1 text-xs text-white/60 hover:text-white"
            >
              Close
            </button>
          </div>
        </div>

        <Panes capture={capture} filter={filter} />

        <div className="mt-4 flex justify-between text-xs text-white/40">
          <button onClick={() => onStep(-1)} className="hover:text-white">
            &larr; Previous
          </button>
          <button onClick={() => onStep(1)} className="hover:text-white">
            Next &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}

function Card({
  capture,
  onOpen,
}: {
  capture: PreviewCapture;
  onOpen: () => void;
}) {
  const feedback = useSaver(capture);

  const verdictClass = (option: "pass" | "fail") => {
    if (feedback.verdict !== option) {
      return "border-white/15 text-white/50 hover:text-white";
    }
    return option === "pass"
      ? "border-emerald-400/60 bg-emerald-400/15 text-emerald-300"
      : "border-rose-400/60 bg-rose-400/15 text-rose-300";
  };

  return (
    <div
      className={`overflow-hidden rounded-lg border bg-white/[0.03] transition ${
        feedback.verdict === "fail"
          ? "border-rose-400/40"
          : feedback.verdict === "pass"
            ? "border-emerald-400/40"
            : "border-white/10"
      }`}
    >
      <button
        onClick={onOpen}
        className="block w-full cursor-zoom-in"
        aria-label={`Open ${capture.name} full size`}
      >
        {/* Screens are phone-shaped and get cropped to a consistent card
            height; components are wide and short, so they keep their own. */}
        <Panes
          capture={capture}
          filter="both"
          className={capture.surface === "screen" ? "h-64 object-cover object-top" : ""}
        />
      </button>

      <div className="border-t border-white/10 p-3">
        <div className="mb-2 text-xs text-white/80">{capture.name}</div>

        <div className="mb-2 flex gap-2">
          {(["pass", "fail"] as const).map((option) => (
            <button
              key={option}
              onClick={() => feedback.toggleVerdict(option)}
              className={`rounded border px-2 py-1 text-[11px] transition ${verdictClass(option)}`}
            >
              {option === "pass" ? "Looks good" : "Needs work"}
            </button>
          ))}
          <span className="ml-auto self-center text-[10px] text-white/30">
            {feedback.state === "saving"
              ? "saving…"
              : feedback.state === "saved"
                ? "saved"
                : ""}
          </span>
        </div>

        <textarea
          value={feedback.comment}
          onChange={(event) => feedback.setComment(event.target.value)}
          // Saving on blur rather than per keystroke: one write when a note is
          // finished, instead of one per character.
          onBlur={feedback.saveComment}
          placeholder="Add a note…"
          rows={2}
          className="w-full resize-y rounded border border-white/10 bg-black/40 p-2 text-[11px] text-white/90 placeholder:text-white/25 focus:border-white/30 focus:outline-none"
        />
      </div>
    </div>
  );
}

export default function AppPreviewBoard({
  captures,
}: {
  captures: PreviewCapture[];
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [surface, setSurface] = useState<"all" | "screen" | "component">("all");
  const [onlyFlagged, setOnlyFlagged] = useState(false);

  const visible = useMemo(
    () =>
      captures.filter(
        (capture) =>
          (surface === "all" || capture.surface === surface) &&
          (!onlyFlagged || capture.verdict === "fail")
      ),
    [captures, surface, onlyFlagged]
  );

  const sections = useMemo(() => {
    const grouped = new Map<string, PreviewCapture[]>();
    for (const capture of visible) {
      const list = grouped.get(capture.section) ?? [];
      list.push(capture);
      grouped.set(capture.section, list);
    }
    return [...grouped.entries()];
  }, [visible]);

  const step = useCallback(
    (delta: number) =>
      setOpenIndex((current) =>
        current === null
          ? null
          : (current + delta + visible.length) % visible.length
      ),
    [visible.length]
  );

  const counts = useMemo(
    () => ({
      screens: captures.filter((c) => c.surface === "screen").length,
      components: captures.filter((c) => c.surface === "component").length,
      flagged: captures.filter((c) => c.verdict === "fail").length,
    }),
    [captures]
  );

  return (
    <>
      <div className="mb-6 flex flex-wrap items-center gap-2 text-xs">
        {(
          [
            ["all", `All ${captures.length}`],
            ["screen", `Screens ${counts.screens}`],
            ["component", `Components ${counts.components}`],
          ] as const
        ).map(([value, label]) => (
          <button
            key={value}
            onClick={() => setSurface(value)}
            className={`rounded border px-2.5 py-1 transition ${
              surface === value
                ? "border-white/40 bg-white text-black"
                : "border-white/15 text-white/60 hover:text-white"
            }`}
          >
            {label}
          </button>
        ))}

        <button
          onClick={() => setOnlyFlagged((value) => !value)}
          disabled={counts.flagged === 0}
          className={`rounded border px-2.5 py-1 transition disabled:opacity-30 ${
            onlyFlagged
              ? "border-rose-400/60 bg-rose-400/15 text-rose-300"
              : "border-white/15 text-white/60 hover:text-white"
          }`}
        >
          Needs work {counts.flagged}
        </button>
      </div>

      {sections.length === 0 && (
        <p className="text-sm text-white/40">Nothing matches this filter.</p>
      )}

      {sections.map(([section, items]) => (
        <section key={section} className="mb-10">
          <h2 className="mb-3 text-sm text-white/70">
            {section}
            <span className="ml-2 text-white/30">{items.length}</span>
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((capture) => (
              <Card
                key={capture.id}
                capture={capture}
                onOpen={() => setOpenIndex(visible.indexOf(capture))}
              />
            ))}
          </div>
        </section>
      ))}

      {openIndex !== null && visible[openIndex] && (
        <Lightbox
          capture={visible[openIndex]}
          onClose={() => setOpenIndex(null)}
          onStep={step}
        />
      )}
    </>
  );
}
