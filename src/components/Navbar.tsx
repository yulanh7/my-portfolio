"use client";

import { useState, useEffect, useRef } from "react";
import { personal } from "@/data/content";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("about");
  const hasScrolledRef = useRef(false);

  useEffect(() => {
    const sections = ["about", "projects", "experience", "contact"];
    const NAV_HEIGHT = 64;
    const TRIGGER = NAV_HEIGHT + window.innerHeight * 0.35;

    const handleScroll = () => {
      hasScrolledRef.current = true;
      let current = sections[0];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= TRIGGER) current = id;
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!hasScrolledRef.current) return;
    window.dispatchEvent(new CustomEvent("sectionChange", { detail: activeSection }));
  }, [activeSection]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-bg-primary backdrop-blur-sm">
      <div className="container flex items-center justify-between h-16">
        {/* Left — contact icons */}
        <div className="flex items-center gap-5">
          <a
            href={`mailto:${personal.email}`}
            aria-label="Email"
            className="text-text-secondary hover:text-text-primary transition-colors duration-300"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
            </svg>
          </a>

          <a
            href={personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-text-secondary hover:text-text-primary transition-colors duration-300"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
            </svg>
          </a>

          <a
            href={personal.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-text-secondary hover:text-text-primary transition-colors duration-300"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
            </svg>
          </a>
        </div>

        {/* Centre — logo */}
        <a
          href="#"
          className="absolute left-1/2 -translate-x-1/2 font-heading italic text-2xl text-accent-brown tracking-tight hover:opacity-70 transition-opacity duration-300"
        >
          RH
        </a>

        {/* Right — nav links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`text-xs font-medium tracking-widest uppercase transition-all duration-300 hover:-translate-y-0.5 ${
                activeSection === link.href.replace("#", "")
                  ? "text-text-primary border-b border-text-primary pb-0.5"
                  : "text-text-secondary hover:text-text-primary"
              }`}
            >
              {link.label}
            </a>
          ))}
          <span style={{ color: "var(--color-border)", fontSize: "1rem" }}>
            |
          </span>
          <a
            href="/Rachel_Huang_Resume.docx"
            download="Rachel_Huang_Resume.docx"
            className="text-xs font-medium tracking-widest uppercase transition-all duration-300 hover:-translate-y-0.5 flex items-center gap-1 px-3 py-1.5 rounded-full"
            style={{
              color: "var(--color-accent-brown)",
              border: "1px solid var(--color-border)",
              background: "var(--color-surface)",
            }}
          >
            <svg
              width="11"
              height="11"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            CV
          </a>
        </nav>
      </div>
    </header>
  );
}
