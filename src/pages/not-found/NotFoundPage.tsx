import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f9faf3] px-6">
      <div className="w-full max-w-xl rounded-xl border border-[#c2c9bc] bg-white p-8 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.1em] text-[#42493f]">404</p>
        <h1 className="mt-2 font-['Hanken_Grotesk'] text-3xl font-bold text-[#1a1c18]">Página no encontrada</h1>
        <p className="mt-2 text-sm text-[#42493f]">
          La ruta que buscas no existe en el nuevo flujo CRM + Cooperativos.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex rounded-lg bg-[#4F7302] px-4 py-2 text-sm font-semibold text-white hover:bg-[#3E5902]"
        >
          Volver al Home
        </Link>
      </div>
    </div>
  );
}
