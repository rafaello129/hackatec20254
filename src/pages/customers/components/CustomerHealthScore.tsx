import type { CustomerHealthLevel } from "@/types/customer.types";

const levelStyles: Record<CustomerHealthLevel, { label: string; bar: string; text: string }> = {
  healthy: { label: "Saludable", bar: "bg-[#799833]", text: "text-[#3E5902]" },
  attention: { label: "Atencion", bar: "bg-[#c6a300]", text: "text-[#7a5d00]" },
  risk: { label: "Riesgo", bar: "bg-[#ba1a1a]", text: "text-[#93000a]" },
};

const getHealthLevel = (score: number): CustomerHealthLevel => {
  if (score >= 80) {
    return "healthy";
  }
  if (score >= 50) {
    return "attention";
  }
  return "risk";
};

interface CustomerHealthScoreProps {
  score: number;
}

export default function CustomerHealthScore({ score }: CustomerHealthScoreProps) {
  const normalized = Math.max(0, Math.min(100, score));
  const level = getHealthLevel(normalized);
  const style = levelStyles[level];

  return (
    <div className="min-w-[132px]">
      <div className="mb-1 flex items-center justify-between text-xs">
        <span className={`font-semibold ${style.text}`}>{style.label}</span>
        <span className="font-semibold text-[#1a1c18]">{normalized}</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-[#e2e3dc]">
        <div className={`h-full rounded-full ${style.bar}`} style={{ width: `${normalized}%` }} />
      </div>
    </div>
  );
}
