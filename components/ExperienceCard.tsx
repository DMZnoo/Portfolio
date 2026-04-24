"use client";

import { useState } from "react";
import type { Experience } from "@/data/portfolio";
import { TechPill } from "./TechPill";
import { ProjectCard } from "./ProjectCard";
import { Reveal } from "./Reveal";

const accentMap = {
  cyan: "#26c8eb",
  violet: "#a78bfa",
  emerald: "#34d399",
} as const;

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      width="13"
      height="13"
      fill="currentColor"
      style={{ verticalAlign: -1, marginLeft: 3, transition: "transform 250ms" }}
      aria-hidden
    >
      <path
        fillRule="evenodd"
        d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
      />
    </svg>
  );
}

export function ExperienceCard({
  experience,
  defaultOpen = false,
  density,
}: {
  experience: Experience;
  defaultOpen?: boolean;
  density: "compact" | "spacious";
}) {
  const [open, setOpen] = useState(defaultOpen);
  const [hovered, setHovered] = useState(false);
  const hasProjects = experience.projects.length > 0;
  const accentColor = accentMap[experience.accent];

  const sectionGap = density === "compact" ? 32 : 52;
  const cardPad = density === "compact" ? "18px 18px" : "24px 22px";

  return (
    <li
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ listStyle: "none", marginBottom: sectionGap, position: "relative" }}
    >
      <div
        className="exp-neon-card"
        style={{
          position: "relative",
          overflow: "hidden",
          borderRadius: 12,
          padding: cardPad,
          background: hovered
            ? "linear-gradient(180deg, rgba(30,41,59,0.5), rgba(15,23,42,0.35))"
            : "transparent",
          border: `1px solid ${hovered ? "rgba(148,163,184,0.14)" : "rgba(148,163,184,0)"}`,
          boxShadow: hovered
            ? `inset 0 1px 0 0 rgba(226,232,240,0.08), 0 22px 70px -42px ${accentColor}c7`
            : "inset 0 1px 0 rgba(148,163,184,0.03)",
          transition: "background 300ms, border-color 300ms, box-shadow 300ms",
        }}
      >
        <div className="exp-grid">
          <div
            style={{
              fontSize: 10.5,
              color: "#64748b",
              letterSpacing: 1.4,
              textTransform: "uppercase",
              fontWeight: 600,
              paddingTop: 4,
              fontFamily: "'JetBrains Mono', ui-monospace, monospace",
            }}
          >
            {experience.date}
          </div>

          <div>
            <a
              href={experience.href}
              target="_blank"
              rel="noreferrer noopener"
              className="group/link inline-flex items-baseline"
              style={{
                textDecoration: "none",
                color: hovered ? accentColor : "#e2e8f0",
                fontWeight: 600,
                fontSize: 16.5,
                letterSpacing: -0.1,
                transition: "color 200ms",
              }}
            >
              <span>
                {experience.role} ·{" "}
                <span style={{ color: hovered ? accentColor : "#cbd5e1" }}>
                  {experience.company}
                </span>
              </span>
              <span
                style={{
                  display: "inline-block",
                  marginLeft: 4,
                  transform: hovered ? "translate(2px, -2px)" : "translate(0, 0)",
                  transition: "transform 250ms",
                  color: accentColor,
                }}
              >
                <ArrowIcon />
              </span>
            </a>

            <p
              style={{
                margin: "8px 0 0",
                fontSize: 13.5,
                lineHeight: 1.65,
                color: "#94a3b8",
              }}
            >
              {experience.description}
            </p>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 6,
                marginTop: 12,
              }}
            >
              {experience.technologies.map((t) => (
                <TechPill key={t}>{t}</TechPill>
              ))}
            </div>

            {hasProjects && (
              <button
                onClick={() => setOpen((o) => !o)}
                style={{
                  marginTop: 16,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "7px 12px 7px 10px",
                  background: open ? `${accentColor}14` : "rgba(148,163,184,0.06)",
                  border: `1px solid ${open ? `${accentColor}55` : "rgba(148,163,184,0.12)"}`,
                  borderRadius: 999,
                  color: open ? accentColor : "#cbd5e1",
                  fontSize: 11.5,
                  fontWeight: 600,
                  letterSpacing: 0.2,
                  cursor: "pointer",
                  transition: "all 220ms",
                  fontFamily: "inherit",
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    width: 6,
                    height: 6,
                    borderRadius: 999,
                    background: accentColor,
                    boxShadow: `0 0 8px ${accentColor}`,
                  }}
                />
                {experience.projects.length} project
                {experience.projects.length > 1 ? "s" : ""}
                <span
                  style={{
                    display: "inline-block",
                    marginLeft: 2,
                    transform: open ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 280ms",
                    fontSize: 9,
                    lineHeight: 1,
                  }}
                >
                  ▼
                </span>
              </button>
            )}

            {hasProjects && (
              <div
                style={{
                  display: "grid",
                  gridTemplateRows: open ? "1fr" : "0fr",
                  transition:
                    "grid-template-rows 450ms cubic-bezier(.22,.61,.36,1)",
                  marginTop: open ? 18 : 0,
                }}
              >
                <div style={{ overflow: "hidden" }}>
                  <div
                    style={{
                      display: "grid",
                      gap: 12,
                      gridTemplateColumns:
                        "repeat(auto-fill, minmax(280px, 1fr))",
                      paddingTop: 4,
                      paddingBottom: 4,
                      paddingLeft: 18,
                      borderLeft: `2px solid ${accentColor}22`,
                    }}
                  >
                    {experience.projects.map((p, i) => (
                      <Reveal key={p.id} delay={open ? i * 60 : 0}>
                        <ProjectCard
                          project={p}
                          accent={experience.accent}
                          density={density}
                        />
                      </Reveal>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <span
          className="exp-neon-line exp-neon-line-top"
          style={{
            background: `linear-gradient(90deg, transparent, ${accentColor}, #a78bfa)`,
            boxShadow: `0 0 14px ${accentColor}`,
          }}
        />
        <span
          className="exp-neon-line exp-neon-line-right"
          style={{
            background: `linear-gradient(180deg, transparent, #a78bfa, ${accentColor})`,
            boxShadow: "0 0 14px rgba(167,139,250,0.7)",
          }}
        />
        <span
          className="exp-neon-line exp-neon-line-bottom"
          style={{
            background: `linear-gradient(270deg, transparent, ${accentColor}, #22d49f)`,
            boxShadow: `0 0 14px ${accentColor}`,
          }}
        />
        <span
          className="exp-neon-line exp-neon-line-left"
          style={{
            background: `linear-gradient(0deg, transparent, #22d49f, ${accentColor})`,
            boxShadow: "0 0 14px rgba(34,212,159,0.7)",
          }}
        />
      </div>

      <style jsx>{`
        .exp-neon-card {
          isolation: isolate;
        }
        .exp-grid {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: minmax(120px, 140px) 1fr;
          gap: 24px;
          align-items: start;
        }
        .exp-neon-line {
          position: absolute;
          z-index: 0;
          pointer-events: none;
          opacity: 0;
          transition: opacity 220ms ease;
        }
        .exp-neon-card:hover .exp-neon-line {
          opacity: 1;
        }
        .exp-neon-line-top,
        .exp-neon-line-bottom {
          height: 1px;
          width: 100%;
        }
        .exp-neon-line-right,
        .exp-neon-line-left {
          height: 100%;
          width: 1px;
        }
        .exp-neon-line-top {
          left: -100%;
          top: 0;
        }
        .exp-neon-line-right {
          right: 0;
          top: -100%;
        }
        .exp-neon-line-bottom {
          bottom: 0;
          right: -100%;
        }
        .exp-neon-line-left {
          bottom: -100%;
          left: 0;
        }
        .exp-neon-card:hover .exp-neon-line-top {
          left: 100%;
          transition: left 1s ease, opacity 220ms ease;
        }
        .exp-neon-card:hover .exp-neon-line-right {
          top: 100%;
          transition: top 1s ease 0.18s, opacity 220ms ease;
        }
        .exp-neon-card:hover .exp-neon-line-bottom {
          right: 100%;
          transition: right 1s ease 0.36s, opacity 220ms ease;
        }
        .exp-neon-card:hover .exp-neon-line-left {
          bottom: 100%;
          transition: bottom 1s ease 0.54s, opacity 220ms ease;
        }
        @media (prefers-reduced-motion: reduce) {
          .exp-neon-line {
            display: none;
          }
        }
        @media (max-width: 720px) {
          .exp-grid {
            grid-template-columns: 1fr;
            gap: 10px;
          }
        }
      `}</style>
    </li>
  );
}
