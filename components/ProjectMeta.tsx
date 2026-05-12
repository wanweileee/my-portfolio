import type { ProjectFrontmatter } from "@/lib/content";
import Marker from "./Marker";

export default function ProjectMeta({ fm }: { fm: ProjectFrontmatter }) {
  return (
    <dl className="grid grid-cols-2 gap-x-6 gap-y-4 border-t border-b border-rule py-6 sm:grid-cols-4">
      <div>
        <dt>
          <Marker>Year</Marker>
        </dt>
        <dd className="mt-2 text-[15px] tabular-nums text-ink">{fm.year}</dd>
      </div>
      <div>
        <dt>
          <Marker>Role</Marker>
        </dt>
        <dd className="mt-2 text-[15px] text-ink">{fm.role}</dd>
      </div>
      <div className="col-span-2">
        <dt>
          <Marker>Stack</Marker>
        </dt>
        <dd className="mt-2 text-[15px] text-ink">{fm.stack.join(" · ")}</dd>
      </div>
      {fm.links && fm.links.length > 0 && (
        <div className="col-span-2 sm:col-span-4">
          <dt>
            <Marker>Links</Marker>
          </dt>
          <dd className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[15px]">
            {fm.links.map((l, i) => (
              <a
                key={i}
                href={l.href}
                target="_blank"
                rel="noreferrer"
                className="text-accent underline decoration-accent/30 underline-offset-[3px] hover:decoration-accent"
              >
                {l.label} ↗
              </a>
            ))}
          </dd>
        </div>
      )}
    </dl>
  );
}
