import Link from "next/link";
import SectionHeader from "@/components/SectionHeader";
import WritingTeaser from "@/components/WritingTeaser";
import { getAllWriting, formatMonthYear } from "@/lib/content";

export const metadata = {
  title: "Writing · Wan Wei",
  description: "Field notes — essays and short pieces.",
};

export default async function WritingIndexPage() {
  const posts = await getAllWriting();

  return (
    <div className="pt-32">
      <section className="mx-auto grid max-w-[1240px] grid-cols-12 gap-6 px-[clamp(20px,4vw,64px)] py-16 sm:py-24">
        <div className="col-span-12 order-2 sm:order-2 sm:col-start-10 sm:col-span-3 sm:row-start-1">
          <SectionHeader n="—" label="Field Notes" />
        </div>
        <div className="col-span-12 order-1 sm:order-1 sm:col-start-2 sm:col-span-7 sm:row-start-1">
          <h1
            className="font-display text-ink leading-[1] tracking-[-0.02em]"
            style={{
              fontSize: "clamp(48px, 7vw, 96px)",
              fontVariationSettings: '"opsz" 96, "wght" 380, "SOFT" 80',
            }}
          >
            Writing
          </h1>
          <p className="mt-6 max-w-[60ch] text-[15px] leading-[1.65] text-ink-soft">
            Short essays, build logs, and notes on the work. Updated when
            there&apos;s something worth saying.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1240px] px-[clamp(20px,4vw,64px)] py-12">
        <div>
          {posts.length === 0 && (
            <p className="text-[15px] text-ink-soft italic font-display">
              Nothing yet. Drop an .mdx file in content/writing/ to begin.
            </p>
          )}
          {posts.map((p) => (
            <WritingTeaser
              key={p.frontmatter.slug}
              post={{
                slug: p.frontmatter.slug,
                title: p.frontmatter.title,
                summary: p.frontmatter.summary,
                date: formatMonthYear(p.frontmatter.date),
              }}
            />
          ))}
        </div>
        <div className="mt-16">
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
