"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";

/* alternating section backgrounds: primary → secondary → primary → secondary */
export default function Home() {
  return (
    <>
      <Navbar />
      {/* bg-bg-primary (inherited from body) */}
      <Hero />
      {/* next: Projects → bg-bg-secondary */}
      {/* next: Experience → bg-bg-primary */}
    </>
  );
}
