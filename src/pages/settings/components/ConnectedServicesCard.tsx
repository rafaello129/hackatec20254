import {
  Cloud,
  CreditCard,
  Mail,
  MessageSquare,
  type LucideIcon,
} from "lucide-react";
import type { ConnectedService, SettingsIconName } from "@/types/settings.types";

const iconMap: Partial<Record<SettingsIconName, LucideIcon>> = {
  cloud: Cloud,
  "credit-card": CreditCard,
  mail: Mail,
  "message-square": MessageSquare,
};

interface ConnectedServicesCardProps {
  services: ConnectedService[];
  onToggle: (serviceId: string) => void;
}

export default function ConnectedServicesCard({ services, onToggle }: ConnectedServicesCardProps) {
  return (
    <section className="rounded-lg border border-[#c2c9bc] bg-white p-5">
      <h2 className="font-['Hanken_Grotesk'] text-lg font-semibold text-[#1a1c18]">Servicios conectados</h2>

      <div className="mt-4 space-y-3">
        {services.slice(0, 4).map((service) => {
          const Icon = iconMap[service.iconName] ?? Cloud;
          return (
            <article key={service.id} className="flex min-w-0 items-center gap-3">
              <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#eef3d3] text-[#4F7302]">
                <Icon className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-[#1a1c18]">{service.name}</p>
                <p className="truncate text-xs text-[#42493f]">{service.description}</p>
              </div>
              <button
                type="button"
                onClick={() => onToggle(service.id)}
                aria-pressed={service.connected}
                aria-label={`${service.connected ? "Desconectar" : "Conectar"} ${service.name}`}
                className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
                  service.connected ? "bg-[#4F7302]" : "bg-[#d9ddd4]"
                }`}
              >
                <span
                  className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-transform ${
                    service.connected ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </article>
          );
        })}
      </div>
    </section>
  );
}
