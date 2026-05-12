import "./globals.css";
import { Fraunces, Inter, Caveat } from "next/font/google";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import IndexOverlay from "@/components/IndexOverlay";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  axes: ["opsz", "SOFT"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-hand",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://wanweileee.github.io/my-portfolio";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "Wan Wei · AI Engineer in training", template: "%s · Wan Wei" },
  description:
    "Lee Wan Wei — AI engineer in training at SUTD. Computer vision, RAG, full-stack systems.",
  openGraph: {
    title: "Wan Wei",
    description:
      "AI engineer in training at SUTD — building careful systems where vision, language, and full-stack meet.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable} ${caveat.variable}`}>
      <body className="bg-paper text-ink">
        <Nav />
        <main>{children}</main>
        <Footer />
        <IndexOverlay />
      </body>
    </html>
  );
}
