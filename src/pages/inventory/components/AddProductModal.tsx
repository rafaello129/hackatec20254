import { useState, type FormEvent } from "react";
import { ImagePlus, X } from "lucide-react";
import type { ProductCategory } from "@/types/inventory.types";
import type { NewProductInput } from "../hooks/useInventory";

interface AddProductModalProps {
  open: boolean;
  categories: ProductCategory[];
  onClose: () => void;
  onSave: (input: NewProductInput) => void;
}

const emptyForm: NewProductInput = {
  name: "",
  category: "Textiles",
  price: 0,
  cost: 0,
  quantity: 0,
  lowStockAt: 5,
  supplier: "",
  image: "",
  notes: "",
};

export default function AddProductModal({
  open,
  categories,
  onClose,
  onSave,
}: AddProductModalProps) {
  const [form, setForm] = useState<NewProductInput>(emptyForm);
  const [error, setError] = useState("");

  if (!open) return null;

  const update = <K extends keyof NewProductInput>(
    field: K,
    value: NewProductInput[K],
  ) => {
    setForm((current) => ({ ...current, [field]: value }));
    if (error) setError("");
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form.name.trim() || form.price <= 0) {
      setError("Agrega un nombre y un precio mayor a $0.");
      return;
    }

    onSave({
      ...form,
      quantity: Math.max(0, form.quantity),
      lowStockAt: Math.max(1, form.lowStockAt ?? 5),
      cost: Math.max(0, form.cost ?? 0),
    });
    setForm(emptyForm);
    setError("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-[#0A1A0C]/25 px-4 backdrop-blur-[2px]">
      <button
        type="button"
        aria-label="Cerrar formulario"
        onClick={onClose}
        className="absolute inset-0 cursor-default"
      />

      <form
        onSubmit={submit}
        className="relative z-10 max-h-[92vh] w-full max-w-[620px] overflow-y-auto rounded-[26px] border border-[#E0E5DD] bg-[#FFFDFB] p-6 shadow-[0_24px_70px_rgba(2,38,1,0.22)] sm:p-7"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[#7D887F]">
              Nuevo producto
            </p>
            <h2 className="mt-1 text-xl font-semibold text-[#172019]">
              Agregar producto
            </h2>
            <p className="mt-1 text-[11px] leading-5 text-[#7A867E]">
              Registra solo lo necesario para empezar a venderlo y controlar existencias.
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

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <label className="sm:col-span-2">
            <span className="text-[11px] font-semibold text-[#344039]">
              Nombre *
            </span>
            <input
              value={form.name}
              onChange={(event) => update("name", event.target.value)}
              placeholder="Ej. Bolsa bordada artesanal"
              autoFocus
              className="mt-1.5 h-11 w-full rounded-[14px] border border-[#DDE3DA] bg-white px-3.5 text-[12px] text-[#263129] outline-none transition placeholder:text-[#A0A9A2] focus:border-[#7DA44B] focus:ring-2 focus:ring-[#9AC84B]/20"
            />
          </label>

          <label>
            <span className="text-[11px] font-semibold text-[#344039]">
              Precio *
            </span>
            <input
              type="number"
              min="0"
              value={form.price || ""}
              onChange={(event) => update("price", Number(event.target.value))}
              placeholder="620"
              className="mt-1.5 h-11 w-full rounded-[14px] border border-[#DDE3DA] bg-white px-3.5 text-[12px] text-[#263129] outline-none transition placeholder:text-[#A0A9A2] focus:border-[#7DA44B] focus:ring-2 focus:ring-[#9AC84B]/20"
            />
          </label>

          <label>
            <span className="text-[11px] font-semibold text-[#344039]">
              Cantidad disponible
            </span>
            <input
              type="number"
              min="0"
              value={form.quantity}
              onChange={(event) => update("quantity", Number(event.target.value))}
              className="mt-1.5 h-11 w-full rounded-[14px] border border-[#DDE3DA] bg-white px-3.5 text-[12px] text-[#263129] outline-none transition focus:border-[#7DA44B] focus:ring-2 focus:ring-[#9AC84B]/20"
            />
          </label>

          <label>
            <span className="text-[11px] font-semibold text-[#344039]">
              Categoría
            </span>
            <select
              value={form.category}
              onChange={(event) =>
                update("category", event.target.value as ProductCategory)
              }
              className="mt-1.5 h-11 w-full rounded-[14px] border border-[#DDE3DA] bg-white px-3.5 text-[12px] text-[#263129] outline-none transition focus:border-[#7DA44B] focus:ring-2 focus:ring-[#9AC84B]/20"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </label>

          <label>
            <span className="text-[11px] font-semibold text-[#344039]">
              Costo
            </span>
            <input
              type="number"
              min="0"
              value={form.cost || ""}
              onChange={(event) => update("cost", Number(event.target.value))}
              placeholder="320"
              className="mt-1.5 h-11 w-full rounded-[14px] border border-[#DDE3DA] bg-white px-3.5 text-[12px] text-[#263129] outline-none transition placeholder:text-[#A0A9A2] focus:border-[#7DA44B] focus:ring-2 focus:ring-[#9AC84B]/20"
            />
          </label>

          <label>
            <span className="text-[11px] font-semibold text-[#344039]">
              Avísame cuando queden
            </span>
            <input
              type="number"
              min="1"
              value={form.lowStockAt}
              onChange={(event) => update("lowStockAt", Number(event.target.value))}
              className="mt-1.5 h-11 w-full rounded-[14px] border border-[#DDE3DA] bg-white px-3.5 text-[12px] text-[#263129] outline-none transition focus:border-[#7DA44B] focus:ring-2 focus:ring-[#9AC84B]/20"
            />
          </label>

          <label>
            <span className="text-[11px] font-semibold text-[#344039]">
              Proveedor
            </span>
            <input
              value={form.supplier}
              onChange={(event) => update("supplier", event.target.value)}
              placeholder="Opcional"
              className="mt-1.5 h-11 w-full rounded-[14px] border border-[#DDE3DA] bg-white px-3.5 text-[12px] text-[#263129] outline-none transition placeholder:text-[#A0A9A2] focus:border-[#7DA44B] focus:ring-2 focus:ring-[#9AC84B]/20"
            />
          </label>

          <label className="sm:col-span-2">
            <span className="flex items-center gap-1.5 text-[11px] font-semibold text-[#344039]">
              <ImagePlus className="h-3.5 w-3.5" />
              Imagen
            </span>
            <input
              value={form.image}
              onChange={(event) => update("image", event.target.value)}
              placeholder="URL de imagen (opcional)"
              className="mt-1.5 h-11 w-full rounded-[14px] border border-[#DDE3DA] bg-white px-3.5 text-[12px] text-[#263129] outline-none transition placeholder:text-[#A0A9A2] focus:border-[#7DA44B] focus:ring-2 focus:ring-[#9AC84B]/20"
            />
          </label>

          <label className="sm:col-span-2">
            <span className="text-[11px] font-semibold text-[#344039]">
              Notas
            </span>
            <textarea
              value={form.notes}
              onChange={(event) => update("notes", event.target.value)}
              placeholder="Ej. Se vende mucho como regalo."
              rows={3}
              className="mt-1.5 w-full resize-none rounded-[14px] border border-[#DDE3DA] bg-white px-3.5 py-3 text-[12px] leading-5 text-[#263129] outline-none transition placeholder:text-[#A0A9A2] focus:border-[#7DA44B] focus:ring-2 focus:ring-[#9AC84B]/20"
            />
          </label>
        </div>

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
            Guardar producto
          </button>
        </div>
      </form>
    </div>
  );
}
