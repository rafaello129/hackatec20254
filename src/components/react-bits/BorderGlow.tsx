// Lightweight adaptation of the React Bits BorderGlow concept.
// Copyright (c) 2026 David Haz. See LICENSE.md in this directory.
import type { CSSProperties, PropsWithChildren } from "react";
import "./BorderGlow.css";
export default function BorderGlow({children,className="",color="#d4a344",radius=12}:PropsWithChildren<{className?:string;color?:string;radius?:number}>){
 const style={"--rb-border-glow":color,"--rb-border-radius":`${radius}px`} as CSSProperties;
 return <div className={`rb-border-glow ${className}`} style={style}><div className="rb-border-glow-inner">{children}</div></div>;
}
