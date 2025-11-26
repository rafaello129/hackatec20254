import { ReactNode } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  Home,
  FolderKanban,
  Search,
  MessageCircle,
  Users,
  Bell,
  Plus,
  MapPin,
} from "lucide-react";
import { cn } from "./components/ui/utils";
import ChatIA from "./components/ChatIA";
import { getMensajesNoLeidos } from "./data/mockData2";
import React from "react";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const mensajesNoLeidos = getMensajesNoLeidos();
  const notificacionesNoLeidas = 5;

  const navItems = [
    { to: "/", icon: Home, label: "Inicio" },
    { to: "/proyectos", icon: FolderKanban, label: "Proyectos" },
    { to: "/explorar", icon: Search, label: "Explorar" },
    { to: "/mensajes", icon: MessageCircle, label: "Mensajes", badge: mensajesNoLeidos },
    { to: "/mi-red", icon: Users, label: "Mi Red" },
  ];

  // Páginas fullscreen (sin bottom nav)
  const isFullscreen = ["/mapa", "/chat"]. some(path => 
    location.pathname.includes(path)
  );

  // Páginas donde el mapa está activo
  const isMapPage = location.pathname === "/mapa";

  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col">
      {/* ═══════════════════════════════════════════════════════════════════
          TOP NAVBAR
      ═══════════════════════════════════════════════════════════════════ */}
      {! isFullscreen && (
        <header className="sticky top-0 z-50 h-16 bg-white/80 backdrop-blur-xl border-b border-slate-200/60 px-4 flex items-center gap-4 shadow-sm">
          {/* Logo */}
          <div 
            onClick={() => navigate("/")}
            className="flex items-center gap-2. 5 cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-violet-500/25">
              O
            </div>
            <span className="font-bold text-lg bg-gradient-to-r from-violet-700 to-purple-600 bg-clip-text text-transparent hidden sm:block">
              Orquesta
            </span>
          </div>

          {/* Search bar */}
          <div 
            onClick={() => navigate("/explorar")}
            className="flex-1 max-w-xl mx-auto"
          >
            <div className="relative group">
              <Search className="absolute left-3. 5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar proveedores, productos..."
                className="w-full h-10 pl-10 pr-4 rounded-xl bg-slate-100/80 border border-transparent text-sm text-slate-600 placeholder:text-slate-400 focus:outline-none focus:border-violet-300 focus:bg-white cursor-pointer hover:bg-slate-200/60 transition-all"
                readOnly
              />
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {/* Botón Mapa */}
            <button
              onClick={() => navigate("/mapa")}
              className="w-10 h-10 rounded-xl hover:bg-teal-50 flex items-center justify-center transition-colors group"
              title="Ver mapa"
            >
              <MapPin className="w-5 h-5 text-teal-600" />
            </button>

            {/* Botón vender */}
            <button
              onClick={() => navigate("/vender")}
              className="hidden sm:flex items-center gap-1. 5 px-3 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-green-500 text-white text-sm font-medium shadow-lg shadow-emerald-500/25 hover:shadow-xl transition-all"
            >
              <Plus className="w-4 h-4" />
              Vender
            </button>

            {/* Notificaciones */}
            <button 
              onClick={() => navigate("/notificaciones")}
              className="relative w-10 h-10 rounded-xl hover:bg-slate-100 flex items-center justify-center transition-colors group"
            >
              <Bell className="w-5 h-5 text-slate-500 group-hover:text-slate-700" />
              {notificacionesNoLeidas > 0 && (
                <span className="absolute top-1. 5 right-1.5 w-5 h-5 bg-gradient-to-r from-rose-500 to-pink-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-sm">
                  {notificacionesNoLeidas}
                </span>
              )}
            </button>

            {/* Avatar */}
            <div 
              onClick={() => navigate("/perfil")}
              className="w-10 h-10 rounded-xl overflow-hidden border-2 border-white shadow-md ring-2 ring-slate-100 cursor-pointer hover:ring-violet-200 transition-all"
            >
              <img
                src="https://i.pravatar.cc/80?img=12"
                alt="Mi perfil"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </header>
      )}

      {/* ═══════════════════════════════════════════════════════════════════
          PAGE CONTENT
      ═══════════════════════════════════════════════════════════════════ */}
      <main className={cn(
        "flex-1 w-full max-w-6xl mx-auto",
        ! isFullscreen && "px-4 py-6",
        ! isFullscreen && "pb-28"
      )}>
        {children}
      </main>

      {/* ═══════════════════════════════════════════════════════════════════
          CHAT IA FLOTANTE
      ═══════════════════════════════════════════════════════════════════ */}
      {! isFullscreen && <ChatIA />}

      {/* ═══════════════════════════════════════════════════════════════════
          BOTTOM NAVIGATION
      ═══════════════════════════════════════════════════════════════════ */}
      {!isFullscreen && (
        <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-2rem)] max-w-md bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl shadow-slate-900/10 border border-slate-200/60 px-2 py-2 flex items-center justify-around">
          {navItems.map((item) => {
            const isActive = location.pathname === item.to || 
              (item.to !== "/" && location.pathname.startsWith(item.to));
            const Icon = item.icon;

            return (
              <NavLink
                key={item.to}
                to={item. to}
                className={cn(
                  "relative flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all",
                  isActive
                    ? "text-violet-700 bg-gradient-to-b from-violet-50 to-purple-50 shadow-sm"
                    : "text-slate-400 hover:text-slate-600 hover:bg-slate-50"
                )}
              >
                <Icon className={cn("w-5 h-5", isActive && "text-violet-600")} />
                <span className={cn("text-[11px] font-medium", isActive && "text-violet-700")}>
                  {item.label}
                </span>
                {item.badge && item.badge > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-rose-500 to-pink-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>
      )}
    </div>
  );
}