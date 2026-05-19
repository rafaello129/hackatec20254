import { FilePlus2, Save, Send } from "lucide-react";
import type { NetworkQuickAction } from "@/types/businessNetwork.types";

const icons = [FilePlus2, Send, Save];

export default function NetworkQuickActions({ actions }: { actions: NetworkQuickAction[] }) {
  return (
    <section className="rounded-lg border border-[#c2c9bc] bg-white p-4">
      <h2 className="font-['Hanken_Grotesk'] text-lg font-semibold text-[#1a1c18]">Acciones rapidas</h2>
      <div className="mt-3 space-y-2">
        {actions.map((action, index) => {
          const Icon = icons[index] ?? FilePlus2;
          return (
            <button key={action.id} className="flex w-full items-start gap-3 rounded-lg border border-[#e2e3dc] bg-[#f9faf3] p-3 text-left hover:border-[#799833]">
              <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-white text-[#4F7302]"><Icon className="h-4 w-4" /></span>
              <span className="min-w-0"><span className="block text-sm font-semibold text-[#1a1c18]">{action.title}</span><span className="line-clamp-1 text-xs text-[#42493f]">{action.description}</span></span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
