import { BarChart3, Handshake, Megaphone, PackageSearch, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { AssistantQuickAction } from "@/types/assistant.types";

const icons: Record<string, LucideIcon> = {
  users: Users,
  package: PackageSearch,
  handshake: Handshake,
  chart: BarChart3,
  megaphone: Megaphone,
};

export default function AssistantQuickActions({
  actions,
  onRunAction,
  disabled,
}: {
  actions: AssistantQuickAction[];
  onRunAction: (actionId: string) => void;
  disabled: boolean;
}) {
  return (
    <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
      {actions.map((action) => {
        const Icon = icons[action.iconName] ?? BarChart3;

        return (
          <button
            key={action.id}
            type="button"
            onClick={() => onRunAction(action.id)}
            disabled={disabled}
            className="rounded-lg border border-[#c2c9bc] bg-white p-3 text-left transition hover:bg-[#f3f4ed] disabled:cursor-not-allowed disabled:opacity-60"
          >
            <div className="flex items-center gap-2">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-[#D6D979] text-[#3E5902]">
                <Icon className="h-4 w-4" />
              </span>
              <p className="text-sm font-semibold text-[#1a1c18]">{action.label}</p>
            </div>
            <p className="mt-2 text-xs leading-5 text-[#42493f]">{action.description}</p>
          </button>
        );
      })}
    </div>
  );
}
