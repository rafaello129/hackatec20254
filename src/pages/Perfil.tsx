import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  MapPin,
  Building2,
  Phone,
  Mail,
  Edit3,
  ChevronRight,
  Bell,
  Shield,
  CreditCard,
  HelpCircle,
  LogOut,
  Moon,
  Globe,
  Star,
  Package,
  Truck,
  Settings,
  Camera,
  BadgeCheck,
  TrendingUp,
  FileText,
} from "lucide-react";
import { cn } from "../components/ui/utils";
import { usuarioActual } from "../data/mockData2";
import React from "react";

export default function Perfil() {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);

  const stats = [
    { label: "Proyectos", value: "12", icon: Package },
    { label: "Compras", value: "$294k", icon: TrendingUp },
    { label: "Proveedores", value: "23", icon: Building2 },
  ];

  const menuSecciones = [
    {
      titulo: "Cuenta",
      items: [
        { icon: User, label: "Información personal", ruta: "/perfil/info" },
        { icon: Building2, label: "Datos de empresa", ruta: "/perfil/empresa" },
        { icon: MapPin, label: "Direcciones guardadas", ruta: "/perfil/direcciones" },
        { icon: CreditCard, label: "Métodos de pago", ruta: "/perfil/pagos" },
      ],
    },
    {
      titulo: "Preferencias",
      items: [
        { icon: Bell, label: "Notificaciones", ruta: "/perfil/notificaciones" },
        { icon: Globe, label: "Idioma y región", ruta: "/perfil/idioma" },
        {
          icon: Moon,
          label: "Modo oscuro",
          toggle: true,
          value: darkMode,
          onChange: () => setDarkMode(!darkMode),
        },
      ],
    },
    {
      titulo: "Vendedor",
      items: [
        { icon: Package, label: "Mis ofertas", ruta: "/mis-ofertas" },
        { icon: Star, label: "Mis reseñas", ruta: "/perfil/resenias" },
        { icon: FileText, label: "Historial de ventas", ruta: "/perfil/ventas" },
      ],
    },
    {
      titulo: "Soporte",
      items: [
        { icon: HelpCircle, label: "Centro de ayuda", ruta: "/ayuda" },
        { icon: Shield, label: "Privacidad y seguridad", ruta: "/perfil/privacidad" },
        { icon: FileText, label: "Términos y condiciones", ruta: "/terminos" },
      ],
    },
  ];

  return (
    <div className="space-y-6 pb-8">
      {/* Header con perfil */}
      <div className="bg-gradient-to-br from-violet-600 via-purple-600 to-violet-700 rounded-3xl p-6 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        
        <div className="relative z-10">
          <div className="flex items-start gap-4">
            {/* Avatar */}
            <div className="relative">
              <div className="w-20 h-20 rounded-2xl overflow-hidden border-4 border-white/20 shadow-xl">
                <img
                  src={usuarioActual. avatar}
                  alt={usuarioActual. nombre}
                  className="w-full h-full object-cover"
                />
              </div>
              <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
                <Camera className="w-4 h-4 text-violet-600" />
              </button>
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold">{usuarioActual.nombre}</h1>
                <BadgeCheck className="w-5 h-5 text-teal-300" />
              </div>
              <p className="text-white/80 text-sm">{usuarioActual.empresa}</p>
              <div className="flex items-center gap-1 text-white/70 text-sm mt-1">
                <MapPin className="w-4 h-4" />
                <span>{usuarioActual.ubicacion}</span>
              </div>
            </div>

            <button className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center hover:bg-white/30">
              <Settings className="w-5 h-5" />
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 mt-6">
            {stats. map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div key={i} className="bg-white/10 backdrop-blur rounded-xl p-3 text-center">
                  <Icon className="w-5 h-5 mx-auto mb-1 opacity-80" />
                  <div className="text-lg font-bold">{stat.value}</div>
                  <div className="text-xs opacity-70">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Menú */}
      <div className="space-y-6">
        {menuSecciones.map((seccion, i) => (
          <div key={i}>
            <h3 className="text-sm font-medium text-slate-500 mb-2 px-1">{seccion.titulo}</h3>
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
              {seccion.items.map((item, j) => {
                const Icon = item.icon;
                
                if (item.toggle) {
                  return (
                    <div
                      key={j}
                      className={cn(
                        "flex items-center gap-4 px-4 py-4",
                        j > 0 && "border-t border-slate-100"
                      )}
                    >
                      <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-slate-600" />
                      </div>
                      <span className="flex-1 font-medium text-slate-700">{item.label}</span>
                      <button
                        onClick={item.onChange}
                        className={cn(
                          "w-12 h-7 rounded-full transition-all relative",
                          item.value ?  "bg-violet-600" : "bg-slate-200"
                        )}
                      >
                        <div
                          className={cn(
                            "w-5 h-5 rounded-full bg-white shadow absolute top-1 transition-all",
                            item.value ?  "right-1" : "left-1"
                          )}
                        />
                      </button>
                    </div>
                  );
                }

                return (
                  <button
                    key={j}
                    onClick={() => item.ruta && navigate(item.ruta)}
                    className={cn(
                      "w-full flex items-center gap-4 px-4 py-4 hover:bg-slate-50 transition-colors text-left",
                      j > 0 && "border-t border-slate-100"
                    )}
                  >
                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-slate-600" />
                    </div>
                    <span className="flex-1 font-medium text-slate-700">{item.label}</span>
                    <ChevronRight className="w-5 h-5 text-slate-400" />
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Cerrar sesión */}
      <button className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-medium text-red-600 bg-red-50 hover:bg-red-100 transition-colors">
        <LogOut className="w-5 h-5" />
        Cerrar sesión
      </button>

      {/* Versión */}
      <p className="text-center text-xs text-slate-400">
        Orquesta v1.0. 0
      </p>
    </div>
  );
}