import { asset } from "@/lib/asset";

type Props = {
  src: string;
  caption?: string;
  poster?: string;
};

export default function Video({ src, caption, poster }: Props) {
  return (
    <span className="my-10 block">
      <video
        src={asset(src)}
        poster={poster ? asset(poster) : undefined}
        controls
        preload="metadata"
        playsInline
        className="mx-auto block h-auto max-w-full rounded-2xl border border-rule bg-paper-tint"
      />
      {caption && (
        <span className="mt-3 block text-[12px] uppercase tracking-[0.18em] text-ink-soft">
          {caption}
        </span>
      )}
    </span>
  );
}
