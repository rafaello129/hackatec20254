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
    <form className="network-builder" onSubmit={(event) => { event.preventDefault(); onAnalyze(); }} aria-label="Editar proyecto">
      <div className="network-builder-fields">
        {[["goal", "Objetivo del proyecto"], ["quantity", "Cantidad"], ["budgetRange", "Presupuesto"], ["targetLocation", "Destino"]].map(([field, label]) => (
          <label key={field}>{label}
            <input required value={input[field as keyof AnalyzeNetworkProjectInput]} onChange={(event) => onChange(field as keyof AnalyzeNetworkProjectInput, event.target.value)} />
          </label>
        ))}
      </div>
      <button type="submit" disabled={isAnalyzing} className="network-primary">
        {isAnalyzing ? <Loader2 size={16} className="animate-spin" /> : <BrainCircuit size={16} />}
        {isAnalyzing ? "Guardando cambios..." : "Guardar cambios"}
      </button>
    </form>
  );
}
