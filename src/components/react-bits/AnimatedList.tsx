// Adapted from React Bits AnimatedList without Motion.
// Copyright (c) 2026 David Haz. See LICENSE.md in this directory.
import { Children,cloneElement,isValidElement,useEffect,useRef,useState,type CSSProperties,type HTMLAttributes,type ReactElement,type ReactNode } from "react";
import "./AnimatedList.css";
export default function AnimatedList({children,stagger=90,threshold=.08,className="",...props}:{children:ReactNode;stagger?:number;threshold?:number;className?:string}&Omit<HTMLAttributes<HTMLUListElement>,"children">){
 const ref=useRef<HTMLUListElement>(null);const [visible,setVisible]=useState(false);
 useEffect(()=>{const el=ref.current;if(!el)return;if(!("IntersectionObserver" in window)||window.matchMedia("(prefers-reduced-motion: reduce)").matches){setVisible(true);return;}const ob=new IntersectionObserver(([e])=>{if(e.isIntersecting){setVisible(true);ob.disconnect();}},{threshold});ob.observe(el);return()=>ob.disconnect();},[threshold]);
 const items=Children.map(children,(child,index)=>{if(!isValidElement(child))return child;const e=child as ReactElement<{style?:CSSProperties}>;return cloneElement(e,{style:{...(e.props.style||{}),"--rb-list-delay":`${index*stagger}ms`} as CSSProperties});});
 return <ul ref={ref} data-visible={visible} className={`rb-animated-list ${className}`} {...props}>{items}</ul>;
}
