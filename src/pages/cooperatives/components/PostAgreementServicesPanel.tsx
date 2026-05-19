import { ArrowUpRight } from "lucide-react";
import type { PostAgreementService } from "@/types/cooperatives.types";

const typeLabels: Record<PostAgreementService["type"], string> = {
  delivery: "Delivery",
  digital_sale: "Venta digital",
  distribution_calculation: "Cálculo de reparto",
  tracking: "Seguimiento",
  documents: "Documentos",
};

const statusLabels: Record<PostAgreementService["status"], string> = {
  available: "Disponible",
  active: "Activo",
  pending: "Pendiente",
  completed: "Completado",
};

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 0 }).format(value);

export default function PostAgreementServicesPanel({ services }: { services: PostAgreementService[] }) {
  return (
    <section className="rounded-lg border border-[#c2c9bc] bg-white p-4">
      <h3 className="mb-3 font-['Hanken_Grotesk'] text-lg font-semibold text-[#1a1c18]">Servicios post-acuerdo</h3>
      <div className="space-y-3">
        {services.map((service) => (
          <article key={service.id} className="rounded-lg border border-[#e2e3dc] bg-[#f9faf3] p-3">
            <div className="mb-2 flex items-center justify-between gap-2">
              <span className="rounded-full bg-[#D6D979] px-2.5 py-1 text-xs font-semibold text-[#3E5902]">
                {typeLabels[service.type]}
              </span>
              <span className="text-xs font-semibold text-[#42493f]">{statusLabels[service.status]}</span>
            </div>
            <p className="text-sm font-semibold text-[#1a1c18]">{service.title}</p>
            <p className="mt-1 line-clamp-2 text-xs leading-5 text-[#42493f]">{service.description}</p>
            <div className="mt-3 flex items-end justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-[#1a1c18]">{formatCurrency(service.estimatedCost)}</p>
                <p className="text-xs text-[#42493f]">Proveedor: {service.provider}</p>
              </div>
              <button className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-[#4F7302]">
                Ver
                <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
