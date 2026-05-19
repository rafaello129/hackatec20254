import React from "react";

interface Props { value: { registrationDeadline: string; negotiationDate: string; executionDate: string; deliveryDate: string }; onChange: (v: any) => void }

export default function TimelineStep({ value, onChange }: Props) {
  return (
    <div className="max-w-4xl">
      <h3 className="font-['Hanken_Grotesk'] text-lg font-semibold text-[#1a1c18]">Cronograma</h3>
      <p className="mt-2 text-sm text-[#42493f]">Define las fechas clave para esta iniciativa.</p>

      <div className="mt-4 grid gap-4 grid-cols-1 lg:grid-cols-2">
        <div>
          <label className="text-sm font-semibold text-[#42493f]">Fecha límite de inscripción</label>
          <input type="date" value={value.registrationDeadline} onChange={(e) => onChange({...value, registrationDeadline: e.target.value})} className="w-full rounded-md border border-[#e2e3dc] p-3 mt-2" />

          <label className="mt-4 text-sm font-semibold text-[#42493f]">Fecha estimada de negociación</label>
          <input type="date" value={value.negotiationDate} onChange={(e) => onChange({...value, negotiationDate: e.target.value})} className="w-full rounded-md border border-[#e2e3dc] p-3 mt-2" />
        </div>

        <div>
          <label className="text-sm font-semibold text-[#42493f]">Fecha estimada de ejecución</label>
          <input type="date" value={value.executionDate} onChange={(e) => onChange({...value, executionDate: e.target.value})} className="w-full rounded-md border border-[#e2e3dc] p-3 mt-2" />

          <label className="mt-4 text-sm font-semibold text-[#42493f]">Fecha estimada de entrega / cierre</label>
          <input type="date" value={value.deliveryDate} onChange={(e) => onChange({...value, deliveryDate: e.target.value})} className="w-full rounded-md border border-[#e2e3dc] p-3 mt-2" />
        </div>
      </div>
    </div>
  );
}
