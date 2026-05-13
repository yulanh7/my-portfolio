"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/content";

/* alternating section backgrounds: primary → secondary → primary → secondary */
export default function Home() {
  return (
    <>
      <Navbar />
      {/* bg-bg-primary (inherited from body) */}
      <Hero />

      {/* Projects → bg-bg-secondary */}
      <section id="projects" className="bg-bg-secondary py-20">
        <div className="container">
          <div className="flex items-center gap-3 mb-10">
            <span className="star-decoration text-accent-green">✦</span>
            <h2>Selected Projects</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </div>
      </section>
      {/* next: Experience → bg-bg-primary */}
    </>
  );
}
