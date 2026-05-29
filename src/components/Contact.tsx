"use client";

import { useState, useEffect } from "react";
import ContactForm from "@/components/ContactForm";
import SectionHeader from "@/components/SectionHeader";

const STAR_PATH =
  "M0 -20 C0 -20 -1 -7 -4 -4 C-7 -1 -20 0 -20 0 C-20 0 -7 1 -4 4 C-1 7 0 20 0 20 C0 20 1 7 4 4 C7 1 20 0 20 0 C20 0 7 -1 4 -4 C1 -7 0 -20 0 -20 Z";

export default function Contact() {
  const [arcVisible, setArcVisible] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      setArcVisible((e as CustomEvent).detail === "contact");
    };
    window.addEventListener("sectionChange", handler);
    return () => window.removeEventListener("sectionChange", handler);
  }, []);

  const cls = `arc-decoration${arcVisible ? " is-visible" : ""}`;

  return (
    <section
      id="contact"
      className="py-20 relative overflow-hidden"
      style={{ background: "rgba(237, 224, 212, 0.2)" }}
    >
      {/* Bottom-left: overlapping circles */}
      <div className="hidden md:block absolute bottom-0 left-0 pointer-events-none z-10">
        <svg width="280" height="240" viewBox="0 0 280 240" fill="none" className={cls}>
          <circle cx="0" cy="240" r="180" stroke="var(--color-accent-brown)" strokeWidth="1.8" opacity="0.45" />
          <circle cx="100" cy="240" r="140" stroke="var(--color-accent-brown)" strokeWidth="1.8" opacity="0.45" />
          <circle cx="0" cy="140" r="140" stroke="var(--color-accent-brown)" strokeWidth="1.8" opacity="0.45" />
          <g transform="translate(114, 101) scale(0.65)">
            <g className="arc-star arc-star-1">
              <path d={STAR_PATH} fill="var(--color-accent-brown)" opacity="1" />
            </g>
          </g>
          <g transform="translate(139, 126) scale(0.5)">
            <g className="arc-star arc-star-2">
              <path d={STAR_PATH} fill="var(--color-accent-brown)" opacity="0.75" />
            </g>
          </g>
        </svg>
      </div>

      {/* Top-right: overlapping circles */}
      <div className="hidden md:block absolute top-0 right-0 pointer-events-none z-10">
        <svg width="280" height="240" viewBox="0 0 280 240" fill="none" className={cls}>
          <circle cx="280" cy="0" r="180" stroke="var(--color-accent-brown)" strokeWidth="1.8" opacity="0.45" />
          <circle cx="180" cy="0" r="140" stroke="var(--color-accent-brown)" strokeWidth="1.8" opacity="0.45" />
          <circle cx="280" cy="100" r="140" stroke="var(--color-accent-brown)" strokeWidth="1.8" opacity="0.45" />
          <g transform="translate(166, 139) scale(0.65)">
            <g className="arc-star arc-star-1">
              <path d={STAR_PATH} fill="var(--color-accent-brown)" opacity="1" />
            </g>
          </g>
          <g transform="translate(141, 114) scale(0.5)">
            <g className="arc-star arc-star-2">
              <path d={STAR_PATH} fill="var(--color-accent-brown)" opacity="0.75" />
            </g>
          </g>
        </svg>
      </div>

      <div className="container">
        <SectionHeader
          label="Contact  "
          title="Actively Seeking Opportunities"
          labelColor="var(--color-accent-brown-text)"
        />
        <ContactForm />
      </div>
    </section>
  );
}
