import Marker from "./Marker";

export type TriptychItem = { title: string; meta?: string; href?: string };
export type TriptychData = {
  lab: TriptychItem[];
  playlist: TriptychItem[];
  bookshelf: TriptychItem[];
};

function Card({
  label,
  items,
  footer,
}: {
  label: string;
  items: TriptychItem[];
  footer?: string;
}) {
  return (
    <div className="flex flex-col rounded-2xl border border-rule bg-paper-tint/40 p-6 transition-shadow duration-500 hover:shadow-[0_8px_28px_rgba(228,90,146,0.12)]">
      <Marker className="mb-5 block">{label}</Marker>
      <ul className="space-y-4">
        {items.map((it, i) => (
          <li key={i} className="text-[15px] leading-[1.45]">
            {it.href ? (
              <a
                href={it.href}
                target="_blank"
                rel="noreferrer"
                className="text-ink transition-colors hover:text-accent"
              >
                {it.title}
              </a>
            ) : (
              <span className="text-ink">{it.title}</span>
            )}
            {it.meta && (
              <span className="ml-2 text-[12px] text-ink-soft tabular-nums">
                {it.meta}
              </span>
            )}
          </li>
        ))}
      </ul>
      {footer && (
        <p className="mt-6 text-[12px] text-ink-soft italic font-display">
          {footer}
        </p>
      )}
    </div>
  );
}

export default function LabTriptych({ data }: { data: TriptychData }) {
  return (
    <div className="grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-6">
      <Card label="Lab" items={data.lab} footer="Half-built and proud of it." />
      <Card label="Playlist" items={data.playlist} footer="On rotation this season." />
      <Card label="Bookshelf" items={data.bookshelf} footer="Books that shaped the thinking." />
    </div>
  );
}
