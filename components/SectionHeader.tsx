export default function SectionHeader({
  n,
  label,
}: {
  n: string;
  label: string;
}) {
  return (
    <div className="flex flex-col items-start">
      <span
        aria-hidden
        className="font-display text-ink leading-[0.85] tracking-[-0.04em]"
        style={{
          fontSize: "clamp(80px, 12vw, 200px)",
          fontVariationSettings: '"opsz" 144, "wght" 300, "SOFT" 100',
        }}
      >
        {n}
      </span>
      <span className="mt-3 text-[11px] uppercase tracking-[0.22em] text-ink-soft">
        {label}
      </span>
    </div>
  );
}
