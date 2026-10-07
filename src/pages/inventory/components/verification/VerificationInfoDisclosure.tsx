import { Info } from "lucide-react";

export default function VerificationInfoDisclosure() {
  return (
    <details className="group rounded-[20px] border border-[#DDE4D9] bg-[#F8FAF6] p-4">
      <summary className="flex cursor-pointer list-none items-center gap-2 text-[11px] font-semibold text-[#536057]">
        <Info className="h-4 w-4 text-[#5A7B12]" />
        ¿Qué significa esta verificación?
      </summary>
      <p className="mt-3 max-w-3xl text-[10px] leading-5 text-[#718078]">
        MÁAK revisa la identidad, el origen y la evidencia asociada al producto.
        Esta validación pertenece a la plataforma y no sustituye sellos,
        denominaciones de origen ni certificaciones gubernamentales o
        regulatorias.
      </p>
    </details>
  );
}
