import { notFound } from "next/navigation";
import Link from "next/link";
import Mdx from "@/components/Mdx";
import ScrollProgress from "@/components/ScrollProgress";
import Marker from "@/components/Marker";
import { getAllWriting, getWritingBySlug, formatMonthYear } from "@/lib/content";

export async function generateStaticParams() {
  const posts = await getAllWriting();
  return posts.map((p) => ({ slug: p.frontmatter.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getWritingBySlug(slug);
  if (!post) return { title: "Not found · Wan Wei" };
  return {
    title: `${post.frontmatter.title} · Wan Wei`,
    description: post.frontmatter.summary,
  };
}

export default async function WritingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getWritingBySlug(slug);
  if (!post || post.frontmatter.draft) notFound();

  const { frontmatter, body } = post;

  return (
    <>
      <ScrollProgress />
      <div className="pt-32">
        <header className="mx-auto grid max-w-[1240px] grid-cols-12 gap-6 px-[clamp(20px,4vw,64px)] py-12 sm:py-16">
          <div className="col-span-12 sm:col-start-2 sm:col-span-9">
            <Marker className="mb-6 block">
              Field note · {formatMonthYear(frontmatter.date)}
            </Marker>
            <h1
              className="font-display text-ink leading-[1] tracking-[-0.02em]"
              style={{
                fontSize: "clamp(40px, 6.5vw, 88px)",
                fontVariationSettings: '"opsz" 88, "wght" 360, "SOFT" 80',
              }}
            >
              {frontmatter.title}
            </h1>
            <p
              className="mt-6 max-w-[55ch] font-display italic text-ink-soft"
              style={{
                fontSize: "clamp(18px, 2vw, 24px)",
                fontVariationSettings: '"opsz" 24, "wght" 360, "SOFT" 100',
                lineHeight: 1.4,
              }}
            >
              {frontmatter.summary}
            </p>
          </div>
        </header>

        <article className="mx-auto grid max-w-[1240px] grid-cols-12 gap-6 px-[clamp(20px,4vw,64px)] py-8">
          <div className="col-span-12 sm:col-start-2 sm:col-span-8">
            <Mdx source={body} />
          </div>
        </article>

        <div className="mx-auto max-w-[1240px] px-[clamp(20px,4vw,64px)] py-24">
          <Link
            href="/writing"
            className="text-[12px] uppercase tracking-[0.22em] text-accent transition-opacity hover:opacity-70"
          >
            ← all field notes
          </Link>
        </div>
      </div>
    </>
  );
}
