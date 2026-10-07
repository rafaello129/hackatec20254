import { useState } from "react";
import {
  Camera,
  FileText,
  ShieldCheck,
  X,
} from "lucide-react";
import type { ProductVerification } from "@/types/product-verification.types";

const evidenceOptions = [
  {
    id: "workshop",
    title: "Foto del taller",
    description: "Una fotografía clara del espacio donde se elabora el producto.",
    icon: Camera,
  },
  {
    id: "process",
    title: "Foto del proceso",
    description: "Una imagen de una etapa del proceso de elaboración.",
    icon: Camera,
  },
  {
    id: "record",
    title: "Registro del productor",
    description: "Un registro o ficha que relacione al productor con la pieza.",
    icon: FileText,
  },
] as const;

export default function VerificationActionModal({
  productName,
  verification,
  onClose,
  onRequest,
  onCompleteEvidence,
}: {
  productName: string;
  verification: ProductVerification;
  onClose: () => void;
  onRequest: () => void;
  onCompleteEvidence: (title: string, description: string) => void;
}) {
  const [selected, setSelected] = useState(evidenceOptions[0].id);
  const isRequest = verification.status === "not_requested";

  const submit = () => {
    if (isRequest) {
      onRequest();
      onClose();
      return;
    }

    const option =
      evidenceOptions.find((item) => item.id === selected) ??
      evidenceOptions[0];
    onCompleteEvidence(option.title, option.description);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[70] grid place-items-center bg-[#0A1A0C]/35 px-4 backdrop-blur-[3px]">
      <button
        type="button"
        onClick={onClose}
        aria-label="Cerrar"
        className="absolute inset-0"
      />
      <section
        role="dialog"
        aria-modal="true"
        className="relative z-10 w-full max-w-[520px] rounded-[26px] border border-[#E0E5DD] bg-[#FFFDFB] p-6 shadow-[0_24px_70px_rgba(2,38,1,.24)]"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="grid h-11 w-11 place-items-center rounded-[15px] bg-[#EAF4E6] text-[#2E6D36]">
              <ShieldCheck className="h-5 w-5" />
            </span>
            <h2 className="mt-4 text-[20px] font-semibold text-[#263129]">
              {isRequest
                ? "Solicitar verificación"
                : "Completar evidencia"}
            </h2>
            <p className="mt-1 text-[11px] leading-5 text-[#7A867E]">
              {productName}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="grid h-9 w-9 place-items-center rounded-full border border-[#E0E5DD] bg-white text-[#657068]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {isRequest ? (
          <div className="mt-5 rounded-[18px] bg-[#F6F8F3] p-4 text-[11px] leading-5 text-[#66736A]">
            MÁAK abrirá una revisión de identidad, origen, proceso artesanal y
            vínculo del producto con el productor. Esta acción es una
            demostración y no crea una certificación oficial.
          </div>
        ) : (
          <div className="mt-5 space-y-2">
            {evidenceOptions.map((option) => {
              const Icon = option.icon;
              const active = selected === option.id;
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setSelected(option.id)}
                  className={[
                    "flex w-full items-start gap-3 rounded-[18px] border p-4 text-left transition",
                    active
                      ? "border-[#9AC84B] bg-[#F1F8E7]"
                      : "border-[#E3E8DF] bg-white",
                  ].join(" ")}
                >
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-[12px] bg-white text-[#5A7B12]">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span>
                    <span className="block text-[11px] font-semibold text-[#344039]">
                      {option.title}
                    </span>
                    <span className="mt-1 block text-[10px] leading-4 text-[#7A867E]">
                      {option.description}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        )}

        <div className="mt-6 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="h-10 rounded-full border border-[#DDE3DA] bg-white px-4 text-[11px] font-semibold text-[#536057]"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={submit}
            className="h-10 rounded-full bg-[var(--peek-brand-900)] px-5 text-[11px] font-semibold text-white"
          >
            {isRequest ? "Enviar solicitud" : "Agregar evidencia demo"}
          </button>
        </div>
      </section>
    </div>
  );
}
