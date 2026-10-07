// Adapted from React Bits CountUp without Motion.
// Copyright (c) 2026 David Haz. See LICENSE.md in this directory.
import { useEffect,useRef } from "react";
export default function CountUp({to,from=0,delay=0,duration=.8,className=""}:{to:number;from?:number;delay?:number;duration?:number;className?:string}){
 const ref=useRef<HTMLSpanElement>(null);
 useEffect(()=>{const el=ref.current;if(!el)return;let frame=0,timer=0;let ob:IntersectionObserver|undefined;const render=(v:number)=>{if(ref.current)ref.current.textContent=Math.round(v).toLocaleString("es-MX");};render(from);
 const run=()=>{if(window.matchMedia("(prefers-reduced-motion: reduce)").matches||duration<=0){render(to);return;}timer=window.setTimeout(()=>{const start=performance.now();const tick=(now:number)=>{const p=Math.min((now-start)/(duration*1000),1);render(from+(to-from)*(1-Math.pow(1-p,3)));if(p<1)frame=requestAnimationFrame(tick);};frame=requestAnimationFrame(tick);},delay*1000);};
 if(!("IntersectionObserver" in window))run();else{ob=new IntersectionObserver(([e])=>{if(e.isIntersecting){ob?.disconnect();run();}},{threshold:.2});ob.observe(el);}return()=>{ob?.disconnect();cancelAnimationFrame(frame);clearTimeout(timer);};},[to,from,delay,duration]);
 return <span ref={ref} className={className}/>;
}
