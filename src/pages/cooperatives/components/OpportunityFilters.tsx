import { Search, X } from "lucide-react";
import type { OpportunityStatusFilter, OpportunityTypeFilter } from "@/pages/cooperatives/hooks/useCooperatives";

interface Option<T extends string> {
  value: T;
  label: string;
}

interface OpportunityFiltersProps {
  searchText: string;
  typeFilter: OpportunityTypeFilter;
  statusFilter: OpportunityStatusFilter;
  typeOptions: Array<Option<OpportunityTypeFilter>>;
  statusOptions: Array<Option<OpportunityStatusFilter>>;
  onSearchChange: (value: string) => void;
  onTypeChange: (value: OpportunityTypeFilter) => void;
  onStatusChange: (value: OpportunityStatusFilter) => void;
  onClearFilters: () => void;
}

export default function OpportunityFilters({
  searchText,
  typeFilter,
  statusFilter,
  typeOptions,
  statusOptions,
  onSearchChange,
  onTypeChange,
  onStatusChange,
  onClearFilters,
}: OpportunityFiltersProps) {
  return (
    <div className="grid gap-3 rounded-lg border border-[#e2e3dc] bg-[#f9faf3] p-3 xl:grid-cols-[1.3fr_1fr_1fr_auto]">
      <label className="relative block">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#42493f]" />
        <input
          type="text"
          value={searchText}
          placeholder="Buscar oportunidad, boutique, taller o colección"
          onChange={(event) => onSearchChange(event.target.value)}
          className="h-10 w-full rounded-lg border border-[#c2c9bc] bg-white pl-9 pr-3 text-sm text-[#1a1c18] outline-none focus:border-[#4F7302] focus:ring-2 focus:ring-[#4F7302]/20"
        />
      </label>

      <select
        value={typeFilter}
        onChange={(event) => onTypeChange(event.target.value as OpportunityTypeFilter)}
        className="h-10 rounded-lg border border-[#c2c9bc] bg-white px-3 text-sm text-[#1a1c18] outline-none focus:border-[#4F7302] focus:ring-2 focus:ring-[#4F7302]/20"
      >
        {typeOptions.map((option) => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>

      <select
        value={statusFilter}
        onChange={(event) => onStatusChange(event.target.value as OpportunityStatusFilter)}
        className="h-10 rounded-lg border border-[#c2c9bc] bg-white px-3 text-sm text-[#1a1c18] outline-none focus:border-[#4F7302] focus:ring-2 focus:ring-[#4F7302]/20"
      >
        {statusOptions.map((option) => (
          <option key={option.value} value={option.value}>{option.label}</option>
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
  );
}
