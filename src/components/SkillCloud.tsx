"use client";

import { skills } from "@/data/content";

const delays = [
  0, 0.4, 0.8, 1.2, 1.6, 2.0, 2.4, 2.8, 0.2, 0.6, 1.0, 1.4, 1.8, 2.2, 2.6, 3.0,
  0.3, 0.9, 1.5, 2.1,
];

export default function SkillCloud() {
  return (
    <section style={{ padding: "4rem 0" }}>
      <div className="container">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            marginBottom: "2rem",
          }}
        >
          <span className="star-decoration">✦</span>
          <h2>Skills</h2>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
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
    </section>
  );
}
