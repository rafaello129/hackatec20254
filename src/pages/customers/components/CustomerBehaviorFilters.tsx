import type { CustomerBehaviorFilter } from "../hooks/useCustomers";

const filters: Array<{ value: CustomerBehaviorFilter; label: string }> = [
  { value: "all", label: "Todos" },
  { value: "new", label: "Nuevos" },
  { value: "frequent", label: "Frecuentes" },
  { value: "inactive", label: "Hace tiempo que no compran" },
];

interface CustomerBehaviorFiltersProps {
  value: CustomerBehaviorFilter;
  onChange: (value: CustomerBehaviorFilter) => void;
}

export default function CustomerBehaviorFilters({
  value,
  onChange,
}: CustomerBehaviorFiltersProps) {
  return (
    <div className="flex flex-wrap gap-2" aria-label="Filtrar clientes">
      {filters.map((filter) => {
        const active = value === filter.value;
        return (
          <button
            key={filter.value}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(filter.value)}
            className={
              active
                ? "inline-flex h-8 items-center justify-center rounded-full bg-[#135C2F] px-4 text-[11px] font-semibold text-white transition"
                : "inline-flex h-8 items-center justify-center rounded-full border border-[#DFE4DC] bg-white px-4 text-[11px] font-medium text-[#657068] transition hover:border-[#C7D3C5] hover:bg-[#F8FAF6] hover:text-[#2E4935]"
            }
          >
            {filter.label}
          </button>
        );
      })}
    </div>
  );
}
