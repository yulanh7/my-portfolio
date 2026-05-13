"use client";

export default function Footer() {
  return (
    <footer className="bg-bg-secondary border-t border-border">
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
