const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function asset(path: string): string {
  if (!path) return path;
  if (/^(https?:)?\/\//.test(path)) return path;
  if (path.startsWith("mailto:") || path.startsWith("data:")) return path;
  if (!path.startsWith("/")) return path;
  return `${BASE}${path}`;
}
