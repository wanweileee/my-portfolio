// components/HeroIntro.tsx
// Drop-in replacement: swaps the old <Notebook /> hero for the
// sticker-collage hero. (Your old Notebook.tsx stays untouched in
// case you want to revert.)

import StickerHero from "./StickerHero/StickerHero";

export default function HeroIntro() {
  return <StickerHero />;
}
