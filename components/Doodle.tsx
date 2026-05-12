import type { SVGProps } from "react";

type DoodleProps = SVGProps<SVGSVGElement> & {
  variant: DoodleVariant;
  size?: number;
  tone?: "pink" | "mint" | "ink" | "soft";
};

export type DoodleVariant =
  | "flower"
  | "sprig"
  | "leaf"
  | "fish"
  | "cat"
  | "heart"
  | "sparkle"
  | "sun"
  | "cup"
  | "butterfly"
  | "swirl"
  | "moon";

const TONES = {
  pink: "var(--color-accent)",
  mint: "var(--color-mint)",
  ink: "var(--color-ink)",
  soft: "var(--color-ink-soft)",
};

export default function Doodle({
  variant,
  size = 56,
  tone = "pink",
  style,
  ...rest
}: DoodleProps) {
  const stroke = TONES[tone];
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      stroke={stroke}
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={style}
      {...rest}
    >
      {PATHS[variant]}
    </svg>
  );
}

const PATHS: Record<DoodleVariant, React.ReactNode> = {
  flower: (
    <>
      <path d="M32 14 C 24 14, 22 22, 26 26 C 22 30, 22 38, 30 38 C 30 46, 38 46, 38 38 C 46 38, 46 30, 42 26 C 46 22, 42 14, 36 14 C 34 18, 30 18, 32 14 Z" />
      <circle cx="34" cy="28" r="2.5" fill="currentColor" stroke="none" opacity="0.6" />
      <path d="M34 38 Q 34 50, 38 56" />
      <path d="M36 50 Q 42 48, 46 52" />
    </>
  ),
  sprig: (
    <>
      <path d="M32 56 C 32 38, 32 22, 32 10" />
      <path d="M32 20 Q 22 18, 18 24 Q 24 26, 32 26" />
      <path d="M32 30 Q 44 28, 48 36 Q 40 38, 32 36" />
      <path d="M32 40 Q 22 40, 20 48 Q 28 48, 32 46" />
    </>
  ),
  leaf: (
    <>
      <path d="M14 50 C 14 30, 30 14, 50 14 C 50 34, 34 50, 14 50 Z" />
      <path d="M18 46 Q 32 32, 46 18" />
      <path d="M24 40 Q 30 38, 34 34" />
      <path d="M32 32 Q 38 30, 42 26" />
    </>
  ),
  fish: (
    <>
      <path d="M14 32 C 18 22, 32 18, 40 24 C 46 30, 46 34, 40 40 C 32 46, 18 42, 14 32 Z" />
      <path d="M40 32 L 54 22 L 54 42 Z" />
      <circle cx="20" cy="30" r="1.5" fill="currentColor" stroke="none" />
      <path d="M26 36 Q 30 38, 34 36" />
    </>
  ),
  cat: (
    <>
      <path d="M16 38 L 12 22 L 22 30" />
      <path d="M48 38 L 52 22 L 42 30" />
      <path d="M16 38 C 14 50, 50 50, 48 38 C 48 28, 40 22, 32 22 C 24 22, 16 28, 16 38 Z" />
      <circle cx="24" cy="34" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="40" cy="34" r="1.5" fill="currentColor" stroke="none" />
      <path d="M30 40 Q 32 42, 34 40" />
      <path d="M28 46 Q 32 48, 36 46" />
    </>
  ),
  heart: (
    <>
      <path d="M32 50 C 18 42, 12 32, 18 22 C 24 16, 30 20, 32 26 C 34 20, 40 16, 46 22 C 52 32, 46 42, 32 50 Z" />
    </>
  ),
  sparkle: (
    <>
      <path d="M32 8 L 34 28 L 56 32 L 34 36 L 32 56 L 30 36 L 8 32 L 30 28 Z" />
    </>
  ),
  sun: (
    <>
      <circle cx="32" cy="32" r="10" />
      <path d="M32 10 L 32 16" />
      <path d="M32 48 L 32 54" />
      <path d="M10 32 L 16 32" />
      <path d="M48 32 L 54 32" />
      <path d="M16 16 L 20 20" />
      <path d="M44 44 L 48 48" />
      <path d="M48 16 L 44 20" />
      <path d="M20 44 L 16 48" />
    </>
  ),
  cup: (
    <>
      <path d="M16 24 L 16 44 C 16 50, 22 52, 30 52 C 38 52, 44 50, 44 44 L 44 24 Z" />
      <path d="M44 28 C 52 28, 52 40, 44 40" />
      <path d="M22 12 Q 24 16, 22 20" />
      <path d="M28 10 Q 30 14, 28 18" />
      <path d="M34 12 Q 36 16, 34 20" />
    </>
  ),
  butterfly: (
    <>
      <path d="M32 24 L 32 48" />
      <path d="M32 28 C 22 18, 12 22, 14 32 C 12 42, 22 46, 32 38" />
      <path d="M32 28 C 42 18, 52 22, 50 32 C 52 42, 42 46, 32 38" />
      <path d="M32 20 L 30 14" />
      <path d="M32 20 L 34 14" />
    </>
  ),
  swirl: (
    <>
      <path d="M40 32 C 40 24, 32 20, 26 24 C 20 28, 22 38, 30 40 C 40 42, 46 32, 44 22 C 42 12, 28 8, 18 16" />
    </>
  ),
  moon: (
    <>
      <path d="M44 14 C 26 14, 14 30, 22 46 C 30 56, 50 52, 52 34 C 38 38, 30 28, 44 14 Z" />
      <circle cx="36" cy="20" r="1" fill="currentColor" stroke="none" />
      <circle cx="50" cy="42" r="1" fill="currentColor" stroke="none" />
    </>
  ),
};
