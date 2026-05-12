import Rule from "./Rule";

export default function Footer() {
  return (
    <footer className="mx-auto max-w-[1240px] px-[clamp(20px,4vw,64px)] py-24">
      <Rule />
      <div className="mt-8 flex flex-col gap-6 text-[12px] uppercase tracking-[0.18em] text-ink-soft sm:flex-row sm:items-baseline sm:justify-between">
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
          <a
            href="mailto:wanweilee22@gmail.com"
            className="text-accent transition-opacity hover:opacity-70"
          >
            wanweilee22@gmail.com
          </a>
          <span aria-hidden className="text-rule">·</span>
          <a
            href="https://github.com/wanweileee"
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-ink"
          >
            GitHub
          </a>
          <span aria-hidden className="text-rule">·</span>
          <a
            href="https://www.linkedin.com/in/leewanwei"
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-ink"
          >
            LinkedIn
          </a>
        </div>
        <p className="font-display text-[13px] normal-case tracking-normal text-ink-soft italic">
          Built with{" "}
          <span aria-label="love" className="text-accent">♥</span>, 2026.
        </p>
      </div>
    </footer>
  );
}
