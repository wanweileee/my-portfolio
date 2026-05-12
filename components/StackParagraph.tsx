export default function StackParagraph({ items }: { items: string[] }) {
  return (
    <div className="font-display flex max-w-[44ch] flex-wrap items-baseline gap-x-3 gap-y-1 text-[clamp(20px,2vw,26px)] leading-[1.4] text-ink">
      {items.flatMap((it, i) => {
        const item = (
          <span key={`item-${i}`} className="whitespace-nowrap">
            {it}
          </span>
        );
        if (i === items.length - 1) return [item];
        return [
          item,
          <span key={`sep-${i}`} aria-hidden className="text-ink-soft">
            ·
          </span>,
        ];
      })}
    </div>
  );
}
