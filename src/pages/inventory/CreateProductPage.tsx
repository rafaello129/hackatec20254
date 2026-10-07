import {
  useEffect,
  useMemo,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import {
  ArrowLeft,
  ChevronDown,
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
import ImageSourcePicker from "./components/ImageSourcePicker";
import CreateProductVerificationSection, {
  type ProductVerificationDraft,
} from "./components/CreateProductVerificationSection";
import { useProductVerification } from "./context/ProductVerificationProvider";

const expoForm: NewProductInput = {
  name: "Bolsa bordada Xtabentún",
  category: "Textiles",
  description:
    "Bolsa artesanal bordada a mano con motivos inspirados en la flora de Yucatán. Elaborada en pequeñas series por artesanas locales.",
  price: 680,
  cost: 310,
  quantity: 18,
  lowStockAt: 5,
  supplier: "Taller Manos del Mayab",
  image:
    "https://images.unsplash.com/photo-1767771322982-8041f4a5da8e?auto=format&fit=crop&w=900&h=900&q=82",
};

const expoVerification: ProductVerificationDraft = {
  producerName: "Familia Pech",
  workshopName: "Taller Manos del Mayab",
  location: "Mérida, Yucatán",
  technique: "Bordado manual",
  materials: "Algodón, hilo de algodón, fibras naturales",
  requestReview: true,
  evidenceUrl:
    "https://images.unsplash.com/photo-1459908676235-d5f02a50184b?auto=format&fit=crop&w=900&q=80",
};

type FieldErrors = {
  name?: string;
  price?: string;
  cost?: string;
  quantity?: string;
  lowStockAt?: string;
  verification?: string;
};

const inputClass =
  "mt-1.5 h-11 w-full rounded-[14px] border border-[#DDE3DA] bg-white px-3.5 text-[12px] text-[#263129] outline-none transition placeholder:text-[#A0A9A2] focus:border-[#7DA44B] focus:ring-2 focus:ring-[#9AC84B]/20";

export default function CreateProductPage() {
  const navigate = useNavigate();
  const { addProduct } = useInventoryState();
  const { createProductVerification } = useProductVerification();
  const [form, setForm] = useState<NewProductInput>(expoForm);
  const [verificationDraft, setVerificationDraft] =
    useState<ProductVerificationDraft>(expoVerification);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const isDirty = useMemo(
    () =>
      JSON.stringify(form) !== JSON.stringify(expoForm) ||
      JSON.stringify(verificationDraft) !== JSON.stringify(expoVerification),
    [form, verificationDraft],
  );

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (!isDirty) return;
      event.preventDefault();
      event.returnValue = "";
    };

    const handleDocumentClick = (event: MouseEvent) => {
      if (
        !isDirty ||
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const target = event.target;
      if (!(target instanceof Element)) return;

      const anchor = target.closest("a[href]");
      if (!(anchor instanceof HTMLAnchorElement) || anchor.target === "_blank") {
        return;
      }

      if (
        !window.confirm(
          "Tienes cambios sin guardar. ¿Seguro que quieres salir de esta pantalla?",
        )
      ) {
        event.preventDefault();
        event.stopPropagation();
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    document.addEventListener("click", handleDocumentClick, true);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      document.removeEventListener("click", handleDocumentClick, true);
    };
  }, [isDirty]);

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

  const updateVerification = (next: ProductVerificationDraft) => {
    setVerificationDraft(next);
    if (errors.verification) {
      setErrors((current) => ({ ...current, verification: undefined }));
    }
  };

  const leavePage = () => {
    if (
      isDirty &&
      !window.confirm(
        "Tienes cambios sin guardar. ¿Seguro que quieres salir de esta pantalla?",
      )
    ) {
      return;
    }

    navigate("/inventory");
  };

  const focusFirstError = (next: FieldErrors) => {
    const targetByError: Partial<Record<keyof FieldErrors, string>> = {
      name: "product-name",
      price: "product-price",
      cost: "product-cost",
      quantity: "product-quantity",
      lowStockAt: "product-low-stock",
      verification: "verification-producer",
    };

    const firstKey = Object.keys(next)[0] as keyof FieldErrors | undefined;
    const targetId = firstKey ? targetByError[firstKey] : undefined;
    if (!targetId) return;

    window.requestAnimationFrame(() => {
      document.getElementById(targetId)?.focus();
    });
  };

  const validate = () => {
    const next: FieldErrors = {};

    if (!form.name.trim()) {
      next.name = "Ingresa el nombre del producto.";
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
      next.lowStockAt = "El umbral debe ser de al menos 1 unidad.";
    }

    const hasOriginInfo = [
      verificationDraft.producerName,
      verificationDraft.workshopName,
      verificationDraft.location,
      verificationDraft.technique,
      verificationDraft.materials,
    ].some((value) => value.trim().length > 0);

    if (
      (hasOriginInfo || verificationDraft.requestReview) &&
      (!verificationDraft.producerName.trim() ||
        !verificationDraft.location.trim())
    ) {
      next.verification =
        "Para registrar la procedencia o solicitar verificación, ingresa el productor responsable y la ubicación.";
    }

    setErrors(next);
    if (Object.keys(next).length > 0) {
      focusFirstError(next);
    }
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

    const producerName = verificationDraft.producerName.trim();
    const location = verificationDraft.location.trim();
    const materials = verificationDraft.materials
      .split(",")
      .map((material) => material.trim())
      .filter(Boolean);

    createProductVerification(id, {
      origin:
        producerName && location
          ? {
              producerName,
              workshopName:
                verificationDraft.workshopName.trim() || undefined,
              location,
              technique: verificationDraft.technique.trim() || undefined,
              materials: materials.length > 0 ? materials : undefined,
            }
          : undefined,
      requestReview: verificationDraft.requestReview,
      evidence: verificationDraft.evidenceUrl.trim()
        ? {
            type: "photo",
            title: "Evidencia inicial",
            description: "Evidencia registrada al crear el producto.",
            url: verificationDraft.evidenceUrl.trim(),
          }
        : undefined,
    });

    navigate("/inventory/" + id);
  };

  return (
    <form onSubmit={submit} className="pb-8">
      <div className="mb-5">
        <button
          type="button"
          onClick={leavePage}
          className="inline-flex min-h-10 items-center gap-2 rounded-full px-1 text-[12px] font-semibold text-[#536057] transition hover:text-[var(--oe-primary)] motion-reduce:transition-none"
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
              Registra la información general, comercial y de inventario asociada al
              producto.
            </p>
          </div>

          <button
            type="submit"
            className="hidden h-11 items-center justify-center gap-2 rounded-full bg-[var(--peek-brand-900)] px-5 text-[12px] font-semibold text-white transition hover:bg-[var(--oe-primary-hover)] motion-reduce:transition-none lg:inline-flex"
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
                  1. Datos generales
                </p>
                <h2 className="mt-1 text-[18px] font-semibold text-[#263129]">
                  Información general del producto
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
                  id="product-name"
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
                    placeholder="Describe las características, materiales, elaboración o uso del producto."
                    rows={3}
                    className="mt-1.5 w-full resize-none rounded-[14px] border border-[#DDE3DA] bg-white px-3.5 py-3 text-[12px] leading-5 text-[#263129] outline-none transition placeholder:text-[#A0A9A2] focus:border-[#7DA44B] focus:ring-2 focus:ring-[#9AC84B]/20"
                  />
                </Field>
              </div>

              <div className="sm:col-span-2">
                <Field label="Imagen">
                  <ImageSourcePicker
                    value={form.image ?? ""}
                    onChange={(nextValue) => update("image", nextValue)}
                    description="Selecciona una imagen del producto desde tu equipo."
                  />
                </Field>
              </div>
            </div>
          </section>

          <section className="rounded-[24px] border border-[var(--oe-border)] bg-white p-5 sm:p-6">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[#7A867E]">
                2. Información comercial e inventario
              </p>
              <h2 className="mt-1 text-[18px] font-semibold text-[#263129]">
                Precio, costos y existencias
              </h2>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <Field label="Precio" required error={errors.price}>
                <MoneyInput
                  id="product-price"
                  value={form.price}
                  placeholder="620"
                  onChange={(value) => update("price", value)}
                />
              </Field>

              <Field
                label="Costo"
                error={errors.cost}
                hint="Permite estimar la utilidad por unidad."
              >
                <MoneyInput
                  id="product-cost"
                  value={form.cost ?? 0}
                  placeholder="320"
                  onChange={(value) => update("cost", value)}
                />
              </Field>

              <Field label="Existencia actual" error={errors.quantity}>
                <input
                  id="product-quantity"
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
                label="Umbral de existencias bajas"
                error={errors.lowStockAt}
                hint="Se generará una alerta cuando el inventario alcance esta cantidad."
              >
                <input
                  id="product-low-stock"
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
                  Utilidad estimada por unidad
                </span>
                <span className="text-[15px] font-bold text-[#2E6D36]">
                  {"$" + profit.toLocaleString("es-MX")}
                </span>
              </div>
            ) : null}
          </section>

          <CreateProductVerificationSection
            value={verificationDraft}
            onChange={updateVerification}
            error={errors.verification}
          />

          <details className="group rounded-[24px] border border-[var(--oe-border)] bg-white">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 sm:p-6">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[#7A867E]">
                  Opcional
                </p>
                <h2 className="mt-1 text-[16px] font-semibold text-[#263129]">
                  Información adicional
                </h2>
                <p className="mt-1 text-[10px] text-[#87918A]">
                  Registra un proveedor asociado al producto, si aplica.
                </p>
              </div>
              <ChevronDown className="h-5 w-5 shrink-0 text-[#7A867E] transition-transform group-open:rotate-180 motion-reduce:transition-none" />
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
            <div
              role="alert"
              aria-live="polite"
              className="rounded-[16px] bg-[#FFF1EE] px-4 py-3 text-[11px] text-[#A84E3E]"
            >
              Revisa los campos indicados antes de guardar el producto.
            </div>
          ) : null}

          <div className="hidden items-center justify-end gap-2 border-t border-[#E4E8E1] pt-5 lg:flex">
            <button
              type="button"
              onClick={leavePage}
              className="h-11 rounded-full border border-[#DDE3DA] bg-white px-5 text-[11px] font-semibold text-[#536057] transition hover:bg-[#F6F8F4] motion-reduce:transition-none"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="inline-flex h-11 items-center gap-2 rounded-full bg-[var(--peek-brand-900)] px-5 text-[11px] font-semibold text-white transition hover:bg-[var(--oe-primary-hover)] motion-reduce:transition-none"
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
          onClick={leavePage}
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
  id,
  value,
  placeholder,
  onChange,
}: {
  id?: string;
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
        id={id}
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
