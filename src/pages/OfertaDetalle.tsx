import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Eye,
  Users,
  MessageCircle,
  TrendingUp,
  MoreHorizontal,
  Edit3,
  PauseCircle,
  Trash2,
  Share2,
  CheckCircle2,
  Clock,
  MapPin,
  Star,
  BadgeCheck,
  ChevronRight,
  Phone,
  Zap,
  Calendar,
  DollarSign,
  Package,
  BarChart3,
  Truck,
} from "lucide-react";
import { cn } from "../components/ui/utils";
import React from "react";

type TabType = "interesados" | "estadisticas" | "detalles";

interface Interesado {
  id: string;
  nombre: string;
  empresa: string;
  iniciales: string;
  verificado: boolean;
  ubicacion: string;
  mensaje: string;
  fecha: string;
  cantidadSolicitada: number;
  estado: "nuevo" | "contactado" | "negociando" | "cerrado";
}

export default function OfertaDetalle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>("interesados");
  const [showMenu, setShowMenu] = useState(false);

  const oferta = {
    id: "of-1",
    nombre: "Tablones de Pino de Primera",
    descripcion: "Tablones de pino secados al horno, ideales para muebles.  Medidas estándar 1\" x 8\" x 2.44m.  Humedad controlada al 12%.",
    categoria: "Madera",
    precio: 420,
    unidad: "pieza",
    minCompra: 10,
    disponibilidad: "Inmediata",
    incluyeTransporte: true,
    ubicacion: "Zapopan, Jalisco",
    estado: "activa" as const,
    fechaPublicacion: "24 Nov 2025",
    imagenes: ["🪵", "📐", "🪵"],
    vistas: 156,
    interesados: 8,
    mensajes: 3,
  };

  const interesados: Interesado[] = [
    {
      id: "int-1",
      nombre: "Carlos Mendoza",
      empresa: "Constructora del Pacífico",
      iniciales: "CM",
      verificado: true,
      ubicacion: "Guadalajara",
      mensaje: "Me interesa comprar 50 piezas, ¿tienen disponibilidad para entrega esta semana?",
      fecha: "Hace 2 horas",
      cantidadSolicitada: 50,
      estado: "nuevo",
    },
    {
      id: "int-2",
      nombre: "María López",
      empresa: "Muebles Artesanales",
      iniciales: "ML",
      verificado: true,
      ubicacion: "Tlaquepaque",
      mensaje: "Necesito 30 tablones para un proyecto de muebles, ¿manejan factura?",
      fecha: "Hace 5 horas",
      cantidadSolicitada: 30,
      estado: "contactado",
    },
    {
      id: "int-3",
      nombre: "Roberto García",
      empresa: "Carpintería El Roble",
      iniciales: "RG",
      verificado: false,
      ubicacion: "Tonalá",
      mensaje: "¿Cuál es el grosor exacto?  Me interesan 100 piezas si el precio es negociable.",
      fecha: "Ayer",
      cantidadSolicitada: 100,
      estado: "negociando",
    },
  ];

  const statsDiarias = [
    { dia: "Lun", vistas: 12 },
    { dia: "Mar", vistas: 25 },
    { dia: "Mie", vistas: 18 },
    { dia: "Jue", vistas: 32 },
    { dia: "Vie", vistas: 45 },
    { dia: "Sab", vistas: 15 },
    { dia: "Hoy", vistas: 9 },
  ];

  const maxVistas = Math.max(...statsDiarias.map((d) => d. vistas));

  const getEstadoInteresado = (estado: Interesado["estado"]) => {
    const configs = {
      nuevo: { color: "text-violet-600", bg: "bg-violet-50", label: "Nuevo" },
      contactado: { color: "text-teal-600", bg: "bg-teal-50", label: "Contactado" },
      negociando: { color: "text-amber-600", bg: "bg-amber-50", label: "Negociando" },
      cerrado: { color: "text-emerald-600", bg: "bg-emerald-50", label: "Cerrado" },
    };
    return configs[estado];
  };

  const tabs = [
    { id: "interesados" as TabType, label: "Interesados", count: oferta.interesados },
    { id: "estadisticas" as TabType, label: "Estadísticas" },
    { id: "detalles" as TabType, label: "Detalles" },
  ];

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate("/mis-ofertas")}
          className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-50"
        >
          <ArrowLeft className="w-5 h-5 text-slate-600" />
        </button>
        <div className="flex-1">
          <h1 className="text-lg font-bold text-slate-800 line-clamp-1">{oferta.nombre}</h1>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-emerald-600 font-medium flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" />
              Activa
            </span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-500">{oferta.fechaPublicacion}</span>
          </div>
        </div>
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-50 relative"
        >
          <MoreHorizontal className="w-5 h-5 text-slate-600" />
          
          {showMenu && (
            <div className="absolute top-12 right-0 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-10 w-48">
              <button className="w-full flex items-center gap-3 px-4 py-2. 5 text-sm text-slate-700 hover:bg-slate-50">
                <Edit3 className="w-4 h-4" />
                Editar
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50">
                <Share2 className="w-4 h-4" />
                Compartir
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50">
                <PauseCircle className="w-4 h-4" />
                Pausar
              </button>
              <div className="border-t border-slate-100 my-1" />
              <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50">
                <Trash2 className="w-4 h-4" />
                Eliminar
              </button>
            </div>
          )}
        </button>
      </div>

      {showMenu && <div className="fixed inset-0 z-0" onClick={() => setShowMenu(false)} />}

      {/* Stats resumen */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white rounded-xl border border-slate-200 p-4 text-center">
          <Eye className="w-5 h-5 text-slate-400 mx-auto mb-1" />
          <div className="text-2xl font-bold text-slate-800">{oferta.vistas}</div>
          <div className="text-xs text-slate-500">Vistas</div>
        </div>
        <div className="bg-gradient-to-br from-violet-500 to-purple-500 rounded-xl p-4 text-center text-white">
          <Users className="w-5 h-5 mx-auto mb-1 opacity-80" />
          <div className="text-2xl font-bold">{oferta.interesados}</div>
          <div className="text-xs opacity-80">Interesados</div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4 text-center">
          <MessageCircle className="w-5 h-5 text-teal-500 mx-auto mb-1" />
          <div className="text-2xl font-bold text-slate-800">{oferta.mensajes}</div>
          <div className="text-xs text-slate-500">Mensajes</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex-1 py-3 rounded-xl font-medium text-sm transition-all",
              activeTab === tab.id
                ? "bg-violet-100 text-violet-700"
                : "bg-white text-slate-600 border border-slate-200"
            )}
          >
            {tab.label}
            {tab.count !== undefined && (
              <span className={cn(
                "ml-1. 5 px-1. 5 py-0.5 text-xs rounded-full",
                activeTab === tab. id ?  "bg-violet-200" : "bg-slate-100"
              )}>
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* TAB: INTERESADOS */}
      {activeTab === "interesados" && (
        <div className="space-y-4">
          {interesados. length > 0 ? (
            interesados.map((int) => {
              const estado = getEstadoInteresado(int. estado);
              return (
                <div key={int.id} className="bg-white rounded-2xl border border-slate-200 p-5">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center text-white font-bold shrink-0">
                      {int. iniciales}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-slate-800">{int.nombre}</span>
                        {int.verificado && <BadgeCheck className="w-4 h-4 text-teal-500" />}
                        <span className={cn("text-xs px-2 py-0.5 rounded-full ml-auto", estado. bg, estado.color)}>
                          {estado.label}
                        </span>
                      </div>
                      <div className="text-sm text-slate-500 mb-2">{int.empresa}</div>
                      
                      <div className="p-3 bg-slate-50 rounded-xl mb-3">
                        <p className="text-sm text-slate-700">{int.mensaje}</p>
                      </div>

                      <div className="flex items-center gap-4 text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                          <Package className="w-3. 5 h-3.5" />
                          {int. cantidadSolicitada} piezas
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3. 5" />
                          {int.ubicacion}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3. 5" />
                          {int.fecha}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-4 pt-4 border-t border-slate-100">
                    <button className="flex-1 flex items-center justify-center gap-2 py-2. 5 rounded-xl font-medium text-sm text-white bg-gradient-to-r from-teal-600 to-cyan-600">
                      <MessageCircle className="w-4 h-4" />
                      Responder
                    </button>
                    <button className="w-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600">
                      <Phone className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
              <Users className="w-16 h-16 text-slate-200 mx-auto mb-4" />
              <h3 className="font-semibold text-slate-700 mb-2">Aún no hay interesados</h3>
              <p className="text-sm text-slate-500">Los compradores interesados aparecerán aquí</p>
            </div>
          )}
        </div>
      )}

      {/* TAB: ESTADÍSTICAS */}
      {activeTab === "estadisticas" && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-5">
            <h3 className="font-bold text-slate-800 mb-4">Vistas últimos 7 días</h3>
            <div className="flex items-end gap-2 h-32">
              {statsDiarias.map((dia, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <div
                    className="w-full bg-gradient-to-t from-violet-500 to-purple-400 rounded-t-lg transition-all"
                    style={{ height: `${(dia.vistas / maxVistas) * 100}%`, minHeight: "8px" }}
                  />
                  <span className="text-xs text-slate-500">{dia.dia}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-5">
            <h3 className="font-bold text-slate-800 mb-4">Rendimiento</h3>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-600">Tasa de conversión</span>
                  <span className="font-bold text-slate-800">5. 1%</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-violet-500 rounded-full" style={{ width: "5. 1%" }} />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-600">Tasa de respuesta</span>
                  <span className="font-bold text-emerald-600">92%</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: "92%" }} />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-600">Tiempo promedio de respuesta</span>
                  <span className="font-bold text-teal-600">45 min</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-teal-500 rounded-full" style={{ width: "75%" }} />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-violet-50 to-purple-50 rounded-2xl p-5 border border-violet-100">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-violet-600" />
              <span className="font-semibold text-violet-800">Sugerencia</span>
            </div>
            <p className="text-sm text-violet-700">
              Tu oferta tiene un buen rendimiento. Considera bajar el precio un 5% para aumentar las conversiones.
            </p>
          </div>
        </div>
      )}

      {/* TAB: DETALLES */}
      {activeTab === "detalles" && (
        <div className="space-y-4">
          {/* Imágenes */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5">
            <h3 className="font-bold text-slate-800 mb-4">Imágenes</h3>
            <div className="flex gap-3">
              {oferta.imagenes. map((img, i) => (
                <div key={i} className="w-20 h-20 rounded-xl bg-gradient-to-br from-slate-100 to-slate-50 flex items-center justify-center text-3xl">
                  {img}
                </div>
              ))}
              <button className="w-20 h-20 rounded-xl border-2 border-dashed border-slate-300 flex items-center justify-center text-slate-400">
                <Edit3 className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Info */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5">
            <h3 className="font-bold text-slate-800 mb-4">Información</h3>
            <div className="space-y-4">
              <div>
                <div className="text-sm text-slate-500 mb-1">Nombre</div>
                <div className="font-medium text-slate-800">{oferta. nombre}</div>
              </div>
              <div>
                <div className="text-sm text-slate-500 mb-1">Descripción</div>
                <div className="text-slate-700">{oferta.descripcion}</div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-slate-500 mb-1">Categoría</div>
                  <div className="font-medium text-slate-800">{oferta.categoria}</div>
                </div>
                <div>
                  <div className="text-sm text-slate-500 mb-1">Ubicación</div>
                  <div className="font-medium text-slate-800">{oferta.ubicacion}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Precio */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5">
            <h3 className="font-bold text-slate-800 mb-4">Precio y disponibilidad</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-slate-500 mb-1">Precio</div>
                  <div className="text-xl font-bold text-slate-800">${oferta.precio. toLocaleString()}</div>
                  <div className="text-sm text-slate-500">por {oferta.unidad}</div>
                </div>
                <div>
                  <div className="text-sm text-slate-500 mb-1">Mínimo de compra</div>
                  <div className="font-medium text-slate-800">{oferta.minCompra} {oferta.unidad}s</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-slate-500 mb-1">Disponibilidad</div>
                  <div className="font-medium text-slate-800">{oferta.disponibilidad}</div>
                </div>
                <div>
                  <div className="text-sm text-slate-500 mb-1">Transporte</div>
                  <div className="font-medium text-slate-800 flex items-center gap-1">
                    {oferta.incluyeTransporte ?  (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        Incluido
                      </>
                    ) : (
                      "No incluido"
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Acciones */}
          <div className="flex gap-3">
            <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-violet-700 bg-violet-100">
              <Edit3 className="w-5 h-5" />
              Editar oferta
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-amber-700 bg-amber-100">
              <PauseCircle className="w-5 h-5" />
              Pausar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}