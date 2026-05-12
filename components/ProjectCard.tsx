import Image from "next/image";
import Link from "next/link";
import Marker from "./Marker";
import { asset } from "@/lib/asset";

export type ProjectCardData = {
  slug: string;
  title: string;
  summary: string;
  role: string;
  year: number;
  cover?: string;
  coverAlt?: string;
};

export default function ProjectCard({
  project,
  index,
}: {
  project: ProjectCardData;
  index: number;
}) {
  const flipped = index % 2 === 1;
  const cover = project.cover ?? "/projects/_placeholder.svg";

  return (
    <article className="group grid grid-cols-12 gap-8">
      <div
        className={[
          "col-span-12 sm:col-span-6",
          flipped ? "sm:col-start-7 sm:row-start-1" : "sm:col-start-1",
        ].join(" ")}
      >
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-rule bg-paper-tint transition-shadow duration-500 group-hover:shadow-[0_12px_40px_rgba(228,90,146,0.18)]">
          <Image
            src={asset(cover)}
            alt={project.coverAlt ?? project.title}
            fill
            sizes="(min-width: 640px) 48vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
          />
        </div>
      </div>
      <div
        className={[
          "col-span-12 flex flex-col justify-center sm:col-span-6",
          flipped ? "sm:col-start-1 sm:row-start-1" : "sm:col-start-7",
        ].join(" ")}
      >
        <Marker className="mb-3">
          {project.year} · {project.role}
        </Marker>
        <h3
          className="font-display text-ink leading-[1] tracking-[-0.02em] text-balance"
          style={{
            fontSize: "clamp(28px, 3.4vw, 48px)",
            fontVariationSettings: '"opsz" 48, "wght" 380, "SOFT" 70',
          }}
        >
          {project.title}
        </h3>
        <p className="mt-5 max-w-[44ch] text-[15px] leading-[1.65] text-ink-soft">
          {project.summary}
        </p>
        <Link
          href={`/projects/${project.slug}`}
          className="mt-6 inline-flex w-fit items-center gap-2 text-[12px] uppercase tracking-[0.22em] text-accent transition-opacity hover:opacity-70"
        >
          Read case study <span aria-hidden>→</span>
        </Link>
      </div>
    </article>
  );
}
