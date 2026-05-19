import { AlertTriangle, Check, Factory, Lightbulb, PackageCheck, Store, Truck } from "lucide-react";
import type { ProductionChainStep } from "@/types/businessNetwork.types";

const stepIconMap: Record<string, typeof Check> = {
  Idea: Lightbulb,
  Proveedor: PackageCheck,
  Manufactura: Factory,
  Empaque: PackageCheck,
  Distribucion: Truck,
  Venta: Store,
};

const statusLabel: Record<ProductionChainStep["status"], string> = {
  completed: "Completado",
  optimized: "Optimizado",
  unresolved: "Pendiente",
  pending: "Por cerrar",
};

export default function ProductionChainVisualization({ steps }: { steps: ProductionChainStep[] }) {
  return (
    <section className="overflow-hidden rounded-xl border border-[#c2c9bc] bg-white p-5">
      <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div>
          <h2 className="font-['Hanken_Grotesk'] text-2xl font-semibold text-[#1a1c18]">
            Visualizacion de cadena de produccion
          </h2>
          <p className="mt-1 text-sm text-[#42493f]">Mapa operativo de aliados necesarios para completar la red.</p>
        </div>
        <span className="inline-flex w-fit rounded-full bg-[#bdf26a] px-5 py-2 text-sm font-bold uppercase tracking-[0.04em] text-[#3E5902]">
          Optimizacion en vivo
        </span>
      </div>

      <div className="max-w-full overflow-x-auto pb-2">
        <div className="relative min-w-[920px] px-4 pb-5 pt-16">
          <div className="absolute left-4 right-4 top-[102px] border-t-2 border-dashed border-[#4F7302]/80" />

          <div className="relative grid grid-cols-6 gap-5">
            {steps.map((step) => {
              const isUnresolved = step.status === "unresolved";
              const isOptimized = step.status === "optimized";
              const isCompleted = step.status === "completed";
              const Icon = isUnresolved ? AlertTriangle : stepIconMap[step.label] ?? Check;

              return (
                <article key={step.id} className="relative flex min-h-[174px] flex-col items-center text-center">
                  <div
                    className={`relative z-10 flex h-20 w-20 items-center justify-center rounded-full border-[7px] shadow-sm ${
                      isUnresolved
                        ? "border-[#fff3ee] bg-[#ffdad6] text-[#ba1a1a]"
                        : isOptimized
                          ? "border-[#f0f2e8] bg-[#e8e9e2] text-[#4F7302]"
                          : "border-[#edf3e6] bg-[#022601] text-white"
                    }`}
                  >
                    <Icon className="h-8 w-8" />
                  </div>

                  <div className="mt-5 max-w-[150px]">
                    <p
                      className={`text-sm font-bold uppercase tracking-[0.04em] ${
                        isUnresolved ? "text-[#ba1a1a]" : "text-[#4F7302]"
                      }`}
                    >
                      {step.label}
                    </p>
                    <p className="mt-1 line-clamp-2 font-['Hanken_Grotesk'] text-xl font-semibold leading-6 text-[#1a1c18]">
                      {step.partnerName}
                    </p>
                    <p
                      className={`mt-2 inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                        isUnresolved
                          ? "bg-[#ffdad6] text-[#93000a]"
                          : isCompleted
                            ? "bg-[#D6D979] text-[#3E5902]"
                            : "bg-[#e8e9e2] text-[#42493f]"
                      }`}
                    >
                      {statusLabel[step.status]}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
