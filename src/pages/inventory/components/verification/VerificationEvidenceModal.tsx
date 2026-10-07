import { FileText, SearchCheck, X } from "lucide-react";
import type { ProductVerificationEvidence } from "@/types/product-verification.types";

export default function VerificationEvidenceModal({
  evidence,
  onClose,
}: {
  evidence: ProductVerificationEvidence | null;
  onClose: () => void;
}) {
  if (!evidence) return null;

  return (
    <div className="fixed inset-0 z-[70] grid place-items-center bg-[#0A1A0C]/35 px-4 backdrop-blur-[3px]">
      <button
        type="button"
        aria-label="Cerrar evidencia"
        onClick={onClose}
        className="absolute inset-0"
      />
      <section
        role="dialog"
        aria-modal="true"
        aria-label={evidence.title}
        className="relative z-10 w-full max-w-[620px] overflow-hidden rounded-[26px] border border-[#E0E5DD] bg-[#FFFDFB] shadow-[0_24px_70px_rgba(2,38,1,.24)]"
      >
        <div className="flex items-start justify-between gap-4 border-b border-[#E7EAE4] px-5 py-4 sm:px-6">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.09em] text-[#7A867E]">
              Evidencia de origen
            </p>
            <h2 className="mt-1 text-[18px] font-semibold text-[#263129]">
              {evidence.title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="grid h-9 w-9 place-items-center rounded-full border border-[#E0E5DD] bg-white text-[#657068]"
            aria-label="Cerrar"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {evidence.url ? (
          <div className="max-h-[420px] overflow-hidden bg-[#EEF1EB]">
            <img
              src={evidence.url}
              alt={evidence.title}
              className="h-full max-h-[420px] w-full object-cover"
            />
          </div>
        ) : (
          <div className="grid h-[260px] place-items-center bg-[#F2F5EF] text-[#5A7B12]">
            {evidence.type === "document" ? (
              <FileText className="h-12 w-12" />
            ) : (
              <SearchCheck className="h-12 w-12" />
            )}
          </div>
        )}

        <div className="p-5 sm:p-6">
          <p className="text-[12px] leading-6 text-[#657068]">
            {evidence.description ?? "Evidencia asociada a la revisión del producto."}
          </p>
        </div>
      </section>
    </div>
  );
}
