"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export interface ProjectData {
  title: string;
  category: string;
  image: string;
  colSpan?: string;
}

interface ProjectGalleryModalProps {
  project: ProjectData | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectGalleryModal({ project, isOpen, onClose }: ProjectGalleryModalProps) {
  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!project) return null;

  // Placeholder images for the gallery
  const galleryImages = [
    project.image,
    "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1600&auto=format&fit=crop",
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: "100%" }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed inset-0 z-[100] bg-background text-foreground overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-label={`${project.title} Case Study`}
        >
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="fixed top-8 right-8 z-50 w-12 h-12 flex items-center justify-center rounded-full bg-black/50 backdrop-blur-md text-white hover:bg-black/80 transition-colors"
            aria-label="Close Gallery"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          {/* Hero Section */}
          <div className="relative w-full h-[60vh] md:h-[80vh]">
            <Image 
              src={project.image} 
              alt={project.title} 
              fill 
              className="object-cover"
              sizes="100vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent flex flex-col justify-end p-8 md:p-16">
              <span className="font-sans text-xs md:text-sm uppercase tracking-widest opacity-80 mb-4">{project.category}</span>
              <h2 className="font-serif text-5xl md:text-8xl">{project.title}</h2>
            </div>
          </div>

          {/* Brief & Details */}
          <div className="max-w-7xl mx-auto px-8 md:px-16 py-16 md:py-24 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
            <div className="md:col-span-4 flex flex-col gap-8 font-sans text-sm tracking-wider uppercase opacity-70">
              <div>
                <strong className="block mb-2 opacity-50">Client</strong>
                Private Client
              </div>
              <div>
                <strong className="block mb-2 opacity-50">Location</strong>
                Global
              </div>
              <div>
                <strong className="block mb-2 opacity-50">Year</strong>
                2025
              </div>
            </div>
            
            <div className="md:col-span-8">
              <h3 className="font-sans text-xl md:text-2xl leading-relaxed opacity-90">
                This project represents a synthesis of contextual design and modern restraint. By paring back unnecessary ornamentation, we allowed the inherent qualities of the materials to dictate the spatial experience. 
              </h3>
              <p className="mt-8 font-sans text-sm md:text-base leading-relaxed opacity-70">
                Natural light was utilized as a primary architectural material, carving out volumes and establishing a dynamic rhythm throughout the day. The resulting environment is both deeply grounding and profoundly expansive, a true testament to our core philosophy.
              </p>
            </div>
          </div>

          {/* Masonry Gallery */}
          <div className="max-w-7xl mx-auto px-8 md:px-16 pb-32 grid grid-cols-1 md:grid-cols-2 gap-8">
            {galleryImages.map((img, idx) => (
              <div 
                key={idx} 
                className={`relative w-full overflow-hidden ${idx === 0 || idx === 3 ? "aspect-square" : "aspect-[4/3]"}`}
              >
                <Image 
                  src={img} 
                  alt={`${project.title} detail ${idx + 1}`} 
                  fill 
                  className="object-cover hover:scale-105 transition-transform duration-1000"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
