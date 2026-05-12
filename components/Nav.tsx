"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "work", label: "work", href: "/#work" },
  { id: "projects", label: "all projects", href: "/projects" },
  { id: "writing", label: "writing", href: "/writing" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 80);
        raf = 0;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    const targets = SECTIONS
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!targets.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300",
        scrolled
          ? "border-b border-rule bg-paper/75 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      ].join(" ")}
    >
      <nav className="mx-auto flex h-16 max-w-[1240px] items-center justify-between px-[clamp(20px,4vw,64px)]">
        <Link
          href="/"
          className="group flex items-baseline gap-2 font-display text-[18px] font-normal tracking-tight text-ink transition-colors hover:text-accent"
          style={{ fontVariationSettings: '"opsz" 18, "SOFT" 50' }}
        >
          <span
            aria-hidden
            className="inline-block h-2 w-2 rounded-full bg-accent transition-transform duration-300 group-hover:scale-125"
          />
          Wan Wei
        </Link>
        <div className="flex items-center gap-5 text-[12px] uppercase tracking-[0.18em] text-ink-soft">
          {SECTIONS.map((s, i) => (
            <span key={s.id} className="flex items-center gap-5">
              <Link
                href={s.href}
                className="group relative flex items-center gap-1.5 transition-colors hover:text-ink"
              >
                <span
                  aria-hidden
                  className={[
                    "h-1 w-1 rounded-full transition-opacity",
                    active === s.id ? "bg-accent opacity-100" : "opacity-0",
                  ].join(" ")}
                />
                <span>{s.label}</span>
              </Link>
              {i < SECTIONS.length - 1 && <span aria-hidden className="text-rule">·</span>}
            </span>
          ))}
          <a
            href="mailto:wanweilee22@gmail.com"
            className="ml-3 text-accent transition-opacity hover:opacity-70"
          >
            → email
          </a>
        </div>
      </nav>
    </header>
  );
}
