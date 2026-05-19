import { Building2, MapPin, Package, Tags } from "lucide-react";
import type { InventoryItem, StockMovement } from "@/types/inventory.types";
import InventoryStatusBadge from "./InventoryStatusBadge";

const categoryLabels: Record<InventoryItem["category"], string> = {
  raw_material: "Materia prima",
  finished_product: "Producto terminado",
  service: "Servicio",
  packaging: "Empaque",
  equipment: "Equipo",
  digital: "Digital",
};

const useCaseLabels: Record<InventoryItem["cooperativeUseCase"], string> = {
  compra_conjunta: "Compra conjunta",
  venta_conjunta: "Venta conjunta",
  campana_compartida: "Campana compartida",
  reparticion_bienes: "Reparticion de bienes",
  soporte_post_acuerdo: "Soporte post-acuerdo",
  no_aplica: "No aplica",
};

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0,
  }).format(value);

interface InventoryDetailPanelProps {
  item: InventoryItem | null;
  movements: StockMovement[];
}

export default function InventoryDetailPanel({ item, movements }: InventoryDetailPanelProps) {
  if (!item) {
    return (
      <section className="rounded-lg border border-[#c2c9bc] bg-white p-4">
        <h3 className="font-['Hanken_Grotesk'] text-lg font-semibold text-[#1a1c18]">Detalle de inventario</h3>
        <p className="mt-2 text-sm text-[#42493f]">Selecciona un producto para revisar su ficha operativa.</p>
      </section>
    );
  }

  return (
    <section className="rounded-lg border border-[#c2c9bc] bg-white p-4">
      <div className="mb-4 flex items-start justify-between gap-2">
        <div>
          <h3 className="font-['Hanken_Grotesk'] text-lg font-semibold text-[#1a1c18]">{item.name}</h3>
          <p className="text-sm text-[#42493f]">{item.sku}</p>
        </div>
        <InventoryStatusBadge status={item.status} />
      </div>

      <p className="mb-3 text-sm text-[#1a1c18]">{item.description}</p>

      <dl className="space-y-2 text-sm text-[#42493f]">
        <div className="flex items-center gap-2">
          <Package className="h-4 w-4 text-[#799833]" />
          <span>
            {item.quantity} {item.unit} · Min {item.minStock} / Max {item.maxStock}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Tags className="h-4 w-4 text-[#799833]" />
          <span>{categoryLabels[item.category]}</span>
        </div>
        <div className="flex items-center gap-2">
          <Building2 className="h-4 w-4 text-[#799833]" />
          <span>{item.supplier}</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-[#799833]" />
          <span>{item.location}</span>
        </div>
      </dl>

      <div className="mt-3 rounded-lg border border-[#e2e3dc] bg-[#f9faf3] p-3">
        <p className="text-xs font-semibold uppercase tracking-[0.06em] text-[#42493f]">Valor estimado</p>
        <p className="font-semibold text-[#1a1c18]">{formatCurrency(item.estimatedValue)}</p>
      </div>

      <div className="mt-3">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.06em] text-[#42493f]">Tags</p>
        <div className="flex flex-wrap gap-2">
          {item.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-[#D6D979] px-2.5 py-1 text-xs font-semibold text-[#3E5902]">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-3 rounded-lg border border-[#e2e3dc] bg-white p-3">
        <p className="text-xs font-semibold uppercase tracking-[0.06em] text-[#42493f]">Preparacion cooperativos</p>
        <p className="mt-1 text-sm text-[#1a1c18]">Caso: {useCaseLabels[item.cooperativeUseCase]}</p>
        <p className="text-sm text-[#42493f]">
          {item.availableForCooperative ? "Apto para cooperativo" : "No apto para cooperativo"} · Supplier preferente:{" "}
          {item.preferredSupplier}
        </p>
        <p className="text-sm text-[#42493f]">
          Bulk: {item.bulkPurchaseEligible ? `Si (min ${item.minimumBulkQuantity} ${item.unit})` : "No"}
        </p>
      </div>

      <div className="mt-3 rounded-lg border border-[#e2e3dc] bg-[#f9faf3] p-3">
        <p className="text-xs font-semibold uppercase tracking-[0.06em] text-[#42493f]">Recomendacion</p>
        <p className="text-sm text-[#1a1c18]">
          {item.status === "out_of_stock" || item.status === "low_stock"
            ? "Prioriza reposicion y evalua orden cooperativa para mejorar costo y disponibilidad."
            : "Mantener monitoreo semanal y revisar oportunidades de rotacion comercial."}
        </p>
      </div>

      <div className="mt-3">
        <p className="mb-1 text-xs font-semibold uppercase tracking-[0.06em] text-[#42493f]">Ultimos movimientos del item</p>
        <ul className="space-y-1.5">
          {movements.map((movement) => (
            <li key={movement.id} className="rounded-md border border-[#e2e3dc] bg-[#f9faf3] px-2.5 py-2 text-xs text-[#42493f]">
              {movement.date} · {movement.type} · {movement.quantity} ({movement.reason})
            </li>
          ))}
          {movements.length === 0 ? (
            <li className="rounded-md border border-[#e2e3dc] bg-[#f9faf3] px-2.5 py-2 text-xs text-[#42493f]">
              Sin movimientos recientes para este item.
            </li>
          ) : null}
        </ul>
      </div>
    </section>
  );
}
