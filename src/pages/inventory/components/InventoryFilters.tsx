import { Filter, Search, X } from "lucide-react";
import type {
  InventoryCategoryFilter,
  InventoryStatusFilter,
} from "@/pages/inventory/hooks/useInventory";

interface FilterOption<T extends string> {
  value: T;
  label: string;
}

interface InventoryFiltersProps {
  searchText: string;
  statusFilter: InventoryStatusFilter;
  categoryFilter: InventoryCategoryFilter;
  statusOptions: Array<FilterOption<InventoryStatusFilter>>;
  categoryOptions: Array<FilterOption<InventoryCategoryFilter>>;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: InventoryStatusFilter) => void;
  onCategoryChange: (value: InventoryCategoryFilter) => void;
  onClearFilters: () => void;
}

export default function InventoryFilters({
  searchText,
  statusFilter,
  categoryFilter,
  statusOptions,
  categoryOptions,
  onSearchChange,
  onStatusChange,
  onCategoryChange,
  onClearFilters,
}: InventoryFiltersProps) {
  return (
    <div className="space-y-3 rounded-lg border border-[#e2e3dc] bg-[#f9faf3] p-3">
      <div className="grid gap-3 xl:grid-cols-[1.3fr_1fr_1fr_auto]">
        <label className="relative block">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#42493f]" />
          <input
            type="text"
            value={searchText}
            placeholder="Buscar por producto, SKU, proveedor o tag"
            onChange={(event) => onSearchChange(event.target.value)}
            className="h-10 w-full rounded-lg border border-[#c2c9bc] bg-white pl-9 pr-3 text-sm text-[#1a1c18] outline-none transition focus:border-[#4F7302] focus:ring-2 focus:ring-[#4F7302]/20"
          />
        </label>

        <select
          value={statusFilter}
          onChange={(event) => onStatusChange(event.target.value as InventoryStatusFilter)}
          className="h-10 rounded-lg border border-[#c2c9bc] bg-white px-3 text-sm text-[#1a1c18] outline-none transition focus:border-[#4F7302] focus:ring-2 focus:ring-[#4F7302]/20"
        >
          {statusOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <select
          value={categoryFilter}
          onChange={(event) => onCategoryChange(event.target.value as InventoryCategoryFilter)}
          className="h-10 rounded-lg border border-[#c2c9bc] bg-white px-3 text-sm text-[#1a1c18] outline-none transition focus:border-[#4F7302] focus:ring-2 focus:ring-[#4F7302]/20"
        >
          {categoryOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <button
          type="button"
          onClick={onClearFilters}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-[#c2c9bc] bg-white px-3 text-sm font-semibold text-[#1a1c18] hover:bg-[#f3f4ed]"
        >
          <X className="h-4 w-4" />
          Limpiar
        </button>
      </div>

      <p className="inline-flex items-center gap-2 text-xs text-[#42493f]">
        <Filter className="h-3.5 w-3.5" />
        Filtra stock para priorizar reposiciones y oportunidades de compra conjunta.
      </p>
    </div>
  );
}
