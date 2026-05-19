import React from "react";

interface Props {
  type: string | null;
  basicInfo: any;
  requirements: any;
  services: string[];
  timeline: any;
}

export default function InitiativeSummaryPanel({ type, basicInfo, requirements, services, timeline }: Props) {
  return (
    <aside className="sticky top-28">
      <div className="rounded-xl border border-[#e2e3dc] bg-white p-4">
        <h4 className="font-['Hanken_Grotesk'] text-sm font-semibold text-[#1a1c18]">Resumen de iniciativa</h4>
        <div className="mt-3 text-sm text-[#42493f] space-y-2">
          <div><span className="font-semibold text-[#1a1c18]">Tipo:</span> <span className="ml-2">{type ?? 'No seleccionado'}</span></div>
          <div><span className="font-semibold text-[#1a1c18]">Nombre:</span> <span className="ml-2">{basicInfo.name || '-'}</span></div>
          <div><span className="font-semibold text-[#1a1c18]">Categoría:</span> <span className="ml-2">{basicInfo.category || '-'}</span></div>
          <div><span className="font-semibold text-[#1a1c18]">Monto objetivo:</span> <span className="ml-2">{basicInfo.targetAmount || '-'}</span></div>
          <div><span className="font-semibold text-[#1a1c18]">Participantes:</span> <span className="ml-2">{basicInfo.participantsRequired || '-'}</span></div>
          <div><span className="font-semibold text-[#1a1c18]">Servicios:</span> <span className="ml-2">{services.length ? services.join(', ') : '-'}</span></div>
          <div><span className="font-semibold text-[#1a1c18]">Estado:</span> <span className="ml-2">Borrador</span></div>
        </div>
      </div>
    </aside>
  );
}
