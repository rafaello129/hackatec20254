// Adapted from React Bits AnimatedContent without GSAP.
// Copyright (c) 2026 David Haz. See LICENSE.md in this directory.
import { useEffect,useRef,useState,type CSSProperties,type HTMLAttributes,type PropsWithChildren } from "react";
import "./AnimatedContent.css";
interface Props extends PropsWithChildren<HTMLAttributes<HTMLDivElement>> { distance?:number; direction?:"vertical"|"horizontal"; reverse?:boolean; duration?:number; delay?:number; threshold?:number; }
export default function AnimatedContent({children,distance=24,direction="vertical",reverse=false,duration=.5,delay=0,threshold=.08,className="",style,...props}:Props){
 const ref=useRef<HTMLDivElement>(null); const [visible,setVisible]=useState(false);
 useEffect(()=>{const el=ref.current;if(!el)return;if(!("IntersectionObserver" in window)||window.matchMedia("(prefers-reduced-motion: reduce)").matches){setVisible(true);return;}
 const ob=new IntersectionObserver(([e])=>{if(e.isIntersecting){setVisible(true);ob.disconnect();}},{threshold});ob.observe(el);return()=>ob.disconnect();},[threshold]);
 const o=(reverse?-1:1)*distance; const vars={"--rb-ac-x":direction==="horizontal"?`${o}px`:"0px","--rb-ac-y":direction==="vertical"?`${o}px`:"0px","--rb-ac-duration":`${duration}s`,"--rb-ac-delay":`${delay}s`} as CSSProperties;
 return <div ref={ref} data-visible={visible} className={`rb-animated-content ${className}`} style={{...vars,...style}} {...props}>{children}</div>;
}
