import Link from "next/link";
import SectionHeader from "@/components/SectionHeader";
import ProjectsTabs from "@/components/ProjectsTabs";
import { type ProjectCardData } from "@/components/ProjectCard";
import { getAllProjects } from "@/lib/content";

export const metadata = {
  title: "Work · Wan Wei",
  description: "Selected work: case studies and writeups.",
};

export default async function ProjectsIndexPage() {
  const all = await getAllProjects();
  const toCard = (p: (typeof all)[number]): ProjectCardData => ({
    slug: p.frontmatter.slug,
    title: p.frontmatter.title,
    summary: p.frontmatter.summary,
    role: p.frontmatter.role,
    year: p.frontmatter.year,
    cover: p.frontmatter.cover,
    coverAlt: p.frontmatter.coverAlt,
  });

  const side = all
    .filter((p) => p.frontmatter.category === "side")
    .map(toCard);
  const school = all
    .filter((p) => (p.frontmatter.category ?? "school") === "school")
    .map(toCard);

  return (
    <div className="pt-32">
      <section className="mx-auto grid max-w-[1240px] grid-cols-12 gap-6 px-[clamp(20px,4vw,64px)] py-16 sm:py-24">
        <div className="col-span-12 order-2 sm:order-2 sm:col-start-10 sm:col-span-3 sm:row-start-1">
          <SectionHeader n="·" label="The Index" />
        </div>
        <div className="col-span-12 order-1 sm:order-1 sm:col-start-2 sm:col-span-7 sm:row-start-1">
          <h1
            className="font-display text-ink leading-[1] tracking-[-0.02em]"
            style={{
              fontSize: "clamp(48px, 7vw, 96px)",
              fontVariationSettings: '"opsz" 96, "wght" 380, "SOFT" 80',
            }}
          >
            All Work
          </h1>
          <p className="mt-6 max-w-[60ch] text-[15px] leading-[1.65] text-ink-soft">
            Two stacks. Hackathons and side projects on top, school work
            underneath. Each card opens a short case study.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1240px] px-[clamp(20px,4vw,64px)] py-12">
        <ProjectsTabs side={side} school={school} />
        <div className="mt-20">
          <Link
            href="/"
            className="text-[12px] uppercase tracking-[0.22em] text-accent transition-opacity hover:opacity-70"
          >
            ← back to index
          </Link>
        </div>
      </section>
    </div>
  );
}
