import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

const ROOT = path.join(process.cwd(), "content");

export type ProjectLink = { label: string; href: string };

export type ProjectFrontmatter = {
  title: string;
  slug: string;
  summary: string;
  role: string;
  year: number;
  stack: string[];
  cover?: string;
  coverAlt?: string;
  slidesEmbed?: string;
  links?: ProjectLink[];
  order?: number;
  draft?: boolean;
};

export type Project = { frontmatter: ProjectFrontmatter; body: string };

export type WritingFrontmatter = {
  title: string;
  slug: string;
  date: string;
  summary: string;
  tags?: string[];
  draft?: boolean;
};

export type WritingPost = { frontmatter: WritingFrontmatter; body: string };

export type NowItem = { text: string; date?: string };

export type NowDoc = {
  updated: string;
  working: NowItem[];
  reading: NowItem[];
  listening: NowItem[];
  body: string;
};

async function readMdxDir(kind: "projects" | "writing") {
  const dir = path.join(ROOT, kind);
  try {
    const files = await fs.readdir(dir);
    return files.filter((f) => f.endsWith(".mdx"));
  } catch {
    return [];
  }
}

function deriveSlug(filename: string, frontmatterSlug?: string) {
  return frontmatterSlug ?? filename.replace(/\.mdx$/, "");
}

export async function getAllProjects(): Promise<Project[]> {
  const files = await readMdxDir("projects");
  const items = await Promise.all(
    files.map(async (f) => {
      const raw = await fs.readFile(path.join(ROOT, "projects", f), "utf8");
      const { data, content } = matter(raw);
      const slug = deriveSlug(f, data.slug as string | undefined);
      return {
        frontmatter: { ...(data as Omit<ProjectFrontmatter, "slug">), slug },
        body: content,
      } as Project;
    }),
  );
  return items
    .filter((p) => !p.frontmatter.draft)
    .sort((a, b) => (a.frontmatter.order ?? 999) - (b.frontmatter.order ?? 999));
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const filePath = path.join(ROOT, "projects", `${slug}.mdx`);
  try {
    const raw = await fs.readFile(filePath, "utf8");
    const { data, content } = matter(raw);
    return {
      frontmatter: { ...(data as Omit<ProjectFrontmatter, "slug">), slug },
      body: content,
    };
  } catch {
    return null;
  }
}

export async function getAllWriting(): Promise<WritingPost[]> {
  const files = await readMdxDir("writing");
  const items = await Promise.all(
    files.map(async (f) => {
      const raw = await fs.readFile(path.join(ROOT, "writing", f), "utf8");
      const { data, content } = matter(raw);
      const slug = deriveSlug(f, data.slug as string | undefined);
      return {
        frontmatter: { ...(data as Omit<WritingFrontmatter, "slug">), slug },
        body: content,
      } as WritingPost;
    }),
  );
  return items
    .filter((p) => !p.frontmatter.draft)
    .sort(
      (a, b) =>
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime(),
    );
}

export async function getWritingBySlug(slug: string): Promise<WritingPost | null> {
  const filePath = path.join(ROOT, "writing", `${slug}.mdx`);
  try {
    const raw = await fs.readFile(filePath, "utf8");
    const { data, content } = matter(raw);
    return {
      frontmatter: { ...(data as Omit<WritingFrontmatter, "slug">), slug },
      body: content,
    };
  } catch {
    return null;
  }
}

function normaliseNowList(raw: unknown): NowItem[] {
  if (!Array.isArray(raw)) return [];
  return raw.map((entry) => {
    if (typeof entry === "string") return { text: entry };
    if (entry && typeof entry === "object" && "text" in entry) {
      const e = entry as { text: unknown; date?: unknown };
      return {
        text: String(e.text),
        date: e.date ? String(e.date) : undefined,
      };
    }
    return { text: String(entry) };
  });
}

export async function getNow(): Promise<NowDoc | null> {
  const filePath = path.join(ROOT, "now.mdx");
  try {
    const raw = await fs.readFile(filePath, "utf8");
    const { data, content } = matter(raw);
    return {
      updated: (data.updated as string) ?? "",
      working: normaliseNowList(data.working),
      reading: normaliseNowList(data.reading),
      listening: normaliseNowList(data.listening),
      body: content,
    };
  } catch {
    return null;
  }
}

export function formatMonthYear(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}
