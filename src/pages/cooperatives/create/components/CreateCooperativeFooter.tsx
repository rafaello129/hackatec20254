import React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface Props { onCancel: () => void; onNext: () => void; onBack: () => void; step: number; disabledNext?: boolean }

export default function CreateCooperativeFooter({ onCancel, onNext, onBack, step, disabledNext }: Props) {
  const nextLabel = step === 0 ? 'Siguiente: Información básica' : step === 1 ? 'Siguiente: Requisitos' : step === 2 ? 'Siguiente: Cronograma' : 'Crear iniciativa demo';

  return (
    <div className="sticky bottom-6 z-40">
      <div className="max-w-6xl mx-auto px-4 bg-transparent">
        <div className="backdrop-blur-sm rounded-lg border border-transparent bg-white/60 px-4 py-4 flex items-center justify-between">
          <button onClick={onCancel} className="inline-flex items-center gap-2 text-sm text-[#42493f]">
            <ArrowLeft className="h-4 w-4" />
            Cancelar iniciativa
          </button>

          <div className="flex items-center gap-3">
            {step > 0 && (
              <button onClick={onBack} className="inline-flex items-center gap-2 rounded-md border border-[#c2c9bc] bg-white px-4 py-2 text-sm text-[#42493f]">Atrás</button>
            )}
            <button onClick={onNext} disabled={disabledNext} className={`inline-flex items-center gap-2 rounded-lg px-6 py-3 text-base font-semibold text-white ${disabledNext ? 'bg-[#9aa787] cursor-not-allowed' : 'bg-[#4F7302]'}`}>
              {nextLabel}
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
