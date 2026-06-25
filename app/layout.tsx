import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./tokens.css";
import "./globals.css";
import { MarriedLifeEgg } from "@/components/MarriedLifeEgg";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Santosh Dahal — Speech AI Research Engineer",
  description:
    "Santosh Dahal builds speech and language AI — ASR, LLMs, and conversational systems — that are accurate, efficient, and inclusive for low-resource and accented speakers, carried from research prototype to production.",
  icons: { icon: "/assets/favicon.svg" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Preload the hero display face (LCP heading) so the swap lands fast. */}
        <link
          rel="preload"
          href="/fonts/otf/Redaction50-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body className={jakarta.className}>
        {children}
        {/* hidden easter egg — Shift+L then M reveals a "Happy Married Life" card */}
        <MarriedLifeEgg />
      </body>
    </html>
  );
}
