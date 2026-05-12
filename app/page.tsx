import HeroIntro from "@/components/HeroIntro";
import SectionHeader from "@/components/SectionHeader";
import ProjectCard from "@/components/ProjectCard";
import ExperienceList, { type ExperienceItem } from "@/components/ExperienceList";
import StackParagraph from "@/components/StackParagraph";
import Marker from "@/components/Marker";
import Reveal from "@/components/Reveal";
import Link from "next/link";
import { getAllProjects } from "@/lib/content";

const EXPERIENCE: ExperienceItem[] = [
  {
    year: "Jul — Sep 2025",
    role: "AI Engineer Intern",
    org: "FPT Software",
    blurb:
      "Built a defect-detection system for automotive QA inspection, identifying multiple defect types and supporting 70% faster, more consistent inspections. Designed a real-time decision-support dashboard for QA stakeholders. Optimised inference pipelines to 45ms per frame for low-latency, edge-compatible deployment.",
  },
  {
    year: "Aug — Dec 2024",
    role: "AI Automation Engineer Intern",
    org: "CyberG7 Technologies",
    blurb:
      "Developed automated data workflows to streamline business operations and reduce manual processing. Integrated external APIs, LLM platforms, and automation tools for seamless cross-system data exchange. Evaluated and deployed tools for improved reliability, scalability, and operational efficiency.",
  },
];

const EDUCATION: ExperienceItem[] = [
  {
    year: "Sep 2022 — Present",
    role: "Bachelor of Science",
    org: "Singapore University of Technology and Design",
    blurb:
      "Design and Artificial Intelligence — an interdisciplinary track combining engineering, AI, and design thinking.",
  },
];

const STACK = [
  "Python",
  "PyTorch",
  "TensorFlow",
  "scikit-learn",
  "YOLOv8",
  "OpenCV",
  "RAG",
  "LLM",
  "FastAPI",
  "Flask",
  "Ruby on Rails",
  "React",
  "Next.js",
  "Tailwind CSS",
];

function Section({
  id,
  n,
  label,
  children,
}: {
  id?: string;
  n: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className="mx-auto grid max-w-[1240px] grid-cols-12 gap-6 px-[clamp(20px,4vw,64px)] py-24 sm:py-32"
    >
      <div className="col-span-12 order-2 sm:order-2 sm:col-start-10 sm:col-span-3 sm:row-start-1">
        <Reveal>
          <SectionHeader n={n} label={label} />
        </Reveal>
      </div>
      <div className="col-span-12 order-1 sm:order-1 sm:col-start-2 sm:col-span-7 sm:row-start-1">
        <Reveal delay={0.08}>{children}</Reveal>
      </div>
    </section>
  );
}

export default async function HomePage() {
  const allProjects = await getAllProjects();
  const projects = allProjects.slice(0, 3);
  return (
    <>
      <HeroIntro />

      <section
        id="work"
        className="mx-auto max-w-[1240px] px-[clamp(20px,4vw,64px)] py-24 sm:py-32"
      >
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 order-2 sm:order-2 sm:col-start-10 sm:col-span-3 sm:row-start-1">
            <Reveal>
              <SectionHeader n="01" label="Selected Work" />
            </Reveal>
          </div>
          <div className="col-span-12 order-1 sm:order-1 sm:col-start-2 sm:col-span-7 sm:row-start-1">
            <Reveal delay={0.08}>
              <p className="font-display text-[clamp(22px,2.2vw,30px)] leading-[1.4] text-ink">
                A handful of things I&apos;m proud of. Each one is a small
                argument for restraint as a design virtue.
              </p>
            </Reveal>
          </div>
        </div>

        <Reveal delay={0.16}>
          <div className="mt-20 space-y-24">
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
          <div className="mt-16">
            <Link
              href="/projects"
              className="text-[12px] uppercase tracking-[0.22em] text-accent transition-opacity hover:opacity-70"
            >
              see all work →
            </Link>
          </div>
        </Reveal>
      </section>

      <Section id="field" n="02" label="Experience">
        <Marker className="mb-6 block">Recent roles</Marker>
        <ExperienceList items={EXPERIENCE} />
      </Section>

      <Section id="education" n="03" label="Education">
        <Marker className="mb-6 block">Currently studying</Marker>
        <ExperienceList items={EDUCATION} />
      </Section>

      <Section id="stack" n="04" label="Stack">
        <StackParagraph items={STACK} />
        <p className="mt-8 max-w-[60ch] text-[15px] leading-[1.6] text-ink-soft">
          A working set. ML &amp; data on Python, full-stack on JS / Ruby, plus
          the libraries I reach for when the problem turns into a research
          one.
        </p>
      </Section>

      <Section id="correspondence" n="05" label="Correspondence">
        <p className="font-display text-[clamp(28px,3.4vw,48px)] italic leading-[1.2] text-ink">
          Want to make something together?
        </p>
        <p className="mt-6 max-w-[55ch] text-[15px] leading-[1.65] text-ink-soft">
          Always open to a chat. Best by email — internships, collaborations,
          or just hello.
        </p>
        <div className="mt-10 flex flex-wrap items-baseline gap-x-4 gap-y-2 text-[12px] uppercase tracking-[0.22em] text-ink-soft">
          <a
            href="mailto:wanweilee22@gmail.com"
            className="text-accent transition-opacity hover:opacity-70"
          >
            wanweilee22@gmail.com →
          </a>
          <span aria-hidden className="text-rule">·</span>
          <a
            href="https://github.com/wanweileee"
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-ink"
          >
            GitHub
          </a>
          <span aria-hidden className="text-rule">·</span>
          <a
            href="https://www.linkedin.com/in/leewanwei"
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-ink"
          >
            LinkedIn
          </a>
        </div>
      </Section>
    </>
  );
}
