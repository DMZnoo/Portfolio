import { AnimatedGrid } from "@/components/AnimatedGrid";
import { ExperienceCard } from "@/components/ExperienceCard";
import { ProfileHeader } from "@/components/ProfileHeader";
import { Reveal } from "@/components/Reveal";
import { CurrentlyWorking, SectionHeading } from "@/components/SectionPieces";
import { experiences, profile } from "@/data/portfolio";

export default function Home() {
  const density = "spacious";

  return (
    <>
      <AnimatedGrid />

      <div className="relative z-10 mx-auto min-h-screen max-w-screen-xl px-6 py-12 font-sans md:px-12 md:py-20 lg:px-24 lg:py-0">
        <div className="lg:flex lg:justify-between lg:gap-12">
          <div className="lg:w-1/2 lg:py-0">
            <ProfileHeader />
          </div>

          <main className="pt-24 lg:w-1/2 lg:py-24">
            <section id="about" className="mb-24 scroll-mt-16 lg:mb-28">
              <Reveal>
                <SectionHeading num="01" label="About" />
              </Reveal>
              <div
                style={{
                  color: "#94a3b8",
                  fontSize: 15,
                  lineHeight: 1.75,
                  maxWidth: 620,
                }}
              >
                {profile.bio.map((p, i) => (
                  <Reveal key={i} delay={i * 80}>
                    <p style={{ margin: "0 0 14px" }}>{p}</p>
                  </Reveal>
                ))}
              </div>
            </section>

            <section id="experience" className="mb-24 scroll-mt-16 lg:mb-28">
              <Reveal>
                <SectionHeading num="02" label="Experience & Projects" />
              </Reveal>
              <ol style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {experiences.map((exp, i) => (
                  <Reveal key={exp.id} delay={i * 50}>
                    <ExperienceCard
                      experience={exp}
                      defaultOpen={i === 0}
                      density={density}
                    />
                  </Reveal>
                ))}
              </ol>

              <div style={{ marginTop: 36 }}>
                <a
                  href={profile.links.resume}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="cv-link"
                  style={{
                    display: "inline-flex",
                    alignItems: "baseline",
                    color: "#e2e8f0",
                    fontSize: 15,
                    fontWeight: 600,
                    textDecoration: "none",
                    transition: "color 200ms",
                  }}
                >
                  View Full Résumé
                  <svg
                    viewBox="0 0 20 20"
                    width="13"
                    height="13"
                    fill="currentColor"
                    aria-hidden
                    style={{ marginLeft: 4, verticalAlign: -1 }}
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
                    />
                  </svg>
                </a>
              </div>
            </section>

            <section id="now" className="mb-32 scroll-mt-16">
              <Reveal>
                <SectionHeading num="03" label="Currently" />
              </Reveal>
              <Reveal>
                <CurrentlyWorking />
              </Reveal>
            </section>
          </main>
        </div>
      </div>
    </>
  );
}
