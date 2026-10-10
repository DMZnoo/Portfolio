import type { Metadata } from "next";
import { Atkinson_Hyperlegible, Bricolage_Grotesque } from "next/font/google";
import "./android-review.css";

export const metadata: Metadata = {
  title: "Android port roadmap",
  robots: { index: false, follow: false },
};

// The board keeps the roadmap artifact's type: a display face for headings,
// a hyperlegible body face for the long decision text. JetBrains Mono comes
// from the root layout's --font-mono.
const display = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["500", "700"],
  display: "swap",
  variable: "--ar-font-display",
});

const body = Atkinson_Hyperlegible({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--ar-font-body",
});

export default function AndroidReviewLayout({ children }: { children: React.ReactNode }) {
  return <div className={`ar-root ${display.variable} ${body.variable}`}>{children}</div>;
}
