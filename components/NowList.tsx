import Marker from "./Marker";
import type { NowItem } from "@/lib/content";

export type NowData = {
  updated: string;
  working: NowItem[];
  reading: NowItem[];
  listening: NowItem[];
};

function Column({ label, items }: { label: string; items: NowItem[] }) {
  return (
    <div>
      <Marker className="block">{label}</Marker>
      <ul className="mt-4 space-y-3">
        {items.map((it, i) => (
          <li
            key={i}
            className="border-t border-rule pt-3 text-[15px] leading-[1.5] text-ink"
          >
            <span>{it.text}</span>
            {it.date && (
              <span className="ml-2 text-[12px] text-ink-soft tabular-nums">
                {it.date}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function NowList({ data }: { data: NowData }) {
  return (
    <div>
      <p className="mb-8 font-display text-[clamp(22px,2.2vw,30px)] italic leading-[1.35] text-ink-soft">
        A short, dated list. Last touched {data.updated}.
      </p>
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-6">
        <Column label="Working" items={data.working} />
        <Column label="Reading" items={data.reading} />
        <Column label="Listening" items={data.listening} />
      </div>
    </div>
  );
}
