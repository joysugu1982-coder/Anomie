"use client";

import { useEffect, useRef, useState } from "react";

export default function AutoScrollRow({
  children,
  speed = 0.6,
  className = "",
}: {
  children: React.ReactNode;
  speed?: number; // pixels per frame; ~0.6 is gentle
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    let frameId: number;

    const tick = () => {
      const el = containerRef.current;
      if (!el) return;

      if (!paused) {
        const max = el.scrollWidth - el.clientWidth;
        if (max > 0) {
          const next = el.scrollLeft + speed;
          if (next >= max - 1) {
            el.scrollLeft = 0;
          } else {
            el.scrollLeft = next;
          }
        }
      }

      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [paused, speed]);

  return (
    <div
      ref={containerRef}
      className={className}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setPaused(false)}
    >
      {children}
    </div>
  );
}
