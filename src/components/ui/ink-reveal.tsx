"use client";

import React, { useEffect, useRef, useCallback } from "react";

export interface InkRevealProps {
  coverImageSrc: string;
  maskColor?: string;
  lifetime?: number;
  stampRadius?: number;
  className?: string;
}

interface Stamp {
  x: number;
  y: number;
  timestamp: number;
  radius: number;
  wobbleX: number;
  wobbleY: number;
}

// 4. Helper function to compute source-rect crop for object-fit: cover
function drawCoverImage(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  w: number,
  h: number
) {
  const imgRatio = img.width / img.height;
  const canvasRatio = w / h;
  let sx = 0,
    sy = 0,
    sWidth = img.width,
    sHeight = img.height;

  if (imgRatio > canvasRatio) {
    // Image is wider than canvas relative to height -> crop horizontally
    sWidth = img.height * canvasRatio;
    sx = (img.width - sWidth) / 2;
  } else {
    // Image is taller than canvas relative to width -> crop vertically
    sHeight = img.width / canvasRatio;
    sy = (img.height - sHeight) / 2;
  }

  ctx.drawImage(img, sx, sy, sWidth, sHeight, 0, 0, w, h);
}

export const InkReveal: React.FC<InkRevealProps> = ({
  coverImageSrc,
  maskColor = "#000000",
  lifetime = 2000,
  stampRadius = 80,
  className = "",
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // 3. Store loaded image in a ref
  const coverImageRef = useRef<HTMLImageElement | null>(null);

  const stampsRef = useRef<Stamp[]>([]);
  const animationFrameRef = useRef<number | null>(null);
  const isHoveringRef = useRef(false);

  // 3. Load the cover image
  useEffect(() => {
    const img = new Image();
    img.src = coverImageSrc;
    img.onload = () => {
      coverImageRef.current = img;
      // Re-trigger resize to immediately paint the loaded image
      handleResize();
    };
  }, [coverImageSrc]);

  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const rect = container.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // 4. In resize, draw cover image if loaded, else fallback to maskColor
    if (coverImageRef.current) {
      drawCoverImage(ctx, coverImageRef.current, canvas.width, canvas.height);
    } else {
      ctx.fillStyle = maskColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  }, [maskColor]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  const loop = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // 5. Replace solid fill redraw with cover image redraw
    ctx.globalCompositeOperation = "source-over";
    ctx.globalAlpha = 1;
    if (coverImageRef.current) {
      drawCoverImage(ctx, coverImageRef.current, canvas.width, canvas.height);
    } else {
      ctx.fillStyle = maskColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    // 6. Punch holes (existing stamp/wobble/gradient/lifetime logic preserved)
    const now = Date.now();
    ctx.globalCompositeOperation = "destination-out";

    stampsRef.current = stampsRef.current.filter((stamp) => {
      const age = now - stamp.timestamp;
      if (age > lifetime) return false;

      const progress = age / lifetime;
      const alpha = Math.max(0, 1 - progress);
      ctx.globalAlpha = alpha;

      const currentRadius = stamp.radius;

      const gradient = ctx.createRadialGradient(
        stamp.x + stamp.wobbleX,
        stamp.y + stamp.wobbleY,
        0,
        stamp.x + stamp.wobbleX,
        stamp.y + stamp.wobbleY,
        currentRadius
      );
      gradient.addColorStop(0, "rgba(0, 0, 0, 1)");
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(
        stamp.x + stamp.wobbleX,
        stamp.y + stamp.wobbleY,
        currentRadius,
        0,
        Math.PI * 2
      );
      ctx.fill();

      return true;
    });

    if (stampsRef.current.length > 0 || isHoveringRef.current) {
      animationFrameRef.current = requestAnimationFrame(loop);
    } else {
      // Clean up final frame state
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";
      if (coverImageRef.current) {
        drawCoverImage(ctx, coverImageRef.current, canvas.width, canvas.height);
      } else {
        ctx.fillStyle = maskColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      animationFrameRef.current = null;
    }
  }, [lifetime, maskColor]);

  // 10. Preserve existing mouse behavior and add touch behavior
  const handleMove = (clientX: number, clientY: number) => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const wobbleX = (Math.random() - 0.5) * (stampRadius * 0.2);
    const wobbleY = (Math.random() - 0.5) * (stampRadius * 0.2);
    const radius = stampRadius + (Math.random() - 0.5) * (stampRadius * 0.2);

    stampsRef.current.push({
      x,
      y,
      timestamp: Date.now(),
      radius,
      wobbleX,
      wobbleY,
    });

    if (stampsRef.current.length === 1 && !isHoveringRef.current) {
      animationFrameRef.current = requestAnimationFrame(loop);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    handleMove(e.clientX, e.clientY);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleMouseEnter = () => {
    isHoveringRef.current = true;
    if (!animationFrameRef.current) {
      animationFrameRef.current = requestAnimationFrame(loop);
    }
  };

  const handleMouseLeave = () => {
    isHoveringRef.current = false;
  };

  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchMove={handleTouchMove}
      onTouchStart={handleMouseEnter}
      onTouchEnd={handleMouseLeave}
      style={{ cursor: "none" }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />
    </div>
  );
};
