import React from "react";
import PostAgreementServicesSelector from "./PostAgreementServicesSelector";

interface Props {
  value: {
    minContribution: string;
    contributionType: string;
    productOrService: string;
    minQuantity: string;
    participationDeadline: string;
    conditions: string;
    documents: string;
  };
  onChange: (v: any) => void;
  services: string[];
  onToggleService: (s: string) => void;
}

export default function RequirementsStep({ value, onChange, services, onToggleService }: Props) {
  return (
    <div className="max-w-4xl">
      <h3 className="font-['Hanken_Grotesk'] text-lg font-semibold text-[#1a1c18]">Requisitos</h3>
      <p className="mt-2 text-sm text-[#42493f]">Define condiciones de participación y los servicios post-acuerdo que estarán disponibles.</p>

      <div className="mt-4 grid gap-4 grid-cols-1 lg:grid-cols-2">
        <div className="space-y-3">
          <label className="text-sm font-semibold text-[#42493f]">Aportación mínima por participante</label>
          <input value={value.minContribution} onChange={(e) => onChange({...value, minContribution: e.target.value})} className="w-full rounded-md border border-[#e2e3dc] p-3" placeholder="$0" />

          <label className="text-sm font-semibold text-[#42493f]">Tipo de aportación</label>
          <select value={value.contributionType} onChange={(e) => onChange({...value, contributionType: e.target.value})} className="w-full rounded-md border border-[#e2e3dc] p-3">
            <option value="capital">Capital</option>
            <option value="inventario">Inventario</option>
            <option value="logistica">Logística</option>
            <option value="servicio">Servicio</option>
            <option value="canal">Canal de venta</option>
          </select>

          <label className="text-sm font-semibold text-[#42493f]">Producto o servicio relacionado</label>
          <input value={value.productOrService} onChange={(e) => onChange({...value, productOrService: e.target.value})} className="w-full rounded-md border border-[#e2e3dc] p-3" placeholder="Nombre del producto o servicio" />
        </div>

        <div className="space-y-3">
          <label className="text-sm font-semibold text-[#42493f]">Cantidad mínima / Volumen</label>
          <input value={value.minQuantity} onChange={(e) => onChange({...value, minQuantity: e.target.value})} className="w-full rounded-md border border-[#e2e3dc] p-3" placeholder="Cantidad mínima" />

          <label className="text-sm font-semibold text-[#42493f]">Fecha límite para participar</label>
          <input type="date" value={value.participationDeadline} onChange={(e) => onChange({...value, participationDeadline: e.target.value})} className="w-full rounded-md border border-[#e2e3dc] p-3" />

          <label className="text-sm font-semibold text-[#42493f]">Condiciones principales</label>
          <input value={value.conditions} onChange={(e) => onChange({...value, conditions: e.target.value})} className="w-full rounded-md border border-[#e2e3dc] p-3" placeholder="Condiciones" />
        </div>
      </div>

      <div className="mt-4">
        <label className="text-sm font-semibold text-[#42493f]">Documentos o comprobantes requeridos</label>
        <input value={value.documents} onChange={(e) => onChange({...value, documents: e.target.value})} className="w-full rounded-md border border-[#e2e3dc] p-3 mt-2" placeholder="Lista de documentos" />
      </div>

      <div className="mt-6 grid gap-3">
        <div className="text-sm font-semibold text-[#42493f]">Servicios post-acuerdo disponibles</div>
        <PostAgreementServicesSelector selected={services} onToggle={onToggleService} />
      </div>
    </div>
  );
}
