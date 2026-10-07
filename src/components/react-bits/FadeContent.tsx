// Lightweight adaptation of the React Bits FadeContent concept.
// Copyright (c) 2026 David Haz. See LICENSE.md in this directory.
import { useEffect, useState, type CSSProperties, type PropsWithChildren } from "react";
import "./FadeContent.css";
export default function FadeContent({children,className="",duration=.3,distance=8,blur=false}:PropsWithChildren<{className?:string;duration?:number;distance?:number;blur?:boolean}>){
 const [visible,setVisible]=useState(false);
 useEffect(()=>{const id=requestAnimationFrame(()=>setVisible(true));return()=>cancelAnimationFrame(id);},[]);
 const style={"--rb-fade-duration":`${duration}s`,"--rb-fade-distance":`${distance}px`,"--rb-fade-blur":blur?"6px":"0px"} as CSSProperties;
 return <div data-visible={visible} className={`rb-fade-content ${className}`} style={style}>{children}</div>;
}
