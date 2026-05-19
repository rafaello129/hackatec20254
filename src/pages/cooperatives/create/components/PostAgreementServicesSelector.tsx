import React from "react";
import { Check } from "lucide-react";

const OPTIONS = [
  { id: 'delivery', label: 'Delivery' },
  { id: 'digital_sale', label: 'Venta digital' },
  { id: 'distribution_calculation', label: 'Cálculo de reparto' },
  { id: 'tracking', label: 'Seguimiento' },
  { id: 'documents', label: 'Documentos' },
  { id: 'invoicing', label: 'Facturación' },
];

interface Props { selected: string[]; onToggle: (id: string) => void }

export default function PostAgreementServicesSelector({ selected, onToggle }: Props) {
  return (
    <div className="grid gap-3 grid-cols-1 sm:grid-cols-2">
      {OPTIONS.map((opt) => {
        const active = selected.includes(opt.id);
        return (
          <button key={opt.id} onClick={() => onToggle(opt.id)} type="button" className={`flex items-center gap-3 rounded-lg border p-3 text-left ${active ? 'border-[#4F7302] bg-[#f6f9f0]' : 'border-[#e2e3dc] bg-white'}`}>
            <span className={`inline-flex items-center justify-center h-8 w-8 rounded-md ${active ? 'bg-[#4F7302] text-white' : 'bg-[#f3f4ed] text-[#42493f]'}`}>
              <Check className="h-4 w-4" />
            </span>
            <div>
              <div className="font-semibold text-[#1a1c18]">{opt.label}</div>
              <div className="text-sm text-[#42493f]">Disponible como servicio post-acuerdo</div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
