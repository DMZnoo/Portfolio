"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { Project } from "@/data/portfolio";
import { TechPill } from "./TechPill";

const accentMap = {
  cyan: "#26c8eb",
  violet: "#a78bfa",
  emerald: "#34d399",
} as const;

export function ProjectCard({
  project,
  accent,
  density,
}: {
  project: Project;
  accent: "cyan" | "violet" | "emerald";
  density: "compact" | "spacious";
}) {
  const ref = useRef<HTMLAnchorElement | HTMLDivElement | null>(null);
  const [hovered, setHovered] = useState(false);
  const [previewSeed, setPreviewSeed] = useState(0);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, mx: 50, my: 50 });
  const accentColor = accentMap[accent];

  function onMove(e: React.MouseEvent<HTMLElement>) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    setTilt({
      rx: (0.5 - py) * 4,
      ry: (px - 0.5) * 6,
      mx: px * 100,
      my: py * 100,
    });
  }

  function onLeave() {
    setHovered(false);
    setTilt({ rx: 0, ry: 0, mx: 50, my: 50 });
  }

  const padding = density === "compact" ? "14px 16px" : "18px 20px";
  const cardStyle: React.CSSProperties = {
    position: "relative",
    display: "block",
    borderRadius: 10,
    padding,
    background: hovered
      ? `radial-gradient(240px circle at ${tilt.mx}% ${tilt.my}%, rgba(38,200,235,0.09), rgba(15,23,42,0.6) 60%), linear-gradient(180deg, rgba(30,41,59,0.55), rgba(15,23,42,0.4))`
      : "linear-gradient(180deg, rgba(30,41,59,0.35), rgba(15,23,42,0.25))",
    border: `1px solid ${hovered ? "rgba(38,200,235,0.35)" : "rgba(148,163,184,0.08)"}`,
    color: "inherit",
    cursor: project.href ? "pointer" : "default",
    textDecoration: "none",
    transform: `perspective(900px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) translateZ(0)`,
    transition:
      "border-color 250ms, background 400ms, transform 150ms ease-out, box-shadow 300ms",
    boxShadow: hovered
      ? `0 18px 40px -18px ${accentColor}33, 0 0 0 1px ${accentColor}22 inset`
      : "0 1px 0 0 rgba(148,163,184,0.03) inset",
    willChange: "transform",
  };

  const content = (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          gap: 12,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: 10,
            flexWrap: "wrap",
          }}
        >
          <h4
            style={{
              margin: 0,
              fontSize: 15,
              fontWeight: 600,
              color: "#e2e8f0",
              letterSpacing: -0.1,
            }}
          >
            {project.title}
            {project.href ? (
              <svg
                viewBox="0 0 20 20"
                width="12"
                height="12"
                fill="currentColor"
                aria-hidden
                style={{
                  color: accentColor,
                  marginLeft: 5,
                  transform: hovered ? "translate(2px, -2px)" : "translate(0, 0)",
                  transition: "transform 220ms",
                  verticalAlign: -1,
                }}
              >
                <path
                  fillRule="evenodd"
                  d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
                />
              </svg>
            ) : null}
          </h4>
          <span style={{ fontSize: 11, color: "#64748b" }}>/</span>
          <span style={{ fontSize: 12, color: "#94a3b8", fontWeight: 500 }}>
            {project.client}
          </span>
        </div>
        <span
          style={{
            fontSize: 10,
            color: "#64748b",
            fontVariantNumeric: "tabular-nums",
            whiteSpace: "nowrap",
          }}
        >
          {project.year}
        </span>
      </div>

      <div
        style={{
          marginTop: 6,
          fontSize: 11,
          color: accentColor,
          fontWeight: 500,
          letterSpacing: 0.2,
        }}
      >
        {project.role} ·{" "}
        <span style={{ color: "#64748b", fontWeight: 400 }}>
          {project.highlight}
        </span>
      </div>

      <p
        style={{
          margin: density === "compact" ? "8px 0 10px" : "10px 0 12px",
          fontSize: 13,
          lineHeight: 1.55,
          color: "#94a3b8",
        }}
      >
        {project.blurb}
      </p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
        {project.tech.map((t) => (
          <TechPill key={t} small>
            {t}
          </TechPill>
        ))}
      </div>

      <CornerAccents color={accentColor} active={hovered} />
      <LivePreview
        active={hovered}
        accent={accentColor}
        project={project}
        previewSeed={previewSeed}
      />
    </>
  );

  if (project.href) {
    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={project.href}
        target="_blank"
        rel="noreferrer noopener"
        aria-label={`${project.title} project`}
        onMouseEnter={() => {
          setPreviewSeed((seed) => seed + 1);
          setHovered(true);
        }}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={cardStyle}
      >
        {content}
      </a>
    );
  }

  return (
    <div
      ref={ref as React.Ref<HTMLDivElement>}
      onMouseEnter={() => {
        setPreviewSeed((seed) => seed + 1);
        setHovered(true);
      }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={cardStyle}
    >
      {content}
    </div>
  );
}

function CornerAccents({ color, active }: { color: string; active: boolean }) {
  const base: React.CSSProperties = {
    position: "absolute",
    width: 14,
    height: 14,
    transition: "opacity 400ms, transform 400ms",
    opacity: active ? 0.9 : 0,
    pointerEvents: "none",
  };
  return (
    <>
      <span
        style={{
          ...base,
          top: 6,
          left: 6,
          borderTop: `1px solid ${color}`,
          borderLeft: `1px solid ${color}`,
          transform: active ? "translate(0,0)" : "translate(-4px,-4px)",
        }}
      />
      <span
        style={{
          ...base,
          top: 6,
          right: 6,
          borderTop: `1px solid ${color}`,
          borderRight: `1px solid ${color}`,
          transform: active ? "translate(0,0)" : "translate(4px,-4px)",
        }}
      />
      <span
        style={{
          ...base,
          bottom: 6,
          left: 6,
          borderBottom: `1px solid ${color}`,
          borderLeft: `1px solid ${color}`,
          transform: active ? "translate(0,0)" : "translate(-4px,4px)",
        }}
      />
      <span
        style={{
          ...base,
          bottom: 6,
          right: 6,
          borderBottom: `1px solid ${color}`,
          borderRight: `1px solid ${color}`,
          transform: active ? "translate(0,0)" : "translate(4px,4px)",
        }}
      />
    </>
  );
}

function LivePreview({
  active,
  accent,
  project,
  previewSeed,
}: {
  active: boolean;
  accent: string;
  project: Project;
  previewSeed: number;
}) {
  return (
    <div
      style={{
        position: "absolute",
        right: 8,
        top: 8,
        width: 104,
        height: 70,
        opacity: active ? 1 : 0,
        transform: active
          ? "translate(0,0) scale(1)"
          : "translate(6px,-6px) scale(0.9)",
        transition: "opacity 300ms, transform 300ms cubic-bezier(.22,.61,.36,1)",
        pointerEvents: "none",
      }}
    >
      <PreviewStack
        project={project}
        accent={accent}
        active={active}
        previewSeed={previewSeed}
      />
    </div>
  );
}

function PreviewStack({
  project,
  accent,
  active,
  previewSeed,
}: {
  project: Project;
  accent: string;
  active: boolean;
  previewSeed: number;
}) {
  const fallbackImages = [0, 1, 2].map((i) => ({
    src: "",
    alt: `${project.title} preview ${i + 1}`,
  }));
  const sourceImages = project.images?.length ? project.images : fallbackImages;
  const offset = sourceImages.length ? previewSeed % sourceImages.length : 0;
  const images = [...sourceImages.slice(offset), ...sourceImages.slice(0, offset)].slice(0, 3);

  return (
    <>
      {images.map((image, i) => {
        const hasImage = Boolean(image.src);
        const x = i * 9;
        const y = i * 7;
        return (
          <div
            key={`${image.src || project.id}-${i}`}
            style={{
              position: "absolute",
              left: x,
              top: y,
              width: 84,
              height: 52,
              borderRadius: 6,
              overflow: "hidden",
              border: `1px solid ${accent}${i === 0 ? "aa" : "66"}`,
              background: hasImage
                ? "#0b1220"
                : `linear-gradient(145deg, ${accent}${(18 + i * 10)
                    .toString(16)
                    .padStart(2, "0")}, rgba(15,23,42,0.95))`,
              boxShadow: `0 ${8 + i * 4}px ${20 + i * 6}px -12px ${accent}88`,
              transform: active
                ? `translate(0, 0) rotate(${(i - 1) * 3}deg)`
                : `translate(${6 - i * 2}px, ${-7 - i * 2}px) rotate(0deg)`,
              transition: `transform 420ms ${i * 70}ms cubic-bezier(.22,.61,.36,1)`,
              zIndex: images.length - i,
            }}
          >
            {hasImage ? (
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="112px"
                style={{ objectFit: "cover" }}
              />
            ) : (
              <svg width="100%" height="100%" viewBox="0 0 84 52" preserveAspectRatio="none">
                <path
                  d="M8 35 C19 19 28 40 39 26 C50 12 60 23 76 10"
                  fill="none"
                  stroke={accent}
                  strokeOpacity="0.7"
                  strokeWidth="2"
                />
                <circle cx="18" cy="18" r="5" fill={accent} fillOpacity="0.45" />
              </svg>
            )}
          </div>
        );
      })}
    </>
  );
}
