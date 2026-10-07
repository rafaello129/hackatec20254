import { useId, useState, type ChangeEvent } from "react";
import { ImagePlus, Link2, Trash2, Upload } from "lucide-react";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];

export default function ImageSourcePicker({
  value,
  onChange,
  title = "Agregar imagen",
  description = "Elige una imagen de tu equipo o pega una URL.",
  compact = false,
}: {
  value: string;
  onChange: (value: string) => void;
  title?: string;
  description?: string;
  compact?: boolean;
}) {
  const inputId = useId();
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState("");

  const selectFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file) return;

    if (!ACCEPTED_TYPES.includes(file.type)) {
      setError("Usa una imagen JPG, PNG o WEBP.");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setError("La imagen debe pesar menos de 5 MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result !== "string") return;
      onChange(reader.result);
      setFileName(file.name);
      setError("");
    };
    reader.onerror = () => {
      setError("No pudimos leer la imagen. Intenta con otro archivo.");
    };
    reader.readAsDataURL(file);
  };

  const clear = () => {
    onChange("");
    setFileName("");
    setError("");
  };

  return (
    <div className="mt-1.5 rounded-[16px] border border-[#DDE3DA] bg-[#FAFBF8] p-3">
      <div className="flex items-center gap-3">
        {value ? (
          <img
            src={value}
            alt=""
            className={[
              "shrink-0 rounded-[12px] border border-[#E1E6DE] object-cover",
              compact ? "h-10 w-10" : "h-14 w-14",
            ].join(" ")}
          />
        ) : (
          <span
            className={[
              "grid shrink-0 place-items-center rounded-[12px] bg-[#EEF4E9] text-[#5A7B12]",
              compact ? "h-10 w-10" : "h-14 w-14",
            ].join(" ")}
          >
            <ImagePlus className="h-5 w-5" />
          </span>
        )}

        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-semibold text-[#344039]">{title}</p>
          <p className="mt-0.5 text-[9px] leading-4 text-[#87918A]">
            {fileName ? fileName : description}
          </p>
        </div>

        {value ? (
          <button
            type="button"
            onClick={clear}
            aria-label="Quitar imagen"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-[#7A867E] transition hover:bg-[#F1F3EE] hover:text-[#A84E3E] motion-reduce:transition-none"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        ) : null}
      </div>

      <div className="mt-3 flex flex-col gap-2 sm:flex-row">
        <input
          id={inputId}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={selectFile}
          className="sr-only"
        />
        <label
          htmlFor={inputId}
          className="inline-flex h-10 cursor-pointer items-center justify-center gap-2 rounded-[12px] bg-[#EEF4E9] px-4 text-[10px] font-semibold text-[#315C34] transition hover:bg-[#E5EFE0] motion-reduce:transition-none"
        >
          <Upload className="h-3.5 w-3.5" />
          Elegir archivo
        </label>

        <div className="relative min-w-0 flex-1">
          <Link2 className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#87918A]" />
          <input
            value={value.startsWith("data:") ? "" : value}
            onChange={(event) => {
              onChange(event.target.value);
              setFileName("");
              setError("");
            }}
            placeholder="O pega una URL"
            aria-label="URL de imagen"
            className="h-10 w-full rounded-[12px] border border-[#E1E6DE] bg-white pl-9 pr-3 text-[10px] text-[#263129] outline-none placeholder:text-[#A0A9A2] focus:border-[#7DA44B]"
          />
        </div>
      </div>

      {error ? (
        <p className="mt-2 text-[9px] font-medium text-[#A84E3E]">{error}</p>
      ) : null}
    </div>
  );
}
