import { ArrowUpRight } from "lucide-react";
import type { PostAgreementService } from "@/types/cooperatives.types";

const typeLabels: Record<PostAgreementService["type"], string> = {
  delivery: "Delivery",
  digital_sale: "Venta digital",
  distribution_calculation: "Cálculo de reparto",
  tracking: "Seguimiento",
  documents: "Documentos",
};

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 0 }).format(value);

export default function PostAgreementServicesPanel({ services }: { services: PostAgreementService[] }) {
  return (
    <section className="rounded-lg border border-[#c2c9bc] bg-white p-4">
      <h3 className="mb-3 font-['Hanken_Grotesk'] text-lg font-semibold text-[#1a1c18]">Servicios post-acuerdo</h3>
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {services.map((service) => (
          <article key={service.id} className="rounded-lg border border-[#e2e3dc] bg-[#f9faf3] p-3">
            <div className="mb-2 flex items-center justify-between gap-2">
              <span className="rounded-full bg-[#D6D979] px-2.5 py-1 text-xs font-semibold text-[#3E5902]">
                {typeLabels[service.type]}
              </span>
              <span className="text-xs font-semibold text-[#42493f]">{service.status}</span>
            </div>
            <p className="text-sm font-semibold text-[#1a1c18]">{service.title}</p>
            <p className="mt-1 text-sm text-[#42493f]">{service.description}</p>
            <p className="mt-2 text-sm font-semibold text-[#1a1c18]">{formatCurrency(service.estimatedCost)}</p>
            <p className="text-xs text-[#42493f]">Proveedor: {service.provider}</p>
            <button className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-[#4F7302]">
              Ver servicio
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
