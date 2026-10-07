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
    <section className="rounded-[24px] border border-[var(--oe-border)] bg-white p-5 sm:p-6">
      <div className="flex items-center gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-[14px] bg-[#F2F5EF] text-[#536057]">
          <Store className="h-5 w-5" />
        </span>
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.09em] text-[#7A867E]">
            Relación comercial
          </p>
          <h2 className="mt-1 text-[17px] font-semibold text-[#263129]">
            Proveedor y productor
          </h2>
        </div>
      </div>

      <div className="mt-5 space-y-3">
        <div className="rounded-[16px] bg-[#F6F7F3] p-4">
          <p className="text-[10px] text-[#7F8A82]">Proveedor comercial</p>
          <p className="mt-1 text-[12px] font-semibold text-[#344039]">
            {product.supplier}
          </p>
        </div>

        {origin ? (
          <div className="rounded-[16px] bg-[#EEF6E9] p-4">
            <p className="text-[10px] text-[#65806A]">
              Productor / taller declarado
            </p>
            <p className="mt-1 text-[12px] font-semibold text-[#2E6D36]">
              {origin.workshopName ?? origin.producerName}
            </p>
          </div>
        ) : null}
      </div>
    </section>
  );
}
