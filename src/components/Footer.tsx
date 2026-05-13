"use client";

export default function Footer() {
  return (
    <footer
      className="border-t border-border"
      style={{ background: "rgba(237, 224, 212, 0.2)" }}
    >
      <div className="container py-6 flex flex-col md:flex-row justify-between items-center gap-2">
        <small className="text-text-secondary">
          © 2025 Rachel (Yulan) Huang · Canberra, Australia
        </small>
        <small className="text-text-secondary">
          Built with Next.js · TypeScript · Tailwind CSS
        </small>
      </div>
    </footer>
  );
}
