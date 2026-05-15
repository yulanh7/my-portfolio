"use client";

interface SectionHeaderProps {
  label: string;
  title?: string;
  labelColor?: string;
  className?: string;
}

export default function SectionHeader({
  label,
  title,
  labelColor = "var(--color-accent-green)",
  className = "",
}: SectionHeaderProps) {
  return (
    <div className={`mb-10 ${className}`}>
      <div className="flex items-center gap-2 mb-3">
        <span style={{ color: labelColor, fontSize: "0.7rem" }}>✦</span>
        <span
          className="text-xs tracking-widest uppercase font-medium"
          style={{ color: labelColor }}
        >
          {label}
        </span>
      </div>
      {title && <h2>{title}</h2>}
    </div>
  );
}
