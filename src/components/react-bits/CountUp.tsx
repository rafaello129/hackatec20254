// Adapted from React Bits CountUp without Motion.
// Copyright (c) 2026 David Haz. See LICENSE.md in this directory.
import { useEffect, useRef } from "react";

interface CountUpProps {
  to: number;
  from?: number;
  delay?: number;
  duration?: number;
  className?: string;
  prefix?: string;
  suffix?: string;
  locale?: string;
  formatOptions?: Intl.NumberFormatOptions;
}

export default function CountUp({ to, from = 0, delay = 0, duration = 0.8, className = "", prefix = "", suffix = "", locale = "es-MX", formatOptions }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    let frame = 0;
    let timer = 0;
    let observer: IntersectionObserver | undefined;
    const formatter = new Intl.NumberFormat(locale, formatOptions ?? { maximumFractionDigits: Number.isInteger(to) && Number.isInteger(from) ? 0 : 2 });
    const render = (value: number) => { if (ref.current) ref.current.textContent = `${prefix}${formatter.format(value)}${suffix}`; };
    render(from);

    const run = () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || duration <= 0) { render(to); return; }
      timer = window.setTimeout(() => {
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / (duration * 1000), 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          render(from + (to - from) * eased);
          if (progress < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      }, delay * 1000);
    };

    if (!("IntersectionObserver" in window)) run();
    else {
      observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) { observer?.disconnect(); run(); }
      }, { threshold: 0.2 });
      observer.observe(element);
    }

    return () => { observer?.disconnect(); cancelAnimationFrame(frame); clearTimeout(timer); };
  }, [to, from, delay, duration, prefix, suffix, locale, formatOptions]);

  return <span ref={ref} className={className} />;
}
