import { Send } from "lucide-react";
import type { FormEvent, KeyboardEvent } from "react";

interface AssistantComposerProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  isLoading: boolean;
}

export default function AssistantComposer({ value, onChange, onSend, isLoading }: AssistantComposerProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSend();
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      onSend();
    }
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-lg border border-[#c2c9bc] bg-white p-3">
      <div className="flex gap-3">
        <textarea
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={handleKeyDown}
          rows={2}
          disabled={isLoading}
          placeholder="Pregunta sobre clientes, inventario, cooperativos o finanzas..."
          className="min-h-12 flex-1 resize-none bg-transparent text-sm text-[#1a1c18] outline-none placeholder:text-[#73796e] disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={!value.trim() || isLoading}
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#4F7302] text-white transition hover:bg-[#3E5902] disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Enviar mensaje"
        >
          <Send className="h-4 w-4" />
        </button>
      </div>
    </form>
  );
}
