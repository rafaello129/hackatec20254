import React from "react";

interface Props {
  value: {
    name: string;
    description: string;
    organizer: string;
    category: string;
    location: string;
    goal: string;
    targetAmount: string;
    participantsRequired: string;
  };
  onChange: (v: any) => void;
}

export default function BasicInfoStep({ value, onChange }: Props) {
  return (
    <div className="max-w-4xl">
      <h3 className="font-['Hanken_Grotesk'] text-lg font-semibold text-[#1a1c18]">Información básica</h3>
      <p className="mt-2 text-sm text-[#42493f]">Define la base de la oportunidad para que otros aliados puedan entender el alcance y beneficio de participar.</p>

      <div className="mt-6 grid gap-4 grid-cols-1 lg:grid-cols-2">
        <div className="space-y-3">
          <label className="text-sm font-semibold text-[#42493f]">Nombre de la iniciativa</label>
          <input value={value.name} onChange={(e) => onChange({...value, name: e.target.value})} className="w-full rounded-md border border-[#e2e3dc] p-3" placeholder="Nombre de la iniciativa" />

          <label className="text-sm font-semibold text-[#42493f]">Empresa organizadora</label>
          <input value={value.organizer} onChange={(e) => onChange({...value, organizer: e.target.value})} className="w-full rounded-md border border-[#e2e3dc] p-3" placeholder="Empresa organizadora" />

          <label className="text-sm font-semibold text-[#42493f]">Categoría</label>
          <input value={value.category} onChange={(e) => onChange({...value, category: e.target.value})} className="w-full rounded-md border border-[#e2e3dc] p-3" placeholder="Categoría" />

          <label className="text-sm font-semibold text-[#42493f]">Ubicación / Zona de operación</label>
          <input value={value.location} onChange={(e) => onChange({...value, location: e.target.value})} className="w-full rounded-md border border-[#e2e3dc] p-3" placeholder="Ciudad, región o alcance" />
        </div>

        <div className="space-y-3">
          <label className="text-sm font-semibold text-[#42493f]">Monto objetivo estimado</label>
          <input value={value.targetAmount} onChange={(e) => onChange({...value, targetAmount: e.target.value})} className="w-full rounded-md border border-[#e2e3dc] p-3" placeholder="$0" />

          <label className="text-sm font-semibold text-[#42493f]">Participantes requeridos</label>
          <input value={value.participantsRequired} onChange={(e) => onChange({...value, participantsRequired: e.target.value})} className="w-full rounded-md border border-[#e2e3dc] p-3" placeholder="Número estimado" />

          <label className="text-sm font-semibold text-[#42493f]">Objetivo principal</label>
          <input value={value.goal} onChange={(e) => onChange({...value, goal: e.target.value})} className="w-full rounded-md border border-[#e2e3dc] p-3" placeholder="Objetivo principal de la iniciativa" />
        </div>
      </div>

      <div className="mt-4">
        <label className="text-sm font-semibold text-[#42493f]">Descripción</label>
        <textarea value={value.description} onChange={(e) => onChange({...value, description: e.target.value})} className="w-full rounded-md border border-[#e2e3dc] p-3 mt-2" rows={5} placeholder="Describe la iniciativa para que otros aliados entiendan el alcance y beneficio de participar." />
      </div>
    </div>
  );
}
