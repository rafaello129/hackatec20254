import {
  Save,
  Upload,
  MapPin,
  Clock,
  FileText,
  Plus,
  Pencil,
  Building2,
  BadgeCheck,
  Star,
  TrendingUp,
  Package,
  Truck,
  Users,
  ChevronRight,
  Mail,
  Phone,
  Globe,
  MessageSquare,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import React from "react";
import { usuarioActual, empresas, ordenes, productos } from "../data/mockData";

export default function PerfilEmpresarial() {
  const navigate = useNavigate();

  // Buscar la empresa del usuario actual o usar datos del usuarioActual
  const empresaActual = empresas.find((e) => e. id === usuarioActual. id) || {
    id: usuarioActual.id,
    nombre: usuarioActual. nombre,
    iniciales: usuarioActual.nombre
      .split(" ")
      .map((p) => p[0])
      .join("")
      .slice(0, 2)
      .toUpperCase(),
    tipo: usuarioActual.tipo as "comprador",
    categorias: ["Alimentos", "Distribución", "Perecederos"],
    ubicacion: usuarioActual. ubicacion,
    verificado: usuarioActual.verificado,
    rating: usuarioActual.rating,
    numResenias: 89,
    transacciones: usuarioActual.transacciones,
    descripcion:
      "Distribuidora de alimentos con cobertura en la zona metropolitana de Guadalajara.",
    matchScore: 0,
    scorecard: {
      confiabilidad: 92,
      entregas: 88,
      calidad: 95,
      precios: 85,
    },
    certificaciones: ["SENASICA", "ISO 22000"],
  };

  // Stats del perfil
  const stats = [
    {
      icon: TrendingUp,
      label: "Transacciones",
      value: empresaActual.transacciones. toString(),
      sub: `Desde ${usuarioActual.miembrosDesde}`,
      color: "text-teal-600",
      bg: "bg-teal-50",
      iconBg: "bg-teal-100",
    },
    {
      icon: Star,
      label: "Rating",
      value: empresaActual. rating.toFixed(1),
      sub: `${empresaActual. numResenias} reseñas`,
      color: "text-amber-600",
      bg: "bg-amber-50",
      iconBg: "bg-amber-100",
    },
    {
      icon: Package,
      label: "Órdenes",
      value: ordenes. filter((o) => o.tipo === "compra").length.toString(),
      sub: "Este mes",
      color: "text-violet-600",
      bg: "bg-violet-50",
      iconBg: "bg-violet-100",
    },
    {
      icon: Users,
      label: "Conexiones",
      value: "45",
      sub: "En tu red",
      color: "text-cyan-600",
      bg: "bg-cyan-50",
      iconBg: "bg-cyan-100",
    },
  ];

  // Documentos de la empresa
  const documentos = [
    { name: "Acta Constitutiva", status: "Vigente", date: "2021-03-15" },
    {
      name: "Constancia de Situación Fiscal",
      status: "Vigente",
      date: "2025-01-10",
    },
    { name: "Comprobante de Domicilio", status: "Por vencer", date: "2025-12-01" },
    { name: "Licencia Sanitaria SENASICA", status: "Vigente", date: "2024-06-15" },
  ];

  // Sucursales
  const sucursales = [
    {
      name: "Matriz Guadalajara",
      address: "Av. López Mateos 1234, Col. Chapalita",
      city: "Guadalajara, JAL",
      status: "Principal",
      employees: 32,
    },
    {
      name: "Centro de Distribución",
      address: "Parque Industrial El Salto",
      city: "El Salto, JAL",
      status: "Almacén",
      employees: 18,
    },
    {
      name: "Sucursal Zapopan",
      address: "Av. Patria 567",
      city: "Zapopan, JAL",
      status: "Activa",
      employees: 12,
    },
  ];

  // Horarios
  const horarios = [
    { day: "Lunes", open: "08:00", close: "18:00", active: true },
    { day: "Martes", open: "08:00", close: "18:00", active: true },
    { day: "Miércoles", open: "08:00", close: "18:00", active: true },
    { day: "Jueves", open: "08:00", close: "18:00", active: true },
    { day: "Viernes", open: "08:00", close: "18:00", active: true },
    { day: "Sábado", open: "09:00", close: "14:00", active: true },
    { day: "Domingo", open: "-", close: "-", active: false },
  ];

  const [activeTab, setActiveTab] = React.useState("general");

  const tabs = [
    { id: "general", label: "Información General" },
    { id: "legal", label: "Datos Legales" },
    { id: "sucursales", label: "Sucursales" },
    { id: "horarios", label: "Horarios" },
  ];

  return (
    <div className="space-y-6 pb-8">
      {/* ═══════════════════════════════════════════════════════════════════
          HEADER
      ═══════════════════════════════════════════════════════════════════ */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Perfil Empresarial</h1>
          <p className="text-slate-500 text-sm mt-1">
            Gestiona la información de tu empresa
          </p>
        </div>
        <button className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-600 to-cyan-600 text-white font-semibold text-sm px-5 py-2. 5 rounded-xl hover:from-teal-700 hover:to-cyan-700 transition-all shadow-lg shadow-teal-500/25 hover:shadow-xl hover:-translate-y-0.5">
          <Save className="w-4 h-4" />
          Guardar Cambios
        </button>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          HERO CARD - PERFIL
      ═══════════════════════════════════════════════════════════════════ */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-teal-600 via-teal-500 to-cyan-500 p-6 text-white shadow-xl shadow-teal-500/25">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-cyan-400/20 rounded-full blur-2xl translate-y-1/2 -translate-x-1/4" />

        <div className="relative z-10">
          <div className="flex items-start gap-5">
            {/* Avatar/Logo */}
            <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg shadow-black/10 text-3xl font-bold">
              {empresaActual.iniciales}
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-2xl font-bold">{empresaActual.nombre}</h2>
                {empresaActual. verificado && (
                  <BadgeCheck className="w-6 h-6 text-cyan-200" />
                )}
              </div>

              <div className="flex items-center gap-4 text-white/80 text-sm mb-4">
                <span className="flex items-center gap-1. 5">
                  <MapPin className="w-4 h-4" />
                  {empresaActual.ubicacion}
                </span>
                <span className="flex items-center gap-1. 5">
                  <Star className="w-4 h-4 text-amber-300" />
                  {empresaActual.rating} ({empresaActual.numResenias} reseñas)
                </span>
                <span className="capitalize bg-white/20 px-2. 5 py-0.5 rounded-full text-xs font-medium">
                  {empresaActual.tipo}
                </span>
              </div>

              <p className="text-white/90 text-sm leading-relaxed max-w-2xl">
                {empresaActual. descripcion}
              </p>
            </div>

            {/* Edit button */}
            <button className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white font-medium text-sm px-4 py-2 rounded-xl hover:bg-white/30 transition-all">
              <Pencil className="w-4 h-4" />
              Editar
            </button>
          </div>

          {/* Certificaciones */}
          {empresaActual. certificaciones. length > 0 && (
            <div className="flex items-center gap-2 mt-4 pt-4 border-t border-white/20">
              <span className="text-sm text-white/70">Certificaciones:</span>
              <div className="flex gap-2">
                {empresaActual.certificaciones.map((cert, idx) => (
                  <span
                    key={idx}
                    className="text-xs bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full font-medium"
                  >
                    {cert}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          STATS GRID
      ═══════════════════════════════════════════════════════════════════ */}

        {/* ═══════════════════════════════════════════════════════════════════
          
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className={`${stat.bg} rounded-2xl p-4 border border-slate-100 hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer`}
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className={`w-10 h-10 rounded-xl ${stat.iconBg} flex items-center justify-center`}
                >
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <span
                  className={`text-xs font-semibold ${stat. color} uppercase tracking-wide`}
                >
                  {stat.label}
                </span>
              </div>
              <div className="text-3xl font-bold text-slate-800">{stat.value}</div>
              <div className="text-sm text-slate-500 mt-1">{stat.sub}</div>
            </div>
          );
        })}
      </div>


      ═══════════════════════════════════════════════════════════════════ */}

      

      {/* ═══════════════════════════════════════════════════════════════════
          TABS
      ═══════════════════════════════════════════════════════════════════ */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Tab Headers */}
        <div className="flex border-b border-slate-200 bg-slate-50/50">
          {tabs. map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 px-6 py-4 text-sm font-medium transition-all relative ${
                activeTab === tab.id
                  ? "text-teal-600 bg-white"
                  : "text-slate-500 hover:text-slate-700 hover:bg-slate-100/50"
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-teal-500 to-cyan-500" />
              )}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {/* ─────────────────────────────────────────────────────────────────
              TAB: INFORMACIÓN GENERAL
          ───────────────────────────────────────────────────────────────── */}
          {activeTab === "general" && (
            <div className="space-y-6">
              {/* Logo e Identidad + Contacto */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Logo */}
                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                  <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-teal-600" />
                    Logo e Identidad
                  </h3>
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-28 h-28 rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center text-white text-4xl font-bold shadow-xl shadow-teal-500/30">
                      {empresaActual. iniciales}
                    </div>
                    <button className="inline-flex items-center gap-2 text-violet-600 font-medium text-sm px-4 py-2 rounded-xl border border-violet-200 hover:bg-violet-50 transition-colors">
                      <Upload className="w-4 h-4" />
                      Cambiar Logo
                    </button>
                  </div>
                  <div className="mt-5 space-y-3">
                    <div>
                      <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                        Nombre Comercial
                      </label>
                      <input
                        type="text"
                        defaultValue={empresaActual.nombre}
                        className="mt-1 w-full px-4 py-2. 5 rounded-xl bg-white border border-slate-200 text-slate-800 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                        Tipo de Empresa
                      </label>
                      <input
                        type="text"
                        defaultValue={empresaActual.tipo}
                        className="mt-1 w-full px-4 py-2. 5 rounded-xl bg-white border border-slate-200 text-slate-800 capitalize focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Contacto */}
                <div className="lg:col-span-2 bg-slate-50 rounded-2xl p-5 border border-slate-100">
                  <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                    <Mail className="w-5 h-5 text-teal-600" />
                    Información de Contacto
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                        Correo Electrónico
                      </label>
                      <input
                        type="email"
                        defaultValue="contacto@distribuidoragdl.com"
                        className="mt-1 w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-800 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                        Teléfono Principal
                      </label>
                      <input
                        type="tel"
                        defaultValue="+52 33 1234 5678"
                        className="mt-1 w-full px-4 py-2. 5 rounded-xl bg-white border border-slate-200 text-slate-800 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                        Sitio Web
                      </label>
                      <input
                        type="url"
                        defaultValue="www.distribuidoragdl.com"
                        className="mt-1 w-full px-4 py-2. 5 rounded-xl bg-white border border-slate-200 text-slate-800 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                        WhatsApp Business
                      </label>
                      <input
                        type="tel"
                        defaultValue="+52 33 1234 5678"
                        className="mt-1 w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-800 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                        Dirección Principal
                      </label>
                      <input
                        type="text"
                        defaultValue={empresaActual. ubicacion}
                        className="mt-1 w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-800 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Categorías/Giros */}
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                    <Package className="w-5 h-5 text-violet-600" />
                    Giros Comerciales
                  </h3>
                  <button className="inline-flex items-center gap-1. 5 text-teal-600 font-medium text-sm px-3 py-1. 5 rounded-lg border border-teal-200 hover:bg-teal-50 transition-colors">
                    <Plus className="w-4 h-4" />
                    Agregar
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {empresaActual.categorias.map((cat, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-2 bg-violet-100 text-violet-700 px-4 py-2 rounded-xl text-sm font-medium"
                    >
                      {cat}
                      <button className="hover:text-red-500 transition-colors">
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Scorecard 
              
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-teal-600" />
                  Scorecard de Desempeño
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Object.entries(empresaActual.scorecard).map(([key, value]) => (
                    <div key={key} className="bg-white rounded-xl p-4 border border-slate-200">
                      <div className="text-xs font-medium text-slate-500 uppercase tracking-wide capitalize mb-2">
                        {key}
                      </div>
                      <div className="flex items-end gap-2">
                        <span className="text-2xl font-bold text-slate-800">
                          {value}%
                        </span>
                      </div>
                      <div className="mt-2 h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-teal-500 to-cyan-400 rounded-full"
                          style={{ width: `${value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              */}
              
            </div>
          )}

          {/* ─────────────────────────────────────────────────────────────────
              TAB: DATOS LEGALES
          ───────────────────────────────────────────────────────────────── */}
          {activeTab === "legal" && (
            <div className="space-y-6">
              {/* Datos Fiscales */}
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-teal-600" />
                  Datos Fiscales y Legales
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                      Razón Social
                    </label>
                    <input
                      type="text"
                      defaultValue={`${empresaActual.nombre} S. A.  de C.V.`}
                      className="mt-1 w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-800 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                      RFC
                    </label>
                    <input
                      type="text"
                      defaultValue="DAG210315ABC"
                      className="mt-1 w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-800 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                      Régimen Fiscal
                    </label>
                    <input
                      type="text"
                      defaultValue="Régimen General de Ley"
                      className="mt-1 w-full px-4 py-2. 5 rounded-xl bg-white border border-slate-200 text-slate-800 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                      Número de Escritura
                    </label>
                    <input
                      type="text"
                      defaultValue="45678"
                      className="mt-1 w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-800 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                      Fecha de Constitución
                    </label>
                    <input
                      type="date"
                      defaultValue="2021-03-15"
                      className="mt-1 w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-800 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                      Miembro desde
                    </label>
                    <input
                      type="text"
                      defaultValue={usuarioActual.miembrosDesde}
                      disabled
                      className="mt-1 w-full px-4 py-2. 5 rounded-xl bg-slate-100 border border-slate-200 text-slate-500"
                    />
                  </div>
                  <div className="md:col-span-2 lg:col-span-3">
                    <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                      Domicilio Fiscal
                    </label>
                    <input
                      type="text"
                      defaultValue="Av. López Mateos 1234, Col. Chapalita, Guadalajara, Jalisco, CP 44500"
                      className="mt-1 w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-800 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Documentos */}
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-violet-600" />
                    Documentos Legales
                  </h3>
                  <button className="inline-flex items-center gap-1. 5 text-teal-600 font-medium text-sm px-3 py-1.5 rounded-lg border border-teal-200 hover:bg-teal-50 transition-colors">
                    <Upload className="w-4 h-4" />
                    Subir Documento
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {documentos.map((doc, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-xl p-4 border-2 border-slate-200 hover:border-teal-300 transition-all cursor-pointer group"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center shadow-lg shadow-violet-500/25">
                          <FileText className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-slate-800 text-sm truncate">
                            {doc.name}
                          </p>
                          <p className="text-xs text-slate-500 mt-0.5">{doc.date}</p>
                        </div>
                      </div>
                      <div className="mt-3">
                        <span
                          className={`text-xs font-medium px-2. 5 py-1 rounded-full ${
                            doc. status === "Vigente"
                              ? "bg-teal-100 text-teal-700"
                              : "bg-amber-100 text-amber-700"
                          }`}
                        >
                          {doc. status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ─────────────────────────────────────────────────────────────────
              TAB: SUCURSALES
          ───────────────────────────────────────────────────────────────── */}
          {activeTab === "sucursales" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-teal-600" />
                  Ubicaciones y Puntos de Operación
                </h3>
                <button className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-purple-600 text-white font-medium text-sm px-4 py-2 rounded-xl hover:from-violet-700 hover:to-purple-700 transition-all shadow-lg shadow-violet-500/25">
                  <Plus className="w-4 h-4" />
                  Nueva Sucursal
                </button>
              </div>

              <div className="space-y-3">
                {sucursales.map((sucursal, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-2xl border border-slate-200 p-5 hover:shadow-lg hover:border-teal-200 transition-all cursor-pointer group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-teal-500/30">
                          <MapPin className="w-7 h-7" />
                        </div>
                        <div>
                          <p className="font-semibold text-slate-800 group-hover:text-teal-600 transition-colors">
                            {sucursal.name}
                          </p>
                          <p className="text-sm text-slate-500">{sucursal. address}</p>
                          <p className="text-xs text-slate-400 mt-0.5">
                            {sucursal.city}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-sm text-slate-600">
                            {sucursal.employees} empleados
                          </p>
                          <span
                            className={`inline-block mt-1 text-xs font-medium px-2.5 py-1 rounded-full ${
                              sucursal.status === "Principal"
                                ?  "bg-violet-100 text-violet-700"
                                : sucursal.status === "Almacén"
                                ? "bg-amber-100 text-amber-700"
                                : "bg-teal-100 text-teal-700"
                            }`}
                          >
                            {sucursal.status}
                          </span>
                        </div>
                        <button className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center hover:bg-violet-100 transition-colors">
                          <Pencil className="w-4 h-4 text-slate-500 hover:text-violet-600" />
                        </button>
                        <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-teal-500 group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ─────────────────────────────────────────────────────────────────
              TAB: HORARIOS
          ───────────────────────────────────────────────────────────────── */}
          {activeTab === "horarios" && (
            <div className="space-y-4">
              <h3 className="font-semibold text-slate-800 flex items-center gap-2 mb-2">
                <Clock className="w-5 h-5 text-teal-600" />
                Horarios de Operación
              </h3>

              <div className="space-y-3">
                {horarios.map((schedule, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all ${
                      schedule.active
                        ? "bg-white border-slate-200 hover:border-teal-200"
                        : "bg-slate-50 border-slate-100"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          schedule. active
                            ?  "bg-gradient-to-br from-teal-500 to-cyan-500 shadow-lg shadow-teal-500/25"
                            : "bg-slate-200"
                        }`}
                      >
                        <Clock
                          className={`w-5 h-5 ${
                            schedule. active ?  "text-white" : "text-slate-400"
                          }`}
                        />
                      </div>
                      <span
                        className={`font-medium ${
                          schedule. active ?  "text-slate-800" : "text-slate-400"
                        }`}
                      >
                        {schedule.day}
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      {schedule.active ? (
                        <>
                          <input
                            type="time"
                            defaultValue={schedule. open}
                            className="px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all"
                          />
                          <span className="text-slate-400">a</span>
                          <input
                            type="time"
                            defaultValue={schedule.close}
                            className="px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all"
                          />
                        </>
                      ) : (
                        <span className="text-slate-400 font-medium">Cerrado</span>
                      )}
                      <button
                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                          schedule.active
                            ? "bg-teal-100 text-teal-700 hover:bg-teal-200"
                            : "bg-slate-100 text-slate-400 hover:bg-slate-200"
                        }`}
                      >
                        {schedule.active ? "Activo" : "Inactivo"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}