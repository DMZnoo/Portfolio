import { AnimatedGrid } from "@/components/AnimatedGrid";
import { ExperienceCard } from "@/components/ExperienceCard";
import { ProfileHeader } from "@/components/ProfileHeader";
import { Reveal } from "@/components/Reveal";
import { PersonalProjects, SectionHeading } from "@/components/SectionPieces";
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
            </section>

            <section id="now" className="mb-32 scroll-mt-16">
              <Reveal>
                <SectionHeading num="03" label="Personal Projects" />
              </Reveal>
              <Reveal>
                <PersonalProjects />
              </Reveal>
            </section>
          </main>
        </div>
      </div>
    </>
  );
}
