"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";

interface Project {
  title: string;
  badge?: string;
  description: string;
  tech: string[];
  images: { src: string; type: "desktop" | "mobile" }[];
  link: string | null;
}

export default function ProjectCard({
  project,
  mobile = false,
  priority = false,
  onDetailToggle,
}: {
  project: Project;
  mobile?: boolean;
  priority?: boolean;
  onDetailToggle?: (open: boolean) => void;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const hasMultiple = project.images.length > 1;

  useEffect(() => {
    setIsTouch(window.matchMedia("(hover: none) and (pointer: coarse)").matches);
  }, []);

  useEffect(() => {
    if (!hasMultiple || isHovered) return;
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % project.images.length);
    }, 3000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isHovered, hasMultiple, project.images.length]);

  const card = (
    <div
      className="flex-shrink-0 transition-all duration-500 ease-out"
      style={{
        width: mobile ? "100%" : "460px",
        padding: (!mobile && isHovered) ? "34px" : "8px",
        marginTop: (!mobile && isHovered) ? "-8px" : "0",
      }}
    >
      <div
        className="relative transition-all duration-500 ease-out"
        style={{
          borderRadius: "12px",
          clipPath: "inset(0 round 12px)",
          transform: (!mobile && isHovered) ? "scale(1.15)" : "scale(1)",
          boxShadow: isHovered
            ? "0 28px 56px rgba(59,46,42,0.25)"
            : "0 2px 8px rgba(59,46,42,0.06)",
          zIndex: isHovered ? 10 : 1,
          position: "relative",
        }}
        onMouseEnter={() => !isTouch && setIsHovered(true)}
        onMouseLeave={() => !isTouch && setIsHovered(false)}
      >
        {/* Top strip */}
        <div
          className="px-4 py-3 flex items-center gap-2 transition-opacity duration-300"
          style={{
            background:
              "linear-gradient(to right, var(--color-accent-green), rgba(142, 165, 163, 0.7))",
            borderRadius: "12px 12px 0 0",
            opacity: isHovered ? 0 : 1,
          }}
        >
          {project.tech.slice(0, 3).map((t) => (
            <span
              key={t}
              className="text-xs px-2 py-0.5 border border-white/40 rounded-full text-white/90"
              style={{ fontWeight: 600 }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* Image area */}
        <div
          className="relative"
          style={{
            height: "260px",
            background:
              project.images[currentIndex].type === "mobile"
                ? "var(--color-bg-secondary)"
                : "transparent",
          }}
        >
          {project.images.map((image, index) => (
            <Image
              key={image.src}
              src={image.src}
              alt={`${project.title} ${index + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, 460px"
              priority={priority && index === 0}
              className={`${image.type === "mobile" ? "object-contain" : "object-cover object-top"} transition-opacity duration-700 ease-out ${
                index === currentIndex ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}

          {hasMultiple && !isHovered && (
            <div className="absolute top-3 right-3 flex gap-1 z-10">
              {project.images.map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 rounded-full bg-white transition-all duration-300 ${
                    i === currentIndex ? "w-3 opacity-90" : "w-1.5 opacity-40"
                  }`}
                />
              ))}
            </div>
          )}

          {/* 详情 button — touch only, hidden once overlay is open */}
          {isTouch && !isHovered && (
            <button
              onClick={() => { setIsHovered(true); onDetailToggle?.(true); }}
              className="absolute bottom-3 right-3 z-10 px-4 py-1.5 rounded-full text-sm text-white/90 font-medium"
              style={{ background: "rgba(59,46,42,0.55)", backdropFilter: "blur(4px)" }}
            >
              详情
            </button>
          )}
        </div>

        {/* Overlay */}
        <div
          className="flex flex-col justify-start px-5 py-5 transition-opacity duration-500 ease-out"
          style={{
            background: "rgba(59, 46, 42, 0.90)",
            opacity: isHovered ? 1 : 0,
            pointerEvents: isHovered ? "auto" : "none",
            borderRadius: "12px",
            position: "absolute",
            inset: 0,
          }}
        >
          {/* Close button — touch only */}
          {isTouch && (
            <button
              onClick={() => { setIsHovered(false); onDetailToggle?.(false); }}
              className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center rounded-full text-white/70 text-base"
              style={{ background: "rgba(255,255,255,0.12)" }}
            >
              ×
            </button>
          )}

          {project.badge && (
            <span className="text-xs tracking-widest uppercase text-white/60 mb-1.5">
              {project.badge}
            </span>
          )}
          <h3 className="text-white font-medium text-base mb-2">{project.title}</h3>
          <p className="text-white/85 text-sm leading-relaxed mb-3">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {project.tech.map((t) => (
              <span
                key={t}
                className="text-xs px-2 py-0.5 border border-white/30 rounded-full text-white/80"
              >
                {t}
              </span>
            ))}
          </div>

          {/* Link — rendered as <a> inside overlay so touch can tap it */}
          {project.link && (
            <div className="flex-1 flex items-end justify-center pt-4">
              {/* On desktop the whole card is already wrapped in <a>, so only
                  render a nested link on touch to avoid invalid HTML nesting. */}
              {isTouch ? (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                >
                  <span className="text-white/90 text-3xl">↗</span>
                </a>
              ) : (
                <span className="text-white/90 text-3xl">↗</span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // Desktop: wrap whole card in <a>. Touch: link is inside overlay.
  if (project.link && !isTouch) {
    return (
      <a href={project.link} target="_blank" rel="noopener noreferrer" style={{ display: "block" }}>
        {card}
      </a>
    );
  }
  return card;
}
