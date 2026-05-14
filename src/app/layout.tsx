import type { Metadata } from "next";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import ParticleBackground from "@/components/ParticleBackground";
import MouseGlow from "@/components/MouseGlow";
import ScrollToTop from "@/components/ScrollToTop";

export const metadata: Metadata = {
  title: "Rachel Huang · Front-End Developer · Canberra",
  description:
    "Front-end developer with 5+ years building React and Next.js applications. Based in Canberra, Australia. Open to new opportunities.",
  keywords: [
    "React",
    "Next.js",
    "TypeScript",
    "Front-End Developer",
    "Canberra",
  ],
  authors: [{ name: "Rachel Huang" }],
  openGraph: {
    title: "Rachel Huang · Front-End Developer",
    description: "Front-end developer based in Canberra, Australia.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* Decorative left sidebar stripe */}
        <div className="sidebar-stripe" aria-hidden="true" />

        {/* Animated blob backgrounds */}
        <div className="blob-bg" aria-hidden="true" />
        <div className="blob-bg-2" aria-hidden="true" />

        {/* Particle canvas */}
        <ParticleBackground />

        {/* Custom cursor */}
        <CustomCursor />

        {/* Scroll to top button */}
        <ScrollToTop />

        {/* Mouse glow — follows cursor with soft light */}
        <MouseGlow />

        {/* Page content */}
        <main className="relative z-10">{children}</main>
      </body>
    </html>
  );
}
