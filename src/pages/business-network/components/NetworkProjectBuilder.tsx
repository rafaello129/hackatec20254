import { BrainCircuit, Loader2 } from "lucide-react";
import type { AnalyzeNetworkProjectInput } from "@/services/businessNetwork.service";

interface Props {
  input: AnalyzeNetworkProjectInput;
  isAnalyzing: boolean;
  onChange: (field: keyof AnalyzeNetworkProjectInput, value: string) => void;
  onAnalyze: () => void;
}

export default function NetworkProjectBuilder({ input, isAnalyzing, onChange, onAnalyze }: Props) {
  return (
    <section className="rounded-xl border border-[#022601]/30 bg-[#022601] p-5 text-white">
      <div className="mb-5">
        <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-[#c5f17a]">
          <BrainCircuit className="h-4 w-4" />
          AI Project Builder
        </div>
        <h2 className="font-['Hanken_Grotesk'] text-2xl font-bold">Construye una red comercial completa</h2>
        <p className="mt-1 max-w-2xl text-sm text-white/75">Describe una operacion y peek sugiere proveedores, manufactura, empaque, logistica y socios.</p>
      </div>
      <div className="grid gap-3 lg:grid-cols-[minmax(0,1.5fr)_140px_180px_180px]">
        {[
          ["goal", "Que quieres crear"],
          ["quantity", "Cantidad"],
          ["budgetRange", "Presupuesto"],
          ["targetLocation", "Ubicacion"],
        ].map(([field, label]) => (
          <label key={field} className="block">
            <span className="mb-1 block text-xs font-semibold uppercase tracking-[0.06em] text-white/65">{label}</span>
            <input
              value={input[field as keyof AnalyzeNetworkProjectInput]}
              onChange={(event) => onChange(field as keyof AnalyzeNetworkProjectInput, event.target.value)}
              className="h-11 w-full rounded-lg border border-white/15 bg-white/10 px-3 text-sm text-white outline-none focus:border-[#c5f17a]"
            />
          </label>
        ))}
      </div>
      <div className="mt-4 flex justify-end">
        <button onClick={onAnalyze} disabled={isAnalyzing} className="inline-flex items-center gap-2 rounded-lg bg-[#c5f17a] px-4 py-2 text-sm font-semibold text-[#022601] hover:bg-[#aad462] disabled:opacity-70">
          {isAnalyzing ? <Loader2 className="h-4 w-4 animate-spin" /> : <BrainCircuit className="h-4 w-4" />}
          Analizar proyecto
        </button>
      </div>
    </section>
  );
}
