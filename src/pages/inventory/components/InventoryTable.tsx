import { Eye, PackagePlus, Warehouse } from "lucide-react";
import type { InventoryItem } from "@/types/inventory.types";
import InventoryStatusBadge from "./InventoryStatusBadge";
import InventoryStockLevel from "./InventoryStockLevel";

const categoryLabels: Record<InventoryItem["category"], string> = {
  raw_material: "Materia prima",
  finished_product: "Producto terminado",
  service: "Servicio",
  packaging: "Empaque",
  equipment: "Equipo",
  digital: "Digital",
};

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0,
  }).format(value);

const formatDate = (dateISO: string) =>
  new Date(`${dateISO}T00:00:00`).toLocaleDateString("es-MX", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

interface InventoryTableProps {
  items: InventoryItem[];
  selectedItemId: string | null;
  onSelectItem: (itemId: string) => void;
}

export default function InventoryTable({ items, selectedItemId, onSelectItem }: InventoryTableProps) {
  return (
    <div className="overflow-x-auto rounded-lg border border-[#e2e3dc]">
      <table className="min-w-[1200px] w-full text-left text-sm">
        <thead className="bg-[#f3f4ed] text-xs uppercase tracking-[0.06em] text-[#42493f]">
          <tr>
            <th className="px-3 py-3">Producto</th>
            <th className="px-3 py-3">SKU</th>
            <th className="px-3 py-3">Categoria</th>
            <th className="px-3 py-3">Cantidad</th>
            <th className="px-3 py-3">Estado</th>
            <th className="px-3 py-3">Valor estimado</th>
            <th className="px-3 py-3">Proveedor</th>
            <th className="px-3 py-3">Ultima actualizacion</th>
            <th className="px-3 py-3 text-right">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => {
            const isSelected = item.id === selectedItemId;
            return (
              <tr
                key={item.id}
                onClick={() => onSelectItem(item.id)}
                className={`cursor-pointer border-t border-[#e8e9e2] transition hover:bg-[#f9faf3] ${
                  isSelected ? "bg-[#f3f4ed]" : "bg-white"
                }`}
              >
                <td className="px-3 py-3">
                  <p className="font-semibold text-[#1a1c18]">{item.name}</p>
                  <p className="text-xs text-[#42493f]">{item.location}</p>
                </td>
                <td className="px-3 py-3 text-[#42493f]">{item.sku}</td>
                <td className="px-3 py-3 text-[#42493f]">{categoryLabels[item.category]}</td>
                <td className="px-3 py-3">
                  <p className="font-semibold text-[#1a1c18]">
                    {item.quantity} {item.unit}
                  </p>
                  <InventoryStockLevel quantity={item.quantity} minStock={item.minStock} maxStock={item.maxStock} />
                </td>
                <td className="px-3 py-3">
                  <InventoryStatusBadge status={item.status} />
                </td>
                <td className="px-3 py-3 font-semibold text-[#1a1c18]">{formatCurrency(item.estimatedValue)}</td>
                <td className="px-3 py-3 text-[#42493f]">{item.supplier}</td>
                <td className="px-3 py-3 text-[#42493f]">{formatDate(item.lastUpdated)}</td>
                <td className="px-3 py-3">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      type="button"
                      aria-label={`Ver detalle de ${item.name}`}
                      onClick={(event) => {
                        event.stopPropagation();
                        onSelectItem(item.id);
                      }}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-[#c2c9bc] bg-white text-[#42493f] hover:bg-[#f3f4ed]"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      aria-label={`Reponer ${item.name}`}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-[#c2c9bc] bg-white text-[#42493f] hover:bg-[#f3f4ed]"
                    >
                      <PackagePlus className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      aria-label={`Mover stock de ${item.name}`}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-[#c2c9bc] bg-white text-[#42493f] hover:bg-[#f3f4ed]"
                    >
                      <Warehouse className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
          {items.length === 0 ? (
            <tr>
              <td colSpan={9} className="px-3 py-8 text-center text-sm text-[#42493f]">
                No se encontraron productos con los filtros actuales.
              </td>
            </tr>
          ) : null}
        </tbody>
      </table>
    </div>
  );
}
