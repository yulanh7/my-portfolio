"use client";

import { useEffect, useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProjectCard from "@/components/ProjectCard";
import Footer from "@/components/Footer";
import { projects } from "@/data/content";
import Experience from "@/components/Experience";
import SectionDecoration from "@/components/SectionDecoration";
import StarIcon from "@/components/StarIcon";

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
      <section
        id="projects"
        className="py-20 overflow-hidden relative"
        style={{ background: "rgba(237, 224, 212, 0.2)" }}
      >
        <SectionDecoration position="top-right" sectionId="projects" toggle>
          <div className="decoration-item absolute" style={{ top: "0px", right: "0px", animationDelay: "0.1s" }}>
            <StarIcon size={40} color="var(--color-text-primary)" style={{ opacity: 0.6 }} />
          </div>
          <div className="decoration-item absolute" style={{ top: "-10px", right: "52px", animationDelay: "0.25s" }}>
            <StarIcon size={22} color="var(--color-text-primary)" style={{ opacity: 0.5 }} />
          </div>
          <div className="decoration-item absolute" style={{ top: "28px", right: "48px", animationDelay: "0.4s" }}>
            <StarIcon size={14} color="var(--color-text-primary)" style={{ opacity: 0.4 }} />
          </div>
        </SectionDecoration>
        <SectionDecoration position="bottom-left" sectionId="projects" toggle>
          <div className="decoration-item absolute" style={{ bottom: "0px", left: "0px", animationDelay: "0.1s" }}>
            <StarIcon size={40} color="var(--color-accent-brown)" style={{ opacity: 0.6 }} />
          </div>
          <div className="decoration-item absolute" style={{ bottom: "-10px", left: "52px", animationDelay: "0.25s" }}>
            <StarIcon size={22} color="var(--color-accent-brown)" style={{ opacity: 0.5 }} />
          </div>
          <div className="decoration-item absolute" style={{ bottom: "28px", left: "48px", animationDelay: "0.4s" }}>
            <StarIcon size={14} color="var(--color-accent-green)" style={{ opacity: 0.4 }} />
          </div>
        </SectionDecoration>
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
      <Experience />

      <Footer />
    </>
  );
}
