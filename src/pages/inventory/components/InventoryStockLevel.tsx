interface InventoryStockLevelProps {
  quantity: number;
  minStock: number;
  maxStock: number;
}

const getStockVisual = (quantity: number, minStock: number, maxStock: number) => {
  if (quantity <= 0) {
    return { label: "Critico", barColor: "bg-[#ba1a1a]", textColor: "text-[#93000a]" };
  }
  if (quantity <= minStock) {
    return { label: "Bajo", barColor: "bg-[#c6a300]", textColor: "text-[#7a5d00]" };
  }
  if (quantity >= maxStock * 0.9) {
    return { label: "Alto", barColor: "bg-[#4F7302]", textColor: "text-[#3E5902]" };
  }
  return { label: "Estable", barColor: "bg-[#799833]", textColor: "text-[#3E5902]" };
};

export default function InventoryStockLevel({ quantity, minStock, maxStock }: InventoryStockLevelProps) {
  const safeMax = maxStock <= 0 ? 1 : maxStock;
  const progress = Math.max(0, Math.min(100, (quantity / safeMax) * 100));
  const visual = getStockVisual(quantity, minStock, safeMax);

  return (
    <div className="min-w-[130px]">
      <div className="mb-1 flex items-center justify-between text-xs">
        <span className={`font-semibold ${visual.textColor}`}>{visual.label}</span>
        <span className="font-semibold text-[#1a1c18]">{Math.max(0, Math.round(progress))}%</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-[#e2e3dc]">
        <div className={`h-full rounded-full ${visual.barColor}`} style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}
