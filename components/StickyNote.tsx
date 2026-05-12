type Tone = "pink" | "mint" | "cream" | "lilac";

const TONES: Record<Tone, { bg: string; border: string; tape: string }> = {
  pink: {
    bg: "#FFE3EC",
    border: "#FFB6CD",
    tape: "rgba(228,90,146,0.45)",
  },
  mint: {
    bg: "#DBF3E8",
    border: "#A6DCC4",
    tape: "rgba(136,217,188,0.55)",
  },
  cream: {
    bg: "#FFF6E2",
    border: "#F2DCA0",
    tape: "rgba(228,90,146,0.45)",
  },
  lilac: {
    bg: "#EADDF6",
    border: "#C6AEE2",
    tape: "rgba(198,174,226,0.6)",
  },
};

export default function StickyNote({
  children,
  rotate = -2,
  tone = "pink",
  tape = true,
  className = "",
}: {
  children: React.ReactNode;
  rotate?: number;
  tone?: Tone;
  tape?: boolean;
  className?: string;
}) {
  const t = TONES[tone];
  return (
    <div
      className={`relative inline-block rounded-[3px] px-5 py-6 shadow-[0_8px_24px_-6px_rgba(45,27,37,0.18)] transition-transform duration-300 hover:-translate-y-1 ${className}`}
      style={{
        transform: `rotate(${rotate}deg)`,
        background: t.bg,
        border: `1px solid ${t.border}`,
        minWidth: 140,
        maxWidth: 220,
      }}
    >
      {tape && (
        <span
          aria-hidden
          className="absolute left-1/2 -top-2 h-4 w-14 -translate-x-1/2 rounded-sm"
          style={{
            background: t.tape,
            border: `1px solid ${t.tape}`,
            transform: `translateX(-50%) rotate(${-rotate * 0.5}deg)`,
          }}
        />
      )}
      <p className="font-hand text-ink leading-[1.1]" style={{ fontSize: "clamp(18px, 1.8vw, 24px)" }}>
        {children}
      </p>
    </div>
  );
}
