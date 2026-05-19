import { Filter, Search, X } from "lucide-react";
import type { CustomerSegmentFilter, CustomerStatusFilter } from "@/pages/customers/hooks/useCustomers";

interface FilterOption<T extends string> {
  value: T;
  label: string;
}

interface CustomerFiltersProps {
  searchText: string;
  statusFilter: CustomerStatusFilter;
  segmentFilter: CustomerSegmentFilter;
  statusOptions: Array<FilterOption<CustomerStatusFilter>>;
  segmentOptions: Array<FilterOption<CustomerSegmentFilter>>;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: CustomerStatusFilter) => void;
  onSegmentChange: (value: CustomerSegmentFilter) => void;
  onClearFilters: () => void;
}

export default function CustomerFilters({
  searchText,
  statusFilter,
  segmentFilter,
  statusOptions,
  segmentOptions,
  onSearchChange,
  onStatusChange,
  onSegmentChange,
  onClearFilters,
}: CustomerFiltersProps) {
  return (
    <div className="space-y-3 rounded-lg border border-[#e2e3dc] bg-[#f9faf3] p-3">
      <div className="grid gap-3 xl:grid-cols-[1.3fr_1fr_1fr_auto]">
        <label className="relative block">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#42493f]" />
          <input
            type="text"
            value={searchText}
            placeholder="Buscar por cliente, empresa o account manager"
            onChange={(event) => onSearchChange(event.target.value)}
            className="h-10 w-full rounded-lg border border-[#c2c9bc] bg-white pl-9 pr-3 text-sm text-[#1a1c18] outline-none transition focus:border-[#4F7302] focus:ring-2 focus:ring-[#4F7302]/20"
          />
        </label>

        <select
          value={statusFilter}
          onChange={(event) => onStatusChange(event.target.value as CustomerStatusFilter)}
          className="h-10 rounded-lg border border-[#c2c9bc] bg-white px-3 text-sm text-[#1a1c18] outline-none transition focus:border-[#4F7302] focus:ring-2 focus:ring-[#4F7302]/20"
        >
          {statusOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <select
          value={segmentFilter}
          onChange={(event) => onSegmentChange(event.target.value as CustomerSegmentFilter)}
          className="h-10 rounded-lg border border-[#c2c9bc] bg-white px-3 text-sm text-[#1a1c18] outline-none transition focus:border-[#4F7302] focus:ring-2 focus:ring-[#4F7302]/20"
        >
          {segmentOptions.map((option) => (
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
        Usa los filtros para enfocar retencion, expansion y seguimiento comercial.
      </p>
    </div>
  );
}
