"use client";

import { ReactLenis } from '@studio-freight/react-lenis';

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const ReactLenisAny = ReactLenis as any;
  
  return (
    <ReactLenisAny root options={{ lerp: 0.05, duration: 1.5, smoothWheel: true }}>
      {children}
    </ReactLenisAny>
  );
}
