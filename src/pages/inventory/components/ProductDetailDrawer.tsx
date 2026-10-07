import {
  Minus,
  PackagePlus,
  Plus,
  ShoppingBag,
  Store,
  X,
} from "lucide-react";
import type { ProductDisplayData, StockMovement } from "@/types/inventory.types";

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

const availabilityMeta = {
  available: "bg-[var(--peek-success-soft)] text-[#2E6D36]",
  low_stock: "bg-[var(--peek-warning-soft)] text-[#8B6205]",
  out_of_stock: "bg-[#FDE9E6] text-[#A54A42]",
} as const;

const availabilityLabel = {
  available: "Disponible",
  low_stock: "Por agotarse",
  out_of_stock: "Agotado",
} as const;

const movementText = (movement: StockMovement) => {
  if (movement.type === "entrada") {
    return `Agregaste ${Math.abs(movement.quantity)} piezas`;
  }
  if (movement.type === "salida") {
    return `Salieron ${Math.abs(movement.quantity)} piezas`;
  }
  if (movement.type === "reserva") {
    return `Reservaste ${Math.abs(movement.quantity)} piezas`;
  }
  return movement.quantity < 0
    ? `Quitaste ${Math.abs(movement.quantity)} piezas`
    : `Corregiste ${Math.abs(movement.quantity)} piezas`;
};

interface ProductDetailDrawerProps {
  product: ProductDisplayData | null;
  movements: StockMovement[];
  onClose: () => void;
  onAdjust: (direction: "add" | "remove") => void;
}

export default function ProductDetailDrawer({
  product,
  movements,
  onClose,
  onAdjust,
}: ProductDetailDrawerProps) {
  if (!product) return null;

  const profit = Math.max(0, product.price - product.cost);

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-[#0A1A0C]/25 backdrop-blur-[2px]">
      <button
        type="button"
        aria-label="Cerrar detalle del producto"
        onClick={onClose}
        className="absolute inset-0 cursor-default"
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label={`Detalle de ${product.name}`}
        className="relative z-10 flex h-full w-full max-w-[450px] flex-col overflow-y-auto bg-[#FFFDFB] shadow-[-18px_0_50px_rgba(2,38,1,0.16)]"
      >
        <div className="sticky top-0 z-20 flex items-center justify-between border-b border-[#E7EAE4] bg-[#FFFDFB]/95 px-6 py-5 backdrop-blur">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[#7D887F]">
              Producto
            </p>
            <h2 className="mt-1 max-w-[310px] text-xl font-semibold text-[#172019]">
              {product.name}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[#E0E5DD] bg-white text-[#657068] transition hover:bg-[#F5F7F2]"
            aria-label="Cerrar"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-5 p-6">
          <section className="overflow-hidden rounded-[24px] bg-[#F2F6EE]">
            <div className="aspect-[16/9] overflow-hidden bg-[#E8ECE4]">
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#758178]">
                    {product.category}
                  </p>
                  <p className="mt-1 text-[13px] font-semibold text-[#263129]">
                    {product.name}
                  </p>
                </div>
                <span
                  className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${availabilityMeta[product.availability]}`}
                >
                  {availabilityLabel[product.availability]}
                </span>
              </div>
              <p className="mt-3 text-[11px] leading-5 text-[#6D7971]">
                {product.description}
              </p>
            </div>
          </section>

          <section>
            <h3 className="text-sm font-semibold text-[#263129]">Resumen</h3>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <div className="rounded-[16px] border border-[#E5E9E2] bg-white p-3.5">
                <p className="text-[10px] text-[#7F8A82]">Precio</p>
                <p className="mt-1 text-[13px] font-bold text-[#2D3931]">
                  {money.format(product.price)}
                </p>
              </div>
              <div className="rounded-[16px] border border-[#E5E9E2] bg-white p-3.5">
                <p className="text-[10px] text-[#7F8A82]">Disponibles</p>
                <p className="mt-1 text-[13px] font-bold text-[#2D3931]">
                  {product.stock} piezas
                </p>
              </div>
              <div className="rounded-[16px] border border-[#E5E9E2] bg-white p-3.5">
                <p className="text-[10px] text-[#7F8A82]">Vendidas este mes</p>
                <p className="mt-1 text-[13px] font-bold text-[#2D3931]">
                  {product.unitsSoldThisMonth}
                </p>
              </div>
              <div className="rounded-[16px] border border-[#E5E9E2] bg-white p-3.5">
                <p className="text-[10px] text-[#7F8A82]">Última venta</p>
                <p className="mt-1 text-[13px] font-bold text-[#2D3931]">
                  {product.lastSaleLabel}
                </p>
              </div>
            </div>
          </section>

          <section className="rounded-[20px] border border-[#E5E9E2] bg-white p-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-[11px] font-semibold text-[#344039]">
                  Existencias
                </p>
                <p className="mt-1 text-[10px] text-[#7F8A82]">
                  Te avisamos cuando queden {product.lowStockAt} piezas.
                </p>
              </div>
              <span className="text-2xl font-bold text-[#172019]">
                {product.stock}
              </span>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => onAdjust("remove")}
                className="inline-flex h-10 items-center justify-center gap-2 rounded-[13px] border border-[#DDE3DA] bg-white text-[11px] font-semibold text-[#536057] transition hover:bg-[#F6F8F4]"
              >
                <Minus className="h-4 w-4" />
                Quitar piezas
              </button>
              <button
                type="button"
                onClick={() => onAdjust("add")}
                className="inline-flex h-10 items-center justify-center gap-2 rounded-[13px] bg-[var(--oe-primary)] text-[11px] font-semibold text-white transition hover:bg-[var(--oe-primary-hover)]"
              >
                <Plus className="h-4 w-4" />
                Agregar piezas
              </button>
            </div>
          </section>

          <section>
            <h3 className="text-sm font-semibold text-[#263129]">
              Costo y ganancia
            </h3>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <div className="rounded-[16px] bg-[#F6F7F3] p-3.5">
                <p className="text-[10px] text-[#7F8A82]">Costo</p>
                <p className="mt-1 text-[12px] font-semibold text-[#2D3931]">
                  {money.format(product.cost)}
                </p>
              </div>
              <div className="rounded-[16px] bg-[#EEF6E9] p-3.5">
                <p className="text-[10px] text-[#65806A]">
                  Ganancia aproximada
                </p>
                <p className="mt-1 text-[12px] font-semibold text-[#2E6D36]">
                  {money.format(profit)} por pieza
                </p>
              </div>
            </div>
          </section>

          <section>
            <div className="flex items-center gap-2">
              <Store className="h-4 w-4 text-[#718078]" />
              <h3 className="text-sm font-semibold text-[#263129]">Proveedor</h3>
            </div>
            <p className="mt-2 rounded-[16px] bg-[#F6F7F3] px-4 py-3 text-[11px] text-[#5F6B63]">
              {product.supplier}
            </p>
          </section>

          <section>
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-sm font-semibold text-[#263129]">
                Cambios recientes
              </h3>
              <ShoppingBag className="h-4 w-4 text-[#7A867D]" />
            </div>

            <div className="mt-3 divide-y divide-[#EDF0EB] rounded-[18px] border border-[#E5E9E2] bg-white px-4">
              {movements.length > 0 ? (
                movements.map((movement) => (
                  <div key={movement.id} className="py-3.5">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-[11px] font-semibold text-[#344039]">
                        {movementText(movement)}
                      </p>
                      <p className="text-[10px] text-[#8A948D]">
                        {longDate.format(new Date(`${movement.date}T00:00:00`))}
                      </p>
                    </div>
                    <p className="mt-1 text-[10px] text-[#738078]">
                      {movement.reason}
                    </p>
                  </div>
                ))
              ) : (
                <p className="py-5 text-center text-[11px] text-[#7F8A82]">
                  Todavía no hay cambios registrados.
                </p>
              )}
            </div>
          </section>

          {product.notes ? (
            <section>
              <h3 className="text-sm font-semibold text-[#263129]">Notas</h3>
              <div className="mt-3 rounded-[18px] bg-[#F6F7F3] p-4 text-[11px] leading-5 text-[#657068]">
                {product.notes}
              </div>
            </section>
          ) : null}

          <div className="flex items-center gap-2 rounded-[18px] bg-[#ECF5E8] px-4 py-3 text-[10px] leading-4 text-[#3F6948]">
            <PackagePlus className="h-4 w-4 shrink-0" />
            Los cambios de existencias actualizan automáticamente el estado del producto.
          </div>
        </div>
      </aside>
    </div>
  );
}
