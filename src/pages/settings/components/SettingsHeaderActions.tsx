import { Check, RotateCcw } from "lucide-react";

interface SettingsHeaderActionsProps {
  hasChanges: boolean;
  isSaving: boolean;
  onCancel: () => void;
  onSave: () => void;
}

export default function SettingsHeaderActions({
  hasChanges,
  isSaving,
  onCancel,
  onSave,
}: SettingsHeaderActionsProps) {
  return (
    <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
      <button
        type="button"
        onClick={onCancel}
        disabled={!hasChanges || isSaving}
        className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-[#c2c9bc] bg-white px-4 text-sm font-semibold text-[#42493f] transition hover:bg-[#f3f4ed] disabled:cursor-not-allowed disabled:opacity-55"
      >
        <RotateCcw className="h-4 w-4" />
        Cancelar
      </button>
      <button
        type="button"
        onClick={onSave}
        disabled={isSaving}
        className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#4F7302] px-4 text-sm font-semibold text-white transition hover:bg-[#3E5902] disabled:cursor-wait disabled:opacity-70"
      >
        <Check className="h-4 w-4" />
        {isSaving ? "Guardando..." : "Guardar cambios"}
      </button>
    </div>
  );
}
