"use client";

import { useState } from "react";
import { formatNz, type ReviewAnswer, type ReviewItem } from "@/lib/androidReview";

/**
 * One pending decision on /android-review: its detail, a button per
 * suggested answer, a free-text answer, and a comment thread. Every submit
 * appends a row (nothing is edited in place), so the newest answer is the
 * current one and the history stays readable to whoever acts on it.
 */
export default function AndroidDecisionCard({
  item,
  initialAnswers,
}: {
  item: ReviewItem;
  initialAnswers: ReviewAnswer[];
}) {
  const [answers, setAnswers] = useState(initialAnswers);
  const [answerText, setAnswerText] = useState("");
  const [commentText, setCommentText] = useState("");
  const [busy, setBusy] = useState<null | "answer" | "comment">(null);
  const [error, setError] = useState<string | null>(null);
  const [savedNote, setSavedNote] = useState<string | null>(null);

  const latestAnswer = [...answers].reverse().find((a) => a.kind === "answer");
  const [question, ...rest] = (item.detail ?? "").split("\n\n");

  async function submit(kind: "answer" | "comment", body: string, choice: string | null) {
    setBusy(kind);
    setError(null);
    setSavedNote(null);
    try {
      const res = await fetch("/api/android-review/answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itemId: item.id, kind, body, choice }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(json.error ?? `Couldn't save (${res.status}).`);
        return false;
      }
      setAnswers((prev) => [...prev, json.answer as ReviewAnswer]);
      setSavedNote(kind === "answer" ? "Answer saved." : "Comment added.");
      return true;
    } catch {
      setError("Couldn't reach the server. Try again.");
      return false;
    } finally {
      setBusy(null);
    }
  }

  const headingId = `decision-${item.id}`;

  return (
    <article
      className={`ar-card ar-decision ${item.status === "resolved" ? "resolved" : ""}`}
      aria-labelledby={headingId}
    >
      <div className="ar-decision-head">
        <span className="id">{item.id}</span>
        <h3 id={headingId}>{item.title}</h3>
        {item.status === "resolved" ? (
          <span className="ar-pill done">resolved</span>
        ) : latestAnswer ? (
          <span className="ar-pill build">answered</span>
        ) : (
          <span className="ar-pill wait">open</span>
        )}
      </div>

      {question && <p className="ar-detail ar-detail-first">{question}</p>}
      {rest.length > 0 && (
        <details>
          <summary className="ar-mono">Background</summary>
          <p className="ar-detail" style={{ marginTop: 8 }}>
            {rest.join("\n\n")}
          </p>
        </details>
      )}

      {latestAnswer && (
        <div className="ar-latest">
          <span className="ar-eyebrow">Current answer · {formatNz(latestAnswer.created_at)}</span>
          {latestAnswer.choice && <strong>{latestAnswer.choice}</strong>}
          {latestAnswer.body && <span style={{ whiteSpace: "pre-wrap" }}>{latestAnswer.body}</span>}
        </div>
      )}

      {item.options.length > 0 && (
        <div className="ar-options" role="group" aria-label="Suggested answers">
          {item.options.map((option) => {
            const chosen = latestAnswer?.choice === option;
            return (
              <button
                key={option}
                type="button"
                className={`ar-btn ${chosen ? "chosen" : ""}`}
                aria-pressed={chosen}
                disabled={busy !== null}
                onClick={() => submit("answer", answerText.trim(), option).then((ok) => ok && setAnswerText(""))}
              >
                {option}
              </button>
            );
          })}
        </div>
      )}

      <form
        className="ar-stack"
        style={{ gap: 8 }}
        onSubmit={async (e) => {
          e.preventDefault();
          if (await submit("answer", answerText, null)) setAnswerText("");
        }}
      >
        <label className="ar-eyebrow" htmlFor={`${headingId}-answer`}>
          Answer in your own words (or add a note, then tap an option)
        </label>
        <textarea
          id={`${headingId}-answer`}
          className="ar-input"
          value={answerText}
          maxLength={4000}
          onChange={(e) => setAnswerText(e.target.value)}
        />
        <div className="ar-row">
          <button type="submit" className="ar-btn primary" disabled={busy !== null || !answerText.trim()}>
            {busy === "answer" ? "Saving…" : "Send answer"}
          </button>
        </div>
      </form>

      {answers.length > 0 && (
        <ol className="ar-thread" aria-label="History">
          {answers.map((a) => (
            <li key={a.id}>
              <span className="who">
                {a.kind === "answer" ? "Answer" : "Comment"} · {formatNz(a.created_at)}
              </span>
              {a.choice && <strong>{a.choice}</strong>}
              {a.body && <span className="body">{a.body}</span>}
            </li>
          ))}
        </ol>
      )}

      <form
        className="ar-stack"
        style={{ gap: 8 }}
        onSubmit={async (e) => {
          e.preventDefault();
          if (await submit("comment", commentText, null)) setCommentText("");
        }}
      >
        <label className="ar-eyebrow" htmlFor={`${headingId}-comment`}>
          Comment
        </label>
        <textarea
          id={`${headingId}-comment`}
          className="ar-input"
          value={commentText}
          maxLength={4000}
          onChange={(e) => setCommentText(e.target.value)}
        />
        <div className="ar-row">
          <button type="submit" className="ar-btn" disabled={busy !== null || !commentText.trim()}>
            {busy === "comment" ? "Posting…" : "Add comment"}
          </button>
          <span aria-live="polite">
            {error && <span className="ar-error">{error}</span>}
            {savedNote && <span className="ar-saved">{savedNote}</span>}
          </span>
        </div>
      </form>
    </article>
  );
}
