# StickerHero — Next.js handoff

A drop-in replacement for your homepage hero (`<Notebook />`), rebuilt as the
sticker-collage direction. Self-contained: a client component + a CSS Module.
No new dependencies — it uses only `next/image` and your existing
`@/lib/asset` helper.

## Files
```
StickerHero/
  StickerHero.tsx          ← the hero (client component)
  StickerHero.module.css   ← scoped styles
  HeroIntro.tsx            ← drop-in replacement for components/HeroIntro.tsx
```

## Install (3 steps)

1. **Copy the folder** into your components dir:
   ```
   components/StickerHero/StickerHero.tsx
   components/StickerHero/StickerHero.module.css
   ```

2. **Wire it up.** Replace the body of `components/HeroIntro.tsx` with the
   provided `HeroIntro.tsx` (it just renders `<StickerHero />`). Your
   `app/page.tsx` already renders `<HeroIntro />`, so nothing else changes.
   (Or import `StickerHero` directly wherever you want it.)

3. **Confirm the images exist** in `public/projects/`:
   `bob.jpg`, `plant.png`, `dbs1.jpg` — they're already in your repo. ✅

That's it. `npm run dev` and you'll see the new hero.

## What it relies on (already in your project)
- **Fonts** — reads the global CSS vars `--font-display` (Fraunces),
  `--font-body` (Inter), `--font-hand` (Caveat) that `app/layout.tsx`
  sets via `next/font`. No font setup needed.
- **Palette** — the pink/mint tokens are defined locally inside
  `.root` in the module, so it can't clash with anything. They match your
  `@theme` values exactly.
- **`asset()`** — image `src`s go through `@/lib/asset` so the
  `/my-portfolio` basePath is applied in production, same as `ProjectCard`.

## Nav
The component intentionally **does not render a nav** — your global
`<Nav />` (fixed, in `layout.tsx`) sits on top of it. The hero already
reserves `84px` of top padding to clear it.

## Editing content
Everything text/image/position lives in the `CONTENT` object at the top of
`StickerHero.tsx`:
- `hello`, `email`, `workHref`
- `stickers[]` — which doodles, sizes, positions, rotations
- `polaroids[]` — project image, alt, caption, position
- `beliefs[]` — the three sticky-note quotes

Doodle SVG paths are the same ones from your `Doodle.tsx`, inlined as a
sprite (`#sh-d-flower`, `#sh-d-sparkle`, `#sh-d-butterfly`, `#sh-d-cat`).

## Behaviour / accessibility
- **Custom sparkle cursor** + draggable stickers activate only on
  fine-pointer (mouse) devices.
- **`prefers-reduced-motion: reduce`** — entrance animation and sparkle
  trail are disabled; content shows in its final state.
- **Mobile (≤ 880px)** — the collage reflows to a clean stacked column:
  headline → swipeable polaroid row → belief notes. Loose stickers, the
  stamp, and the cursor are hidden.

## Notes
- The old `Notebook.tsx` / `StickyNote.tsx` / `Doodle.tsx` are no longer
  referenced by the hero, but you can keep them (they're still used nowhere
  else only if you remove them — check imports first).
- The standalone authoring version had a "Tweaks" panel (accent palette,
  playfulness slider, etc.) — that's an authoring aid and is intentionally
  omitted here. Say the word if you want any of those as real, persisted
  site settings.
