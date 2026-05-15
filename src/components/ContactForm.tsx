"use client";

import { useState } from "react";
import { personal } from "@/data/content";

const EmailIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const PhoneIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.73 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.64 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 17.92z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const GitHubIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65S9.1 17.4 9 18v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const ArrowIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

const contactItems = [
  {
    icon: <EmailIcon />,
    label: personal.email,
    href: `mailto:${personal.email}`,
    external: false,
  },
  {
    icon: <PhoneIcon />,
    label: personal.phone,
    href: `tel:${personal.phone.replace(/\s/g, "")}`,
    external: false,
  },
  {
    icon: <LinkedInIcon />,
    label: "linkedin.com/in/yulan-huang",
    href: personal.linkedin,
    external: true,
  },
  {
    icon: <GitHubIcon />,
    label: "github.com/yulanh7",
    href: personal.github,
    external: true,
  },
];

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-0 w-full">
      {/* Left column — contact info */}
      <div className="w-full md:w-[40%] py-8 md:py-12 md:pr-12">
        <h2
          className="italic mb-4"
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "var(--text-h2)",
            lineHeight: "var(--leading-h2)",
            color: "var(--color-text-primary)",
          }}
        >
          Let&apos;s work together
        </h2>
        <p
          className="mb-10"
          style={{
            color: "var(--color-text-secondary)",
            fontSize: "var(--text-small)",
          }}
        >
          Actively seeking front-end opportunities in Canberra
        </p>

        <ul className="flex flex-col gap-5">
          {contactItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                {...(item.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="group flex items-center gap-3 transition-colors duration-200"
                style={{
                  color: "var(--color-text-secondary)",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color =
                    "var(--color-accent-brown)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color =
                    "var(--color-text-secondary)";
                }}
              >
                <span className="flex-shrink-0">{item.icon}</span>
                <span style={{ fontSize: "var(--text-small)" }}>
                  {item.label}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Vertical divider */}
      <div
        className="hidden md:block w-px self-stretch mx-0"
        style={{ background: "var(--color-border)" }}
      />

      {/* Right column — form */}
      <div className="w-full md:w-[60%] py-8 md:py-12 md:pl-12">
        <div className="flex flex-col gap-8">
          {/* Name + Email row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Name"
              className="w-full py-2 text-sm outline-none bg-transparent transition-colors duration-200"
              style={{
                borderBottom: "1px solid var(--color-border)",
                borderTop: "none",
                borderLeft: "none",
                borderRight: "none",
                borderRadius: 0,
                color: "var(--color-text-primary)",
              }}
              onFocus={(e) =>
                (e.target.style.borderBottomColor = "var(--color-accent-brown)")
              }
              onBlur={(e) =>
                (e.target.style.borderBottomColor = "var(--color-border)")
              }
            />
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="Email"
              className="w-full py-2 text-sm outline-none bg-transparent transition-colors duration-200"
              style={{
                borderBottom: "1px solid var(--color-border)",
                borderTop: "none",
                borderLeft: "none",
                borderRight: "none",
                borderRadius: 0,
                color: "var(--color-text-primary)",
              }}
              onFocus={(e) =>
                (e.target.style.borderBottomColor = "var(--color-accent-brown)")
              }
              onBlur={(e) =>
                (e.target.style.borderBottomColor = "var(--color-border)")
              }
            />
          </div>

          {/* Message */}
          <textarea
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            placeholder="your message"
            rows={4}
            className="w-full py-2 text-sm outline-none bg-transparent resize-none transition-colors duration-200"
            style={{
              borderBottom: "1px solid var(--color-border)",
              borderTop: "none",
              borderLeft: "none",
              borderRight: "none",
              borderRadius: 0,
              color: "var(--color-text-primary)",
            }}
            onFocus={(e) =>
              (e.target.style.borderBottomColor = "var(--color-accent-brown)")
            }
            onBlur={(e) =>
              (e.target.style.borderBottomColor = "var(--color-border)")
            }
          />

          {/* Send button */}
          <div className="flex flex-col gap-3">
            <button
              onClick={handleSubmit}
              disabled={status === "loading"}
              className="w-full flex items-center justify-center gap-2 py-3 text-sm font-medium text-white transition-opacity duration-200"
              style={{
                background: "var(--color-accent-brown)",
                borderRadius: "var(--radius-full)",
                border: "none",
                cursor: status === "loading" ? "wait" : "pointer",
                opacity: status === "loading" ? 0.7 : 1,
              }}
            >
              {status === "loading" ? (
                "Sending..."
              ) : (
                <>
                  Send Message <ArrowIcon />
                </>
              )}
            </button>

            {status === "success" && (
              <p
                className="text-sm text-center"
                style={{ color: "var(--color-accent-green)" }}
              >
                ✓ Message sent! I&apos;ll get back to you soon.
              </p>
            )}
            {status === "error" && (
              <p className="text-sm text-center" style={{ color: "#e05c5c" }}>
                Something went wrong. Please try again or email me directly.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
