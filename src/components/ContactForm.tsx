"use client";

import { useState } from "react";

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
    <div className="max-w-lg">
      <div className="flex flex-col gap-4">
        {/* Name */}
        <div>
          <label className="text-xs tracking-widest uppercase text-text-secondary mb-2 block">
            Name
          </label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Your name"
            className="w-full px-4 py-3 text-sm rounded-md outline-none transition-all duration-300"
            style={{
              background: "var(--color-bg-primary)",
              border: "1px solid var(--color-border)",
              color: "var(--color-text-primary)",
            }}
            onFocus={(e) =>
              (e.target.style.borderColor = "var(--color-accent-brown)")
            }
            onBlur={(e) => (e.target.style.borderColor = "var(--color-border)")}
          />
        </div>

        {/* Email */}
        <div>
          <label className="text-xs tracking-widest uppercase text-text-secondary mb-2 block">
            Email
          </label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="your@email.com"
            className="w-full px-4 py-3 text-sm rounded-md outline-none transition-all duration-300"
            style={{
              background: "var(--color-bg-primary)",
              border: "1px solid var(--color-border)",
              color: "var(--color-text-primary)",
            }}
            onFocus={(e) =>
              (e.target.style.borderColor = "var(--color-accent-brown)")
            }
            onBlur={(e) => (e.target.style.borderColor = "var(--color-border)")}
          />
        </div>

        {/* Message */}
        <div>
          <label className="text-xs tracking-widest uppercase text-text-secondary mb-2 block">
            Message
          </label>
          <textarea
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            placeholder="Tell me about your project..."
            rows={5}
            className="w-full px-4 py-3 text-sm rounded-md outline-none transition-all duration-300 resize-none"
            style={{
              background: "var(--color-bg-primary)",
              border: "1px solid var(--color-border)",
              color: "var(--color-text-primary)",
            }}
            onFocus={(e) =>
              (e.target.style.borderColor = "var(--color-accent-brown)")
            }
            onBlur={(e) => (e.target.style.borderColor = "var(--color-border)")}
          />
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={status === "loading"}
          className="btn-contact w-fit px-8 py-3 transition-all duration-300"
          style={{
            background:
              status === "loading"
                ? "var(--color-bg-accent)"
                : "var(--color-accent-brown)",
            border: "none",
            color: "white",
            cursor: status === "loading" ? "wait" : "none",
            borderRadius: "var(--radius-full)",
          }}
        >
          {status === "loading" ? "Sending..." : "Send Message"}
        </button>

        {/* Status messages */}
        {status === "success" && (
          <p className="text-sm" style={{ color: "var(--color-accent-green)" }}>
            ✓ Message sent! I'll get back to you soon.
          </p>
        )}
        {status === "error" && (
          <p className="text-sm" style={{ color: "#e05c5c" }}>
            Something went wrong. Please try again or email me directly.
          </p>
        )}
      </div>
    </div>
  );
}
