"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProjectCard, { type ProjectCardData } from "./ProjectCard";

type TabKey = "side" | "school";

export default function ProjectsTabs({
  side,
  school,
}: {
  side: ProjectCardData[];
  school: ProjectCardData[];
}) {
  const initial: TabKey = side.length > 0 ? "side" : "school";
  const [active, setActive] = useState<TabKey>(initial);
  const list = active === "side" ? side : school;

  const tabs: { key: TabKey; label: string; count: number }[] = [
    { key: "side", label: "Hackathons / Self", count: side.length },
    { key: "school", label: "School", count: school.length },
  ];

  return (
    <div>
      <div
        role="tablist"
        aria-label="Project categories"
        className="relative mb-12 flex gap-8 border-b border-rule"
      >
        {tabs.map((t) => {
          const isActive = active === t.key;
          return (
            <button
              key={t.key}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(t.key)}
              className={[
                "relative -mb-px pb-4 pt-2 text-[12px] uppercase tracking-[0.22em] transition-colors",
                isActive
                  ? "text-accent"
                  : "text-ink-soft hover:text-ink",
              ].join(" ")}
            >
              <span className="flex items-baseline gap-2">
                <span>{t.label}</span>
                <span
                  className={[
                    "text-[10px] tabular-nums transition-colors",
                    isActive ? "text-accent" : "text-rule",
                  ].join(" ")}
                >
                  ({t.count})
                </span>
              </span>
              {isActive && (
                <motion.span
                  layoutId="project-tab-underline"
                  className="absolute -bottom-px left-0 right-0 h-[2px] bg-accent"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          {list.length === 0 ? (
            <div className="rounded-2xl border border-rule bg-paper-tint/40 px-8 py-16 text-center">
              <p className="font-display text-[clamp(22px,2.2vw,30px)] italic text-ink-soft">
                {active === "side"
                  ? "No hackathon or side projects up here yet — coming soon."
                  : "No school projects to show."}
              </p>
              <p className="mt-3 text-[13px] text-ink-soft">
                {active === "side"
                  ? "Drop an .mdx file in content/projects/ with category: \"side\" in the frontmatter."
                  : ""}
              </p>
            </div>
          ) : (
            <div className="space-y-24">
              {list.map((p, i) => (
                <ProjectCard key={p.slug} project={p} index={i} />
              ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
