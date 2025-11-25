import { ReactNode } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Home,
  Search,
  Target,
  Package,
  Users,
  Bell,
} from "lucide-react";
import { cn } from "./components/ui/utils";
import React from "react";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();

  const navItems = [
    { to: "/", icon: Home, label: "Feed" },
    { to: "/explorar", icon: Search, label: "Explorar" },
    { to: "/oportunidades", icon: Target, label: "Oportun." },
    { to: "/operaciones", icon: Package, label: "Operac." },
    { to: "/mi-red", icon: Users, label: "Mi Red" },
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col">
      {/* ═══════════════════════════════════════════════════════════════════
          TOP NAVBAR
      ═══════════════════════════════════════════════════════════════════ */}
      <header className="sticky top-0 z-50 h-16 bg-white/80 backdrop-blur-xl border-b border-slate-200/60 px-4 flex items-center gap-4 shadow-sm">
        {/* Logo */}
        <div className="flex items-center gap-2. 5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-600 to-cyan-500 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-teal-500/25">
            RC
          </div>
          <span className="font-bold text-lg bg-gradient-to-r from-teal-700 to-cyan-600 bg-clip-text text-transparent hidden sm:block">
            RedCom
          </span>
        </div>

        {/* Search bar */}
        <div className="flex-1 max-w-xl mx-auto">
          <div className="relative group">
            <Search className="absolute left-3. 5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-teal-500 transition-colors" />
            <input
              type="text"
              readOnly
              placeholder="Buscar empresas, productos, servicios..."
              className="w-full h-10 pl-10 pr-4 rounded-xl bg-slate-100/80 border border-transparent text-sm text-slate-600 placeholder:text-slate-400 focus:outline-none focus:border-teal-300 focus:bg-white focus:ring-2 focus:ring-teal-500/20 transition-all cursor-pointer hover:bg-slate-200/60"
            />
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* Notification bell */}
          <button className="relative w-10 h-10 rounded-xl hover:bg-slate-100 flex items-center justify-center transition-colors group">
            <Bell className="w-5 h-5 text-slate-500 group-hover:text-slate-700" />
            <span className="absolute top-1. 5 right-1. 5 w-5 h-5 bg-gradient-to-r from-violet-600 to-purple-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-sm">
              3
            </span>
          </button>

          {/* Avatar */}
          <div className="w-10 h-10 rounded-xl overflow-hidden border-2 border-white shadow-md ring-2 ring-slate-100 cursor-pointer hover:ring-teal-200 transition-all">
            <img
              src="https://i.pravatar.cc/80?img=12"
              alt="Mi perfil"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </header>

      {/* ═══════════════════════════════════════════════════════════════════
          PAGE CONTENT
      ═══════════════════════════════════════════════════════════════════ */}
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 py-6 pb-28">
        {children}
      </main>

      {/* ═══════════════════════════════════════════════════════════════════
          BOTTOM NAVIGATION
      ═══════════════════════════════════════════════════════════════════ */}
      <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-md bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl shadow-slate-900/10 border border-slate-200/60 px-2 py-2 flex items-center justify-around">
        {navItems.map((item) => {
          const isActive = location. pathname === item.to;
          const Icon = item.icon;

          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={cn(
                "flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all",
                isActive
                  ? "text-teal-700 bg-gradient-to-b from-teal-50 to-cyan-50 shadow-sm"
                  : "text-slate-400 hover:text-slate-600 hover:bg-slate-50"
              )}
            >
              <Icon className={cn("w-5 h-5", isActive && "text-teal-600")} />
              <span className={cn("text-[11px] font-medium", isActive && "text-teal-700")}>
                {item.label}
              </span>
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
}