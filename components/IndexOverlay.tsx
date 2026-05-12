"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const ROUTES = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "All work" },
  { href: "/projects/ai-planting-visualizer", label: "AI Planting Visualizer" },
  { href: "/projects/ai-text-training-simulator", label: "AI Text Training Simulator" },
  { href: "/projects/dbs-account-optimization", label: "DBS Account Optimization" },
  { href: "/projects/traffic-accident-hotspot", label: "Traffic Accident Hotspot" },
  { href: "/projects/savesmart-ocr", label: "SaveSmart OCR" },
  { href: "/projects/sentiment-analysis", label: "Sentiment Analysis" },
  { href: "/writing", label: "Writing" },
  { href: "/now", label: "Now" },
];

export default function IndexOverlay() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement | null)?.tagName ?? "";
      if (["INPUT", "TEXTAREA", "SELECT"].includes(tag)) return;
      if ((e.target as HTMLElement | null)?.isContentEditable) return;
      if (e.key === "?" && !e.metaKey && !e.ctrlKey && !e.altKey) {
        e.preventDefault();
        setOpen((v) => !v);
      } else if (e.key === "Escape" && open) {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  if (!open) {
    return (
      <button
        type="button"
        aria-label="Open index"
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-[70] hidden h-9 w-9 items-center justify-center rounded-full border border-rule bg-paper text-[12px] text-ink-soft transition-colors hover:border-accent hover:text-accent sm:flex"
      >
        ?
      </button>
    );
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Site index"
      className="fixed inset-0 z-[80] flex flex-col bg-paper"
    >
      <div className="mx-auto flex w-full max-w-[1240px] flex-1 flex-col px-[clamp(20px,4vw,64px)] py-16">
        <div className="flex items-baseline justify-between">
          <span className="text-[11px] uppercase tracking-[0.22em] text-ink-soft">
            Index · press ? or esc to close
          </span>
          <button
            type="button"
            aria-label="Close index"
            onClick={() => setOpen(false)}
            className="text-[12px] uppercase tracking-[0.22em] text-accent transition-opacity hover:opacity-70"
          >
            close ✕
          </button>
        </div>
        <h2
          className="font-display mt-10 text-ink leading-[1] tracking-[-0.02em]"
          style={{
            fontSize: "clamp(56px, 9vw, 140px)",
            fontVariationSettings: '"opsz" 140, "wght" 380, "SOFT" 80',
          }}
        >
          Index
        </h2>
        <ol className="mt-16 grid w-full grid-cols-1 gap-y-1 border-t border-rule">
          {ROUTES.map((r, i) => (
            <li key={r.href} className="border-b border-rule">
              <Link
                href={r.href}
                onClick={() => setOpen(false)}
                className="grid grid-cols-12 items-baseline gap-4 py-4 transition-colors hover:text-accent"
              >
                <span className="col-span-2 text-[11px] uppercase tracking-[0.22em] text-ink-soft tabular-nums sm:col-span-1">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="col-span-7 text-[15px] text-ink sm:col-span-7">
                  {r.label}
                </span>
                <span className="col-span-3 text-[12px] uppercase tracking-[0.22em] text-ink-soft sm:col-span-4">
                  {r.href}
                </span>
              </Link>
            </li>
          ))}
        </ol>
        <p className="mt-auto pt-12 font-display italic text-ink-soft text-[14px]">
          A small map of the whole place. Hidden in plain sight.
        </p>
      </div>
    </div>
  );
}
