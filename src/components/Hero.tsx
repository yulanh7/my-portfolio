"use client";

import { personal } from "@/data/content";

export default function Hero() {
  return (
    <section
      style={{
        paddingTop: "7rem",
        paddingBottom: "4rem",
        borderBottom: "1px solid var(--color-border)",
      }}
    >
      <div className="container">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            flexWrap: "wrap",
            gap: "2rem",
          }}
        >
          {/* Left — text */}
          <div style={{ flex: "1", minWidth: "280px" }}>
            {/* Location badge */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                fontSize: "0.78rem",
                color: "var(--color-text-secondary)",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                marginBottom: "1.25rem",
              }}
            >
              <span className="star-decoration">✦</span>
              {personal.location} · {personal.status}
            </div>

            {/* Name */}
            <h1 style={{ marginBottom: "0.75rem" }}>{personal.name}</h1>

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
            <h2
              style={{
                marginBottom: "0.4rem",
                color: "var(--color-text-primary)",
                fontWeight: 400,
              }}
            >
              {personal.title}
            </h2>
            <p
              style={{
                fontSize: "0.95rem",
                color: "var(--color-text-secondary)",
                marginBottom: "1.5rem",
                letterSpacing: "0.02em",
              }}
            >
              {personal.subtitle}
              &nbsp;·&nbsp;
              <em>{personal.subtitleNote}</em>
            </p>

            {/* Bio */}
            <p style={{ maxWidth: "520px", marginBottom: "2rem" }}>
              {personal.bio}
            </p>

            {/* Contact buttons */}
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
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
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <div
              style={{
                width: "160px",
                height: "160px",
                background:
                  "linear-gradient(135deg, var(--color-bg-secondary), var(--color-bg-accent))",
                borderRadius: "30% 70% 60% 40% / 40% 45% 55% 60%",
                animation: "morph 14s infinite alternate ease-in-out",
                boxShadow: "var(--shadow-md)",
              }}
            />
            <style>{`
              @keyframes morph {
                0%   { border-radius: 30% 70% 60% 40% / 40% 45% 55% 60%; }
                50%  { border-radius: 50% 50% 30% 70% / 60% 40% 60% 40%; }
                100% { border-radius: 70% 30% 40% 60% / 60% 55% 45% 40%; }
              }
            `}</style>
          </div>
        </div>
      </div>
    </section>
  );
}
