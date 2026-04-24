import type { Metadata } from "next";
import { Raleway, JetBrains_Mono } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jinwoo Lee — Full Stack Engineer",
  description:
    "Portfolio of Jinwoo Lee — full stack engineer building interactive experiences, DeFi, and creative front-end at McCann NZ.",
};

const raleway = Raleway({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-raleway",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${raleway.variable} ${jetbrains.variable}`}>
      <body className={raleway.className}>{children}</body>
    </html>
  );
}
