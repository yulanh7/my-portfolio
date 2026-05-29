"use client";

import { useEffect, useRef, useState } from "react";
import { experience } from "@/data/content";
import SectionHeader from "@/components/SectionHeader";
import SectionDecoration from "@/components/SectionDecoration";
import StarIcon from "@/components/StarIcon";

export default function Experience() {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [dotPositions, setDotPositions] = useState<number[]>([]);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const container = itemRefs.current[0]?.parentElement;
    if (!container) return;
    const containerTop = container.getBoundingClientRect().top + window.scrollY;
    setDotPositions(
      itemRefs.current.map((el) => {
        if (!el) return 0;
        return el.getBoundingClientRect().top + window.scrollY - containerTop + 6;
      })
    );
  }, []);

  return (
    <>
      {activeIndex >= 0 && (
        <div
          className="fixed pointer-events-none z-50 text-xs font-medium px-2 py-1 rounded"
          style={{
            left: tooltipPos.x + 16,
            top: tooltipPos.y - 8,
            background: "var(--color-accent-brown)",
            color: "white",
            transform: "translateY(-50%)",
          }}
        >
          {experience[activeIndex]?.period}
        </div>
      )}
      <section
        id="experience"
        className="py-20 overflow-hidden relative"
        style={{ background: "rgba(253, 250, 247, 0.2)" }}
      >
        {/* Top-right stars (from Projects) */}
        <SectionDecoration position="top-right" sectionId="experience" toggle>
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

        {/* Bottom-left stars (from Projects) */}
        <SectionDecoration position="bottom-left" sectionId="experience" toggle>
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
          <SectionHeader label="Experience" title="Where I've Worked" labelColor="var(--color-accent-brown-text)" />

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
                  onMouseEnter={() => setActiveIndex(index)}
                  onMouseLeave={() => setActiveIndex(-1)}
                  onMouseMove={(e) =>
                    setTooltipPos({ x: e.clientX, y: e.clientY })
                  }
                  className="grid pb-10 relative gap-6"
                  style={{
                    gridTemplateColumns: "150px 1fr",
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
                          ? "var(--color-accent-brown-text)"
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
                        style={{ color: "var(--color-accent-brown-text)" }}
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
                  style={{ color: "var(--color-accent-brown-text)" }}
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
    </>
  );
}
