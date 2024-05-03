import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jinwoo Lee",
  description: "Welcome to Jinwoo Lee's portfolio site.",
};

const raleway = Raleway({ subsets: ["latin"], display: 'swap',})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={raleway.className}>
      <body>{children}</body>
    </html>
  );
}
