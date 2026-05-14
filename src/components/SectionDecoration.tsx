"use client";

import { useEffect, useState } from "react";

type Position = "top-right" | "top-left" | "bottom-right" | "bottom-left";

const positionClasses: Record<Position, string> = {
  "top-right": "absolute top-6 right-8",
  "top-left": "absolute top-6 left-8",
  "bottom-right": "absolute bottom-6 right-8",
  "bottom-left": "absolute bottom-6 left-8",
};

interface Props {
  position: Position;
  sectionId: string;
  toggle?: boolean;
  children: React.ReactNode;
}

export default function SectionDecoration({ position, sectionId, toggle = false, children }: Props) {
  const [visible, setVisible] = useState(false);
  const [hasBeenVisible, setHasBeenVisible] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (toggle) {
        const isActive = customEvent.detail === sectionId;
        setVisible(isActive);
        if (isActive) setHasBeenVisible(true);
      } else {
        if (customEvent.detail === sectionId) setVisible(true);
      }
    };
    window.addEventListener("sectionChange", handler);
    return () => window.removeEventListener("sectionChange", handler);
  }, [sectionId, toggle]);

  const stateClass = visible
    ? "decoration-visible"
    : hasBeenVisible
    ? "decoration-exit"
    : "";

  return (
    <div
      className={`hidden md:block pointer-events-none z-10 ${positionClasses[position]} ${toggle ? "decoration-toggle" : ""} ${stateClass}`}
    >
      {children}
    </div>
  );
}
