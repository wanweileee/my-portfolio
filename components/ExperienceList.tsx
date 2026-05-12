export type ExperienceItem = {
  year: string;
  role: string;
  org: string;
  blurb?: string;
};

export default function ExperienceList({ items }: { items: ExperienceItem[] }) {
  return (
    <ol className="border-t border-rule">
      {items.map((it, i) => (
        <li
          key={i}
          className="grid grid-cols-12 gap-6 border-b border-rule py-6 sm:py-8"
        >
          <div className="col-span-3 sm:col-span-2">
            <span className="text-[13px] uppercase tracking-[0.2em] text-ink-soft tabular-nums">
              {it.year}
            </span>
          </div>
          <div className="col-span-9 sm:col-span-10">
            <p
              className="font-display text-ink leading-[1.15] tracking-[-0.01em]"
              style={{
                fontSize: "clamp(22px, 2.4vw, 32px)",
                fontVariationSettings: '"opsz" 32, "wght" 380, "SOFT" 70',
              }}
            >
              {it.role}
              <span className="text-ink-soft"> — {it.org}</span>
            </p>
            {it.blurb && (
              <p className="mt-2 max-w-[60ch] text-[15px] leading-[1.6] text-ink-soft">
                {it.blurb}
              </p>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}
