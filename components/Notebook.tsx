import Doodle from "./Doodle";
import StickyNote from "./StickyNote";

export default function Notebook() {
  return (
    <section className="relative isolate w-full overflow-hidden bg-paper-tint pb-24 pt-32 sm:pt-40">
      {/* outer doodles, scattered around the notebook */}
      <Doodle
        variant="flower"
        size={72}
        tone="pink"
        className="absolute left-[6%] top-[18%] hidden -rotate-12 opacity-90 md:block"
      />
      <Doodle
        variant="sprig"
        size={92}
        tone="mint"
        className="absolute right-[8%] top-[22%] hidden rotate-12 md:block"
      />
      <Doodle
        variant="butterfly"
        size={56}
        tone="pink"
        className="absolute left-[10%] top-[58%] hidden md:block"
      />
      <Doodle
        variant="cat"
        size={64}
        tone="ink"
        className="absolute right-[12%] bottom-[14%] hidden md:block"
      />
      <Doodle
        variant="sparkle"
        size={36}
        tone="pink"
        className="absolute right-[18%] top-[12%] hidden sm:block"
      />
      <Doodle
        variant="sparkle"
        size={28}
        tone="mint"
        className="absolute left-[20%] bottom-[10%] hidden sm:block"
      />
      <Doodle
        variant="leaf"
        size={64}
        tone="mint"
        className="absolute left-[3%] bottom-[28%] hidden -rotate-12 md:block"
      />
      <Doodle
        variant="moon"
        size={48}
        tone="ink"
        className="absolute right-[4%] top-[50%] hidden rotate-12 opacity-70 md:block"
      />
      <Doodle
        variant="heart"
        size={32}
        tone="pink"
        className="absolute left-[15%] top-[40%] hidden sm:block"
      />
      <Doodle
        variant="cup"
        size={48}
        tone="ink"
        className="absolute right-[20%] bottom-[24%] hidden md:block opacity-80"
      />
      <Doodle
        variant="swirl"
        size={64}
        tone="pink"
        className="absolute left-[28%] top-[8%] hidden lg:block opacity-60"
      />
      <Doodle
        variant="fish"
        size={56}
        tone="mint"
        className="absolute right-[28%] bottom-[6%] hidden lg:block opacity-80"
      />

      {/* notebook frame */}
      <div className="relative mx-auto w-[min(94vw,920px)]">
        {/* cover (back layer) — pink hardcover edge */}
        <div
          aria-hidden
          className="absolute inset-0 translate-x-2 translate-y-2 rounded-[10px] bg-accent"
          style={{ zIndex: 0 }}
        />
        {/* page (front layer) */}
        <div
          className="notebook-shadow paper-dots relative z-10 rounded-[10px] border border-accent bg-white px-8 py-12 sm:px-14 sm:py-16"
          style={{ background: "#fffdfd" }}
        >
          {/* binding stitch indicator on the left */}
          <div
            aria-hidden
            className="absolute left-3 top-6 bottom-6 w-px"
            style={{
              backgroundImage:
                "repeating-linear-gradient(to bottom, var(--color-accent) 0 6px, transparent 6px 14px)",
            }}
          />

          {/* corner doodle inside notebook */}
          <Doodle
            variant="sun"
            size={48}
            tone="pink"
            className="absolute right-6 top-6 opacity-80"
          />

          {/* TOP: name, role, location */}
          <p className="font-hand text-accent" style={{ fontSize: "clamp(28px, 4.4vw, 56px)", lineHeight: 1 }}>
            Lee Wan Wei
          </p>
          <p
            className="mt-1 font-hand text-ink-soft"
            style={{ fontSize: "clamp(16px, 1.8vw, 22px)" }}
          >
            Open to roles : AI Engineer / Tech Consultant / Product Manager
          </p>

          {/* MIDDLE: main tagline */}
          <h1
            className="font-display mt-10 max-w-[20ch] text-ink italic leading-[1.05]"
            style={{
              fontSize: "clamp(36px, 6.2vw, 84px)",
              fontVariationSettings: '"opsz" 84, "wght" 360, "SOFT" 100',
            }}
          >
            Building careful systems where vision, language, &amp; software meet.
          </h1>

          {/* small footer line */}
          <div className="mt-8 flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-ink-soft">
            <span>Singapore</span>
            <span aria-hidden className="text-rule">·</span>
            <span>GMT +8</span>
            <span aria-hidden className="text-rule">·</span>
            <span>2026</span>
          </div>

          {/* notebook elastic band */}
          <div
            aria-hidden
            className="relative my-12 h-[14px] w-[calc(100%+4rem)] -mx-8 sm:-mx-14"
            style={{
              background:
                "linear-gradient(180deg, rgba(228,90,146,0.95) 0%, #b94078 50%, rgba(228,90,146,0.95) 100%)",
              boxShadow:
                "0 3px 6px rgba(45,27,37,0.18), inset 0 1px 0 rgba(255,255,255,0.18)",
            }}
          />

          {/* BELOW BAND: three beliefs section */}
          <p
            className="font-hand text-accent"
            style={{ fontSize: "clamp(22px, 2.4vw, 30px)", lineHeight: 1 }}
          >
            3 things that resonates with me —
          </p>

          <div className="relative mt-12 flex flex-wrap items-start justify-center gap-x-8 gap-y-10 sm:gap-x-12">
            <StickyNote rotate={-4} tone="pink">
              Start before you're ready, doing is the fastest teacher
            </StickyNote>
            <StickyNote rotate={3} tone="mint">
              Be bold, hesitation costs more than mistakes
            </StickyNote>
            <StickyNote rotate={-2} tone="cream">
              Think there's always a way, then go find it
            </StickyNote>
          </div>

          {/* tiny corner doodles inside the page */}
          <Doodle
            variant="sparkle"
            size={24}
            tone="mint"
            className="absolute left-12 bottom-8 opacity-90"
          />
          <Doodle
            variant="heart"
            size={28}
            tone="pink"
            className="absolute right-10 bottom-10 opacity-80"
          />

          {/* page number */}
          <span className="absolute bottom-4 right-6 font-hand text-ink-soft text-sm">
            01
          </span>
        </div>
      </div>

      {/* scroll cue below notebook */}
      <div className="mt-16 flex flex-col items-center gap-2">
        <span className="font-hand text-ink-soft" style={{ fontSize: 20 }}>
          turn the page ↓
        </span>
      </div>
    </section>
  );
}
