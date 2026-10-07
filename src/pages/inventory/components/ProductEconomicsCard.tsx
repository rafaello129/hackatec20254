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
    <section className="h-full rounded-[22px] border border-[var(--oe-border)] bg-white p-4 sm:p-5">
      <div className="flex items-center gap-2.5">
        <span className="grid h-9 w-9 place-items-center rounded-[12px] bg-[#EEF6E9] text-[#2E6D36]">
          <WalletCards className="h-4 w-4" />
        </span>
        <div>
          <p className="text-[9px] font-semibold uppercase tracking-[0.09em] text-[#7A867E]">
            Costo y ganancia
          </p>
          <h2 className="mt-0.5 text-[16px] font-semibold text-[#263129]">
            Economía por pieza
          </h2>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <div className="rounded-[14px] bg-[#F6F7F3] p-3">
          <p className="text-[9px] text-[#7F8A82]">Costo</p>
          <p className="mt-0.5 text-[15px] font-bold text-[#2D3931]">
            {money.format(product.cost)}
          </p>
        </div>
        <div className="rounded-[14px] bg-[#EEF6E9] p-3">
          <p className="text-[9px] text-[#65806A]">Ganancia aprox.</p>
          <p className="mt-0.5 text-[15px] font-bold text-[#2E6D36]">
            {money.format(approximateProfit)}
          </p>
        </div>
      </div>

      <div className="mt-3 flex items-center gap-2 rounded-[13px] bg-[#F7F9F4] px-3 py-2.5 text-[9px] text-[#66736A]">
        <TrendingUp className="h-3.5 w-3.5 text-[#5A7B12]" />
        Margen aproximado de {margin}% antes de otros gastos.
      </div>
    </section>
  );
}
