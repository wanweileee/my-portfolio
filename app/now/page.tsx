import Link from "next/link";
import SectionHeader from "@/components/SectionHeader";
import NowList from "@/components/NowList";
import Mdx from "@/components/Mdx";
import Marker from "@/components/Marker";
import { getNow } from "@/lib/content";

export const metadata = {
  title: "Now · Wan Wei",
  description: "What I'm working on and want to work on",
};

export default async function NowPage() {
  const data = await getNow();

  return (
    <div className="pt-32">
      <section className="mx-auto grid max-w-[1240px] grid-cols-12 gap-6 px-[clamp(20px,4vw,64px)] py-16 sm:py-24">
        <div className="col-span-12 order-2 sm:order-2 sm:col-start-10 sm:col-span-3 sm:row-start-1">
          <SectionHeader n="—" label="Now" />
        </div>
        <div className="col-span-12 order-1 sm:order-1 sm:col-start-2 sm:col-span-7 sm:row-start-1">
          <Marker className="mb-6 block">
            {data?.updated ? `Last touched ${data.updated}` : "Not yet written"}
          </Marker>
          <h1
            className="font-display text-ink leading-[1] tracking-[-0.02em]"
            style={{
              fontSize: "clamp(48px, 7vw, 96px)",
              fontVariationSettings: '"opsz" 96, "wght" 380, "SOFT" 80',
            }}
          >
            Now
          </h1>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1240px] grid-cols-12 gap-6 px-[clamp(20px,4vw,64px)] py-12">
        <div className="col-span-12 sm:col-start-2 sm:col-span-10">
          {data ? (
            <NowList data={data} />
          ) : (
            <p className="text-[15px] text-ink-soft italic font-display">
              No now.mdx yet. Drop one in content/ to begin.
            </p>
          )}
          {data?.body && (
            <div className="mt-16">
              <Mdx source={data.body} />
            </div>
          )}
        </div>
      </section>

      <div className="mx-auto max-w-[1240px] px-[clamp(20px,4vw,64px)] py-24">
        <Link
          href="/"
          className="text-[12px] uppercase tracking-[0.22em] text-accent transition-opacity hover:opacity-70"
        >
          ← back to index
        </Link>
      </div>
    </div>
  );
}
