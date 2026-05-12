import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Mdx from "@/components/Mdx";
import ProjectMeta from "@/components/ProjectMeta";
import ScrollProgress from "@/components/ScrollProgress";
import Marker from "@/components/Marker";
import { getAllProjects, getProjectBySlug } from "@/lib/content";

export async function generateStaticParams() {
  const projects = await getAllProjects();
  return projects.map((p) => ({ slug: p.frontmatter.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: "Not found · Wan Wei" };
  return {
    title: `${project.frontmatter.title} · Wan Wei`,
    description: project.frontmatter.summary,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project || project.frontmatter.draft) notFound();

  const { frontmatter, body } = project;
  const cover = frontmatter.cover ?? "/projects/_placeholder.svg";

  return (
    <>
      <ScrollProgress />
      <div className="pt-32">
        <header className="mx-auto grid max-w-[1240px] grid-cols-12 gap-6 px-[clamp(20px,4vw,64px)] py-12 sm:py-16">
          <div className="col-span-12 sm:col-start-2 sm:col-span-10">
            <Marker className="mb-6 block">
              Case study · {frontmatter.year}
            </Marker>
            <h1
              className="font-display text-ink leading-[0.95] tracking-[-0.03em]"
              style={{
                fontSize: "clamp(48px, 8vw, 120px)",
                fontVariationSettings: '"opsz" 120, "wght" 360, "SOFT" 80',
              }}
            >
              {frontmatter.title}
            </h1>
            <p
              className="mt-6 max-w-[50ch] font-display italic text-ink"
              style={{
                fontSize: "clamp(20px, 2.2vw, 28px)",
                fontVariationSettings: '"opsz" 28, "wght" 360, "SOFT" 100',
                lineHeight: 1.35,
              }}
            >
              {frontmatter.summary}
            </p>
          </div>
        </header>

        <div className="mx-auto max-w-[1240px] px-[clamp(20px,4vw,64px)]">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-rule bg-paper-tint shadow-[0_8px_28px_-8px_rgba(228,90,146,0.18)]">
            {frontmatter.slidesEmbed ? (
              <iframe
                src={
                  frontmatter.slidesEmbed.includes("?embed") ||
                  frontmatter.slidesEmbed.includes("&embed")
                    ? frontmatter.slidesEmbed
                    : frontmatter.slidesEmbed.includes("?")
                    ? `${frontmatter.slidesEmbed}&embed`
                    : `${frontmatter.slidesEmbed}?embed`
                }
                title={`${frontmatter.title} — slides`}
                allow="fullscreen"
                allowFullScreen
                loading="lazy"
                className="absolute inset-0 h-full w-full border-0"
              />
            ) : (
              <Image
                src={cover}
                alt={frontmatter.coverAlt ?? frontmatter.title}
                fill
                sizes="100vw"
                className="object-cover"
                priority
              />
            )}
          </div>
        </div>

        <section className="mx-auto grid max-w-[1240px] grid-cols-12 gap-6 px-[clamp(20px,4vw,64px)] py-16">
          <div className="col-span-12 sm:col-start-2 sm:col-span-10">
            <ProjectMeta fm={frontmatter} />
          </div>
        </section>

        <article className="mx-auto grid max-w-[1240px] grid-cols-12 gap-6 px-[clamp(20px,4vw,64px)] py-8">
          <div className="col-span-12 sm:col-start-2 sm:col-span-8">
            <Mdx source={body} />
          </div>
        </article>

        <div className="mx-auto max-w-[1240px] px-[clamp(20px,4vw,64px)] py-24">
          <Link
            href="/projects"
            className="text-[12px] uppercase tracking-[0.22em] text-accent transition-opacity hover:opacity-70"
          >
            ← all work
          </Link>
        </div>
      </div>
    </>
  );
}
