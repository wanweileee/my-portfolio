import Link from "next/link";

export type WritingTeaserData = {
  slug: string;
  title: string;
  summary: string;
  date: string;
};

export default function WritingTeaser({ post }: { post: WritingTeaserData }) {
  return (
    <Link
      href={`/writing/${post.slug}`}
      className="group -mx-4 grid grid-cols-12 gap-6 rounded-2xl border-b border-rule px-4 py-6 transition-all duration-300 hover:border-transparent hover:bg-paper-tint hover:shadow-[0_4px_24px_rgba(228,90,146,0.10)] sm:py-8"
    >
      <div className="col-span-3 sm:col-span-2">
        <span className="text-[12px] uppercase tracking-[0.2em] text-ink-soft tabular-nums">
          {post.date}
        </span>
      </div>
      <div className="col-span-9 sm:col-span-10">
        <h3
          className="font-display text-ink leading-[1.1] tracking-[-0.01em] transition-colors group-hover:text-accent"
          style={{
            fontSize: "clamp(22px, 2.6vw, 34px)",
            fontVariationSettings: '"opsz" 32, "wght" 380, "SOFT" 70',
          }}
        >
          {post.title}
        </h3>
        <p className="mt-3 max-w-[60ch] text-[15px] leading-[1.6] text-ink-soft">
          {post.summary}
        </p>
      </div>
    </Link>
  );
}
