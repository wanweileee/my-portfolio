"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import { asset } from "@/lib/asset";
import styles from "./StickerHero.module.css";

/* ------------------------------------------------------------------
   Editable content — tweak copy / links / images here.
------------------------------------------------------------------ */
const CONTENT = {
  hello: "Hi, I'm Wan Wei",
  email: "wanweilee22@gmail.com",
  workHref: "/projects",
  stickers: [
    { id: "flower",    size: 92, left: "64%", top: "7%",  rot: -6, d: ".40s", tone: "" },
    { id: "sparkle",   size: 52, left: "55%", top: "26%", rot: 8,  d: ".46s", tone: "" },
    { id: "butterfly", size: 80, left: "84%", top: "34%", rot: -4, d: ".52s", tone: "mint" },
    { id: "cat",       size: 72, left: "62%", top: "48%", rot: -3, d: ".58s", tone: "ink" },
  ],
  polaroids: [
    { src: "/projects/bob.jpg",   alt: "BOB the Pod: collapsible smart workspace", cap: "BOB · the pod",        left: "55%", bottom: "6%",  rot: -5, d: ".30s", tape: "",     tapeRot: -5 },
    { src: "/projects/plant.png", alt: "AI Planting Visualizer",                    cap: "planting visualizer", left: "71%", bottom: "13%", rot: 5,  d: ".36s", tape: "mint", tapeRot: 5 },
    { src: "/projects/dbs1.jpg",  alt: "Team at Google Developer Space",            cap: "team @ Google ♡",     left: "80%", bottom: "2%",  rot: -3, d: ".42s", tape: "",     tapeRot: 3 },
  ],
  beliefs: [
    { tone: "pink",  text: "Start before you're ready. Doing is the fastest teacher.", left: "0%",  bottom: "6%", rot: -4, d: ".16s" },
    { tone: "mint",  text: "Be bold. Hesitation costs more than mistakes.",            left: "15%", bottom: "1%", rot: 3,  d: ".22s" },
    { tone: "cream", text: "There's always a way. Go find it.",                         left: "30%", bottom: "9%", rot: -1, d: ".28s" },
  ],
};

/* custom-property style helper */
const rv = (rot: number, d?: string, extra: CSSProperties = {}): CSSProperties =>
  ({ ["--rot" as string]: `${rot}deg`, ...(d ? { ["--d" as string]: d } : {}), ...extra } as CSSProperties);

export default function StickerHero() {
  const rootRef = useRef<HTMLElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const sparkRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [cursorOn, setCursorOn] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cleanups: Array<() => void> = [];

    // entrance
    const raf0 = requestAnimationFrame(() => setReady(true));

    // ---- sparkle cursor + trail ----
    if (fine) {
      setCursorOn(true);
      const cursor = cursorRef.current;
      const layer = sparkRef.current;
      let raf = 0, mx = 0, my = 0, lastSpark = 0;

      const spawn = (x: number, y: number) => {
        if (!layer) return;
        const s = document.createElement("div");
        s.className = styles.spark;
        s.style.left = `${x}px`;
        s.style.top = `${y}px`;
        s.innerHTML =
          '<svg viewBox="0 0 64 64" width="12" height="12" fill="currentColor"><path d="M32 8 L35 29 L56 32 L35 35 L32 56 L29 35 L8 32 L29 29 Z"/></svg>';
        layer.appendChild(s);
        setTimeout(() => s.remove(), 700);
      };

      const onMove = (e: PointerEvent) => {
        mx = e.clientX; my = e.clientY;
        if (cursor && !raf) {
          raf = requestAnimationFrame(() => {
            cursor.style.transform = `translate(${mx}px, ${my}px)`;
            raf = 0;
          });
        }
        if (!reduce) {
          const now = performance.now();
          if (now - lastSpark > 60) {
            lastSpark = now;
            spawn(mx + (Math.random() * 18 - 9), my + (Math.random() * 18 - 9));
          }
        }
      };
      const onEnter = () => { if (cursor) cursor.style.opacity = "1"; };
      const onLeave = () => { if (cursor) cursor.style.opacity = "0"; };

      root.addEventListener("pointermove", onMove);
      root.addEventListener("pointerenter", onEnter);
      root.addEventListener("pointerleave", onLeave);
      cleanups.push(() => {
        root.removeEventListener("pointermove", onMove);
        root.removeEventListener("pointerenter", onEnter);
        root.removeEventListener("pointerleave", onLeave);
        if (raf) cancelAnimationFrame(raf);
      });
    }

    // ---- draggable stickers ----
    const stage = root.querySelector<HTMLElement>(`.${styles.stage}`);
    let zTop = 60;
    root.querySelectorAll<HTMLElement>(`.${styles.drag}`).forEach((el) => {
      let startX = 0, startY = 0, baseL = 0, baseT = 0, dragging = false;

      const onDown = (e: PointerEvent) => {
        if (!stage) return;
        dragging = true;
        el.classList.add(styles.grabbing);
        el.setPointerCapture(e.pointerId);
        const r = stage.getBoundingClientRect();
        const er = el.getBoundingClientRect();
        baseL = er.left - r.left;
        baseT = er.top - r.top;
        el.style.left = `${baseL}px`;
        el.style.top = `${baseT}px`;
        el.style.right = "auto";
        startX = e.clientX; startY = e.clientY;
        el.style.zIndex = String(++zTop);
        e.preventDefault();
      };
      const onMove = (e: PointerEvent) => {
        if (!dragging || !stage) return;
        const r = stage.getBoundingClientRect();
        let nl = baseL + (e.clientX - startX);
        let nt = baseT + (e.clientY - startY);
        nl = Math.max(-30, Math.min(nl, r.width - 50));
        nt = Math.max(-30, Math.min(nt, r.height - 50));
        el.style.left = `${nl}px`;
        el.style.top = `${nt}px`;
      };
      const stop = (e: PointerEvent) => {
        if (!dragging) return;
        dragging = false;
        el.classList.remove(styles.grabbing);
        try { el.releasePointerCapture(e.pointerId); } catch { /* noop */ }
      };

      el.addEventListener("pointerdown", onDown);
      el.addEventListener("pointermove", onMove);
      el.addEventListener("pointerup", stop);
      el.addEventListener("pointercancel", stop);
      cleanups.push(() => {
        el.removeEventListener("pointerdown", onDown);
        el.removeEventListener("pointermove", onMove);
        el.removeEventListener("pointerup", stop);
        el.removeEventListener("pointercancel", stop);
      });
    });

    return () => {
      cancelAnimationFrame(raf0);
      cleanups.forEach((fn) => fn());
    };
  }, []);

  const toneCut = (t: string) => (t === "mint" ? styles.cutMint : t === "ink" ? styles.cutInk : "");
  const toneDoodle = (t: string) => (t === "mint" ? styles.doodleMint : t === "ink" ? styles.doodleInk : "");

  return (
    <section
      ref={rootRef}
      className={`${styles.root} ${ready ? styles.ready : ""} ${cursorOn ? styles.cursorOn : ""}`}
      aria-label="Intro"
    >
      <DoodleSprite />
      <div className={styles.bgGrid} aria-hidden="true" />

      <div className={styles.stage}>
        {/* headline */}
        <div className={`${styles.lede} ${styles.pop}`} style={rv(0, ".02s")}>
          <p className={styles.hello}>{CONTENT.hello}</p>
          <h1 className={styles.headline}>
            Building careful systems where <em>vision</em>, <em>language</em> &amp; <em>software</em> meet.
          </h1>
          <p className={styles.subline}>
            Open to roles: AI&nbsp;Engineer · Tech&nbsp;Consultant · Product&nbsp;Manager. Based in Singapore, GMT&nbsp;+8.
          </p>
          <div className={styles.cta}>
            <a className={`${styles.btn} ${styles.btnPrimary}`} href={`mailto:${CONTENT.email}`}>Say hello →</a>
            <a className={`${styles.btn} ${styles.btnGhost}`} href={CONTENT.workHref}>See selected work</a>
          </div>
          <p className={styles.ledeHint}>psst, the stickers are draggable ✦</p>
        </div>

        {/* available stamp */}
        <div className={`${styles.stamp} ${styles.pop}`} style={rv(9, ".34s", { right: "2%", top: "1%" })}>
          ★ available<br /><b>2026</b><br />say hi ✿
        </div>

        {/* draggable stickers */}
        {CONTENT.stickers.map((s) => (
          <div
            key={s.id}
            className={`${styles.drag} ${styles.pop}`}
            style={rv(s.rot, s.d, { left: s.left, top: s.top })}
          >
            <div className={`${styles.cut} ${toneCut(s.tone)}`}>
              <svg className={`${styles.doodle} ${toneDoodle(s.tone)}`} width={s.size} height={s.size} aria-hidden="true">
                <use href={`#sh-d-${s.id}`} />
              </svg>
            </div>
          </div>
        ))}

        {/* project polaroids */}
        <div className={styles.reel}>
          {CONTENT.polaroids.map((p) => (
            <div
              key={p.src}
              className={`${styles.polaroid} ${styles.pop}`}
              style={rv(p.rot, p.d, { left: p.left, bottom: p.bottom })}
            >
              <span
                className={`${styles.tape} ${p.tape === "mint" ? styles.tapeMint : ""}`}
                style={{ left: "50%", top: "-13px", transform: `translateX(-50%) rotate(${p.tapeRot}deg)` }}
              />
              <div className={styles.shot}>
                <Image src={asset(p.src)} alt={p.alt} fill sizes="220px" />
              </div>
              <div className={styles.cap}>{p.cap}</div>
            </div>
          ))}
        </div>

        {/* belief sticky notes */}
        <div className={styles.beliefs}>
          {CONTENT.beliefs.map((b, i) => (
            <div
              key={i}
              className={`${styles.sticky} ${styles[b.tone as "pink" | "mint" | "cream"]} ${styles.pop}`}
              style={rv(b.rot, b.d, { left: b.left, bottom: b.bottom })}
            >
              <span className={styles.pinTape} />
              <p>{b.text}</p>
            </div>
          ))}
        </div>

        <div className={`${styles.scrollCue} ${styles.pop}`} style={rv(0, ".7s")}>
          scroll<span className={styles.arr} aria-hidden="true">↓</span>
        </div>
      </div>

      {/* custom cursor + spark layer */}
      <div ref={cursorRef} className={styles.cursor} aria-hidden="true">
        <svg width="34" height="34" viewBox="0 0 64 64" fill="none" strokeLinejoin="round" strokeLinecap="round">
          <path d="M32 6 L36 28 L58 32 L36 36 L32 58 L28 36 L6 32 L28 28 Z" />
        </svg>
      </div>
      <div ref={sparkRef} aria-hidden="true" />
    </section>
  );
}

/* ------------------------------------------------------------------
   Doodle sprite — paths lifted from the site's own Doodle.tsx.
------------------------------------------------------------------ */
function DoodleSprite() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
      <symbol id="sh-d-flower" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M32 14 C 24 14, 22 22, 26 26 C 22 30, 22 38, 30 38 C 30 46, 38 46, 38 38 C 46 38, 46 30, 42 26 C 46 22, 42 14, 36 14 C 34 18, 30 18, 32 14 Z" />
        <circle cx="34" cy="28" r="2.5" fill="currentColor" stroke="none" opacity="0.6" />
        <path d="M34 38 Q 34 50, 38 56" /><path d="M36 50 Q 42 48, 46 52" />
      </symbol>
      <symbol id="sh-d-sparkle" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M32 8 L 34 28 L 56 32 L 34 36 L 32 56 L 30 36 L 8 32 L 30 28 Z" />
      </symbol>
      <symbol id="sh-d-butterfly" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M32 24 L 32 48" /><path d="M32 28 C 22 18, 12 22, 14 32 C 12 42, 22 46, 32 38" />
        <path d="M32 28 C 42 18, 52 22, 50 32 C 52 42, 42 46, 32 38" /><path d="M32 20 L 30 14" /><path d="M32 20 L 34 14" />
      </symbol>
      <symbol id="sh-d-cat" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 38 L 12 22 L 22 30" /><path d="M48 38 L 52 22 L 42 30" />
        <path d="M16 38 C 14 50, 50 50, 48 38 C 48 28, 40 22, 32 22 C 24 22, 16 28, 16 38 Z" />
        <circle cx="24" cy="34" r="1.5" fill="currentColor" stroke="none" /><circle cx="40" cy="34" r="1.5" fill="currentColor" stroke="none" />
        <path d="M30 40 Q 32 42, 34 40" /><path d="M28 46 Q 32 48, 36 46" />
      </symbol>
    </svg>
  );
}
