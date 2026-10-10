import { supabaseAdmin } from "@/lib/supabase";
import AndroidDecisionCard from "@/components/review/AndroidDecisionCard";
import {
  formatNz,
  shortDate,
  type ReviewAnswer,
  type ReviewItem,
  type Snapshot,
} from "@/lib/androidReview";

export const dynamic = "force-dynamic";

/**
 * The Android port roadmap, with the pending decisions answerable in place.
 *
 * Published by Logger's scripts/android-review-publish.py; answers are read
 * back by the same script (--answers). Behind the review gate (middleware),
 * and every table is service-role only, so all reads happen here on the server.
 */
const barTone = { done: "var(--ar-done)", pause: "var(--ar-pause)", accent: "var(--ar-accent)" };

function tagPill(tag: string) {
  const tone = tag === "android-next" || tag === "next" || tag === "iOS" ? "build" : "wait";
  return <span className={`ar-pill ${tone}`}>{tag}</span>;
}

export default async function AndroidReviewPage() {
  const db = supabaseAdmin();
  const [snapRes, itemsRes, answersRes] = await Promise.all([
    db
      .from("android_review_snapshot")
      .select("published_at, data")
      .order("id", { ascending: false })
      .limit(1)
      .maybeSingle(),
    db.from("android_review_items").select("id, section, title, detail, options, status, sort").order("sort"),
    db
      .from("android_review_answers")
      .select("id, item_id, kind, body, choice, created_at")
      .order("created_at"),
  ]);

  const error = snapRes.error ?? itemsRes.error ?? answersRes.error;
  if (error || !snapRes.data) {
    return (
      <main className="ar-wrap">
        <p>
          {error
            ? `Couldn't load the roadmap: ${error.message}`
            : "Nothing published yet. Run scripts/android-review-publish.py in the Logger repo."}
        </p>
      </main>
    );
  }

  const s = snapRes.data.data as Snapshot;
  const publishedAt = snapRes.data.published_at as string;
  const items = (itemsRes.data ?? []) as ReviewItem[];
  const answers = (answersRes.data ?? []) as ReviewAnswer[];
  const answersFor = (id: string) => answers.filter((a) => a.item_id === id);

  const open = items.filter((i) => i.status !== "resolved");
  const resolved = items.filter((i) => i.status === "resolved");
  const sections = Array.from(new Set(open.map((i) => i.section)));
  const unanswered = open.filter((i) => !answersFor(i.id).some((a) => a.kind === "answer")).length;

  return (
    <main className="ar-wrap">
      <header className="ar-header">
        <span className="ar-eyebrow">{s.eyebrow}</span>
        <h1>{s.title}</h1>
        <p className="ar-lede">{s.lede}</p>
        <div className="ar-meta ar-mono">
          <span>As of {shortDate(s.asOf)}</span>
          <span>main {s.mainSha}</span>
          <span>android-next +{s.androidNextAhead} commits</span>
          <span>published {formatNz(publishedAt)}</span>
        </div>
      </header>

      <section className="ar-section" aria-labelledby="ar-phases">
        <h2 id="ar-phases">Where we're headed</h2>
        <div className="ar-track">
          {s.phases.map((p) => (
            <div key={p.name} className={`ar-phase ${p.state}`}>
              <span className="dot" aria-hidden="true" />
              <span className="state">{p.label}</span>
              <span className="name">{p.name}</span>
              <span className="desc">{p.desc}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="ar-section" aria-labelledby="ar-glance">
        <h2 id="ar-glance">Where we're sitting</h2>
        <div className="ar-tiles">
          {s.tiles.map((t) => (
            <div key={t.label} className="ar-tile">
              <span className="num">
                {t.num}
                {t.of !== undefined && <small> / {t.of}</small>}
              </span>
              <span className="label">{t.label}</span>
              {t.bar && (
                <div className="ar-bar" aria-hidden="true">
                  {t.bar.map((b, i) => (
                    <span key={i} style={{ width: `${b.pct}%`, background: barTone[b.tone] }} />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="ar-section" aria-labelledby="ar-decide">
        <h2 id="ar-decide">Decisions waiting on you</h2>
        <p className="ar-lede">
          {unanswered} of {open.length} still unanswered. Agents skip these until they're decided. Tap a
          suggested answer, write your own, or leave a comment; everything saves as you go.
        </p>
        {sections.map((section) => (
          <div key={section} className="ar-decisions">
            <h3 className="ar-eyebrow">{section}</h3>
            {open
              .filter((i) => i.section === section)
              .map((item) => (
                <AndroidDecisionCard key={item.id} item={item} initialAnswers={answersFor(item.id)} />
              ))}
          </div>
        ))}
        {resolved.length > 0 && (
          <details>
            <summary className="ar-mono">Decided ({resolved.length})</summary>
            <div className="ar-decisions" style={{ marginTop: 12 }}>
              {resolved.map((item) => (
                <AndroidDecisionCard key={item.id} item={item} initialAnswers={answersFor(item.id)} />
              ))}
            </div>
          </details>
        )}
      </section>

      <section className="ar-section" aria-labelledby="ar-flows">
        <h2 id="ar-flows">Parity by flow</h2>
        <p className="ar-lede">
          A row is signed off when its strings, sheets, actions and a screenshot all match iOS, and iOS
          hasn't changed it since. Not ported counts views with no Android screen yet; stale counts
          ported screens iOS has changed since.
        </p>
        <div className="ar-legend">
          <span>
            <i style={{ background: "var(--ar-accent)" }} />
            signed off
          </span>
          <span>
            <i style={{ background: "var(--ar-pause-soft)", border: "1px solid var(--ar-line)" }} />
            not yet signed off
          </span>
        </div>
        <div className="ar-card ar-table-wrap" style={{ padding: 0 }}>
          <table className="ar-table">
            <thead>
              <tr>
                <th>Flow</th>
                <th>Views</th>
                <th>Signed off</th>
                <th style={{ width: 140 }}>
                  <span className="sr-only">Progress</span>
                </th>
                <th>Not ported</th>
                <th>iOS-only</th>
                <th>Stale</th>
              </tr>
            </thead>
            <tbody>
              {s.flows.map((f) => {
                const pct = Math.round((f.signed / Math.max(f.views, 1)) * 100);
                return (
                  <tr key={f.name}>
                    <td className="flow">{f.name}</td>
                    <td className="n">{f.views}</td>
                    <td className="n">
                      {f.signed} <span style={{ color: "var(--ar-muted)" }}>({pct}%)</span>
                    </td>
                    <td>
                      <div className="ar-bar" role="img" aria-label={`${pct}% signed off`}>
                        <span style={{ width: `${pct}%`, background: "var(--ar-accent)" }} />
                      </div>
                    </td>
                    <td className="n">{f.todo ? <span className="ar-pill wait">{f.todo}</span> : "–"}</td>
                    <td className="n">{f.iosOnly || "–"}</td>
                    <td className="n">{f.stale ? <span className="ar-pill pause">{f.stale}</span> : "–"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <section className="ar-section" aria-labelledby="ar-pending">
        <h2 id="ar-pending">What's pending</h2>
        <div className="ar-grid2">
          <div className="ar-card">
            <h3>In flight</h3>
            <ul className="ar-items">
              {s.inFlight.map((f, i) => (
                <li key={i}>
                  <span className="id">{tagPill(f.tag)}</span>
                  <span>{f.text}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="ar-card">
            <h3>Not ported yet ({s.notPorted.length})</h3>
            <ul className="ar-files">
              {s.notPorted.map((n) => (
                <li key={n.path}>
                  {n.path} {tagPill(n.tag)}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="ar-card">
          <h3>
            Stale ports to catch up ({s.stale.length}) <span className="ar-pill pause">paused</span>
          </h3>
          <p className="ar-lede">{s.staleNote}</p>
          <ul className="ar-files">
            {s.stale.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="ar-section" aria-labelledby="ar-landed">
        <h2 id="ar-landed">Recently landed on main</h2>
        <ol className="ar-timeline">
          {s.landed.map((l) => (
            <li key={l.sha}>
              <span className="when">{shortDate(l.date)}</span>
              <span>
                <span className="sha">{l.sha}</span>
                {l.waves > 0 && ` · ${l.waves} waves`}. {l.text}
              </span>
            </li>
          ))}
        </ol>
      </section>

      <footer className="ar-footer">
        <p>{s.footer}</p>
      </footer>
    </main>
  );
}
