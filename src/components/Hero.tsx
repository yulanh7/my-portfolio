"use client";

import { personal } from "@/data/content";

export default function Hero() {
  return (
    <section className="pt-28 pb-16 border-b border-border">
      <div className="container">
        <div className="flex justify-between items-start flex-wrap gap-8">
          {/* Left — text */}
          <div className="flex-1 min-w-72">
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
              {personal.subtitle}
              &nbsp;·&nbsp;
              <em>{personal.subtitleNote}</em>
            </p>

            {/* Bio */}
            <p className="max-w-lg mb-8">{personal.bio}</p>

            {/* Contact buttons */}
            <div className="flex gap-3 flex-wrap">
              <a href={`mailto:${personal.email}`} className="btn-contact">
                <span>✉</span> Email
              </a>
              <a
                href={personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-contact"
              >
                <span>↗</span> LinkedIn
              </a>
              <a
                href={personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-contact"
              >
                <span>↗</span> GitHub
              </a>
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
