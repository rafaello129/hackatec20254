// Adapted from React Bits: https://reactbits.dev/r/SpotlightCard-TS-CSS.json
// Copyright (c) 2026 David Haz. See LICENSE.md in this directory.
import { useRef, type CSSProperties, type MouseEventHandler, type PropsWithChildren } from "react";
import "./SpotlightCard.css";

interface SpotlightCardProps extends PropsWithChildren {
  className?: string;
  spotlightColor?: `rgba(${number}, ${number}, ${number}, ${number})`;
}

export default function SpotlightCard({ children, className = "", spotlightColor = "rgba(79, 115, 2, 0.18)" }: SpotlightCardProps) {
  const divRef = useRef<HTMLDivElement>(null);

  const handleMouseMove: MouseEventHandler<HTMLDivElement> = (event) => {
    if (!divRef.current || window.matchMedia("(prefers-reduced-motion: reduce), (hover: none)").matches) return;
    const rect = divRef.current.getBoundingClientRect();
    divRef.current.style.setProperty("--mouse-x", `${event.clientX - rect.left}px`);
    divRef.current.style.setProperty("--mouse-y", `${event.clientY - rect.top}px`);
  };

  return (
    <div ref={divRef} onMouseMove={handleMouseMove} onFocus={() => {
      divRef.current?.style.setProperty("--mouse-x", "50%");
      divRef.current?.style.setProperty("--mouse-y", "50%");
    }} style={{ "--spotlight-color": spotlightColor } as CSSProperties} className={`rb-spotlight-card ${className}`}>
      {children}
    </div>
  );
}
