import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

import SmoothScroll from "../components/SmoothScroll";

export const metadata: Metadata = {
  title: "Adish Architecture",
  description: "A premier architectural firm specializing in master planning, commercial, and bespoke residential design.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} antialiased`}
    >
      <body className="flex flex-col font-sans bg-[#0c0c0c] text-[#f2f2f2] noise-bg">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
