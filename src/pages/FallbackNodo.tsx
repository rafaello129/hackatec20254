import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  AlertTriangle,
  RefreshCw,
  Star,
  BadgeCheck,
  MapPin,
  Clock,
  Sparkles,
  ChevronRight,
  CheckCircle2,
  MessageCircle,
  Search,
  Zap,
  AlertCircle,
  ArrowRight,
  X,
  Phone,
} from "lucide-react";
import { cn } from "../components/ui/utils";
import { proyectos, proveedores } from "../data/mockData2";
import React from "react";

export default function FallbackNodo() {
  const { id, nodoId } = useParams();
  const navigate = useNavigate();
  const [selectedAlternativa, setSelectedAlternativa] = useState<string | null>(null);
  const [showContactar, setShowContactar] = useState(false);

  const proyecto = proyectos. find((p) => p.id === id) || proyectos[0];
  const nodo = proyecto.nodos.find((n) => n.id === nodoId) || proyecto. nodos[0];

  const proveedorFallido = nodo.proveedor
    ? proveedores.find((p) => p.id === nodo.proveedor?. id)
    : null;

  const alternativas = proveedores
    .filter((p) => p.id !== nodo.proveedor?.id)
    .slice(0, 4)
    .map((p, i) => ({
      ... p,
      matchScore: 92 - i * 5,
      disponibilidad: i === 0 ?  "Inmediata" : i === 1 ?  "24 horas" : "2-3 días",
      precioEstimado: 12500 + i * 800,
      diferenciaPrecio: i === 0 ? 0 : i * 3,
    }));

  const nodosAfectados = proyecto.conexiones
    .filter((c) => c.desde === nodo.id)
    .map((c) => proyecto.nodos.find((n) => n.id === c. hacia))
    .filter(Boolean);

  const handleSeleccionar = (proveedorId: string) => {
    setSelectedAlternativa(proveedorId);
  };

  const handleConfirmar = () => {
    navigate(`/proyecto/${id}`);
  };

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate(`/proyecto/${id}`)}
          className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-50"
        >
          <ArrowLeft className="w-5 h-5 text-slate-600" />
        </button>
        <div>
          <h1 className="text-xl font-bold text-slate-800">Problema con nodo</h1>
          <p className="text-sm text-slate-500">Buscar alternativas para {nodo.titulo}</p>
        </div>
      </div>

      {/* Alerta */}
      <div className="bg-gradient-to-r from-red-500 to-rose-500 rounded-2xl p-5 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="relative z-10">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h2 className="font-bold text-lg mb-1">Proveedor canceló</h2>
              <p className="text-white/80 text-sm mb-3">
                <strong>{proveedorFallido?.nombre || "El proveedor"}</strong> canceló el servicio.
                Motivo: "Sin disponibilidad en las fechas solicitadas"
              </p>
              <div className="flex items-center gap-2 text-sm text-white/70">
                <Clock className="w-4 h-4" />
                <span>Cancelado hace 2 horas</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Nodos afectados */}
      {nodosAfectados.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
          <div className="flex items-start gap-3 mb-4">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-amber-800">Nodos afectados</h3>
              <p className="text-sm text-amber-700">
                Estos nodos dependen de {nodo.titulo} y están en espera:
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {nodosAfectados. map((nodoAfectado) => (
              <div
                key={nodoAfectado?. id}
                className="flex items-center gap-2 px-3 py-2 bg-white rounded-xl border border-amber-200"
              >
                <span className="text-lg">{nodoAfectado?. icono}</span>
                <span className="text-sm font-medium text-slate-700">{nodoAfectado?. titulo}</span>
                <span className="text-xs text-amber-600 bg-amber-100 px-2 py-0.5 rounded-full">Esperando</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Nodo con problema */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5">
        <div className="flex items-center gap-4 mb-4 pb-4 border-b border-slate-100">
          <div className="w-14 h-14 rounded-xl bg-red-100 flex items-center justify-center text-2xl">
            {nodo.icono}
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-slate-800">{nodo.titulo}</h3>
            <p className="text-sm text-slate-500">{nodo. categoria}</p>
          </div>
          <span className="px-3 py-1 bg-red-100 text-red-700 text-sm font-medium rounded-full">Fallido</span>
        </div>

        {proveedorFallido && (
          <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl mb-4">
            <div className="w-10 h-10 rounded-lg bg-slate-200 flex items-center justify-center text-slate-500 font-bold">
              {proveedorFallido.iniciales}
            </div>
            <div className="flex-1">
              <div className="font-medium text-slate-600 line-through">{proveedorFallido.nombre}</div>
              <div className="text-sm text-slate-400">Proveedor anterior</div>
            </div>
            <button
              onClick={() => setShowContactar(true)}
              className="text-sm text-violet-600 font-medium"
            >
              Contactar
            </button>
          </div>
        )}

        {nodo.producto && (
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-500">Producto</span>
              <span className="font-medium text-slate-800">{nodo. producto.nombre}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Cantidad</span>
              <span className="font-medium text-slate-800">{nodo.producto.cantidad} {nodo.producto. unidad}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Precio acordado</span>
              <span className="font-medium text-slate-800">
                ${(nodo.producto. precio * nodo.producto. cantidad).toLocaleString()}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Alternativas */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-slate-800 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-violet-600" />
            Alternativas sugeridas
          </h2>
          <button
            onClick={() => navigate(`/proyecto/${id}/nodo/${nodoId}/proveedores`)}
            className="text-sm text-violet-600 hover:text-violet-700 font-medium flex items-center gap-1"
          >
            Buscar más
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {alternativas. map((alt, index) => (
          <div
            key={alt.id}
            onClick={() => handleSeleccionar(alt.id)}
            className={cn(
              "bg-white rounded-2xl border p-5 cursor-pointer transition-all",
              selectedAlternativa === alt.id
                ? "border-violet-500 ring-4 ring-violet-500/10"
                : "border-slate-200 hover:border-violet-200 hover:shadow-lg"
            )}
          >
            <div className="flex items-start gap-4">
              <div className="relative">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center text-white font-bold text-lg">
                  {alt.iniciales}
                </div>
                {index === 0 && (
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full flex items-center justify-center">
                    <Zap className="w-3.5 h-3.5 text-white" />
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-slate-800">{alt.nombre}</h3>
                  {alt. verificado && <BadgeCheck className="w-5 h-5 text-teal-500" />}
                  <span className="ml-auto text-sm font-medium text-violet-600 bg-violet-50 px-2 py-0.5 rounded-full">
                    Match {alt. matchScore}%
                  </span>
                </div>

                <div className="flex items-center gap-3 text-sm text-slate-500 mb-3">
                  <span className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                    <span className="font-medium text-slate-700">{alt.rating}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {alt.ubicacion}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-3 p-3 bg-slate-50 rounded-xl">
                  <div>
                    <div className="text-xs text-slate-500">Disponibilidad</div>
                    <div className={cn(
                      "font-medium text-sm",
                      alt. disponibilidad === "Inmediata" ? "text-emerald-600" : "text-slate-700"
                    )}>
                      {alt.disponibilidad}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500">Precio est. </div>
                    <div className="font-medium text-sm text-slate-700">
                      ${alt.precioEstimado. toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500">vs.  anterior</div>
                    <div className={cn(
                      "font-medium text-sm",
                      alt.diferenciaPrecio === 0 ? "text-emerald-600" :
                      alt. diferenciaPrecio < 5 ?  "text-amber-600" : "text-red-500"
                    )}>
                      {alt.diferenciaPrecio === 0 ? "Igual" : `+${alt.diferenciaPrecio}%`}
                    </div>
                  </div>
                </div>
              </div>

              <div className="shrink-0">
                {selectedAlternativa === alt.id ? (
                  <div className="w-8 h-8 rounded-full bg-violet-600 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-white" />
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-full border-2 border-slate-200" />
                )}
              </div>
            </div>

            {/* Acciones cuando está seleccionado */}
            {selectedAlternativa === alt.id && (
              <div className="mt-4 pt-4 border-t border-slate-100 flex gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/proveedor/${alt. id}`);
                  }}
                  className="flex-1 flex items-center justify-center gap-2 py-2. 5 rounded-xl font-medium text-slate-700 bg-slate-100 hover:bg-slate-200"
                >
                  Ver perfil
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    // Abrir chat
                  }}
                  className="flex-1 flex items-center justify-center gap-2 py-2. 5 rounded-xl font-medium text-violet-700 bg-violet-100 hover:bg-violet-200"
                >
                  <MessageCircle className="w-4 h-4" />
                  Contactar
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Otras opciones */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5">
        <h3 className="font-bold text-slate-800 mb-4">Otras opciones</h3>
        <div className="space-y-3">
          <button
            onClick={() => navigate(`/proyecto/${id}/nodo/${nodoId}/proveedores`)}
            className="w-full flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors text-left"
          >
            <div className="w-10 h-10 rounded-lg bg-violet-100 flex items-center justify-center">
              <Search className="w-5 h-5 text-violet-600" />
            </div>
            <div className="flex-1">
              <div className="font-medium text-slate-800">Buscar manualmente</div>
              <div className="text-sm text-slate-500">Explorar todos los proveedores disponibles</div>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400" />
          </button>

          <button
            className="w-full flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors text-left"
          >
            <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
              <RefreshCw className="w-5 h-5 text-amber-600" />
            </div>
            <div className="flex-1">
              <div className="font-medium text-slate-800">Reintentar con proveedor original</div>
              <div className="text-sm text-slate-500">Contactar para renegociar fechas</div>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400" />
          </button>

          <button
            className="w-full flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors text-left"
          >
            <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
              <X className="w-5 h-5 text-red-600" />
            </div>
            <div className="flex-1">
              <div className="font-medium text-slate-800">Eliminar nodo del proyecto</div>
              <div className="text-sm text-slate-500">Quitar este paso del flujo</div>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400" />
          </button>
        </div>
      </div>

      {/* Botón confirmar */}
      {selectedAlternativa && (
        <div className="sticky bottom-20 bg-white/80 backdrop-blur-lg rounded-2xl border border-slate-200 p-4 shadow-xl">
          <button
            onClick={handleConfirmar}
            className="w-full py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 shadow-lg shadow-violet-500/25 flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="w-5 h-5" />
            Confirmar nuevo proveedor
          </button>
        </div>
      )}

      {/* Modal contactar proveedor fallido */}
      {showContactar && proveedorFallido && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowContactar(false)} />
          <div className="relative w-full max-w-sm bg-white rounded-3xl overflow-hidden shadow-2xl">
            <div className="p-6 text-center">
              <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-slate-400">{proveedorFallido.iniciales}</span>
              </div>
              <h3 className="font-bold text-lg text-slate-800 mb-2">{proveedorFallido.nombre}</h3>
              <p className="text-sm text-slate-500 mb-6">
                ¿Quieres contactar al proveedor para renegociar? 
              </p>
              <div className="space-y-2">
                <button className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-medium text-white bg-gradient-to-r from-teal-600 to-cyan-600">
                  <Phone className="w-5 h-5" />
                  Llamar
                </button>
                <button className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-medium text-violet-700 bg-violet-100">
                  <MessageCircle className="w-5 h-5" />
                  Enviar mensaje
                </button>
                <button
                  onClick={() => setShowContactar(false)}
                  className="w-full py-3 rounded-xl font-medium text-slate-600"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}