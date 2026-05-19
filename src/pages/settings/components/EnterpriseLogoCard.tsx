import { ImagePlus, Leaf } from "lucide-react";
import type { BusinessProfile } from "@/types/settings.types";

export default function EnterpriseLogoCard({ profile }: { profile: BusinessProfile }) {
  const initials = profile.companyName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  return (
    <section className="rounded-lg border border-[#c2c9bc] bg-white p-5">
      <div className="flex h-full min-h-[248px] flex-col items-center justify-center text-center">
        <div className="relative flex h-28 w-28 items-center justify-center rounded-full border-4 border-[#D6D979] bg-[#022601] text-white shadow-sm">
          {profile.logoUrl ? (
            <span className="block h-16 w-16 overflow-hidden">
              <img src={profile.logoUrl} alt={profile.logoAlt} className="h-full w-auto max-w-none" />
            </span>
          ) : (
            <div className="flex flex-col items-center gap-1">
              <Leaf className="h-8 w-8 text-[#D6D979]" />
              <span className="font-['Hanken_Grotesk'] text-xl font-bold">{initials || "BF"}</span>
            </div>
          )}
        </div>
        <h2 className="mt-5 font-['Hanken_Grotesk'] text-lg font-semibold text-[#1a1c18]">Logo empresarial</h2>
        <p className="mt-2 max-w-[240px] text-sm leading-5 text-[#42493f]">
          Usa una imagen clara para identificar documentos, reportes y acuerdos.
        </p>
        <button
          type="button"
          disabled
          className="mt-5 inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-[#4F7302] opacity-80"
        >
          <ImagePlus className="h-4 w-4" />
          Cambiar imagen
        </button>
      </div>
    </section>
  );
}
