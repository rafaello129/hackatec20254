import { useState, type FormEvent } from "react";
import { ReceiptText, X } from "lucide-react";
import type { ExpenseCategory } from "@/types/finance.types";
import type { NewExpenseInput } from "../hooks/useFinance";

const categories: Array<{ value: ExpenseCategory; label: string }> = [
  { value: "products", label: "Productos o mercancía" },
  { value: "materials", label: "Materiales" },
  { value: "transport", label: "Transporte" },
  { value: "services", label: "Servicios" },
  { value: "rent", label: "Renta" },
  { value: "marketing", label: "Publicidad" },
  { value: "other", label: "Otros" },
];

interface AddExpenseModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (input: NewExpenseInput) => void;
}

export default function AddExpenseModal({
  open,
  onClose,
  onSave,
}: AddExpenseModalProps) {
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState<ExpenseCategory>("materials");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("2026-10-06");
  const [error, setError] = useState("");

  if (!open) return null;

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (amount <= 0) {
      setError("Escribe una cantidad mayor a $0.");
      return;
    }

    if (!description.trim()) {
      setError("Agrega una descripción corta del gasto.");
      return;
    }

    onSave({
      amount,
      category,
      description: description.trim(),
      date,
    });

    setAmount(0);
    setCategory("materials");
    setDescription("");
    setDate("2026-10-06");
    setError("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-[#0A1A0C]/28 px-4 backdrop-blur-[2px]">
      <button
        type="button"
        className="absolute inset-0 cursor-default"
        aria-label="Cerrar formulario"
        onClick={onClose}
      />

      <form
        onSubmit={submit}
        role="dialog"
        aria-modal="true"
        aria-label="Registrar gasto"
        className="relative z-10 w-full max-w-[500px] rounded-[26px] border border-[#E0E5DD] bg-[#FFFDFB] p-6 shadow-[0_24px_70px_rgba(2,38,1,0.22)] sm:p-7"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="grid h-10 w-10 place-items-center rounded-[14px] bg-[var(--peek-warning-soft)] text-[#9A6A04]">
              <ReceiptText className="h-5 w-5" />
            </span>
            <h2 className="mt-3 text-xl font-semibold text-[#172019]">
              Registrar gasto
            </h2>
            <p className="mt-1 text-[11px] leading-5 text-[#7A867E]">
              Registra solo lo necesario para entender en qué se va el dinero.
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
              ¿Cuánto pagaste? *
            </span>
            <div className="relative mt-1.5">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[16px] font-semibold text-[#6F7A72]">
                $
              </span>
              <input
                type="number"
                min="0"
                value={amount || ""}
                onChange={(event) => {
                  setAmount(Number(event.target.value));
                  if (error) setError("");
                }}
                autoFocus
                placeholder="850"
                className="h-12 w-full rounded-[14px] border border-[#DDE3DA] bg-white pl-8 pr-3.5 text-[16px] font-semibold text-[#263129] outline-none transition placeholder:text-[#B3BBB5] focus:border-[#C6A03A] focus:ring-2 focus:ring-[var(--peek-warning)]/15"
              />
            </div>
          </label>

          <label>
            <span className="text-[11px] font-semibold text-[#344039]">
              ¿En qué?
            </span>
            <select
              value={category}
              onChange={(event) =>
                setCategory(event.target.value as ExpenseCategory)
              }
              className="mt-1.5 h-11 w-full rounded-[14px] border border-[#DDE3DA] bg-white px-3.5 text-[12px] text-[#263129] outline-none transition focus:border-[#C6A03A]"
            >
              {categories.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <label>
            <span className="text-[11px] font-semibold text-[#344039]">
              Fecha
            </span>
            <input
              type="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
              className="mt-1.5 h-11 w-full rounded-[14px] border border-[#DDE3DA] bg-white px-3.5 text-[12px] text-[#263129] outline-none transition focus:border-[#C6A03A]"
            />
          </label>

          <label className="sm:col-span-2">
            <span className="text-[11px] font-semibold text-[#344039]">
              Descripción *
            </span>
            <input
              value={description}
              onChange={(event) => {
                setDescription(event.target.value);
                if (error) setError("");
              }}
              placeholder="Ej. Compra de telas bordadas"
              className="mt-1.5 h-11 w-full rounded-[14px] border border-[#DDE3DA] bg-white px-3.5 text-[12px] text-[#263129] outline-none transition placeholder:text-[#A0A9A2] focus:border-[#C6A03A]"
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
            className="h-10 rounded-[13px] bg-[var(--oe-primary)] px-4 text-[11px] font-semibold text-white transition hover:bg-[var(--oe-primary-hover)]"
          >
            Guardar gasto
          </button>
        </div>
      </form>
    </div>
  );
}
