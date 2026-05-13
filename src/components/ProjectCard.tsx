"use client";

import Image from "next/image";

interface Project {
  title: string;
  badge?: string;
  description: string;
  tech: string[];
  image: string;
  link: string | null;
}

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="project-card group">
      {/* 16:9 image area */}
      <div className="project-card-image overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          width={600}
          height={338}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 group-hover:brightness-105"
        />
      </div>

      {/* Card body */}
      <div className="project-card-body">
        {/* Title row */}
        <div className="flex items-center gap-2 mb-2">
          <h3 className="text-text-primary">
            {project.link ? (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent-brown transition-colors duration-300"
              >
                {project.title} ↗
              </a>
            ) : (
              project.title
            )}
          </h3>
          {project.badge && (
            <span className="text-xs px-2 py-0.5 bg-bg-accent text-text-secondary rounded-full font-medium tracking-wide">
              {project.badge}
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-sm mb-4">{project.description}</p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <span
              key={t}
              className="text-xs px-2.5 py-1 border border-border rounded-full text-text-secondary bg-bg-primary"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
