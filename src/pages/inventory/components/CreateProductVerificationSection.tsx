import type { ReactNode } from "react";
import {
  Factory,
  Hammer,
  MapPin,
  Package,
  ShieldCheck,
} from "lucide-react";
import ImageSourcePicker from "./ImageSourcePicker";

export interface ProductVerificationDraft {
  producerName: string;
  workshopName: string;
  location: string;
  technique: string;
  materials: string;
  requestReview: boolean;
  evidenceUrl: string;
}

export const EMPTY_PRODUCT_VERIFICATION_DRAFT: ProductVerificationDraft = {
  producerName: "",
  workshopName: "",
  location: "",
  technique: "",
  materials: "",
  requestReview: false,
  evidenceUrl: "",
};

const inputClass =
  "mt-1.5 h-11 w-full rounded-[14px] border border-[#DDE3DA] bg-white px-3.5 text-[12px] text-[#263129] outline-none transition placeholder:text-[#A0A9A2] focus:border-[#7DA44B] focus:ring-2 focus:ring-[#9AC84B]/20";

export default function CreateProductVerificationSection({
  value,
  onChange,
  error,
}: {
  value: ProductVerificationDraft;
  onChange: (next: ProductVerificationDraft) => void;
  error?: string;
}) {
  const update = <K extends keyof ProductVerificationDraft>(
    field: K,
    nextValue: ProductVerificationDraft[K],
  ) => {
    onChange({ ...value, [field]: nextValue });
  };

  return (
    <section className="overflow-hidden rounded-[24px] border border-[#CADBC4] bg-white shadow-[0_12px_30px_rgba(2,38,1,0.035)]">
      <div className="border-b border-[#DCE8D7] bg-[linear-gradient(135deg,#F3F8EF_0%,#EAF4E6_100%)] p-5 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex min-w-0 items-start gap-3">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-[14px] bg-[#022601] text-[#B6E251] shadow-[0_8px_18px_rgba(2,38,1,.12)]">
              <ShieldCheck className="h-5 w-5" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-semibold uppercase tracking-[0.11em] text-[#617265]">
                3. Trazabilidad y autenticidad
              </p>
              <h2 className="mt-1 text-[18px] font-semibold text-[#263129]">
                Procedencia del producto
              </h2>
              <p className="mt-1 max-w-[620px] text-[10px] leading-4 text-[#6F7B72]">
                Registra la procedencia, técnica y materiales para documentar
                la trazabilidad del producto y, si lo deseas, solicitar su
                revisión.
              </p>
            </div>
          </div>

          <div className="flex shrink-0 flex-wrap items-center gap-2 sm:justify-end">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#022601] px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.08em] text-white shadow-[0_6px_16px_rgba(2,38,1,.14)]">
              <ShieldCheck className="h-3.5 w-3.5 text-[#B6E251]" />
              Verificación PÉEK
            </span>
            <span className="rounded-full border border-[#CFD9CB] bg-white/80 px-2.5 py-1.5 text-[8px] font-semibold uppercase tracking-[0.08em] text-[#6A766D]">
              Opcional
            </span>
          </div>
        </div>
      </div>

      <div className="p-5 sm:p-6">

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <Field label="Productor o responsable principal" icon={Factory}>
          <input
            id="verification-producer"
            value={value.producerName}
            onChange={(event) => update("producerName", event.target.value)}
            placeholder="Ej. Familia Pech"
            className={inputClass}
          />
        </Field>

        <Field label="Taller, colectivo u organización" icon={Factory}>
          <input
            value={value.workshopName}
            onChange={(event) => update("workshopName", event.target.value)}
            placeholder="Ej. Taller Manos del Mayab"
            className={inputClass}
          />
        </Field>

        <Field label="Lugar de elaboración" icon={MapPin}>
          <input
            id="verification-location"
            value={value.location}
            onChange={(event) => update("location", event.target.value)}
            placeholder="Ej. Mérida, Yucatán"
            className={inputClass}
          />
        </Field>

        <Field label="Técnica de elaboración" icon={Hammer}>
          <input
            value={value.technique}
            onChange={(event) => update("technique", event.target.value)}
            placeholder="Ej. Bordado manual"
            className={inputClass}
          />
        </Field>

        <div className="sm:col-span-2">
          <Field label="Materiales" icon={Package}>
            <input
              value={value.materials}
              onChange={(event) => update("materials", event.target.value)}
              placeholder="Ej. Algodón, hilo de algodón, fibras naturales"
              className={inputClass}
            />
          </Field>
          <p className="mt-1.5 text-[9px] leading-4 text-[#87918A]">
            Separa los materiales con comas para registrarlos individualmente.
          </p>
        </div>
      </div>

      <div className="mt-5 rounded-[18px] border border-[#DDE7D7] bg-[#F6FAF3] p-4">
        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            checked={value.requestReview}
            onChange={(event) => update("requestReview", event.target.checked)}
            className="mt-0.5 h-4 w-4 rounded border-[#A9B8A5] accent-[#022601]"
          />
          <span className="min-w-0">
            <span className="block text-[11px] font-semibold text-[#344039]">
              Solicitar revisión de autenticidad
            </span>
            <span className="mt-1 block text-[9px] leading-4 text-[#7A867E]">
              La información registrada se enviará a revisión y el producto mostrará
              un estado pendiente hasta concluir el proceso.
            </span>
          </span>
        </label>
      </div>

      <div className="mt-4">
        <ImageSourcePicker
          value={value.evidenceUrl}
          onChange={(nextValue) => update("evidenceUrl", nextValue)}
          title="Evidencia de procedencia"
          description="Adjunta una fotografía del proceso, taller o producto, o utiliza una URL."
          compact
        />
      </div>

        {error ? (
          <p className="mt-4 rounded-[13px] bg-[#FFF1EE] px-3.5 py-2.5 text-[10px] font-medium leading-4 text-[#A84E3E]">
            {error}
          </p>
        ) : null}
      </div>
    </section>
  );
}

function Field({
  label,
  icon: Icon,
  children,
}: {
  label: string;
  icon: typeof MapPin;
  children: ReactNode;
}) {
  return (
    <label>
      <span className="flex items-center gap-1.5 text-[11px] font-semibold text-[#344039]">
        <Icon className="h-3.5 w-3.5 text-[#6F8E2B]" />
        {label}
      </span>
      {children}
    </label>
  );
}
