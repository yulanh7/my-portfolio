"use client";

import { useEffect, useRef, useState } from "react";
import ProjectCard from "@/components/ProjectCard";
import SectionHeader from "@/components/SectionHeader";
import { projects } from "@/data/content";

const CARD_WIDTH = 460 + 40;
const STAR_PATH =
  "M0 -20 C0 -20 -1 -7 -4 -4 C-7 -1 -20 0 -20 0 C-20 0 -7 1 -4 4 C-1 7 0 20 0 20 C0 20 1 7 4 4 C7 1 20 0 20 0 C20 0 7 -1 4 -4 C1 -7 0 -20 0 -20 Z";

export default function Projects() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isPausedRef = useRef(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [arcVisible, setArcVisible] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      setArcVisible((e as CustomEvent).detail === "projects");
    };
    window.addEventListener("sectionChange", handler);
    return () => window.removeEventListener("sectionChange", handler);
  }, []);

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
    <section
      id="projects"
      className="py-20 overflow-hidden relative"
      style={{ background: "rgba(237, 224, 212, 0.2)" }}
    >
      {/* Top-right: two concentric arcs (from Contact) */}
      <div className="hidden md:block absolute top-0 right-0 pointer-events-none z-10">
        <svg width="260" height="220" viewBox="0 0 260 220" fill="none"
          className={`arc-decoration${arcVisible ? " is-visible" : ""}`}>
          <circle cx="260" cy="0" r="185" stroke="var(--color-accent-brown)" strokeWidth="1.8" opacity="0.55" />
          <circle cx="260" cy="0" r="115" stroke="var(--color-accent-brown)" strokeWidth="1.8" opacity="0.42" />
          <g transform="translate(141, 142) scale(0.65)">
            <g className="arc-star arc-star-1">
              <path d={STAR_PATH} fill="var(--color-accent-brown)" opacity="1" />
            </g>
          </g>
          <g transform="translate(163, 61) scale(0.42)">
            <g className="arc-star arc-star-2">
              <path d={STAR_PATH} fill="var(--color-text-primary)" opacity="0.85" />
            </g>
          </g>
        </svg>
      </div>

      {/* Bottom-left: single arc (from Contact) */}
      <div className="hidden md:block absolute bottom-0 left-0 pointer-events-none z-10">
        <svg width="220" height="190" viewBox="0 0 220 190" fill="none"
          className={`arc-decoration${arcVisible ? " is-visible" : ""}`}>
          <circle cx="0" cy="190" r="170" stroke="var(--color-accent-brown)" strokeWidth="1.8" opacity="0.4" />
          <g transform="translate(120, 70) scale(0.55)">
            <g className="arc-star arc-star-1">
              <path d={STAR_PATH} fill="var(--color-accent-brown)" opacity="1" />
            </g>
          </g>
        </svg>
      </div>
      <div className="container">
        <SectionHeader
          label="Selected Projects"
          title="What I've Built"
          labelColor="var(--color-accent-brown)"
        />
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
        {[...projects, ...projects].map((project, i) => (
          <ProjectCard key={`${project.title}-${i}`} project={project} />
        ))}
      </div>

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
  );
}
