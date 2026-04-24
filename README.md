# Jinwoo Lee — Portfolio

Personal portfolio site built with Next.js 14 App Router, TypeScript, and Tailwind.

## What's new in this revision

- **Projects nested under experiences.** McCann NZ owns Fantasy Herd, Word of the Day, VW-Buzz, and McDonald's. Ion LST sits under Ion Protocol. vista.gl sits under Datacom/Mobility Labs. Each experience has a toggle pill that reveals a grid of project cards.
- **Animated background** — a canvas-backed grid with drifting dots and a cursor-follow glow (`components/AnimatedGrid.tsx`).
- **Scroll-reveal** on every card (`components/Reveal.tsx`), with a safety fallback so content never gets stuck invisible.
- **Project cards** with 3D hover tilt, radial light, corner accents, and a small deterministic "live preview" widget per project (`components/ProjectCard.tsx`).
- **Currently building** section with a pulsing cyan dot for the featured active project (`components/SectionPieces.tsx`).
- **Scroll-spy nav** in the left rail.

## Data

All content lives in `data/portfolio.ts`:

- `profile` — name, title, bio paragraphs, `nowWorking`, social + resume links
- `experiences: Experience[]` — each experience has a `projects: Project[]` array and an `accent` (`cyan` | `violet` | `emerald`)
- `Project` — `title`, `client`, `role`, `blurb`, `tech[]`, `year`, `highlight`

## Run

```bash
yarn
yarn dev
```

Then open http://localhost:3000.

## Structure

```
app/
  globals.css       reveal, ping, nav-link styles
  layout.tsx        fonts (Raleway + JetBrains Mono)
  page.tsx          two-column layout, section headings
components/
  AnimatedGrid.tsx     canvas grid + dots + cursor glow
  ExperienceCard.tsx   expandable experience with nested projects
  ProjectCard.tsx      hover tilt + live preview
  ProfileHeader.tsx    sticky left rail with nav + scroll-spy
  Reveal.tsx           intersection-observer reveal w/ fallback
  SectionPieces.tsx    CurrentlyWorking + SectionHeading
  TechPill.tsx         technology pill
data/
  portfolio.ts         content + types
public/
  profile.jpg, ion.png, resume.pdf
```

## Adding a project screenshot

Drop an image into `public/projects/<id>.jpg` and extend the `Project` type in `data/portfolio.ts` with an optional `image` field — then render it inside `ProjectCard.tsx` where the `LivePreview` widget currently sits.
