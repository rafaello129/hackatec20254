import { ReactNode } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Home,
  Search,
  Target,
  Package,
  User,
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
    { to: "/mi-red", icon: User, label: "Mi Red" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* ═══════════════════════════════════════════════════════════════════
          TOP NAVBAR
      ═══════════════════════════════════════════════════════════════════ */}
      <header className="sticky top-0 z-50 h-16 bg-white border-b border-slate-200 px-4 flex items-center gap-4 shadow-sm">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-blue-500 flex items-center justify-content-center text-white font-bold text-sm flex items-center justify-center">
            RC
          </div>
          <span className="font-bold text-lg text-slate-800 hidden sm:block">
            RedCom
          </span>
        </div>

        {/* Search bar (solo visual) */}
        <div className="flex-1 max-w-xl mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              readOnly
              placeholder="Buscar empresas, productos, servicios..."
              className="w-full h-10 pl-10 pr-4 rounded-lg bg-slate-100 border-0 text-sm text-slate-600 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Right side: notifications + avatar */}
        <div className="flex items-center gap-3">
          {/* Notification bell */}
          <button className="relative w-10 h-10 rounded-lg hover:bg-slate-100 flex items-center justify-center transition-colors">
            <Bell className="w-5 h-5 text-slate-600" />
            <span className="absolute top-1. 5 right-1. 5 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
              3
            </span>
          </button>

          {/* Avatar */}
          <div className="w-10 h-10 rounded-lg overflow-hidden border-2 border-white shadow-sm">
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
          BOTTOM NAVIGATION (mobile style, always visible for demo)
      ═══════════════════════════════════════════════════════════════════ */}
      <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-md bg-white rounded-2xl shadow-lg shadow-slate-200/60 border border-slate-200 px-2 py-2 flex items-center justify-around">
        {navItems.map((item) => {
          const isActive = location.pathname === item.to;
          const Icon = item.icon;

          return (
            <NavLink
              key={item.to}
              to={item. to}
              className={cn(
                "flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-colors",
                isActive
                  ? "text-blue-600 bg-blue-50"
                  : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[11px] font-medium">{item.label}</span>
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
}