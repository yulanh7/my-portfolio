"use client";

import { useState } from "react";
import { personal } from "@/data/content";

const EmailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
  </svg>
);

const PhoneIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
  </svg>
);

const GitHubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
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
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    message?: string;
  }>({});

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();

    const newErrors: { name?: string; email?: string; message?: string } = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = "Please enter a valid email";
    if (!form.message.trim()) newErrors.message = "Message is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});

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
            <div>
              <input
                type="text"
                value={form.name}
                onChange={(e) => {
                  setForm({ ...form, name: e.target.value });
                  if (errors.name) setErrors({ ...errors, name: undefined });
                }}
                placeholder="Name"
                className="w-full py-2 text-sm outline-none bg-transparent transition-colors duration-200"
                style={{
                  borderBottom: `1px solid ${errors.name ? "#e05c5c" : "var(--color-border)"}`,
                  borderTop: "none",
                  borderLeft: "none",
                  borderRight: "none",
                  borderRadius: 0,
                  color: "var(--color-text-primary)",
                }}
                onFocus={(e) =>
                  (e.target.style.borderBottomColor =
                    errors.name ? "#e05c5c" : "var(--color-accent-brown)")
                }
                onBlur={(e) =>
                  (e.target.style.borderBottomColor = errors.name
                    ? "#e05c5c"
                    : "var(--color-border)")
                }
              />
              {errors.name && (
                <p className="text-xs mt-1" style={{ color: "#e05c5c" }}>
                  {errors.name}
                </p>
              )}
            </div>
            <div>
              <input
                type="email"
                value={form.email}
                onChange={(e) => {
                  setForm({ ...form, email: e.target.value });
                  if (errors.email) setErrors({ ...errors, email: undefined });
                }}
                placeholder="Email"
                className="w-full py-2 text-sm outline-none bg-transparent transition-colors duration-200"
                style={{
                  borderBottom: `1px solid ${errors.email ? "#e05c5c" : "var(--color-border)"}`,
                  borderTop: "none",
                  borderLeft: "none",
                  borderRight: "none",
                  borderRadius: 0,
                  color: "var(--color-text-primary)",
                }}
                onFocus={(e) =>
                  (e.target.style.borderBottomColor =
                    errors.email ? "#e05c5c" : "var(--color-accent-brown)")
                }
                onBlur={(e) =>
                  (e.target.style.borderBottomColor = errors.email
                    ? "#e05c5c"
                    : "var(--color-border)")
                }
              />
              {errors.email && (
                <p className="text-xs mt-1" style={{ color: "#e05c5c" }}>
                  {errors.email}
                </p>
              )}
            </div>
          </div>

          {/* Message */}
          <div>
            <textarea
              value={form.message}
              onChange={(e) => {
                setForm({ ...form, message: e.target.value });
                if (errors.message)
                  setErrors({ ...errors, message: undefined });
              }}
              placeholder="your message"
              rows={4}
              className="w-full py-2 text-sm outline-none bg-transparent resize-none transition-colors duration-200"
              style={{
                borderBottom: `1px solid ${errors.message ? "#e05c5c" : "var(--color-border)"}`,
                borderTop: "none",
                borderLeft: "none",
                borderRight: "none",
                borderRadius: 0,
                color: "var(--color-text-primary)",
              }}
              onFocus={(e) =>
                (e.target.style.borderBottomColor =
                  errors.message ? "#e05c5c" : "var(--color-accent-brown)")
              }
              onBlur={(e) =>
                (e.target.style.borderBottomColor = errors.message
                  ? "#e05c5c"
                  : "var(--color-border)")
              }
            />
            {errors.message && (
              <p className="text-xs mt-1" style={{ color: "#e05c5c" }}>
                {errors.message}
              </p>
            )}
          </div>

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
