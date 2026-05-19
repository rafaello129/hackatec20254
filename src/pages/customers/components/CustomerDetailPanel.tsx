import { Building2, Globe, Mail, MapPin, Phone, Tag } from "lucide-react";
import type { Customer, CustomerInteraction } from "@/types/customer.types";
import CustomerStatusBadge from "./CustomerStatusBadge";

const segmentLabels: Record<Customer["segment"], string> = {
  enterprise: "Enterprise",
  pyme: "PyME",
  microbusiness: "Microbusiness",
  distributor: "Distributor",
  supplier: "Supplier",
  strategic_partner: "Strategic Partner",
};

const interactionChannelLabels: Record<CustomerInteraction["channel"], string> = {
  email: "Email",
  call: "Llamada",
  meeting: "Reunion",
  whatsapp: "WhatsApp",
};

const formatDate = (dateISO: string) =>
  new Date(`${dateISO}T00:00:00`).toLocaleDateString("es-MX", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

interface CustomerDetailPanelProps {
  customer: Customer | null;
  interactions: CustomerInteraction[];
}

export default function CustomerDetailPanel({ customer, interactions }: CustomerDetailPanelProps) {
  if (!customer) {
    return (
      <section className="rounded-lg border border-[#c2c9bc] bg-white p-4">
        <h3 className="font-['Hanken_Grotesk'] text-lg font-semibold text-[#1a1c18]">Detalle de cliente</h3>
        <p className="mt-2 text-sm text-[#42493f]">Selecciona una cuenta para revisar su perfil y sus ultimas interacciones.</p>
      </section>
    );
  }

  return (
    <section className="rounded-lg border border-[#c2c9bc] bg-white p-4">
      <div className="mb-4 flex items-start justify-between gap-2">
        <div>
          <h3 className="font-['Hanken_Grotesk'] text-lg font-semibold text-[#1a1c18]">{customer.companyName}</h3>
          <p className="text-sm text-[#42493f]">{customer.name}</p>
        </div>
        <CustomerStatusBadge status={customer.status} />
      </div>

      <dl className="space-y-2 text-sm">
        <div className="flex items-center gap-2 text-[#42493f]">
          <Building2 className="h-4 w-4 text-[#799833]" />
          <span>{segmentLabels[customer.segment]}</span>
        </div>
        <div className="flex items-center gap-2 text-[#42493f]">
          <Mail className="h-4 w-4 text-[#799833]" />
          <span>{customer.email}</span>
        </div>
        <div className="flex items-center gap-2 text-[#42493f]">
          <Phone className="h-4 w-4 text-[#799833]" />
          <span>{customer.phone}</span>
        </div>
        <div className="flex items-center gap-2 text-[#42493f]">
          <Globe className="h-4 w-4 text-[#799833]" />
          <span>{customer.website}</span>
        </div>
        <div className="flex items-center gap-2 text-[#42493f]">
          <MapPin className="h-4 w-4 text-[#799833]" />
          <span>{customer.location}</span>
        </div>
      </dl>

      <div className="mt-4 rounded-lg border border-[#e2e3dc] bg-[#f9faf3] p-3">
        <p className="mb-1 text-xs font-semibold uppercase tracking-[0.06em] text-[#42493f]">Notas</p>
        <p className="text-sm text-[#1a1c18]">{customer.notes}</p>
      </div>

      <div className="mt-4">
        <p className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.06em] text-[#42493f]">
          <Tag className="h-3.5 w-3.5" />
          Tags
        </p>
        <div className="flex flex-wrap gap-2">
          {customer.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-[#D6D979] px-2.5 py-1 text-xs font-semibold text-[#3E5902]">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.06em] text-[#42493f]">Interacciones recientes</p>
        <ul className="space-y-2">
          {interactions.map((interaction) => (
            <li key={interaction.id} className="rounded-lg border border-[#e2e3dc] bg-[#f9faf3] p-2.5">
              <div className="mb-1 flex items-center justify-between gap-2 text-xs">
                <span className="font-semibold text-[#1a1c18]">{interactionChannelLabels[interaction.channel]}</span>
                <span className="text-[#42493f]">{formatDate(interaction.date)}</span>
              </div>
              <p className="text-sm text-[#1a1c18]">{interaction.summary}</p>
              <p className="mt-1 text-xs text-[#42493f]">Responsable: {interaction.owner}</p>
            </li>
          ))}
          {interactions.length === 0 ? (
            <li className="rounded-lg border border-[#e2e3dc] bg-[#f9faf3] p-3 text-sm text-[#42493f]">
              Sin interacciones recientes.
            </li>
          ) : null}
        </ul>
      </div>
    </section>
  );
}
