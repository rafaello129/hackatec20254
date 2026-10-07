// Lightweight adaptation of the React Bits DotGrid concept for MÁAK.
// Copyright (c) 2026 David Haz. See LICENSE.md in this directory.
import { useRef, type CSSProperties, type PointerEventHandler } from "react";
import "./DotGrid.css";

export default function DotGrid({ className = "", dotColor = "#c4cebb", activeColor = "#799833", spacing = 28 }: { className?: string; dotColor?: string; activeColor?: string; spacing?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const move: PointerEventHandler<HTMLDivElement> = (event) => {
    if (!ref.current || window.matchMedia("(prefers-reduced-motion: reduce), (hover: none)").matches) return;
    const rect = ref.current.getBoundingClientRect();
    ref.current.style.setProperty("--rb-dot-x", `${event.clientX - rect.left}px`);
    ref.current.style.setProperty("--rb-dot-y", `${event.clientY - rect.top}px`);
  };
  const style = { "--rb-dot-color": dotColor, "--rb-dot-active": activeColor, "--rb-dot-spacing": `${spacing}px` } as CSSProperties;
  return <div ref={ref} aria-hidden="true" onPointerMove={move} className={`rb-dot-grid ${className}`} style={style} />;
}
