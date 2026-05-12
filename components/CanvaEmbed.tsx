type Props = {
  src: string;
  title?: string;
  ratio?: "16/9" | "4/3";
};

export default function CanvaEmbed({
  src,
  title = "Presentation",
  ratio = "16/9",
}: Props) {
  const embedSrc = src.includes("?embed") || src.includes("&embed")
    ? src
    : src.includes("?")
    ? `${src}&embed`
    : `${src}?embed`;

  return (
    <figure className="my-12">
      <div
        className="relative w-full overflow-hidden rounded-2xl border border-rule bg-paper-tint shadow-[0_8px_28px_-8px_rgba(228,90,146,0.18)]"
        style={{ aspectRatio: ratio }}
      >
        <iframe
          src={embedSrc}
          title={title}
          allow="fullscreen"
          allowFullScreen
          loading="lazy"
          className="absolute inset-0 h-full w-full border-0"
        />
      </div>
      <figcaption className="mt-3 flex items-baseline justify-between">
        <span className="text-[12px] uppercase tracking-[0.18em] text-ink-soft">
          {title}
        </span>
        <a
          href={src}
          target="_blank"
          rel="noreferrer"
          className="text-[12px] uppercase tracking-[0.18em] text-accent transition-opacity hover:opacity-70"
        >
          open in canva ↗
        </a>
      </figcaption>
    </figure>
  );
}
