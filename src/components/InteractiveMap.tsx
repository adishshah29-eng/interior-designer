"use client";

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
// @ts-ignore
import India from '@svg-maps/india';

const locations = [
  // Coordinates are percentages relative to the 612x696 India viewBox
  { id: 'del', name: 'New Delhi', top: '28%', left: '32%', project: 'Capital Complex', status: 'Completed 2024' },
  { id: 'mum', name: 'Mumbai', top: '63%', left: '17%', project: 'Sea Link Towers', status: 'Completed 2023' },
  { id: 'blr', name: 'Bangalore', top: '78%', left: '33%', project: 'Tech Park Campus', status: 'In Progress' },
  { id: 'hyd', name: 'Hyderabad', top: '66%', left: '38%', project: 'Pearl Residences', status: 'Planning Phase' },
  { id: 'kol', name: 'Kolkata', top: '51%', left: '72%', project: 'Heritage Restoration', status: 'Completed 2025' },
];

export default function InteractiveMap() {
  const [hoveredLocation, setHoveredLocation] = useState<string | null>(null);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <div 
      ref={containerRef}
      className="relative w-full aspect-square md:aspect-[21/9] bg-[#0a0a0a] rounded-sm overflow-hidden border border-white/5 flex items-center justify-center"
    >
      
      {/* Abstract Map Background (Grid / Texture) */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}
      />
      
      {/* Container locked to India Map aspect ratio to perfectly align dots */}
      <div className="relative h-[85%] max-h-full aspect-[612/696] flex items-center justify-center z-10">
        
        {/* Animated India Map Graphic */}
        <div className="absolute inset-0 opacity-40 pointer-events-none">
          <svg 
            viewBox={India.viewBox} 
            className="w-full h-full stroke-white fill-transparent"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {India.locations.map((location: any, index: number) => (
              <motion.path 
                key={location.id} 
                id={location.id} 
                d={location.path} 
                initial={{ pathLength: 0, opacity: 0 }}
                animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
                transition={{ 
                  duration: 2.5, 
                  ease: "easeInOut",
                  delay: index * 0.05
                }}
              />
            ))}
          </svg>
        </div>

        {/* Location Markers */}
        <AnimatePresence>
          {locations.map((loc, i) => (
            <motion.div
              key={loc.id}
              className="absolute w-3 h-3 md:w-4 md:h-4 z-20"
              style={{ top: loc.top, left: loc.left }}
              initial={{ scale: 0, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
              transition={{ delay: 2 + i * 0.2, type: "spring", stiffness: 200 }}
              onMouseEnter={() => setHoveredLocation(loc.id)}
              onMouseLeave={() => setHoveredLocation(null)}
            >
              <div className="relative w-full h-full group cursor-pointer">
                {/* Ping animation */}
                <div className="absolute inset-0 bg-white rounded-full opacity-75 animate-ping duration-1000" />
                {/* Core dot */}
                <div className="absolute inset-0 bg-white rounded-full border-2 border-[#0a0a0a] group-hover:scale-150 transition-transform duration-300" />
                
                {/* Tooltip / Info Card */}
                <AnimatePresence>
                  {hoveredLocation === loc.id && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 5, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-48 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-sm shadow-2xl pointer-events-none"
                    >
                      <h4 className="text-white text-sm font-medium mb-1">{loc.name}</h4>
                      <p className="text-white/70 text-xs mb-2">{loc.project}</p>
                      <span className="inline-block px-2 py-1 bg-white/10 text-white text-[10px] uppercase tracking-wider rounded-sm border border-white/10">
                        {loc.status}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-transparent to-[#0a0a0a] pointer-events-none z-0" />
    </div>
  );
}
