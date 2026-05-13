"use client";

import { useEffect, useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProjectCard from "@/components/ProjectCard";
import Footer from "@/components/Footer";
import { projects } from "@/data/content";

const CARD_WIDTH = 460 + 40; // card width + gap

/* alternating section backgrounds: primary → secondary → primary → secondary */
export default function Home() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isPausedRef = useRef(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let animId: number;
    let pos = el.scrollLeft;

    const animate = () => {
      if (!isPausedRef.current) {
        pos += 0.5;
        const maxScroll = el.scrollWidth / 2;
        if (pos >= maxScroll) pos = 0;
        el.scrollLeft = pos;
      }
      const next = Math.round(el.scrollLeft / CARD_WIDTH) % projects.length;
      setActiveIndex((prev) => (prev !== next ? next : prev));
      animId = requestAnimationFrame(animate);
    };
    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <>
      <Navbar />
      {/* bg-bg-primary (inherited from body) */}
      <Hero />

      {/* Projects → bg-bg-secondary */}
      <section id="projects" className="bg-bg-secondary py-20 overflow-hidden">
        <div className="container">
          <div className="flex items-center gap-3 mb-10">
            <span className="star-decoration text-accent-green">✦</span>
            <h2>Selected Projects</h2>
          </div>
        </div>
        <div
          ref={scrollRef}
          className="flex gap-10 overflow-x-hidden px-10 items-center"
          style={{
            cursor: "default",
            paddingTop: "40px",
            paddingBottom: "40px",
          }}
          onMouseEnter={() => {
            isPausedRef.current = true;
          }}
          onMouseLeave={() => {
            isPausedRef.current = false;
          }}
        >
          {/* Duplicate projects for seamless loop */}
          {[...projects, ...projects].map((project, i) => (
            <ProjectCard key={`${project.title}-${i}`} project={project} />
          ))}
        </div>

        {/* Project dot indicators */}
        <div className="flex justify-center gap-2 mt-6">
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                const el = scrollRef.current;
                if (!el) return;
                el.scrollLeft = i * CARD_WIDTH;
                setActiveIndex(i);
                isPausedRef.current = true;
              }}
              className="relative flex items-center justify-center transition-all duration-300 ease-out"
              style={{
                width: i === activeIndex ? "36px" : "20px",
                height: "20px",
                padding: "8px 0",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
              aria-label={`Go to project ${i + 1}`}
            >
              <div
                style={{
                  height: "4px",
                  width: "100%",
                  borderRadius: "9999px",
                  background:
                    i === activeIndex
                      ? "var(--color-accent-brown)"
                      : "var(--color-border)",
                  transition: "all 300ms ease-out",
                }}
              />
            </button>
          ))}
        </div>
      </section>
      {/* next: Experience → bg-bg-primary */}

      <Footer />
    </>
  );
}
