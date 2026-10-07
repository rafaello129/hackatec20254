// Lightweight controlled adaptation of React Bits PillNav for in-page application tabs.
// Copyright (c) 2026 David Haz. See LICENSE.md in this directory.
import type { CSSProperties, ReactNode } from "react";
import "./PillNav.css";
export interface PillNavItem { id:string; label:string; icon?:ReactNode; badge?:number|string; }
export default function PillNav({items,activeId,onChange,ariaLabel="Navigation"}:{items:PillNavItem[];activeId:string;onChange:(id:string)=>void;ariaLabel?:string}){
 const index=Math.max(0,items.findIndex(item=>item.id===activeId));
 const style={"--rb-pill-index":String(index),"--rb-pill-count":String(items.length)} as CSSProperties;
 return <div className="rb-pill-nav-wrap"><div className="rb-pill-nav" role="tablist" aria-label={ariaLabel} style={style}>
   <span className="rb-pill-nav-indicator" aria-hidden="true"/>
   {items.map(item=><button key={item.id} type="button" role="tab" aria-selected={activeId===item.id} onClick={()=>onChange(item.id)} className="rb-pill-nav-item">
     {item.icon}<span>{item.label}</span>{item.badge!==undefined&&<small>{item.badge}</small>}
   </button>)}
 </div></div>;
}
