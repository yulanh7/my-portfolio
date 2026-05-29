"use client";

import { useEffect, useRef, useState } from "react";
import ProjectCard from "@/components/ProjectCard";
import SectionHeader from "@/components/SectionHeader";
import { projects } from "@/data/content";

const CARD_WIDTH = 460 + 40;
const STAR_PATH =
  "M0 -20 C0 -20 -1 -7 -4 -4 C-7 -1 -20 0 -20 0 C-20 0 -7 1 -4 4 C-1 7 0 20 0 20 C0 20 1 7 4 4 C7 1 20 0 20 0 C20 0 7 -1 4 -4 C1 -7 0 -20 0 -20 Z";

// Smooth scroll with ease-in-out — replaces the browser's default smooth which has no curve
function smoothScrollTo(
  el: HTMLElement,
  targetX: number,
  duration: number,
  onDone?: () => void
) {
  const startX = el.scrollLeft;
  const dist = targetX - startX;
  if (Math.abs(dist) < 1) { onDone?.(); return; }
  const startTime = performance.now();
  const ease = (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

  function step(now: number) {
    const t = Math.min((now - startTime) / duration, 1);
    el.scrollLeft = startX + dist * ease(t);
    if (t < 1) requestAnimationFrame(step);
    else onDone?.();
  }
  requestAnimationFrame(step);
}

export default function Projects() {
  // ── Desktop ───────────────────────────────────────────────────────
  const scrollRef = useRef<HTMLDivElement>(null);
  const isPausedRef = useRef(false);
  const posRef = useRef(0);

  // ── Mobile ────────────────────────────────────────────────────────
  const mobileScrollRef = useRef<HTMLDivElement>(null);
  const touchActiveRef = useRef(false);
  const isAnimatingRef = useRef(false);

  // ── Shared ────────────────────────────────────────────────────────
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);
  const [timerTick, setTimerTick] = useState(0); // bump to restart auto-advance
  const [arcVisible, setArcVisible] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    setIsMobile(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const handler = (e: Event) => {
      setArcVisible((e as CustomEvent).detail === "projects");
    };
    window.addEventListener("sectionChange", handler);
    return () => window.removeEventListener("sectionChange", handler);
  }, []);

  // ── Desktop: continuous pixel scroll ─────────────────────────────
  useEffect(() => {
    if (isMobile) return;
    const el = scrollRef.current;
    if (!el) return;
    let animId: number;
    posRef.current = el.scrollLeft;
    const animate = () => {
      if (!isPausedRef.current) {
        posRef.current += 0.5;
        const maxScroll = el.scrollWidth / 2;
        if (posRef.current >= maxScroll) posRef.current = 0;
        el.scrollLeft = posRef.current;
      }
      const next = Math.round(el.scrollLeft / CARD_WIDTH) % projects.length;
      setActiveIndex((prev) => (prev !== next ? next : prev));
      animId = requestAnimationFrame(animate);
    };
    // Delay start so LCP measurement completes before carousel scrolls new images into view
    const delayId = setTimeout(() => {
      animId = requestAnimationFrame(animate);
    }, 2000);
    return () => { clearTimeout(delayId); cancelAnimationFrame(animId); };
  }, [isMobile]);

  // ── Mobile: single-shot auto-advance (loops via clone) ──────────
  useEffect(() => {
    if (!isMobile || detailOpen) return;

    const t = setTimeout(() => {
      if (touchActiveRef.current || isAnimatingRef.current) return;
      const el = mobileScrollRef.current;
      if (!el) return;
      const nextIdx = activeIndex + 1;
      isAnimatingRef.current = true;
      el.style.scrollSnapType = "none"; // disable snap so animation isn't interrupted
      smoothScrollTo(el, nextIdx * el.clientWidth, 580, () => {
        el.style.scrollSnapType = "x proximity"; // restore
        isAnimatingRef.current = false;
        if (nextIdx >= projects.length) {
          el.scrollLeft = 0;
          setActiveIndex(0);
        } else {
          setActiveIndex(nextIdx);
        }
      });
    }, 3000);

    return () => clearTimeout(t);
  }, [isMobile, activeIndex, detailOpen, timerTick]);

  // ── Scroll: sync index when user swipes (ignore during programmatic animation) ──
  const handleMobileScroll = () => {
    if (isAnimatingRef.current) return;
    const el = mobileScrollRef.current;
    if (!el) return;
    const idx = Math.round(el.scrollLeft / el.clientWidth);
    if (idx >= projects.length) {
      // User manually swiped to the clone — bounce back to the real last card
      isAnimatingRef.current = true;
      el.style.scrollSnapType = "none";
      smoothScrollTo(el, (projects.length - 1) * el.clientWidth, 280, () => {
        el.style.scrollSnapType = "x proximity";
        isAnimatingRef.current = false;
        setActiveIndex(projects.length - 1);
      });
      return;
    }
    setActiveIndex(idx);
  };

  // ── Dot / indicator click ─────────────────────────────────────────
  const goTo = (i: number) => {
    if (isMobile) {
      const el = mobileScrollRef.current;
      if (!el || isAnimatingRef.current) return;
      isAnimatingRef.current = true;
      el.style.scrollSnapType = "none";
      smoothScrollTo(el, i * el.clientWidth, 520, () => {
        el.style.scrollSnapType = "x proximity";
        isAnimatingRef.current = false;
        setActiveIndex(i);
      });
    } else {
      const el = scrollRef.current;
      if (el) {
        posRef.current = i * CARD_WIDTH;
        el.scrollLeft = i * CARD_WIDTH;
      }
      setActiveIndex(i);
      isPausedRef.current = true;
      setTimeout(() => { isPausedRef.current = false; }, 1500);
    }
  };

  return (
    <section
      id="projects"
      className="py-20 overflow-hidden relative"
      style={{ background: "rgba(237, 224, 212, 0.2)" }}
    >
      {/* Decorations — desktop only */}
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
          labelColor="var(--color-accent-brown-text)"
        />
      </div>

      {/* ── Desktop ── */}
      {!isMobile && (
        <div
          ref={scrollRef}
          className="flex gap-10 overflow-x-hidden px-10 items-center"
          style={{ cursor: "default", paddingTop: "40px", paddingBottom: "40px" }}
          onMouseEnter={() => { isPausedRef.current = true; }}
          onMouseLeave={() => { isPausedRef.current = false; }}
        >
          {[...projects, ...projects].map((project, i) => (
            <ProjectCard key={`${project.title}-${i}`} project={project} priority={i < 3} />
          ))}
        </div>
      )}

      {/* ── Mobile: scroll-snap carousel ── */}
      {isMobile && (
        <div
          ref={mobileScrollRef}
          className="mobile-carousel flex overflow-x-auto"
          style={{
            scrollSnapType: "x proximity",
            WebkitOverflowScrolling: "touch",
            paddingTop: "24px",
            paddingBottom: "24px",
          }}
          onScroll={handleMobileScroll}
          onTouchStart={() => {
            touchActiveRef.current = true;
          }}
          onTouchEnd={() => {
            // wait for snap physics to settle before resuming auto-advance
            setTimeout(() => {
              touchActiveRef.current = false;
              handleMobileScroll();
              setTimerTick((t) => t + 1);
            }, 450);
          }}
        >
          {/* Append a clone of the first card for seamless loop */}
          {[...projects, projects[0]].map((project, i) => (
            <div
              key={`${project.title}-${i}`}
              style={{
                scrollSnapAlign: "center",
                flexShrink: 0,
                width: "100%",
                padding: "0 16px",
              }}
            >
              <ProjectCard
                project={project}
                mobile
                priority={i === 0}
                onDetailToggle={(open) => setDetailOpen(open)}
              />
            </div>
          ))}
        </div>
      )}

      {/* ── Dots ── */}
      <div className="flex justify-center gap-2 mt-6">
        {projects.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
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
