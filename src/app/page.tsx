"use client";

import Hero from "@/components/Hero";
import SkillCloud from "@/components/SkillCloud";

export default function Home() {
  return (
    <>
      <Hero />
      <div className="border-b border-border">
        <SkillCloud />
      </div>
    </>
  );
}
