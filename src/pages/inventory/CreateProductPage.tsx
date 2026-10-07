import { useMemo, useState, type FormEvent, type ReactNode } from "react";
import {
  ArrowLeft,
  ChevronDown,
  ImagePlus,
  PackagePlus,
  Save,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import type {
  NewProductInput,
  ProductCategory,
} from "@/types/inventory.types";
import { useInventoryState } from "./context/InventoryProvider";
import { PRODUCT_CATEGORIES } from "./hooks/useInventory";
import CreateProductPreview from "./components/CreateProductPreview";

const emptyForm: NewProductInput = {
  name: "",
  category: "Textiles",
  description: "",
  price: 0,
  cost: 0,
  quantity: 0,
  lowStockAt: 5,
  supplier: "",
  image: "",
};

type FieldErrors = {
  name?: string;
  price?: string;
  cost?: string;
  quantity?: string;
  lowStockAt?: string;
};

const inputClass =
  "mt-1.5 h-11 w-full rounded-[14px] border border-[#DDE3DA] bg-white px-3.5 text-[12px] text-[#263129] outline-none transition placeholder:text-[#A0A9A2] focus:border-[#7DA44B] focus:ring-2 focus:ring-[#9AC84B]/20";

export default function CreateProductPage() {
  const navigate = useNavigate();
  const { addProduct } = useInventoryState();
  const [form, setForm] = useState<NewProductInput>(emptyForm);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const profit = useMemo(
    () => Math.max(0, (form.price || 0) - (form.cost || 0)),
    [form.price, form.cost],
  );

  const update = <K extends keyof NewProductInput>(
    field: K,
    value: NewProductInput[K],
  ) => {
    setForm((current) => ({ ...current, [field]: value }));
    if (field in errors) {
      setErrors((current) => ({ ...current, [field]: undefined }));
    }
  };

  const validate = () => {
    const next: FieldErrors = {};

    if (!form.name.trim()) {
      next.name = "Escribe un nombre para el producto.";
    }

    if (!Number.isFinite(form.price) || form.price <= 0) {
      next.price = "El precio debe ser mayor a $0.";
    }

    if ((form.cost ?? 0) < 0) {
      next.cost = "El costo no puede ser negativo.";
    }

    if (!Number.isFinite(form.quantity) || form.quantity < 0) {
      next.quantity = "La cantidad no puede ser negativa.";
    }

    if (
      !Number.isFinite(form.lowStockAt ?? 5) ||
      (form.lowStockAt ?? 5) < 1
    ) {
      next.lowStockAt = "El aviso debe ser de al menos 1 pieza.";
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);

    if (!validate()) return;

    const id = addProduct({
      ...form,
      name: form.name.trim(),
      description: form.description?.trim() || "",
      image: form.image?.trim() || "",
      supplier: form.supplier?.trim() || "",
      price: Math.max(0, form.price),
      cost: Math.max(0, form.cost ?? 0),
      quantity: Math.max(0, Math.floor(form.quantity)),
      lowStockAt: Math.max(1, Math.floor(form.lowStockAt ?? 5)),
    });

    navigate("/inventory/" + id);
  };

  return (
    <form onSubmit={submit} className="pb-8">
      <div className="mb-5">
        <button
          type="button"
          onClick={() => navigate("/inventory")}
          className="inline-flex min-h-10 items-center gap-2 rounded-full px-1 text-[12px] font-semibold text-[#536057] transition hover:text-[var(--oe-primary)]"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver a Productos
        </button>

        <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#7A867E]">
              Nuevo producto
            </p>
            <h1 className="mt-1 font-['Hanken_Grotesk'] text-[34px] font-bold leading-none text-[var(--oe-text)]">
              Agregar producto
            </h1>
            <p className="mt-2 max-w-[620px] text-[12px] leading-5 text-[var(--oe-text-muted)]">
              Registra lo necesario para empezar a venderlo y controlar sus
              existencias.
            </p>
          </div>

          <button
            type="submit"
            className="hidden h-11 items-center justify-center gap-2 rounded-full bg-[var(--peek-brand-900)] px-5 text-[12px] font-semibold text-white transition hover:bg-[var(--oe-primary-hover)] lg:inline-flex"
          >
            <Save className="h-4 w-4" />
            Guardar producto
          </button>
        </div>
      </div>

      <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="space-y-5">
          <section className="rounded-[24px] border border-[var(--oe-border)] bg-white p-5 sm:p-6">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-[14px] bg-[#EEF6E9] text-[#2E6D36]">
                <PackagePlus className="h-5 w-5" />
              </span>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[#7A867E]">
                  1. Información
                </p>
                <h2 className="mt-1 text-[18px] font-semibold text-[#263129]">
                  Información del producto
                </h2>
              </div>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <Field
                label="Nombre"
                required
                error={errors.name}
                className="sm:col-span-2"
              >
                <input
                  autoFocus
                  value={form.name}
                  onChange={(event) => update("name", event.target.value)}
                  placeholder="Ej. Bolsa bordada artesanal"
                  className={inputClass}
                  aria-invalid={Boolean(errors.name)}
                />
              </Field>

              <Field label="Categoría" required>
                <select
                  value={form.category}
                  onChange={(event) =>
                    update(
                      "category",
                      event.target.value as ProductCategory,
                    )
                  }
                  className={inputClass}
                >
                  {PRODUCT_CATEGORIES.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </Field>

              <div className="sm:col-span-2">
                <Field label="Descripción">
                  <textarea
                    value={form.description ?? ""}
                    onChange={(event) =>
                      update("description", event.target.value)
                    }
                    placeholder="Describe brevemente el producto, materiales o uso."
                    rows={3}
                    className="mt-1.5 w-full resize-none rounded-[14px] border border-[#DDE3DA] bg-white px-3.5 py-3 text-[12px] leading-5 text-[#263129] outline-none transition placeholder:text-[#A0A9A2] focus:border-[#7DA44B] focus:ring-2 focus:ring-[#9AC84B]/20"
                  />
                </Field>
              </div>

              <div className="sm:col-span-2">
                <Field label="Imagen">
                  <div className="mt-1.5 rounded-[16px] border border-[#DDE3DA] bg-[#FAFBF8] p-3">
                    <div className="flex items-center gap-3">
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-[12px] bg-[#EEF4E9] text-[#5A7B12]">
                        <ImagePlus className="h-5 w-5" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-[11px] font-semibold text-[#344039]">
                          Agregar imagen
                        </p>
                        <p className="mt-0.5 text-[9px] text-[#87918A]">
                          Por ahora usa una URL de imagen.
                        </p>
                      </div>
                    </div>
                    <input
                      value={form.image ?? ""}
                      onChange={(event) =>
                        update("image", event.target.value)
                      }
                      placeholder="https://..."
                      className="mt-3 h-10 w-full rounded-[12px] border border-[#E1E6DE] bg-white px-3 text-[11px] text-[#263129] outline-none placeholder:text-[#A0A9A2] focus:border-[#7DA44B]"
                    />
                  </div>
                </Field>
              </div>
            </div>
          </section>

          <section className="rounded-[24px] border border-[var(--oe-border)] bg-white p-5 sm:p-6">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[#7A867E]">
                2. Precio e inventario
              </p>
              <h2 className="mt-1 text-[18px] font-semibold text-[#263129]">
                Lo necesario para venderlo
              </h2>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <Field label="Precio" required error={errors.price}>
                <MoneyInput
                  value={form.price}
                  placeholder="620"
                  onChange={(value) => update("price", value)}
                />
              </Field>

              <Field
                label="Costo"
                error={errors.cost}
                hint="Se usa para calcular la ganancia aproximada."
              >
                <MoneyInput
                  value={form.cost ?? 0}
                  placeholder="320"
                  onChange={(value) => update("cost", value)}
                />
              </Field>

              <Field label="Cantidad disponible" error={errors.quantity}>
                <input
                  type="number"
                  min="0"
                  value={form.quantity}
                  onChange={(event) =>
                    update("quantity", Number(event.target.value))
                  }
                  className={inputClass}
                  aria-invalid={Boolean(errors.quantity)}
                />
              </Field>

              <Field
                label="Avísame cuando queden"
                error={errors.lowStockAt}
                hint="PÉEK te avisará cuando llegues a esta cantidad."
              >
                <input
                  type="number"
                  min="1"
                  value={form.lowStockAt ?? 5}
                  onChange={(event) =>
                    update("lowStockAt", Number(event.target.value))
                  }
                  className={inputClass}
                  aria-invalid={Boolean(errors.lowStockAt)}
                />
              </Field>
            </div>

            {(form.price > 0 || (form.cost ?? 0) > 0) ? (
              <div className="mt-4 flex items-center justify-between gap-4 rounded-[15px] bg-[#F3F8EF] px-4 py-3">
                <span className="text-[10px] text-[#657068]">
                  Ganancia aproximada por pieza
                </span>
                <span className="text-[15px] font-bold text-[#2E6D36]">
                  {"$" + profit.toLocaleString("es-MX")}
                </span>
              </div>
            ) : null}
          </section>

          <details className="group rounded-[24px] border border-[var(--oe-border)] bg-white">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 sm:p-6">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[#7A867E]">
                  Opcional
                </p>
                <h2 className="mt-1 text-[16px] font-semibold text-[#263129]">
                  Más opciones
                </h2>
                <p className="mt-1 text-[10px] text-[#87918A]">
                  Agrega un proveedor si ya lo tienes identificado.
                </p>
              </div>
              <ChevronDown className="h-5 w-5 shrink-0 text-[#7A867E] transition-transform group-open:rotate-180" />
            </summary>

            <div className="border-t border-[#EDF0EB] px-5 pb-5 pt-4 sm:px-6 sm:pb-6">
              <Field label="Proveedor">
                <input
                  value={form.supplier ?? ""}
                  onChange={(event) =>
                    update("supplier", event.target.value)
                  }
                  placeholder="Ej. Taller Manos del Mayab"
                  className={inputClass}
                />
              </Field>
            </div>
          </details>

          {submitted && Object.keys(errors).length > 0 ? (
            <div className="rounded-[16px] bg-[#FFF1EE] px-4 py-3 text-[11px] text-[#A84E3E]">
              Revisa los campos marcados antes de guardar.
            </div>
          ) : null}

          <div className="hidden items-center justify-end gap-2 border-t border-[#E4E8E1] pt-5 lg:flex">
            <button
              type="button"
              onClick={() => navigate("/inventory")}
              className="h-11 rounded-full border border-[#DDE3DA] bg-white px-5 text-[11px] font-semibold text-[#536057] transition hover:bg-[#F6F8F4]"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="inline-flex h-11 items-center gap-2 rounded-full bg-[var(--peek-brand-900)] px-5 text-[11px] font-semibold text-white transition hover:bg-[var(--oe-primary-hover)]"
            >
              <Save className="h-4 w-4" />
              Guardar producto
            </button>
          </div>
        </div>

        <CreateProductPreview product={form} />
      </div>

      <div className="sticky bottom-3 z-20 mt-5 grid grid-cols-[auto_1fr] gap-2 rounded-[18px] border border-[#E1E6DE] bg-white/95 p-2 shadow-[0_12px_30px_rgba(2,38,1,.12)] backdrop-blur lg:hidden">
        <button
          type="button"
          onClick={() => navigate("/inventory")}
          className="h-11 rounded-[14px] px-4 text-[11px] font-semibold text-[#657068]"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-[14px] bg-[var(--peek-brand-900)] px-5 text-[11px] font-semibold text-white"
        >
          <Save className="h-4 w-4" />
          Guardar producto
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  required = false,
  error,
  hint,
  className = "",
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <label className={className}>
      <span className="text-[11px] font-semibold text-[#344039]">
        {label}
        {required ? " *" : ""}
      </span>
      {children}
      {error ? (
        <span className="mt-1.5 block text-[10px] font-medium text-[#A84E3E]">
          {error}
        </span>
      ) : hint ? (
        <span className="mt-1.5 block text-[9px] leading-4 text-[#87918A]">
          {hint}
        </span>
      ) : null}
    </label>
  );
}

function MoneyInput({
  value,
  placeholder,
  onChange,
}: {
  value: number;
  placeholder: string;
  onChange: (value: number) => void;
}) {
  return (
    <div className="relative">
      <span className="pointer-events-none absolute left-3.5 top-1/2 mt-[3px] -translate-y-1/2 text-[12px] font-semibold text-[#657068]">
        $
      </span>
      <input
        type="number"
        min="0"
        value={value || ""}
        onChange={(event) => onChange(Number(event.target.value))}
        placeholder={placeholder}
        className={inputClass + " pl-8"}
      />
    </div>
  );
}
