"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { profile } from "@/data/portfolio";

function GitHubIcon() {
  return (
    <svg viewBox="0 0 16 16" width="18" height="18" fill="currentColor" aria-hidden="true">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
      <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  );
}

const navItems = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience & Projects" },
  { id: "now", label: "Currently" },
];

export function ProfileHeader() {
  const [active, setActive] = useState("about");

  useEffect(() => {
    const ids = navItems.map((n) => n.id);
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((e): e is HTMLElement => !!e);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  function onNav(id: string) {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 40, behavior: "smooth" });
  }

  return (
    <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-full lg:flex-col lg:justify-between lg:py-24">
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 18 }}>
          <Image
            src="/profile.jpg"
            alt={profile.name}
            width={72}
            height={72}
            className="rounded-full object-cover"
            style={{
              border: "2px solid rgba(38, 200, 235, 0.3)",
              boxShadow:
                "0 0 0 4px rgba(15,23,42,0.8), 0 8px 24px -8px rgba(38,200,235,0.4)",
            }}
          />
          <div
            style={{
              fontSize: 11,
              color: "#26c8eb",
              fontWeight: 600,
              letterSpacing: 1.8,
              textTransform: "uppercase",
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            ● Available
          </div>
        </div>

        <h1
          style={{
            margin: 0,
            fontSize: 40,
            fontWeight: 700,
            color: "#f1f5f9",
            letterSpacing: -1.2,
            lineHeight: 1.05,
          }}
        >
          <a href="/">{profile.name}</a>
        </h1>
        <h2
          style={{
            margin: "10px 0 0",
            fontSize: 17,
            fontWeight: 500,
            color: "#cbd5e1",
            letterSpacing: -0.2,
          }}
        >
          {profile.title}
        </h2>
        <p
          style={{
            margin: "18px 0 0",
            fontSize: 14,
            lineHeight: 1.6,
            color: "#94a3b8",
            maxWidth: 340,
          }}
        >
          {profile.tagline}
        </p>

        <nav className="hidden lg:block" style={{ marginTop: 40 }}>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "flex",
              flexDirection: "column",
              gap: 4,
            }}
          >
            {navItems.map((item) => {
              const isActive = active === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      onNav(item.id);
                    }}
                    className={`navlink ${isActive ? "is-active" : ""}`}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 16,
                      padding: "6px 0",
                      color: isActive ? "#f1f5f9" : "#64748b",
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: 2,
                      textTransform: "uppercase",
                      textDecoration: "none",
                      transition: "color 200ms",
                    }}
                  >
                    <span className="navline" />
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      <ul
        className="mt-10 lg:mt-0"
        style={{
          listStyle: "none",
          padding: 0,
          display: "flex",
          gap: 18,
          alignItems: "center",
        }}
      >
        {[
          { key: "GitHub", href: profile.links.github, icon: <GitHubIcon /> },
          { key: "LinkedIn", href: profile.links.linkedin, icon: <LinkedInIcon /> },
          { key: "Instagram", href: profile.links.instagram, icon: <InstagramIcon /> },
        ].map((s) => (
          <li key={s.key}>
            <a
              href={s.href}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={s.key}
              className="social-link"
              style={{
                color: "#64748b",
                display: "inline-flex",
                transition: "color 200ms, transform 200ms",
              }}
            >
              {s.icon}
            </a>
          </li>
        ))}
      </ul>

      <style jsx>{`
        .social-link:hover {
          color: #e2e8f0 !important;
          transform: translateY(-2px);
        }
      `}</style>
    </header>
  );
}
