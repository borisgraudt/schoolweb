'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ProjectCard } from '@/components/ProjectCard';
import { projects } from '@/lib/projects';

export default function ProjectsPage() {
  const [filter, setFilter] = useState<"all" | "science" | "art">("all");

  const filteredProjects = projects.filter(project => {
    if (filter === "all") {
      return true;
    }
    return project.type === filter;
  });

  return (
    <main className="min-h-screen bg-bauhaus-light py-20 px-4 font-body">
      <div className="container mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-bold text-bauhaus-blue text-center mb-12"
        >
          Наши Проекты
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          <button
            onClick={() => setFilter("all")}
            className={`px-6 py-2 rounded-full text-lg font-semibold transition-colors ${filter === "all" ? "bg-bauhaus-red text-bauhaus-white" : "bg-bauhaus-green text-bauhaus-white hover:bg-opacity-90"}`}
          >
            Все
          </button>
          <button
            onClick={() => setFilter("science")}
            className={`px-6 py-2 rounded-full text-lg font-semibold transition-colors ${filter === "science" ? "bg-bauhaus-red text-bauhaus-white" : "bg-bauhaus-green text-bauhaus-white hover:bg-opacity-90"}`}
          >
            Наука
          </button>
          <button
            onClick={() => setFilter("art")}
            className={`px-6 py-2 rounded-full text-lg font-semibold transition-colors ${filter === "art" ? "bg-bauhaus-red text-bauhaus-white" : "bg-bauhaus-green text-bauhaus-white hover:bg-opacity-90"}`}
          >
            Искусство
          </button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
} 