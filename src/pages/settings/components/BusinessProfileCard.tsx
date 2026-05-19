import { Building2 } from "lucide-react";
import type { BusinessIndustry, BusinessProfile } from "@/types/settings.types";

const industryOptions: Array<{ value: BusinessIndustry; label: string }> = [
  { value: "sustainable_technology", label: "Sustainable Technology" },
  { value: "retail", label: "Retail" },
  { value: "fashion", label: "Fashion" },
  { value: "logistics", label: "Logistics" },
  { value: "b2b_commerce", label: "B2B Commerce" },
];

interface BusinessProfileCardProps {
  profile: BusinessProfile;
  onChange: <K extends keyof BusinessProfile>(field: K, value: BusinessProfile[K]) => void;
}

export default function BusinessProfileCard({ profile, onChange }: BusinessProfileCardProps) {
  return (
    <section className="rounded-lg border border-[#c2c9bc] bg-white p-5">
      <div className="mb-5 flex items-center gap-2">
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[#eef3d3] text-[#4F7302]">
          <Building2 className="h-4 w-4" />
        </span>
        <h2 className="font-['Hanken_Grotesk'] text-lg font-semibold text-[#1a1c18]">Perfil empresarial</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="min-w-0">
          <span className="text-xs font-semibold uppercase tracking-[0.06em] text-[#42493f]">Company Name</span>
          <input
            value={profile.companyName}
            onChange={(event) => onChange("companyName", event.target.value)}
            className="mt-1 h-11 w-full rounded-lg border border-[#c2c9bc] bg-white px-3 text-sm text-[#1a1c18] outline-none transition focus:border-[#4F7302] focus:ring-2 focus:ring-[#4F7302]/15"
          />
        </label>

        <label className="min-w-0">
          <span className="text-xs font-semibold uppercase tracking-[0.06em] text-[#42493f]">Industry</span>
          <select
            value={profile.industry}
            onChange={(event) => onChange("industry", event.target.value as BusinessIndustry)}
            className="mt-1 h-11 w-full rounded-lg border border-[#c2c9bc] bg-white px-3 text-sm text-[#1a1c18] outline-none transition focus:border-[#4F7302] focus:ring-2 focus:ring-[#4F7302]/15"
          >
            {industryOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="mt-4 block min-w-0">
        <span className="text-xs font-semibold uppercase tracking-[0.06em] text-[#42493f]">Company Website</span>
        <div className="mt-1 flex min-w-0 overflow-hidden rounded-lg border border-[#c2c9bc] bg-white focus-within:border-[#4F7302] focus-within:ring-2 focus-within:ring-[#4F7302]/15">
          <span className="inline-flex shrink-0 items-center border-r border-[#e2e3dc] bg-[#f3f4ed] px-3 text-sm text-[#42493f]">
            https://
          </span>
          <input
            value={profile.website}
            onChange={(event) => onChange("website", event.target.value)}
            className="h-11 min-w-0 flex-1 px-3 text-sm text-[#1a1c18] outline-none"
          />
        </div>
      </label>

      <label className="mt-4 block min-w-0">
        <span className="text-xs font-semibold uppercase tracking-[0.06em] text-[#42493f]">Description</span>
        <textarea
          value={profile.description}
          onChange={(event) => onChange("description", event.target.value)}
          rows={4}
          className="mt-1 w-full resize-none rounded-lg border border-[#c2c9bc] bg-white px-3 py-3 text-sm leading-6 text-[#1a1c18] outline-none transition focus:border-[#4F7302] focus:ring-2 focus:ring-[#4F7302]/15"
        />
      </label>
    </section>
  );
}
