import { useState, type FormEvent } from "react";
import { Minus, Plus, X } from "lucide-react";
import type { ProductDisplayData } from "@/types/inventory.types";
import type { StockAdjustmentInput } from "../hooks/useInventory";

interface AdjustStockModalProps {
  product: ProductDisplayData | null;
  direction: "add" | "remove" | null;
  onClose: () => void;
  onSave: (productId: string, input: StockAdjustmentInput) => void;
}

export default function AdjustStockModal({
  product,
  direction,
  onClose,
  onSave,
}: AdjustStockModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");

  if (!product || !direction) return null;

  const isAdding = direction === "add";
  const Icon = isAdding ? Plus : Minus;

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const safeQuantity = Math.floor(quantity);
    if (safeQuantity <= 0) {
      setError("Escribe una cantidad mayor a 0.");
      return;
    }

    if (!isAdding && safeQuantity > product.stock) {
      setError(`Solo tienes ${product.stock} piezas disponibles.`);
      return;
    }

    onSave(product.id, {
      quantity: safeQuantity,
      direction,
      reason: reason.trim(),
    });

    setQuantity(1);
    setReason("");
    setError("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] grid place-items-center bg-[#0A1A0C]/30 px-4 backdrop-blur-[2px]">
      <button
        type="button"
        aria-label="Cerrar ajuste de existencias"
        onClick={onClose}
        className="absolute inset-0 cursor-default"
      />

      <form
        onSubmit={submit}
        className="relative z-10 w-full max-w-[430px] rounded-[24px] border border-[#E0E5DD] bg-[#FFFDFB] p-6 shadow-[0_24px_70px_rgba(2,38,1,0.24)]"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <span
              className={
                isAdding
                  ? "grid h-10 w-10 place-items-center rounded-[14px] bg-[var(--peek-success-soft)] text-[var(--peek-success)]"
                  : "grid h-10 w-10 place-items-center rounded-[14px] bg-[var(--peek-warning-soft)] text-[#996A04]"
              }
            >
              <Icon className="h-5 w-5" />
            </span>
            <h2 className="mt-3 text-lg font-semibold text-[#172019]">
              {isAdding ? "Agregar piezas" : "Quitar piezas"}
            </h2>
            <p className="mt-1 text-[11px] leading-5 text-[#7A867E]">
              {product.name} · {product.stock} piezas disponibles
            </p>
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

        <label className="mt-5 block">
          <span className="text-[11px] font-semibold text-[#344039]">
            ¿Cuántas piezas?
          </span>
          <input
            type="number"
            min="1"
            max={isAdding ? undefined : product.stock}
            value={quantity}
            onChange={(event) => {
              setQuantity(Number(event.target.value));
              if (error) setError("");
            }}
            autoFocus
            className="mt-1.5 h-12 w-full rounded-[14px] border border-[#DDE3DA] bg-white px-3.5 text-[16px] font-semibold text-[#263129] outline-none transition focus:border-[#7DA44B] focus:ring-2 focus:ring-[#9AC84B]/20"
          />
        </label>

        <label className="mt-4 block">
          <span className="text-[11px] font-semibold text-[#344039]">
            Motivo
          </span>
          <input
            value={reason}
            onChange={(event) => setReason(event.target.value)}
            placeholder={
              isAdding
                ? "Ej. Reposición del proveedor"
                : "Ej. Venta, daño o corrección"
            }
            className="mt-1.5 h-11 w-full rounded-[14px] border border-[#DDE3DA] bg-white px-3.5 text-[12px] text-[#263129] outline-none transition placeholder:text-[#A0A9A2] focus:border-[#7DA44B] focus:ring-2 focus:ring-[#9AC84B]/20"
          />
        </label>

        {error ? (
          <p className="mt-4 rounded-[12px] bg-[#FFF1EE] px-3 py-2.5 text-[11px] text-[#A84E3E]">
            {error}
          </p>
        ) : null}

        <div className="mt-6 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="h-10 rounded-[13px] border border-[#DDE3DA] bg-white px-4 text-[11px] font-semibold text-[#536057] transition hover:bg-[#F6F8F4]"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="h-10 rounded-[13px] bg-[var(--oe-primary)] px-4 text-[11px] font-semibold text-white transition hover:bg-[var(--oe-primary-hover)]"
          >
            {isAdding ? "Agregar piezas" : "Quitar piezas"}
          </button>
        </div>
      </form>
    </div>
  );
}
