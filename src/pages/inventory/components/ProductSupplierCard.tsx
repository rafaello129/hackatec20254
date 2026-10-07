import { Store } from "lucide-react";
import type { ProductDisplayData } from "@/types/inventory.types";
import type { ProductOrigin } from "@/types/product-verification.types";

export default function ProductSupplierCard({
  product,
  origin,
}: {
  product: ProductDisplayData;
  origin?: ProductOrigin;
}) {
  return (
    <section className="h-full rounded-[22px] border border-[var(--oe-border)] bg-white p-4 sm:p-5">
      <div className="flex items-center gap-2.5">
        <span className="grid h-9 w-9 place-items-center rounded-[12px] bg-[#F2F5EF] text-[#536057]">
          <Store className="h-4 w-4" />
        </span>
        <div>
          <p className="text-[9px] font-semibold uppercase tracking-[0.09em] text-[#7A867E]">
            Relación comercial
          </p>
          <h2 className="mt-0.5 text-[16px] font-semibold text-[#263129]">
            Proveedor y productor
          </h2>
        </div>
      </div>

      <div className="mt-4 grid gap-2">
        <div className="rounded-[14px] bg-[#F6F7F3] p-3">
          <p className="text-[9px] text-[#7F8A82]">Proveedor comercial</p>
          <p className="mt-0.5 text-[10px] font-semibold text-[#344039]">
            {product.supplier}
          </p>
        </div>

        {origin ? (
          <div className="rounded-[14px] bg-[#EEF6E9] p-3">
            <p className="text-[9px] text-[#65806A]">
              Productor / taller declarado
            </p>
            <p className="mt-0.5 text-[10px] font-semibold text-[#2E6D36]">
              {origin.workshopName ?? origin.producerName}
            </p>
          </div>
        ) : null}
      </div>
    </section>
  );
}
