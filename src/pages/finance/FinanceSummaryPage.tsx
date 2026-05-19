import KpiCard from "@/components/common/KpiCard";
import SectionCard from "@/components/common/SectionCard";

const bars = [58, 63, 61, 70, 66, 76, 81];

export default function FinanceSummaryPage() {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <KpiCard label="Ingresos" value="$1,248,300" hint="+12.4% trimestral" />
        <KpiCard label="Egresos" value="$842,110" hint="-3.2% mensual" />
        <KpiCard label="Flujo disponible" value="$406,190" hint="Disponible para operación" />
        <KpiCard label="Cuentas por cobrar" value="$119,040" hint="23 facturas pendientes" />
      </div>

      <SectionCard title="Tendencia financiera (simulada)">
        <div className="grid grid-cols-7 items-end gap-2">
          {bars.map((height, index) => (
            <div key={`${height}-${index}`} className="space-y-1">
              <div className="h-32 rounded-md bg-[#f3f4ed] p-1">
                <div
                  className="w-full rounded-sm bg-[#799833]"
                  style={{ height: `${height}%`, marginTop: `${100 - height}%` }}
                />
              </div>
              <p className="text-center text-xs font-semibold text-[#42493f]">S{index + 1}</p>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
