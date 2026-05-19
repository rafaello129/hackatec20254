import React from "react";
import InitiativeTypeCard from "./InitiativeTypeCard";
import { ShoppingCart, Store, Megaphone, Truck, Route, Headphones, Package, Handshake } from "lucide-react";

const TYPES = [
  { id: 'compra_conjunta', title: 'Compra conjunta', desc: 'Agrupa empresas para comprar productos o insumos por volumen, alcanzar mínimos de mayoreo y reducir costos unitarios.', icon: <ShoppingCart className="w-6 h-6" /> },
  { id: 'venta_conjunta', title: 'Venta conjunta', desc: 'Asóciate con otras empresas para cubrir pedidos grandes que individualmente no podrían atender.', icon: <Store className="w-6 h-6" /> },
  { id: 'campana_compartida', title: 'Campaña compartida', desc: 'Combina productos, presupuesto y canales de difusión para lanzar campañas regionales o de temporada.', icon: <Megaphone className="w-6 h-6" /> },
  { id: 'distribucion_compartida', title: 'Distribución compartida', desc: 'Comparte rutas, puntos de entrega o capacidad logística para reducir costos de distribución.', icon: <Truck className="w-6 h-6" /> },
  { id: 'asociacion_logistica', title: 'Asociación logística', desc: 'Coordina transporte, entregas o servicios de última milla entre varias empresas participantes.', icon: <Route className="w-6 h-6" /> },
  { id: 'servicio_compartido', title: 'Servicio compartido', desc: 'Contrata o comparte servicios empresariales entre varias organizaciones para optimizar costos.', icon: <Headphones className="w-6 h-6" /> },
  { id: 'inventario_colaborativo', title: 'Inventario colaborativo', desc: 'Redistribuye excedentes, capacidad o productos disponibles dentro de una red de aliados.', icon: <Package className="w-6 h-6" /> },
  { id: 'alianza_estrategica', title: 'Alianza estratégica', desc: 'Crea una colaboración de largo plazo con empresas complementarias para aumentar alcance y valor.', icon: <Handshake className="w-6 h-6" /> },
];

interface Props { selected: string | null; onSelect: (id: string) => void }

export default function InitiativeTypeGrid({ selected, onSelect }: Props) {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {TYPES.map((t) => (
          <InitiativeTypeCard key={t.id} id={t.id} title={t.title} description={t.desc} icon={t.icon} selected={selected === t.id} onClick={() => onSelect(t.id)} />
        ))}
      </div>
    </div>
  );
}
