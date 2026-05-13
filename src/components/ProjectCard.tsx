"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";

interface Project {
  title: string;
  badge?: string;
  description: string;
  tech: string[];
  images: string[];
  link: string | null;
}

export default function ProjectCard({ project }: { project: Project }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const hasMultiple = project.images.length > 1;

  useEffect(() => {
    if (!hasMultiple || isHovered) return;
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % project.images.length);
    }, 3000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isHovered, hasMultiple, project.images.length]);

  const content = (
    /* Outer wrapper handles scale — padding prevents shadow clipping */
    <div
      className="flex-shrink-0 transition-all duration-500 ease-out"
      style={{
        width: "460px",
        padding: isHovered ? "34px" : "16px",
        marginTop: isHovered ? "-8px" : "0",
      }}
    >
      {/* Inner card — handles border-radius and overflow */}
      <div
        className="relative transition-all duration-500 ease-out"
        style={{
          borderRadius: "12px",
          clipPath: "inset(0 round 12px)",

          transform: isHovered ? "scale(1.15)" : "scale(1)",

          boxShadow: isHovered
            ? "0 28px 56px rgba(59,46,42,0.25)"
            : "0 2px 8px rgba(59,46,42,0.06)",
          zIndex: isHovered ? 10 : 1,
          position: "relative",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image area */}
        <div className="relative" style={{ height: "260px" }}>
          {project.images.map((src, index) => (
            <Image
              key={src}
              src={src}
              alt={`${project.title} ${index + 1}`}
              fill
              sizes="460px"
              className={`object-cover transition-opacity duration-700 ease-out ${
                index === currentIndex ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}

          {/* Image dots top-right — hidden on hover */}
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
        </div>

        {/* Bottom strip — fades out on hover */}
        <div
          className="px-4 py-3 flex items-center gap-2 transition-opacity duration-300"
          style={{
            background: "var(--color-accent-green)",
            opacity: isHovered ? 0 : 1,
          }}
        >
          {project.tech.slice(0, 3).map((t) => (
            <span
              key={t}
              className="text-xs px-2 py-0.5 border border-white/40 rounded-full text-white/90"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Hover overlay — covers entire card including bottom strip */}
        <div
          className="flex flex-col justify-start pt-6 p-5 transition-opacity duration-500 ease-out"
          style={{
            background: "rgba(59, 46, 42, 0.90)",
            opacity: isHovered ? 1 : 0,
            borderRadius: "12px",
            position: "absolute",
            inset: 0,
          }}
        >
          {project.badge && (
            <span className="text-xs tracking-widest uppercase text-white/60 mb-1.5">
              {project.badge}
            </span>
          )}
          <h3 className="text-white font-medium text-base mb-2 flex items-center gap-2">
            {project.title}
            {project.link && <span className="opacity-70">↗</span>}
          </h3>
          <p className="text-white/85 text-sm leading-relaxed mb-3 line-clamp-2">
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
        </div>
      </div>
    </div>
  );

  if (project.link) {
    return (
      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        style={{ display: "block" }}
      >
        {content}
      </a>
    );
  }
  return content;
}
