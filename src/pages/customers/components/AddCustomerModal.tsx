import { useState, type FormEvent } from "react";
import { X } from "lucide-react";
import type { NewCustomerInput } from "../hooks/useCustomers";

interface AddCustomerModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (input: NewCustomerInput) => void;
}

const emptyForm: NewCustomerInput = {
  name: "",
  phone: "",
  email: "",
  companyName: "",
  notes: "",
};

export default function AddCustomerModal({
  open,
  onClose,
  onSave,
}: AddCustomerModalProps) {
  const [form, setForm] = useState<NewCustomerInput>(emptyForm);
  const [error, setError] = useState("");

  if (!open) return null;

  const updateField = (field: keyof NewCustomerInput, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    if (error) setError("");
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form.name.trim() || !form.phone.trim()) {
      setError("Nombre y teléfono son necesarios para guardar el cliente.");
      return;
    }

    onSave(form);
    setForm(emptyForm);
    setError("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-[#0A1A0C]/25 px-4 backdrop-blur-[2px]">
      <button
        type="button"
        aria-label="Cerrar formulario"
        onClick={onClose}
        className="absolute inset-0 cursor-default"
      />

      <form
        onSubmit={submit}
        className="relative z-10 w-full max-w-[520px] rounded-[26px] border border-[#E0E5DD] bg-[#FFFDFB] p-6 shadow-[0_24px_70px_rgba(2,38,1,0.22)] sm:p-7"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[#7D887F]">
              Nuevo cliente
            </p>
            <h2 className="mt-1 text-xl font-semibold text-[#172019]">
              Agregar cliente
            </h2>
            <p className="mt-1 text-[11px] leading-5 text-[#7A867E]">
              Solo pide lo necesario. Puedes completar más información después.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[#E0E5DD] bg-white text-[#657068] transition hover:bg-[#F5F7F2]"
            aria-label="Cerrar"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <label className="sm:col-span-2">
            <span className="text-[11px] font-semibold text-[#344039]">
              Nombre *
            </span>
            <input
              value={form.name}
              onChange={(event) => updateField("name", event.target.value)}
              placeholder="Ej. Ana López"
              autoFocus
              className="mt-1.5 h-11 w-full rounded-[14px] border border-[#DDE3DA] bg-white px-3.5 text-[12px] text-[#263129] outline-none transition placeholder:text-[#A0A9A2] focus:border-[#7DA44B] focus:ring-2 focus:ring-[#9AC84B]/20"
            />
          </label>

          <label>
            <span className="text-[11px] font-semibold text-[#344039]">
              Teléfono *
            </span>
            <input
              value={form.phone}
              onChange={(event) => updateField("phone", event.target.value)}
              placeholder="999 000 0000"
              className="mt-1.5 h-11 w-full rounded-[14px] border border-[#DDE3DA] bg-white px-3.5 text-[12px] text-[#263129] outline-none transition placeholder:text-[#A0A9A2] focus:border-[#7DA44B] focus:ring-2 focus:ring-[#9AC84B]/20"
            />
          </label>

          <label>
            <span className="text-[11px] font-semibold text-[#344039]">
              Correo
            </span>
            <input
              type="email"
              value={form.email}
              onChange={(event) => updateField("email", event.target.value)}
              placeholder="correo@ejemplo.com"
              className="mt-1.5 h-11 w-full rounded-[14px] border border-[#DDE3DA] bg-white px-3.5 text-[12px] text-[#263129] outline-none transition placeholder:text-[#A0A9A2] focus:border-[#7DA44B] focus:ring-2 focus:ring-[#9AC84B]/20"
            />
          </label>

          <label className="sm:col-span-2">
            <span className="text-[11px] font-semibold text-[#344039]">
              Negocio
            </span>
            <input
              value={form.companyName}
              onChange={(event) =>
                updateField("companyName", event.target.value)
              }
              placeholder="Opcional"
              className="mt-1.5 h-11 w-full rounded-[14px] border border-[#DDE3DA] bg-white px-3.5 text-[12px] text-[#263129] outline-none transition placeholder:text-[#A0A9A2] focus:border-[#7DA44B] focus:ring-2 focus:ring-[#9AC84B]/20"
            />
          </label>

          <label className="sm:col-span-2">
            <span className="text-[11px] font-semibold text-[#344039]">
              Notas
            </span>
            <textarea
              value={form.notes}
              onChange={(event) => updateField("notes", event.target.value)}
              placeholder="Ej. Prefiere textiles azules o suele comprar para regalos."
              rows={3}
              className="mt-1.5 w-full resize-none rounded-[14px] border border-[#DDE3DA] bg-white px-3.5 py-3 text-[12px] leading-5 text-[#263129] outline-none transition placeholder:text-[#A0A9A2] focus:border-[#7DA44B] focus:ring-2 focus:ring-[#9AC84B]/20"
            />
          </label>
        </div>

        {error ? (
          <p className="mt-4 rounded-[12px] bg-[#FFF1EE] px-3 py-2.5 text-[11px] text-[#A84E3E]">
            {error}
          </p>
        ) : null}

        <div className="mt-6 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="h-10 rounded-[13px] border border-[#DDE3DA] bg-white px-4 text-[11px] font-semibold text-[#536057] transition hover:bg-[#F6F8F4]"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="h-10 rounded-[13px] bg-[#135C2F] px-4 text-[11px] font-semibold text-white transition hover:bg-[#0E4D27]"
          >
            Guardar cliente
          </button>
        </div>
      </form>
    </div>
  );
}
