"use client";

import { useEffect, useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/content";

const CARD_WIDTH = 380 + 24; // card width + gap

/* alternating section backgrounds: primary → secondary → primary → secondary */
export default function Home() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let animId: number;
    let pos = 0;
    const speed = 0.5;

    const animate = () => {
      if (!isPaused) {
        pos += speed;
        if (pos >= el.scrollWidth / 2) pos = 0;
        el.scrollLeft = pos;
      }
      const next = Math.round(el.scrollLeft / CARD_WIDTH) % projects.length;
      setActiveIndex((prev) => (prev !== next ? next : prev));
      animId = requestAnimationFrame(animate);
    };
    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [isPaused]);

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
          className="flex gap-10 overflow-x-hidden px-10"
          style={{ cursor: "default" }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
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
                if (scrollRef.current) {
                  scrollRef.current.scrollLeft = i * CARD_WIDTH;
                  setActiveIndex(i);
                }
              }}
              className="transition-all duration-300 ease-out rounded-full"
              style={{
                height: "4px",
                width: i === activeIndex ? "28px" : "8px",
                background:
                  i === activeIndex
                    ? "var(--color-accent-brown)"
                    : "var(--color-border)",
                border: "none",
                cursor: "pointer",
                padding: 0,
              }}
              aria-label={`Go to project ${i + 1}`}
            />
          ))}
        </div>
      </section>
      {/* next: Experience → bg-bg-primary */}
    </>
  );
}
