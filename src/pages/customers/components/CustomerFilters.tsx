import { Filter, X } from "lucide-react";
import type { CustomerSegmentFilter, CustomerStatusFilter } from "@/pages/customers/hooks/useCustomers";

interface FilterOption<T extends string> {
  value: T;
  label: string;
}

interface CustomerFiltersProps {
  statusFilter: CustomerStatusFilter;
  segmentFilter: CustomerSegmentFilter;
  statusOptions: Array<FilterOption<CustomerStatusFilter>>;
  segmentOptions: Array<FilterOption<CustomerSegmentFilter>>;
  onStatusChange: (value: CustomerStatusFilter) => void;
  onSegmentChange: (value: CustomerSegmentFilter) => void;
  onClearFilters: () => void;
}

export default function CustomerFilters({
  statusFilter,
  segmentFilter,
  statusOptions,
  segmentOptions,
  onStatusChange,
  onSegmentChange,
  onClearFilters,
}: CustomerFiltersProps) {
  return (
    <div className="space-y-3 rounded-lg border border-[#e2e3dc] bg-[#f9faf3] p-3">
      <div className="grid gap-3 xl:grid-cols-[1fr_1fr_auto]">
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
        Usa los filtros para enfocar retención, expansión y seguimiento comercial.
      </p>
    </div>
  );
}
