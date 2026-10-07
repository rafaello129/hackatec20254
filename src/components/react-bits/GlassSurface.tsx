// Adapted from React Bits GlassSurface for a lightweight enterprise surface.
// Copyright (c) 2026 David Haz. See LICENSE.md in this directory.
import type { CSSProperties,PropsWithChildren } from "react";
import "./GlassSurface.css";
export default function GlassSurface({children,width="100%",borderRadius=16,blur=14,backgroundOpacity=.72,saturation=1.15,className=""}:PropsWithChildren<{width?:number|string;borderRadius?:number;blur?:number;backgroundOpacity?:number;saturation?:number;className?:string}>){
 const style={width:typeof width==="number"?`${width}px`:width,"--rb-glass-radius":`${borderRadius}px`,"--rb-glass-blur":`${blur}px`,"--rb-glass-opacity":String(backgroundOpacity),"--rb-glass-saturation":String(saturation)} as CSSProperties;
 return <div className={`rb-glass-surface ${className}`} style={style}><div className="rb-glass-surface-content">{children}</div></div>;
}
