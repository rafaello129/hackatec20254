import { TrendingUp, WalletCards } from "lucide-react";
import type { ProductDisplayData } from "@/types/inventory.types";

const money = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
  maximumFractionDigits: 0,
});

export default function ProductEconomicsCard({
  product,
}: {
  product: ProductDisplayData;
}) {
  const approximateProfit = Math.max(0, product.price - product.cost);
  const margin =
    product.price > 0
      ? Math.round((approximateProfit / product.price) * 100)
      : 0;

  return (
    <section className="rounded-[24px] border border-[var(--oe-border)] bg-white p-5 sm:p-6">
      <div className="flex items-center gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-[14px] bg-[#EEF6E9] text-[#2E6D36]">
          <WalletCards className="h-5 w-5" />
        </span>
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.09em] text-[#7A867E]">
            Costo y ganancia
          </p>
          <h2 className="mt-1 text-[17px] font-semibold text-[#263129]">
            Economía por pieza
          </h2>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="rounded-[16px] bg-[#F6F7F3] p-4">
          <p className="text-[10px] text-[#7F8A82]">Costo</p>
          <p className="mt-1 text-[17px] font-bold text-[#2D3931]">
            {money.format(product.cost)}
          </p>
        </div>
        <div className="rounded-[16px] bg-[#EEF6E9] p-4">
          <p className="text-[10px] text-[#65806A]">Ganancia aproximada</p>
          <p className="mt-1 text-[17px] font-bold text-[#2E6D36]">
            {money.format(approximateProfit)}
          </p>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2 rounded-[15px] bg-[#F7F9F4] px-3.5 py-3 text-[10px] text-[#66736A]">
        <TrendingUp className="h-4 w-4 text-[#5A7B12]" />
        Margen aproximado de {margin}% antes de otros gastos.
      </div>
    </section>
  );
}
