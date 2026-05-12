import Link from "next/link";

export default function NotFound() {
  return (
    <div className="pt-32">
      <section className="mx-auto grid max-w-[1240px] grid-cols-12 gap-6 px-[clamp(20px,4vw,64px)] py-32">
        <div className="col-span-12 sm:col-start-2 sm:col-span-10">
          <p className="mb-6 text-[11px] uppercase tracking-[0.22em] text-ink-soft">
            404 · No such note
          </p>
          <h1
            className="font-display text-ink leading-[0.95] tracking-[-0.02em]"
            style={{
              fontSize: "clamp(48px, 7vw, 96px)",
              fontVariationSettings: '"opsz" 96, "wght" 360, "SOFT" 80',
            }}
          >
            This note hasn&apos;t been written yet.
          </h1>
          <p className="mt-6 max-w-[55ch] text-[15px] leading-[1.65] text-ink-soft">
            Either it&apos;s lost in the drafts pile, or it never was.
          </p>
          <Link
            href="/writing"
            className="mt-10 inline-flex w-fit text-[12px] uppercase tracking-[0.22em] text-accent transition-opacity hover:opacity-70"
          >
            ← back to field notes
          </Link>
        </div>
      </section>
    </div>
  );
}
