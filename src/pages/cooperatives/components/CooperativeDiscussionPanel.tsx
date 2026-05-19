import { Send } from "lucide-react";
import type { NegotiationMessage } from "@/types/cooperatives.types";

const shortTime = (value: string) => value.split(" ").at(-1) ?? value;

export default function CooperativeDiscussionPanel({ messages }: { messages: NegotiationMessage[] }) {
  const visibleMessages = messages.slice(0, 3);

  return (
    <section className="overflow-hidden rounded-lg border border-[#c2c9bc] bg-white">
      <header className="flex items-center justify-between border-b border-[#e2e3dc] px-5 py-4">
        <h2 className="font-['Hanken_Grotesk'] text-lg font-semibold text-[#1a1c18]">Discusión y Q&A</h2>
        <span className="text-xs font-semibold text-[#42493f]">{Math.max(messages.length, 1)} mensajes nuevos</span>
      </header>

      <div className="space-y-4 p-5">
        {visibleMessages.length ? (
          visibleMessages.map((message, index) => (
            <div key={message.id} className={`flex gap-3 ${index % 2 ? "justify-end" : ""}`}>
              {index % 2 === 0 ? <div className="h-9 w-9 shrink-0 rounded-full bg-[#e2e3dc]" /> : null}
              <article
                className={`max-w-[82%] rounded-lg px-4 py-3 ${
                  index % 2
                    ? "bg-[#022601] text-white"
                    : "bg-[#f3f4ed] text-[#1a1c18]"
                }`}
              >
                <div className="mb-1 flex items-center justify-between gap-4 text-xs">
                  <strong>{index % 2 ? "Tu equipo" : message.companyName}</strong>
                  <span className={index % 2 ? "text-white/70" : "text-[#73796e]"}>{shortTime(message.sentAt)}</span>
                </div>
                <p className={`text-sm leading-6 ${index % 2 ? "text-white" : "text-[#42493f]"}`}>{message.message}</p>
              </article>
              {index % 2 ? <div className="h-9 w-9 shrink-0 rounded-full bg-[#D6D979]" /> : null}
            </div>
          ))
        ) : (
          <div className="rounded-lg bg-[#f3f4ed] px-4 py-3 text-sm text-[#42493f]">
            Aún no hay preguntas registradas. Usa este espacio para aclarar entregas, aportaciones o condiciones del acuerdo.
          </div>
        )}
      </div>

      <footer className="flex gap-3 border-t border-[#e2e3dc] p-4">
        <input
          type="text"
          placeholder="Escribe tu pregunta..."
          className="min-w-0 flex-1 rounded-lg border border-[#e2e3dc] bg-[#f9faf3] px-4 py-3 text-sm outline-none transition focus:border-[#4F7302]"
        />
        <button className="inline-flex items-center gap-2 rounded-lg bg-[#022601] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#3E5902]">
          Enviar
          <Send className="h-4 w-4" />
        </button>
      </footer>
    </section>
  );
}
