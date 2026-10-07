// Adapted from React Bits GlareHover.
// Copyright (c) 2026 David Haz. See LICENSE.md in this directory.
import type { CSSProperties,ReactNode } from "react";
import "./GlareHover.css";
export default function GlareHover({width="100%",borderRadius="10px",children,glareOpacity=.3,transitionDuration=650,className=""}:{width?:string;borderRadius?:string;children?:ReactNode;glareOpacity?:number;transitionDuration?:number;className?:string}){
 const vars={"--gh-width":width,"--gh-br":borderRadius,"--gh-duration":`${transitionDuration}ms`,"--gh-rgba":`rgba(255,255,255,${glareOpacity})`} as CSSProperties;
 return <div className={`rb-glare-hover ${className}`} style={vars}>{children}</div>;
}
