// Adapted from React Bits ShinyText without Motion.
// Copyright (c) 2026 David Haz. See LICENSE.md in this directory.
import type { CSSProperties } from "react";
import "./ShinyText.css";
export default function ShinyText({text,speed=5,className=""}:{text:string;speed?:number;className?:string}){return <span className={`rb-shiny-text ${className}`} style={{"--rb-shine-duration":`${speed}s`} as CSSProperties}>{text}</span>;}
