import type { ReactNode } from "react";

interface KpiCardProps {
  label: string;
  value: string;
  hint?: string;
  icon?: ReactNode;
}

export default function KpiCard({ label, value, hint, icon }: KpiCardProps) {
  return (
    <article className="rounded-lg border border-[#c2c9bc] bg-white p-4">
      <div className="flex items-start justify-between gap-2">
        <span className="text-xs font-semibold uppercase tracking-[0.08em] text-[#42493f]">{label}</span>
        {icon}
      </div>
      <p className="mt-2 font-['Hanken_Grotesk'] text-3xl font-bold text-[#1a1c18]">{value}</p>
      {hint ? <p className="mt-1 text-sm text-[#42493f]">{hint}</p> : null}
    </article>
  );
}
