import Image from "next/image";

export default function ProseImage({
  src,
  alt,
  caption,
  wide = false,
}: {
  src: string;
  alt: string;
  caption?: string;
  wide?: boolean;
}) {
  return (
    <figure className={`my-12 ${wide ? "-mx-6 sm:-mx-16" : ""}`}>
      <div className="relative aspect-[16/10] w-full overflow-hidden border border-rule bg-paper">
        <Image src={src} alt={alt} fill sizes="100vw" className="object-cover" />
      </div>
      {caption && (
        <figcaption className="mt-3 text-[12px] uppercase tracking-[0.18em] text-ink-soft">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
