"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
}

export default function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel = "Before",
  afterLabel = "After",
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
    
    setSliderPosition(percent);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchend", handleMouseUp);
    
    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, []);

  return (
    <div 
      className="relative w-full aspect-[4/3] md:aspect-video overflow-hidden rounded-sm select-none"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onMouseLeave={() => setIsDragging(false)}
    >
      {/* Before Image (Background) */}
      <div className="absolute inset-0">
        <Image 
          src={beforeImage} 
          alt="Before" 
          fill 
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 80vw"
        />
        <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md text-white px-3 py-1 text-xs uppercase tracking-widest font-sans font-medium rounded-full">
          {beforeLabel}
        </div>
      </div>

      {/* After Image (Clipped) */}
      <div 
        className="absolute inset-0 border-r border-white/50"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <Image 
          src={afterImage} 
          alt="After" 
          fill 
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 80vw"
        />
        <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-md text-black px-3 py-1 text-xs uppercase tracking-widest font-sans font-medium rounded-full">
          {afterLabel}
        </div>
      </div>

      {/* Slider Handle */}
      <div 
        className="absolute top-0 bottom-0 w-1 cursor-ew-resize flex items-center justify-center z-10"
        style={{ left: `calc(${sliderPosition}% - 2px)` }}
        onMouseDown={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onTouchStart={() => setIsDragging(true)}
      >
        <div className="w-8 h-12 bg-white flex items-center justify-center rounded-sm shadow-xl hover:scale-105 transition-transform">
          <div className="flex gap-1">
            <div className="w-[1px] h-4 bg-black/20"></div>
            <div className="w-[1px] h-4 bg-black/20"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
