import type { ReactNode } from "react";
import {
  BadgeCheck,
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
    <section className="relative overflow-hidden rounded-[28px] bg-[#022601] shadow-[0_20px_44px_rgba(2,38,1,0.16)]">
      <div className="absolute right-[-34px] top-[-46px] h-40 w-40 rounded-full border border-white/10" />
      <div className="absolute right-[18px] top-[34px] h-24 w-24 rounded-full border border-[#B6E251]/15" />

      <div className="relative p-5 sm:p-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex min-w-0 items-start gap-4">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-[16px] bg-[#B6E251] text-[#022601] shadow-[0_10px_24px_rgba(0,0,0,.16)]">
              <ShieldCheck className="h-6 w-6" />
            </span>

            <div className="min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#B6E251]">
                3. Trazabilidad y autenticidad
              </p>
              <h2 className="mt-1.5 font-['Hanken_Grotesk'] text-[22px] font-bold leading-tight text-white">
                Procedencia del producto
              </h2>
              <p className="mt-2 max-w-[620px] text-[10px] leading-4 text-white/65">
                Documenta quién elabora el producto, dónde se produce y qué
                técnica y materiales intervienen en su elaboración.
              </p>
            </div>
          </div>

          <div className="flex shrink-0 flex-wrap items-center gap-2 sm:justify-end">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#B6E251] px-3 py-1.5 text-[9px] font-extrabold uppercase tracking-[0.08em] text-[#022601]">
              <BadgeCheck className="h-3.5 w-3.5" />
              Verificación PÉEK
            </span>
            <span className="rounded-full border border-white/15 bg-white/8 px-2.5 py-1.5 text-[8px] font-semibold uppercase tracking-[0.08em] text-white/70">
              Opcional
            </span>
          </div>
        </div>

        <div className="mt-5 rounded-[22px] border border-white/10 bg-[#F8FAF5] p-4 shadow-[0_12px_28px_rgba(0,0,0,.12)] sm:p-5">
          <div className="mb-4 flex items-start gap-3 rounded-[16px] bg-[#EEF5E8] px-4 py-3">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-[12px] bg-white text-[#2E6D36] shadow-sm">
              <BadgeCheck className="h-4 w-4" />
            </span>
            <div>
              <p className="text-[10px] font-semibold text-[#2D3931]">
                Información de trazabilidad
              </p>
              <p className="mt-0.5 text-[9px] leading-4 text-[#6F7B72]">
                Estos datos se mostrarán como parte de la información de
                procedencia y respaldarán cualquier solicitud de revisión.
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
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

          <div className="mt-5 overflow-hidden rounded-[18px] border border-[#C9D9C3] bg-white">
            <label className="flex cursor-pointer items-start gap-3 p-4">
              <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-[11px] bg-[#022601] text-[#B6E251]">
                <ShieldCheck className="h-4 w-4" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex flex-wrap items-center gap-2">
                  <span className="block text-[11px] font-semibold text-[#263129]">
                    Solicitar revisión de autenticidad
                  </span>
                  <span className="rounded-full bg-[#EAF4E6] px-2 py-1 text-[8px] font-bold uppercase tracking-[0.06em] text-[#2E6D36]">
                    PÉEK
                  </span>
                </span>
                <span className="mt-1 block text-[9px] leading-4 text-[#7A867E]">
                  La información registrada se enviará a revisión y el producto
                  mostrará un estado pendiente hasta concluir el proceso.
                </span>
              </span>
              <input
                type="checkbox"
                checked={value.requestReview}
                onChange={(event) => update("requestReview", event.target.checked)}
                className="mt-2 h-4 w-4 shrink-0 rounded border-[#A9B8A5] accent-[#022601]"
              />
            </label>
          </div>

          <div className="mt-4">
            <ImageSourcePicker
              value={value.evidenceUrl}
              onChange={(nextValue) => update("evidenceUrl", nextValue)}
              title="Evidencia de procedencia"
              description="Adjunta una fotografía del proceso, taller o producto desde tu equipo."
              compact
            />
          </div>

          {error ? (
            <p className="mt-4 rounded-[13px] bg-[#FFF1EE] px-3.5 py-2.5 text-[10px] font-medium leading-4 text-[#A84E3E]">
              {error}
            </p>
          ) : null}
        </div>
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
