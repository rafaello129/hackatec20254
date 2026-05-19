import { ArrowRight, BellRing } from "lucide-react";
import type { SettingsAlert } from "@/types/settings.types";

export default function InstantAlertsCard({ alert }: { alert?: SettingsAlert }) {
  return (
    <section className="rounded-lg border border-[#D6D979] bg-[#c5f17a] p-5 text-[#1a1c18]">
      <div className="flex items-center gap-2">
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-white/55 text-[#3E5902]">
          <BellRing className="h-4 w-4" />
        </span>
        <h2 className="font-['Hanken_Grotesk'] text-lg font-semibold">
          {alert?.title ?? "Alertas instantáneas"}
        </h2>
      </div>
      <p className="mt-3 text-sm leading-6 text-[#3E5902]">
        {alert?.description ?? "Configura notificaciones prioritarias para eventos relevantes del sistema."}
      </p>
      <button
        type="button"
        disabled
        className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#2f4b00] opacity-90"
      >
        {alert?.actionLabel ?? "Configurar reglas de correo"}
        <ArrowRight className="h-4 w-4" />
      </button>
    </section>
  );
}
