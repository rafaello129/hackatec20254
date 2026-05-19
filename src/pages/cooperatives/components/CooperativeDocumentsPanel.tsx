import type { CooperativeDocument } from "@/types/cooperatives.types";

const docLabels: Record<CooperativeDocument["type"], string> = {
  preliminary_agreement: "Acuerdo preliminar",
  receipt: "Comprobante",
  delivery_evidence: "Evidencia de entrega",
  distribution_calculation: "Cálculo de reparto",
};

export default function CooperativeDocumentsPanel({ documents }: { documents: CooperativeDocument[] }) {
  return (
    <section className="rounded-lg border border-[#c2c9bc] bg-white p-4">
      <h3 className="mb-3 font-['Hanken_Grotesk'] text-lg font-semibold text-[#1a1c18]">Documentos</h3>
      <div className="space-y-2.5">
        {documents.map((document) => (
          <div key={document.id} className="rounded-lg border border-[#e2e3dc] bg-[#f9faf3] p-3">
            <div className="flex items-center justify-between gap-2">
              <div>
                <p className="text-sm font-semibold text-[#1a1c18]">{document.title}</p>
                <p className="text-xs text-[#42493f]">{docLabels[document.type]} · {document.updatedAt}</p>
              </div>
              <span className="rounded-full bg-[#e8e9e2] px-2.5 py-1 text-xs font-semibold text-[#42493f]">{document.status}</span>
            </div>
          </div>
        ))}
        {documents.length === 0 ? <p className="text-sm text-[#42493f]">Sin documentos cargados todavía.</p> : null}
      </div>
    </section>
  );
}
