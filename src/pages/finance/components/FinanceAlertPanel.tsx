import { AlertTriangle } from "lucide-react";
import SectionCard from "@/components/common/SectionCard";
import type { FinanceAlert } from "@/types/finance.types";

const money = new Intl.NumberFormat("es-MX", { currency: "MXN", maximumFractionDigits: 0, style: "currency" });

const severityStyles: Record<FinanceAlert["severity"], { card: string; icon: string; label: string }> = {
  low: { card: "border-[#D6D979] bg-[#f9faf3]", icon: "text-[#4F7302]", label: "Baja" },
  medium: { card: "border-[#e3d279] bg-[#fffaf0]", icon: "text-[#7a5d00]", label: "Media" },
  high: { card: "border-[#f2b8b5] bg-[#fff5f3]", icon: "text-[#93000a]", label: "Alta" },
  critical: { card: "border-[#ffb4ab] bg-[#ffdad6]/70", icon: "text-[#93000a]", label: "Crítica" },
};

export default function FinanceAlertPanel({ alerts, limit }: { alerts: FinanceAlert[]; limit?: number }) {
  const visibleAlerts = (limit ? alerts.slice(0, limit) : alerts).slice(0, 3);

  return (
    <SectionCard title="Alertas financieras">
      <div className="space-y-2.5">
        {visibleAlerts.map((alert) => {
          const style = severityStyles[alert.severity];
          return (
            <article key={alert.id} className={`rounded-lg border p-3 ${style.card}`}>
              <div className="flex items-start gap-2.5">
                <AlertTriangle className={`mt-0.5 h-4 w-4 shrink-0 ${style.icon}`} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <p className="line-clamp-2 text-sm font-semibold leading-5 text-[#1a1c18]">{alert.title}</p>
                    {alert.impactAmount ? (
                      <span className="shrink-0 rounded-full bg-white px-2 py-0.5 text-[11px] font-semibold text-[#42493f]">
                        {money.format(alert.impactAmount)}
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-1 line-clamp-2 text-xs leading-5 text-[#42493f]">{alert.description}</p>
                  <p className="mt-2 line-clamp-2 rounded-md border border-[#e2e3dc] bg-white/80 px-2.5 py-1.5 text-[11px] font-semibold leading-4 text-[#3E5902]">
                    Recomendación: {alert.recommendation}
                  </p>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </SectionCard>
  );
}
