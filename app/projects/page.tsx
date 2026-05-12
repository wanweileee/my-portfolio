import Link from "next/link";
import SectionHeader from "@/components/SectionHeader";
import ProjectCard from "@/components/ProjectCard";
import { getAllProjects } from "@/lib/content";

export const metadata = {
  title: "Work · Wan Wei",
  description: "Selected work — case studies and writeups.",
};

export default async function ProjectsIndexPage() {
  const projects = await getAllProjects();

  return (
    <div className="pt-32">
      <section className="mx-auto grid max-w-[1240px] grid-cols-12 gap-6 px-[clamp(20px,4vw,64px)] py-16 sm:py-24">
        <div className="col-span-12 order-2 sm:order-2 sm:col-start-10 sm:col-span-3 sm:row-start-1">
          <SectionHeader n="—" label="The Index" />
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
            Every project, in order. Some live, some in archive. Each has a
            short case study attached.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1240px] px-[clamp(20px,4vw,64px)] py-12">
        <div className="space-y-20">
          {projects.length === 0 && (
            <p className="text-[15px] text-ink-soft italic font-display">
              No projects yet. Drop an .mdx file in content/projects/ to begin.
            </p>
          )}
          {projects.map((p, i) => (
            <ProjectCard
              key={p.frontmatter.slug}
              project={{
                slug: p.frontmatter.slug,
                title: p.frontmatter.title,
                summary: p.frontmatter.summary,
                role: p.frontmatter.role,
                year: p.frontmatter.year,
                cover: p.frontmatter.cover,
                coverAlt: p.frontmatter.coverAlt,
              }}
              index={i}
            />
          ))}
        </div>
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
