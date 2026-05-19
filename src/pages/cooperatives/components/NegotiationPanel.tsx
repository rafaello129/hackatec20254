import type { NegotiationMessage } from "@/types/cooperatives.types";

export default function NegotiationPanel({ messages }: { messages: NegotiationMessage[] }) {
  return (
    <section className="rounded-lg border border-[#c2c9bc] bg-white p-4">
      <h3 className="mb-3 font-['Hanken_Grotesk'] text-lg font-semibold text-[#1a1c18]">Negociación</h3>
      <div className="space-y-3">
        {messages.map((message) => (
          <div key={message.id} className="rounded-lg border border-[#e2e3dc] bg-[#f9faf3] p-3">
            <div className="mb-1 flex items-center justify-between gap-2 text-xs">
              <span className="font-semibold text-[#1a1c18]">{message.author} · {message.companyName}</span>
              <span className="text-[#42493f]">{message.sentAt}</span>
            </div>
            <p className="text-sm text-[#42493f]">{message.message}</p>
          </div>
        ))}
        {messages.length === 0 ? <p className="text-sm text-[#42493f]">Sin mensajes de negociación todavía.</p> : null}
      </div>
    </section>
  );
}
