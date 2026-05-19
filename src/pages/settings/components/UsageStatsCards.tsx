import { Database, Users, Zap, type LucideIcon } from "lucide-react";
import type { SettingsIconName, UsageMetric } from "@/types/settings.types";

const iconMap: Partial<Record<SettingsIconName, LucideIcon>> = {
  database: Database,
  users: Users,
  zap: Zap,
};

function formatMetric(metric: UsageMetric) {
  if (metric.unit === "requests") {
    return `${metric.value} / ${metric.limit}`;
  }
  if (metric.unit === "Seats") {
    return `${metric.value} / ${metric.limit} ${metric.unit}`;
  }
  return `${metric.value} ${metric.unit} / ${metric.limit} ${metric.unit}`;
}

export default function UsageStatsCards({ metrics }: { metrics: UsageMetric[] }) {
  return (
    <section className="grid gap-4 lg:grid-cols-3">
      {metrics.map((metric) => {
        const Icon = iconMap[metric.iconName] ?? Database;
        return (
          <article key={metric.id} className="rounded-lg border border-[#c2c9bc] bg-white p-4">
            <div className="flex min-w-0 items-center gap-3">
              <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#eef3d3] text-[#4F7302]">
                <Icon className="h-5 w-5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-semibold uppercase tracking-[0.06em] text-[#42493f]">{metric.label}</p>
                <p className="mt-1 truncate font-['Hanken_Grotesk'] text-lg font-bold text-[#1a1c18]">
                  {formatMetric(metric)}
                </p>
              </div>
            </div>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-[#e2e3dc]">
              <div className="h-full rounded-full bg-[#4F7302]" style={{ width: `${metric.percentage}%` }} />
            </div>
          </article>
        );
      })}
    </section>
  );
}
