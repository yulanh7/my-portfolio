"use client";

import { personal, skills } from "@/data/content";

const delays = [
  0, 0.4, 0.8, 1.2, 1.6, 2.0, 2.4, 2.8, 0.2, 0.6, 1.0, 1.4, 1.8, 2.2, 2.6, 3.0,
  0.3, 0.9, 1.5, 2.1,
];

export default function Hero() {
  return (
    <section id="about" className="pt-32 pb-16 border-b border-border">
      <div className="container">
        <div className="flex justify-between items-start flex-wrap gap-8">
          {/* Left — text */}
          <div className="flex-1 min-w-[280px]">
            {/* Location badge */}
            <div className="inline-flex items-center gap-1.5 text-xs text-text-secondary tracking-widest uppercase mb-5">
              <span className="star-decoration">✦</span>
              {personal.location} · {personal.status}
            </div>

            {/* Name */}
            <h1 className="mb-3">{personal.name}</h1>

            {/* Wave line */}
            <div className="wave-line">
              <svg
                className="wave-svg"
                viewBox="0 0 1200 20"
                preserveAspectRatio="none"
              >
                <path d="M0,10 C150,0 300,20 450,10 C600,0 750,20 900,10 C1050,0 1150,20 1200,10" />
              </svg>
            </div>

            {/* Role */}
            <h2 className="mb-1.5 text-text-primary font-normal">
              {personal.title}
            </h2>
            <p className="text-sm text-text-secondary mb-6 tracking-wide">
              {personal.subtitle}&nbsp;·&nbsp;<em>{personal.subtitleNote}</em>
            </p>

            {/* Bio */}
            <p className="max-w-[520px] mb-8">{personal.bio}</p>

            {/* Skills */}
            <div className="flex flex-wrap gap-3">
              {skills.map((skill, i) => (
                <span
                  key={skill.label}
                  className={`skill-tag ${skill.size}`}
                  style={{ animationDelay: `${delays[i] ?? 0}s` }}
                >
                  {skill.label}
                </span>
              ))}
            </div>
          </div>

          {/* Right — abstract morphing shape */}
          <div className="flex items-center justify-center shrink-0">
            <div
              className="w-40 h-40 shadow-md"
              style={{
                background:
                  "linear-gradient(135deg, var(--color-bg-secondary), var(--color-bg-accent))",
                borderRadius: "30% 70% 60% 40% / 40% 45% 55% 60%",
                animation: "morph 14s infinite alternate ease-in-out",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
