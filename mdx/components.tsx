import Image from "next/image";
import type { MDXComponents } from "mdx/types";
import type { ImgHTMLAttributes, AnchorHTMLAttributes } from "react";
import CanvaEmbed from "@/components/CanvaEmbed";
import { asset } from "@/lib/asset";

export const mdxComponents: MDXComponents = {
  h1: (props) => (
    <h1
      className="font-display mt-12 mb-6 text-ink leading-[1] tracking-[-0.02em]"
      style={{
        fontSize: "clamp(40px, 6vw, 72px)",
        fontVariationSettings: '"opsz" 72, "wght" 360, "SOFT" 80',
      }}
      {...props}
    />
  ),
  h2: (props) => (
    <h2
      className="font-display mt-16 mb-5 text-ink leading-[1.1] tracking-[-0.01em]"
      style={{
        fontSize: "clamp(28px, 3.4vw, 44px)",
        fontVariationSettings: '"opsz" 44, "wght" 380, "SOFT" 70',
      }}
      {...props}
    />
  ),
  h3: (props) => (
    <h3
      className="font-display mt-12 mb-4 text-ink leading-[1.2]"
      style={{
        fontSize: "clamp(22px, 2.4vw, 30px)",
        fontVariationSettings: '"opsz" 30, "wght" 400, "SOFT" 80',
      }}
      {...props}
    />
  ),
  p: (props) => (
    <p
      className="my-5 max-w-[60ch] text-[17px] leading-[1.7] text-ink"
      {...props}
    />
  ),
  blockquote: (props) => (
    <blockquote
      className="my-10 max-w-[60ch] border-l-2 border-accent pl-6 font-display italic leading-[1.4] text-ink"
      style={{
        fontSize: "clamp(22px, 2.4vw, 30px)",
        fontVariationSettings: '"opsz" 30, "wght" 380, "SOFT" 100',
      }}
      {...props}
    />
  ),
  ul: (props) => (
    <ul
      className="my-5 max-w-[60ch] space-y-2 pl-5 text-[17px] leading-[1.7] text-ink marker:text-accent list-disc"
      {...props}
    />
  ),
  ol: (props) => (
    <ol
      className="my-5 max-w-[60ch] space-y-2 pl-5 text-[17px] leading-[1.7] text-ink marker:text-ink-soft list-decimal"
      {...props}
    />
  ),
  li: (props) => <li className="pl-1" {...props} />,
  hr: () => <hr className="my-16 border-0 border-t border-rule" />,
  a: ({ href = "#", ...rest }: AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      href={href}
      className="text-accent underline decoration-accent/30 underline-offset-[3px] transition-colors hover:decoration-accent"
      {...rest}
    />
  ),
  code: (props) => (
    <code
      className="rounded bg-paper px-[6px] py-[2px] font-mono text-[14px] text-ink"
      style={{ background: "rgba(26,24,20,0.06)" }}
      {...props}
    />
  ),
  pre: (props) => (
    <pre
      className="my-8 overflow-x-auto border border-rule p-5 font-mono text-[13px] leading-[1.6] text-ink"
      style={{ background: "rgba(26,24,20,0.04)" }}
      {...props}
    />
  ),
  CanvaEmbed,
  img: ({ src, alt }: ImgHTMLAttributes<HTMLImageElement>) => {
    const source = typeof src === "string" ? src : "";
    return (
      <span className="my-10 block">
        <span className="relative block aspect-[16/10] w-full overflow-hidden border border-rule bg-paper">
          {source && (
            <Image
              src={asset(source)}
              alt={alt ?? ""}
              fill
              sizes="(min-width: 640px) 60vw, 100vw"
              className="object-cover"
            />
          )}
        </span>
        {alt && (
          <span className="mt-3 block text-[12px] uppercase tracking-[0.18em] text-ink-soft">
            {alt}
          </span>
        )}
      </span>
    );
  },
};
