import {
  FileText,
  Image as ImageIcon,
  SearchCheck,
} from "lucide-react";
import type { ProductVerificationEvidence } from "@/types/product-verification.types";

export default function VerificationEvidenceGrid({
  evidence,
  onOpen,
}: {
  evidence: ProductVerificationEvidence[];
  onOpen: (evidence: ProductVerificationEvidence) => void;
}) {
  return (
    <section className="rounded-[24px] border border-[var(--oe-border)] bg-white p-5 sm:p-6">
      <div className="flex items-end justify-between gap-3">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.09em] text-[#7A867E]">
            Evidencia
          </p>
          <h3 className="mt-1 text-[18px] font-semibold text-[#263129]">
            Material revisado
          </h3>
        </div>
        <span className="text-[10px] text-[#87918A]">
          {evidence.length} {evidence.length === 1 ? "elemento" : "elementos"}
        </span>
      </div>

      {evidence.length === 0 ? (
        <div className="mt-5 rounded-[18px] border border-dashed border-[#DDE4D9] bg-[#F8FAF6] px-4 py-7 text-center">
          <SearchCheck className="mx-auto h-5 w-5 text-[#7A867E]" />
          <p className="mt-2 text-[11px] font-semibold text-[#536057]">
            Todavía no hay evidencia visible.
          </p>
        </div>
      ) : (
        <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {evidence.map((item) => {
            const Icon =
              item.type === "photo"
                ? ImageIcon
                : item.type === "document"
                  ? FileText
                  : SearchCheck;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onOpen(item)}
                className="group overflow-hidden rounded-[18px] border border-[#E5E9E2] bg-[#FBFCF9] text-left transition hover:-translate-y-0.5 hover:border-[#CBD8C6] hover:shadow-sm"
              >
                {item.url ? (
                  <div className="aspect-[16/9] overflow-hidden bg-[#EEF1EB]">
                    <img
                      src={item.url}
                      alt={item.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                  </div>
                ) : (
                  <div className="grid aspect-[16/9] place-items-center bg-[#F0F4EC] text-[#5A7B12]">
                    <Icon className="h-7 w-7" />
                  </div>
                )}
                <div className="p-3.5">
                  <p className="text-[11px] font-semibold text-[#344039]">
                    {item.title}
                  </p>
                  <p className="mt-1 line-clamp-2 text-[9px] leading-4 text-[#87918A]">
                    {item.description ?? "Evidencia asociada a la revisión."}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </section>
  );
}
