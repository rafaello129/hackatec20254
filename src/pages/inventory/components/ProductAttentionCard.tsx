import { AlertTriangle, ArrowRight, PackageX, TrendingUp } from "lucide-react";
import type { ProductDisplayData } from "@/types/inventory.types";

interface ProductAttentionCardProps {
  products: ProductDisplayData[];
  onSelect: (product: ProductDisplayData) => void;
  onViewAll: () => void;
}

export default function ProductAttentionCard({
  products,
  onSelect,
  onViewAll,
}: ProductAttentionCardProps) {
  return (
    <article className="rounded-[22px] border border-[var(--oe-border)] bg-white p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-[15px] font-semibold text-[var(--oe-text)]">
            Productos que necesitan atención
          </h2>
          <p className="mt-1 text-[11px] text-[var(--oe-text-muted)]">
            Revisa qué conviene reponer primero.
          </p>
        </div>
        <button
          type="button"
          onClick={onViewAll}
          className="inline-flex shrink-0 items-center gap-1 text-[10px] font-semibold text-[var(--oe-primary)] transition hover:gap-1.5"
        >
          Ver todos
          <ArrowRight className="h-3 w-3" />
        </button>
      </div>

      <div className="mt-4 divide-y divide-[#EEF0EB]">
        {products.length === 0 ? (
          <div className="rounded-2xl bg-[#F6F8F3] px-3 py-4 text-[11px] text-[#66736A]">
            Todo en orden. No hay productos pendientes de reposición.
          </div>
        ) : (
          products.map((product) => {
            const exhausted = product.availability === "out_of_stock";
            const urgent = product.availability === "low_stock";
            const Icon = exhausted ? PackageX : urgent ? AlertTriangle : TrendingUp;

            return (
              <button
                key={product.id}
                type="button"
                onClick={() => onSelect(product)}
                className="group flex w-full items-center gap-3 py-3 text-left first:pt-0 last:pb-0"
              >
                <span
                  className={
                    exhausted
                      ? "grid h-9 w-9 shrink-0 place-items-center rounded-[12px] bg-[#FDE9E6] text-[#B84D44]"
                      : urgent
                        ? "grid h-9 w-9 shrink-0 place-items-center rounded-[12px] bg-[var(--peek-warning-soft)] text-[#9A6A04]"
                        : "grid h-9 w-9 shrink-0 place-items-center rounded-[12px] bg-[var(--peek-success-soft)] text-[var(--peek-success)]"
                  }
                >
                  <Icon className="h-4 w-4" />
                </span>

                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[11px] font-semibold text-[#2B352F]">
                    {product.name}
                  </span>
                  <span className="mt-0.5 block truncate text-[10px] text-[#87918A]">
                    {exhausted
                      ? "Agotado"
                      : urgent
                        ? `${product.stock} piezas disponibles`
                        : `${product.stock} piezas · se vende rápido`}
                  </span>
                </span>

                <ArrowRight className="h-3.5 w-3.5 shrink-0 text-[#8D9790] transition-transform group-hover:translate-x-0.5" />
              </button>
            );
          })
        )}
      </div>
    </article>
  );
}
