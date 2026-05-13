"use client";

import { experience, education } from "@/data/content";

export default function Experience() {
  return (
    <section
      id="experience"
      className="py-20"
      style={{ background: "rgba(253, 250, 247, 0.2)" }}
    >
      <div className="container">
        {/* Section header */}
        <div className="flex items-center gap-3 mb-12">
          <span className="star-decoration text-accent-brown">✦</span>
          <h2>Experience</h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-[105px] top-0 bottom-0 w-px"
            style={{ background: "var(--color-border)" }}
          />

          {experience.map((item, index) => (
            <div
              key={index}
              className="grid gap-6 pb-10 relative"
              style={{ gridTemplateColumns: "110px 1fr" }}
            >
              {/* Dot on timeline */}
              <div
                className="absolute w-2 h-2 rounded-full"
                style={{
                  left: "101px",
                  top: "6px",
                  background:
                    index === 0
                      ? "var(--color-accent-brown)"
                      : "var(--color-bg-accent)",
                  border: "2px solid var(--color-border)",
                }}
              />

              {/* Left — period */}
              <div className="pt-0.5">
                <span className="text-xs text-text-secondary tracking-wide leading-relaxed">
                  {item.period}
                </span>
              </div>

              {/* Right — content */}
              <div className="pl-6">
                {/* Title + company */}
                <h3 className="text-text-primary mb-0.5">{item.title}</h3>
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

                {/* Bullets */}
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
          ))}
        </div>
      </div>
    </section>
  );
}
