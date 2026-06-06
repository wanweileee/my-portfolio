"use client";

import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { IconType } from "react-icons";
import { FaPython, FaReact } from "react-icons/fa";
import {
  SiPytorch,
  SiTensorflow,
  SiScikitlearn,
  SiOpencv,
  SiFastapi,
  SiFlask,
  SiRubyonrails,
  SiNextdotjs,
  SiTailwindcss,
} from "react-icons/si";
import { LuBrain, LuDatabase, LuScanEye } from "react-icons/lu";

type StackItem = {
  name: string;
  Icon: IconType;
  color: string;
  x: string;
  y: string;
  rot: number;
  delay: number;
};

const STACK: StackItem[] = [
  // top row
  { name: "Python",       Icon: FaPython,        color: "#3776AB", x: "2%",  y: "6%",  rot: -6, delay: 0.04 },
  { name: "PyTorch",      Icon: SiPytorch,       color: "#EE4C2C", x: "20%", y: "2%",  rot: 4,  delay: 0.10 },
  { name: "TensorFlow",   Icon: SiTensorflow,    color: "#FF6F00", x: "39%", y: "9%",  rot: -3, delay: 0.16 },
  { name: "scikit-learn", Icon: SiScikitlearn,   color: "#F7931E", x: "60%", y: "3%",  rot: 5,  delay: 0.22 },
  { name: "YOLOv8",       Icon: LuScanEye,       color: "#22C55E", x: "80%", y: "10%", rot: -4, delay: 0.28 },
  // middle row
  { name: "OpenCV",       Icon: SiOpencv,        color: "#5C3EE8", x: "6%",  y: "38%", rot: 7,  delay: 0.34 },
  { name: "RAG",          Icon: LuDatabase,      color: "#E45A92", x: "26%", y: "35%", rot: -2, delay: 0.40 },
  { name: "LLM",          Icon: LuBrain,         color: "#6FB89B", x: "46%", y: "40%", rot: 5,  delay: 0.46 },
  { name: "FastAPI",      Icon: SiFastapi,       color: "#009688", x: "66%", y: "36%", rot: -5, delay: 0.52 },
  { name: "Flask",        Icon: SiFlask,         color: "#1A1814", x: "84%", y: "40%", rot: 4,  delay: 0.58 },
  // bottom row
  { name: "Ruby on Rails", Icon: SiRubyonrails,  color: "#CC0000", x: "4%",  y: "70%", rot: -3, delay: 0.64 },
  { name: "React",         Icon: FaReact,        color: "#5BC9E0", x: "26%", y: "74%", rot: 6,  delay: 0.70 },
  { name: "Next.js",       Icon: SiNextdotjs,    color: "#1A1814", x: "50%", y: "70%", rot: -4, delay: 0.76 },
  { name: "Tailwind CSS",  Icon: SiTailwindcss,  color: "#06B6D4", x: "72%", y: "74%", rot: 3,  delay: 0.82 },
];

export default function StackDraggable() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  return (
    <div className="relative">
      <div
        ref={containerRef}
        className="relative h-[440px] w-full overflow-hidden rounded-2xl border border-rule bg-paper-tint/40 sm:h-[480px]"
        aria-label="Tech stack, draggable stickers"
      >
        {/* faint grid wash, matches StickerHero */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(transparent 31px, rgba(228,90,146,0.10) 31px, rgba(228,90,146,0.10) 32px), linear-gradient(90deg, transparent 31px, rgba(228,90,146,0.06) 31px, rgba(228,90,146,0.06) 32px)",
            backgroundSize: "32px 32px",
            WebkitMaskImage:
              "radial-gradient(110% 100% at 50% 40%, #000 55%, transparent 100%)",
            maskImage:
              "radial-gradient(110% 100% at 50% 40%, #000 55%, transparent 100%)",
          }}
        />

        {STACK.map((s) => (
          <motion.div
            key={s.name}
            drag
            dragConstraints={containerRef}
            dragElastic={0.18}
            dragMomentum={false}
            whileHover={reduce ? undefined : { scale: 1.08, rotate: 0, zIndex: 20 }}
            whileTap={reduce ? undefined : { scale: 1.05 }}
            whileDrag={{ scale: 1.12, rotate: 0, zIndex: 50 }}
            initial={reduce ? false : { opacity: 0, y: 18, rotate: s.rot, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, rotate: s.rot, scale: 1 }}
            transition={{
              duration: 0.55,
              delay: reduce ? 0 : s.delay,
              ease: [0.2, 0.7, 0.2, 1],
            }}
            style={{ left: s.x, top: s.y, touchAction: "none" }}
            className="absolute flex cursor-grab select-none flex-col items-center gap-2 rounded-2xl border border-rule bg-white px-4 py-3 shadow-[0_8px_22px_-10px_rgba(228,90,146,0.4),inset_0_0_0_3px_rgba(255,255,255,0.9)] transition-shadow duration-300 hover:shadow-[0_18px_30px_-12px_rgba(228,90,146,0.55),inset_0_0_0_3px_rgba(255,255,255,0.9)] active:cursor-grabbing"
          >
            <s.Icon size={28} color={s.color} />
            <span className="font-hand whitespace-nowrap text-[18px] leading-none text-ink">
              {s.name}
            </span>
          </motion.div>
        ))}
      </div>

      <p className="mt-3 font-hand text-[16px] text-ink-soft">
        psst, the stickers are draggable ✦
      </p>
    </div>
  );
}
