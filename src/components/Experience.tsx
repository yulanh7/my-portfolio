"use client";

import { useEffect, useRef, useState } from "react";
import { experience } from "@/data/content";

export default function Experience() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [dotPositions, setDotPositions] = useState<number[]>([]);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dotRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      const triggerLine = window.innerHeight * 0.7;

      let newActive = 0;
      itemRefs.current.forEach((el, i) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        if (rect.top <= triggerLine) {
          newActive = i;
        }
      });

      setActiveIndex(newActive);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const container = itemRefs.current[0]?.parentElement;
    if (!container) return;
    const containerTop = container.getBoundingClientRect().top + window.scrollY;
    const positions = itemRefs.current.map((el) => {
      if (!el) return 0;
      const rect = el.getBoundingClientRect();
      return rect.top + window.scrollY - containerTop + 6;
    });
    setDotPositions(positions);
  }, []);

  return (
    <section
      id="experience"
      className="py-20 overflow-x-hidden"
      style={{ background: "rgba(253, 250, 247, 0.2)" }}
    >
      <div className="container">
        {/* Section header */}
        <div className="flex items-center gap-3 mb-12">
          <span className="star-decoration text-accent-brown">✦</span>
          <h2>Experience</h2>
        </div>

        {/* Desktop timeline */}
        <div className="hidden md:block relative">
          {/* Vertical line */}
          <div
            className="absolute top-0 bottom-0 w-px"
            style={{ left: "145px", background: "var(--color-border)" }}
          />

          {/* Dots layer — outside scaling items so they don't shift */}
          <div className="absolute top-0 left-0 w-full">
            {experience.map((_item, index) => {
              const isActive = activeIndex === index;
              return (
                <div
                  key={index}
                  ref={(el) => {
                    dotRefs.current[index] = el;
                  }}
                  className="absolute rounded-full transition-all duration-500 ease-out"
                  style={{
                    left: "141px",
                    top: `${dotPositions[index] ?? 0}px`,
                    width: isActive ? "12px" : "8px",
                    height: isActive ? "12px" : "8px",
                    marginLeft: isActive ? "-2px" : "0",
                    background: isActive
                      ? "var(--color-accent-brown)"
                      : "var(--color-bg-accent)",
                    border: isActive
                      ? "2px solid var(--color-accent-brown)"
                      : "2px solid var(--color-border)",
                    boxShadow: isActive
                      ? "0 0 0 4px rgba(184, 124, 78, 0.15)"
                      : "none",
                  }}
                />
              );
            })}
          </div>

          {experience.map((item, index) => {
            const isActive = activeIndex === index;
            return (
              <div
                key={index}
                ref={(el) => {
                  itemRefs.current[index] = el;
                }}
                className="grid pb-10 relative gap-6"
                style={{
                  gridTemplateColumns: "150px 1fr",
                  opacity: isActive ? 1 : 0.45,
                }}
              >
                {/* Period */}
                <div
                  className="pt-0.5 text-right pr-4 transition-all duration-500 ease-out"
                  style={{
                    transform: isActive ? "scale(1.05)" : "scale(1)",
                    transformOrigin: "right center",
                  }}
                >
                  <span
                    className="text-xs tracking-wide leading-relaxed block transition-colors duration-500"
                    style={{
                      color: isActive
                        ? "var(--color-accent-brown)"
                        : "var(--color-text-secondary)",
                      fontWeight: isActive ? 500 : 400,
                    }}
                  >
                    {item.period}
                  </span>
                </div>

                {/* Content */}
                <div
                  className="pl-6 transition-all duration-500 ease-out"
                  style={{
                    transform: isActive ? "scale(1.05)" : "scale(1)",
                    transformOrigin: "left center",
                  }}
                >
                  <h3
                    className="mb-0.5 transition-colors duration-500"
                    style={{
                      color: isActive
                        ? "var(--color-text-primary)"
                        : "var(--color-text-secondary)",
                    }}
                  >
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className="text-xs font-medium tracking-wide"
                      style={{ color: "var(--color-accent-brown)" }}
                    >
                      {item.company}
                    </span>
                    <span className="text-border">·</span>
                    <span className="text-xs text-text-secondary">
                      {item.location}
                    </span>
                  </div>
                  <ul className="space-y-1.5">
                    {item.bullets.map((bullet, i) => (
                      <li
                        key={i}
                        className="flex gap-2 text-sm text-text-secondary leading-relaxed"
                      >
                        <span
                          className="mt-2 flex-shrink-0 w-1 h-1 rounded-full"
                          style={{ background: "var(--color-bg-accent)" }}
                        />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile timeline */}
        <div className="md:hidden space-y-8">
          {experience.map((item, index) => (
            <div key={index}>
              <div className="flex items-center gap-2 mb-1">
                <span
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ background: "var(--color-accent-brown)" }}
                />
                <p className="text-xs text-text-secondary">{item.period}</p>
              </div>
              <h3>{item.title}</h3>
              <p
                className="text-xs mb-2"
                style={{ color: "var(--color-accent-brown)" }}
              >
                {item.company} · {item.location}
              </p>
              <ul className="space-y-1.5">
                {item.bullets.map((bullet, i) => (
                  <li key={i} className="text-sm text-text-secondary">
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
