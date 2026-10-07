import { ChevronRight } from "lucide-react";
import type { ProductDisplayData } from "@/types/inventory.types";

const money = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
  maximumFractionDigits: 0,
});

const availabilityMeta = {
  available: {
    label: "Disponible",
    dot: "bg-[var(--peek-success)]",
    pill: "bg-[var(--peek-success-soft)] text-[#2E6D36]",
  },
  low_stock: {
    label: "Por agotarse",
    dot: "bg-[var(--peek-warning)]",
    pill: "bg-[var(--peek-warning-soft)] text-[#8B6205]",
  },
  out_of_stock: {
    label: "Agotado",
    dot: "bg-[var(--peek-danger)]",
    pill: "bg-[#FDE9E6] text-[#A54A42]",
  },
} as const;

interface ProductListProps {
  products: ProductDisplayData[];
  onSelect: (product: ProductDisplayData) => void;
}

export default function ProductList({ products, onSelect }: ProductListProps) {
  if (products.length === 0) {
    return (
      <div className="rounded-[18px] border border-dashed border-[#DDE4D9] bg-[#F8FAF6] px-5 py-10 text-center">
        <p className="text-sm font-semibold text-[#344039]">
          No encontramos productos con estos filtros.
        </p>
        <p className="mt-1 text-[11px] text-[#7E8981]">
          Prueba con otro nombre, categoría o estado.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="hidden overflow-hidden rounded-[18px] border border-[var(--oe-border)] bg-white md:block">
        <table className="w-full table-fixed text-left">
          <thead className="bg-[linear-gradient(90deg,#F4F8F1_0%,#FAFBF8_100%)]">
            <tr className="text-[10px] font-semibold uppercase tracking-[0.055em] text-[#718078]">
              <th className="w-[40%] px-4 py-3.5">Producto</th>
              <th className="w-[16%] px-3 py-3.5">Precio</th>
              <th className="w-[16%] px-3 py-3.5">Disponibles</th>
              <th className="w-[16%] px-3 py-3.5">Vendidos</th>
              <th className="w-[12%] px-4 py-3.5" />
            </tr>
          </thead>

          <tbody>
            {products.map((product, index) => {
              const meta = availabilityMeta[product.availability];

              return (
                <tr
                  key={product.id}
                  tabIndex={0}
                  role="button"
                  onClick={() => onSelect(product)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      onSelect(product);
                    }
                  }}
                  className="peek-product-row group cursor-pointer border-t border-[#EEF0EB] outline-none focus-visible:bg-[#F4F8F1] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--peek-accent-lime)]/45"
                  style={{ animationDelay: `${Math.min(index, 8) * 55}ms` }}
                >
                  <td className="px-4 py-3.5">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="h-12 w-12 shrink-0 overflow-hidden rounded-[14px] bg-[#EEF1EB]">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.06]"
                          loading="lazy"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-[12px] font-semibold text-[#263129]">
                          {product.name}
                        </p>
                        <div className="mt-1 flex items-center gap-2">
                          <span className="text-[10px] text-[#849087]">
                            {product.category}
                          </span>
                          <span className={`h-1.5 w-1.5 rounded-full ${meta.dot}`} />
                          <span className={`rounded-full px-2 py-0.5 text-[9px] font-semibold ${meta.pill}`}>
                            {meta.label}
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="px-3 py-3.5 text-[12px] font-bold text-[#2B352F]">
                    {money.format(product.price)}
                  </td>

                  <td className="px-3 py-3.5">
                    <p
                      className={
                        product.availability === "out_of_stock"
                          ? "text-[12px] font-bold text-[#B84D44]"
                          : product.availability === "low_stock"
                            ? "text-[12px] font-bold text-[#9A6A04]"
                            : "text-[12px] font-bold text-[#2B352F]"
                      }
                    >
                      {product.stock} {product.stock === 1 ? "pieza" : "piezas"}
                    </p>
                  </td>

                  <td className="px-3 py-3.5">
                    <p className="text-[12px] font-bold text-[#2B352F]">
                      {product.unitsSoldThisMonth}
                    </p>
                    <p className="mt-0.5 text-[9px] text-[#87918A]">este mes</p>
                  </td>

                  <td className="px-4 py-3.5 text-right">
                    <span className="ml-auto grid h-8 w-8 place-items-center rounded-full text-[#929C95] transition-all duration-200 group-hover:bg-[var(--peek-surface-soft)] group-hover:text-[var(--oe-primary)]">
                      <ChevronRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="space-y-2.5 md:hidden">
        {products.map((product, index) => {
          const meta = availabilityMeta[product.availability];

          return (
            <button
              key={product.id}
              type="button"
              onClick={() => onSelect(product)}
              className="peek-product-row-mobile w-full rounded-[18px] border border-[#E4E8E1] bg-white p-4 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-[#CFD8CC] hover:shadow-sm"
              style={{ animationDelay: `${Math.min(index, 8) * 55}ms` }}
            >
              <div className="flex items-start gap-3">
                <div className="h-14 w-14 shrink-0 overflow-hidden rounded-[15px] bg-[#EEF1EB]">
                  <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="line-clamp-2 text-[12px] font-semibold text-[#263129]">
                    {product.name}
                  </p>
                  <p className="mt-1 text-[10px] text-[#849087]">{product.category}</p>
                </div>
                <ChevronRight className="h-4 w-4 text-[#929C95]" />
              </div>

              <div className="mt-4 grid grid-cols-3 gap-2 rounded-2xl bg-[linear-gradient(135deg,#F7F9F4_0%,#F3F7EF_100%)] p-3">
                <div>
                  <p className="text-[9px] uppercase tracking-wide text-[#889289]">Precio</p>
                  <p className="mt-1 text-[10px] font-semibold text-[#344039]">
                    {money.format(product.price)}
                  </p>
                </div>
                <div>
                  <p className="text-[9px] uppercase tracking-wide text-[#889289]">Disponibles</p>
                  <p className="mt-1 text-[10px] font-semibold text-[#344039]">{product.stock}</p>
                </div>
                <div>
                  <p className="text-[9px] uppercase tracking-wide text-[#889289]">Vendidos</p>
                  <p className="mt-1 text-[10px] font-semibold text-[#344039]">
                    {product.unitsSoldThisMonth}
                  </p>
                </div>
              </div>

              <span className={`mt-3 inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold ${meta.pill}`}>
                {meta.label}
              </span>
            </button>
          );
        })}
      </div>
    </>
  );
}
