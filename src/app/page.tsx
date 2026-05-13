"use client";

import Hero from "@/components/Hero";
import SkillCloud from "@/components/SkillCloud";

export default function Home() {
  return (
    <>
      <Hero />
      <div style={{ borderBottom: "1px solid var(--color-border)" }}>
        <SkillCloud />
      </div>
    </>
  );
}
