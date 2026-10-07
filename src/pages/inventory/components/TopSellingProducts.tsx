import type { ProductDisplayData } from "@/types/inventory.types";

const money = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
  maximumFractionDigits: 0,
});

interface TopSellingProductsProps {
  products: ProductDisplayData[];
  onSelect: (product: ProductDisplayData) => void;
}

export default function TopSellingProducts({
  products,
  onSelect,
}: TopSellingProductsProps) {
  const max = Math.max(...products.map((product) => product.unitsSoldThisMonth), 1);

  return (
    <article className="rounded-[22px] border border-[var(--oe-border)] bg-white p-5">
      <div>
        <h2 className="text-[15px] font-semibold text-[var(--oe-text)]">
          Más vendidos este mes
        </h2>
        <p className="mt-1 text-[11px] text-[var(--oe-text-muted)]">
          Los productos con mayor salida.
        </p>
      </div>

      <div className="mt-5 space-y-4">
        {products.map((product, index) => {
          const width = Math.max(10, (product.unitsSoldThisMonth / max) * 100);
          const revenue = product.unitsSoldThisMonth * product.price;

          return (
            <button
              key={product.id}
              type="button"
              onClick={() => onSelect(product)}
              className="group block w-full text-left"
            >
              <div className="flex items-center gap-3">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#F2F5EF] text-[10px] font-bold text-[#607064]">
                  {index + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-3">
                    <p className="truncate text-[11px] font-semibold text-[#344039]">
                      {product.name}
                    </p>
                    <span className="shrink-0 text-[11px] font-bold text-[#2B352F]">
                      {product.unitsSoldThisMonth}
                    </span>
                  </div>

                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-[#EEF1EB]">
                    <span
                      className="peek-product-bar block h-full rounded-full bg-[linear-gradient(90deg,var(--oe-primary)_0%,var(--peek-accent-lime)_100%)] transition-[width] duration-500 group-hover:brightness-105"
                      style={{
                        width: width + "%",
                        animationDelay: `${index * 100}ms`,
                      }}
                    />
                  </div>

                  <div className="mt-1.5 flex items-center justify-between gap-3 text-[9px] text-[#8A948D]">
                    <span>{product.stock} disponibles</span>
                    <span>{money.format(revenue)} en ventas</span>
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </article>
  );
}
