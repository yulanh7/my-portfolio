"use client";

import { personal, skills, education } from "@/data/content";
import { useTypewriter } from "@/hooks/useTypewriter";

const delays = [
  0, 0.4, 0.8, 1.2, 1.6, 2.0, 2.4, 2.8, 0.2, 0.6, 1.0, 1.4, 1.8, 2.2, 2.6, 3.0,
  0.3, 0.9, 1.5, 2.1,
];

export default function Hero() {
  const typedTitle = useTypewriter(personal.titles);

  return (
    <section id="about" className="pt-32 pb-16">
      <div className="container">
        <div className="flex justify-between items-start flex-wrap gap-8">
          {/* Left — text */}
          <div className="flex-1 min-w-[280px]">
            {/* Location badge */}
            <div className="inline-flex items-center gap-1.5 text-xs tracking-widest uppercase mb-5" style={{ color: "var(--color-accent-green)" }}>
              <span>✦</span>
              {personal.location} · {personal.status}
            </div>

            {/* Name */}
            <h1 className="mb-2 font-bold">{personal.name}</h1>

            {/* Role */}
            <h3 className="mb-5 text-text-primary font-bold border-l-accent text-text-secondary">
              {typedTitle}
              <span
                className="animate-pulse ml-0.5"
                style={{ color: "var(--color-accent-brown)" }}
              >
                |
              </span>
            </h3>
            {/* <p className="text-sm text-text-secondary mb-6 tracking-wide">
              {personal.subtitle}&nbsp;·&nbsp;<em>{personal.subtitleNote}</em>
            </p> */}

            {/* Bio */}
            <p className=" mb-6">{personal.bio}</p>
            <p className="text-xs text-text-secondary tracking-wide mb-6">
              <span style={{ color: "var(--color-accent-green)" }}>✦</span>
              &nbsp;{education.degree} · {education.school}
            </p>
            {/* Wave line — between bio and skills */}
            <div className="wave-line mb-6">
              <svg
                className="wave-svg"
                viewBox="0 0 1200 20"
                preserveAspectRatio="none"
              >
                <path d="M0,10 C150,0 300,20 450,10 C600,0 750,20 900,10 C1050,0 1150,20 1200,10" />
              </svg>
            </div>

            {/* Skills */}
            <div className="flex flex-wrap gap-3">
              {skills.map((skill, i) => (
                <span
                  key={skill.label}
                  className={`skill-tag `}
                  style={{ animationDelay: `${delays[i] ?? 0}s` }}
                >
                  {skill.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
