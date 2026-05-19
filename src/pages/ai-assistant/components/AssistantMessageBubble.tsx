import { Bot, ShieldCheck, User } from "lucide-react";
import type { AssistantMessage } from "@/types/assistant.types";

const moduleLabels: Record<AssistantMessage["relatedModule"], string> = {
  customers: "Clientes",
  inventory: "Inventario",
  cooperatives: "Cooperativos",
  finance: "Finanzas",
  general: "General",
};

export default function AssistantMessageBubble({ message }: { message: AssistantMessage }) {
  const isUser = message.role === "user";
  const isSystem = message.role === "system";
  const Icon = isUser ? User : isSystem ? ShieldCheck : Bot;

  return (
    <div className={`flex gap-2.5 ${isUser ? "justify-end" : "justify-start"}`}>
      {!isUser ? (
        <span className="mt-1 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#022601] text-white">
          <Icon className="h-4 w-4" />
        </span>
      ) : null}
      <article
        className={`max-w-[86%] rounded-lg border px-3.5 py-3 shadow-[0_1px_0_rgba(26,28,24,0.04)] ${
          isUser
            ? "border-[#D6D979] bg-[#eef3d3] text-[#1a1c18]"
            : isSystem
              ? "border-[#e2e3dc] bg-[#f3f4ed] text-[#42493f]"
              : "border-[#c2c9bc] bg-white text-[#1a1c18]"
        }`}
      >
        <div className="mb-1.5 flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#42493f]">
            {isUser ? "Tu consulta" : isSystem ? "Sistema" : "Asistente"}
          </span>
          <span className="rounded-full bg-white px-2 py-0.5 text-[11px] font-semibold text-[#3E5902]">
            {moduleLabels[message.relatedModule]}
          </span>
        </div>
        <p className="whitespace-pre-line text-sm leading-6">{message.content}</p>
      </article>
    </div>
  );
}
