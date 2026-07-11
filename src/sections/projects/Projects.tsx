"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import ProjectGalleryModal, { ProjectData } from '../../components/ProjectGalleryModal';

const projects: ProjectData[] = [
  {
    title: "Budapest Visegrádi 17",
    category: "Architecture",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop",
    colSpan: "col-span-1 md:col-span-2",
  },
  {
    title: "Vienna Classic",
    category: "Interior",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000&auto=format&fit=crop",
    colSpan: "col-span-1 md:col-span-1",
  },
  {
    title: "Bratislava Modern",
    category: "Exterior",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2000&auto=format&fit=crop",
    colSpan: "col-span-1 md:col-span-1",
  },
  {
    title: "Prague Penthouse",
    category: "Interior",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2000&auto=format&fit=crop",
    colSpan: "col-span-1 md:col-span-2",
  },
];

export default function Projects() {
  const shouldReduceMotion = useReducedMotion();
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);

  return (
    <>
      <section id="projects" className="w-full bg-background text-foreground px-8 md:px-16 py-12 md:py-16 relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="flex flex-col mb-12"
        >
          <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl xl:text-8xl leading-none uppercase tracking-wide">
            Projects That Inspire
          </h2>
          <p className="font-sans text-sm md:text-base opacity-70 max-w-md mt-6">
            A curated selection of our finest architectural and interior visualization work. Click to explore case studies.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div 
              key={index} 
              className={`group cursor-pointer ${project.colSpan}`}
              onClick={() => setSelectedProject(project)}
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: shouldReduceMotion ? 0 : index * 0.1, ease: "easeOut" }}
            >
              <div className="w-full aspect-[4/3] md:aspect-auto md:h-[60vh] overflow-hidden relative mb-6 rounded-sm">
                <Image 
                  src={project.image} 
                  alt={project.title} 
                  fill
                  className="object-cover grayscale-[20%] transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              
              <div className="flex items-center justify-between border-b border-border-subtle pb-4 group-hover:border-muted transition-colors">
                <h3 className="font-serif text-2xl md:text-3xl">{project.title}</h3>
                <span className="font-sans text-xs uppercase tracking-widest opacity-50">{project.category}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <ProjectGalleryModal 
        project={selectedProject} 
        isOpen={!!selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
    </>
  );
}
