import { MessageCircle, Phone, ShoppingBag, X } from "lucide-react";
import type { CustomerDisplayData, CustomerPurchase } from "@/types/customer.types";

const money = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
  maximumFractionDigits: 0,
});

const longDate = new Intl.DateTimeFormat("es-MX", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

const behaviorLabels = {
  new: "Nuevo",
  frequent: "Frecuente",
  inactive: "Hace tiempo que no compra",
  regular: "Cliente",
} as const;

interface CustomerDetailDrawerProps {
  customer: CustomerDisplayData | null;
  purchases: CustomerPurchase[];
  onClose: () => void;
}

export default function CustomerDetailDrawer({
  customer,
  purchases,
  onClose,
}: CustomerDetailDrawerProps) {
  if (!customer) return null;

  const whatsappPhone = customer.phone.replace(/\D/g, "");

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-[#0A1A0C]/25 backdrop-blur-[2px]">
      <button
        type="button"
        aria-label="Cerrar detalle de cliente"
        onClick={onClose}
        className="absolute inset-0 cursor-default"
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label={`Detalle de ${customer.name}`}
        className="relative z-10 flex h-full w-full max-w-[430px] flex-col overflow-y-auto bg-[#FFFDFB] shadow-[-18px_0_50px_rgba(2,38,1,0.16)]"
      >
        <div className="sticky top-0 z-20 flex items-center justify-between border-b border-[#E7EAE4] bg-[#FFFDFB]/95 px-6 py-5 backdrop-blur">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[#7D887F]">
              Cliente
            </p>
            <h2 className="mt-1 text-xl font-semibold text-[#172019]">
              {customer.name}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="grid h-9 w-9 place-items-center rounded-full border border-[#E0E5DD] bg-white text-[#657068] transition hover:bg-[#F5F7F2]"
            aria-label="Cerrar"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-5 p-6">
          <section className="rounded-[22px] bg-[#F2F6EE] p-5">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-white text-[12px] font-bold text-[#135C2F] shadow-sm">
                {customer.initials}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-[#263129]">
                  {customer.name}
                </p>
                <p className="mt-1 inline-flex items-center gap-1.5 text-[11px] text-[#6E7971]">
                  <Phone className="h-3 w-3" />
                  {customer.phone}
                </p>
              </div>
              <span className="rounded-full bg-white px-2.5 py-1 text-[10px] font-semibold text-[#3D6646]">
                {behaviorLabels[customer.behavior]}
              </span>
            </div>

            <a
              href={`https://wa.me/52${whatsappPhone}`}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex h-10 w-full items-center justify-center gap-2 rounded-[14px] bg-[#135C2F] text-[11px] font-semibold text-white transition hover:bg-[#0E4D27]"
            >
              <MessageCircle className="h-4 w-4" />
              Enviar WhatsApp
            </a>
          </section>

          <section>
            <h3 className="text-sm font-semibold text-[#263129]">Resumen</h3>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <div className="rounded-[16px] border border-[#E5E9E2] bg-white p-3.5">
                <p className="text-[10px] text-[#7F8A82]">Última compra</p>
                <p className="mt-1 text-[12px] font-semibold text-[#2D3931]">
                  {customer.lastPurchaseLabel}
                </p>
              </div>
              <div className="rounded-[16px] border border-[#E5E9E2] bg-white p-3.5">
                <p className="text-[10px] text-[#7F8A82]">Compras</p>
                <p className="mt-1 text-[12px] font-semibold text-[#2D3931]">
                  {customer.totalPurchases}
                </p>
              </div>
              <div className="rounded-[16px] border border-[#E5E9E2] bg-white p-3.5">
                <p className="text-[10px] text-[#7F8A82]">Total comprado</p>
                <p className="mt-1 text-[12px] font-semibold text-[#2D3931]">
                  {money.format(customer.totalSpent)}
                </p>
              </div>
              <div className="rounded-[16px] border border-[#E5E9E2] bg-white p-3.5">
                <p className="text-[10px] text-[#7F8A82]">Ticket promedio</p>
                <p className="mt-1 text-[12px] font-semibold text-[#2D3931]">
                  {money.format(customer.averageTicket)}
                </p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-sm font-semibold text-[#263129]">
              Lo que suele comprar
            </h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {customer.favoriteProducts.length > 0 ? (
                customer.favoriteProducts.map((product) => (
                  <span
                    key={product}
                    className="rounded-full border border-[#DDE5D8] bg-white px-3 py-1.5 text-[10px] font-medium text-[#526057]"
                  >
                    {product}
                  </span>
                ))
              ) : (
                <p className="text-[11px] text-[#7F8A82]">
                  Aún no hay suficientes compras para identificar preferencias.
                </p>
              )}
            </div>
          </section>

          <section>
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-sm font-semibold text-[#263129]">
                Compras recientes
              </h3>
              <ShoppingBag className="h-4 w-4 text-[#7A867D]" />
            </div>

            <div className="mt-3 divide-y divide-[#EDF0EB] rounded-[18px] border border-[#E5E9E2] bg-white px-4">
              {purchases.length > 0 ? (
                purchases.slice(0, 4).map((purchase) => (
                  <div key={purchase.id} className="py-3.5">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-[11px] font-semibold text-[#344039]">
                        {money.format(purchase.total)}
                      </p>
                      <p className="text-[10px] text-[#8A948D]">
                        {longDate.format(new Date(`${purchase.date}T00:00:00`))}
                      </p>
                    </div>
                    <p className="mt-1 truncate text-[10px] text-[#738078]">
                      {purchase.items
                        .map((item) => `${item.quantity} × ${item.name}`)
                        .join(" · ")}
                    </p>
                  </div>
                ))
              ) : (
                <p className="py-5 text-center text-[11px] text-[#7F8A82]">
                  Todavía no hay compras registradas.
                </p>
              )}
            </div>
          </section>

          <section>
            <h3 className="text-sm font-semibold text-[#263129]">Notas</h3>
            <div className="mt-3 rounded-[18px] bg-[#F6F7F3] p-4 text-[11px] leading-5 text-[#657068]">
              {customer.notes || "Sin notas sobre este cliente."}
            </div>
          </section>
        </div>
      </aside>
    </div>
  );
}
