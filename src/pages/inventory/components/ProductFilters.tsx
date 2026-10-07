import { Search, X } from "lucide-react";
import type {
  ProductAvailabilityFilter,
  ProductCategoryFilter,
} from "../hooks/useInventory";
import type { ProductCategory } from "@/types/inventory.types";

const availabilityOptions: Array<{
  value: ProductAvailabilityFilter;
  label: string;
}> = [
  { value: "all", label: "Todos" },
  { value: "available", label: "Disponibles" },
  { value: "low_stock", label: "Por agotarse" },
  { value: "out_of_stock", label: "Agotados" },
];

interface ProductFiltersProps {
  searchText: string;
  availabilityFilter: ProductAvailabilityFilter;
  categoryFilter: ProductCategoryFilter;
  categories: ProductCategory[];
  onSearchChange: (value: string) => void;
  onAvailabilityChange: (value: ProductAvailabilityFilter) => void;
  onCategoryChange: (value: ProductCategoryFilter) => void;
  onClear: () => void;
}

export default function ProductFilters({
  searchText,
  availabilityFilter,
  categoryFilter,
  categories,
  onSearchChange,
  onAvailabilityChange,
  onCategoryChange,
  onClear,
}: ProductFiltersProps) {
  const hasFilters =
    searchText.trim().length > 0 ||
    availabilityFilter !== "all" ||
    categoryFilter !== "all";

  return (
    <div>
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <label className="relative min-w-0 flex-1">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#7E8981]" />
          <input
            type="search"
            value={searchText}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Buscar productos..."
            className="h-11 w-full rounded-full border border-transparent bg-[var(--peek-card-muted)] pl-11 pr-4 text-[12px] text-[var(--oe-text)] outline-none transition placeholder:text-[#89938C] focus:border-[#CAD7C5] focus:bg-white focus:ring-2 focus:ring-[var(--peek-accent-lime)]/15"
          />
        </label>

        <select
          value={categoryFilter}
          onChange={(event) =>
            onCategoryChange(event.target.value as ProductCategoryFilter)
          }
          className="h-11 rounded-[14px] border border-[var(--oe-border)] bg-white px-3 text-[11px] font-medium text-[#536057] outline-none transition focus:border-[#9FBF72] focus:ring-2 focus:ring-[var(--peek-accent-lime)]/15"
        >
          <option value="all">Todas las categorías</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        {availabilityOptions.map((option) => {
          const active = option.value === availabilityFilter;
          return (
            <button
              key={option.value}
              type="button"
              aria-pressed={active}
              onClick={() => onAvailabilityChange(option.value)}
              className={
                active
                  ? "inline-flex h-8 items-center rounded-full bg-[var(--oe-primary)] px-4 text-[11px] font-semibold text-white shadow-sm transition"
                  : "inline-flex h-8 items-center rounded-full border border-[var(--oe-border)] bg-white px-4 text-[11px] font-medium text-[#657068] transition hover:border-[#C7D3C5] hover:bg-[#F8FAF6] hover:text-[#2E4935]"
              }
            >
              {option.label}
            </button>
          );
        })}

        {hasFilters ? (
          <button
            type="button"
            onClick={onClear}
            className="ml-auto inline-flex h-8 items-center gap-1.5 rounded-full px-2.5 text-[10px] font-semibold text-[#718078] transition hover:bg-[#F1F4EE]"
          >
            <X className="h-3.5 w-3.5" />
            Limpiar
          </button>
        ) : null}
      </div>
    </div>
  );
}
