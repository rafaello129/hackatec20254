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
    <div className="max-w-full overflow-x-auto rounded-lg border border-[#e2e3dc]">
      <table className="min-w-[760px] w-full table-fixed text-left text-sm">
        <thead className="bg-[#f3f4ed] text-xs uppercase tracking-[0.06em] text-[#42493f]">
          <tr>
            <th className="w-[30%] px-3 py-3">Producto</th>
            <th className="w-[16%] px-3 py-3">SKU</th>
            <th className="w-[18%] px-3 py-3">Categoría</th>
            <th className="w-[15%] px-3 py-3">Cantidad</th>
            <th className="w-[13%] px-3 py-3">Estado</th>
            <th className="w-[8%] px-3 py-3 text-right">Acción</th>
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
                <td className="px-3 py-2.5">
                  <p className="truncate font-semibold text-[#1a1c18]">{item.name}</p>
                </td>
                <td className="px-3 py-2.5 text-[#42493f]"><span className="block truncate">{item.sku}</span></td>
                <td className="px-3 py-2.5 text-[#42493f]"><span className="block truncate">{categoryLabels[item.category]}</span></td>
                <td className="px-3 py-2.5">
                  <p className="truncate font-semibold text-[#1a1c18]">{item.quantity} {item.unit}</p>
                </td>
                <td className="px-3 py-2.5">
                  <InventoryStatusBadge status={item.status} />
                </td>
                <td className="px-3 py-2.5">
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
                  </div>
                </td>
              </tr>
            );
          })}
          {items.length === 0 ? (
            <tr>
              <td colSpan={6} className="px-3 py-8 text-center text-sm text-[#42493f]">
                No se encontraron productos con los filtros actuales.
              </td>
            </tr>
          ) : null}
        </tbody>
      </table>
    </div>
  );
}
