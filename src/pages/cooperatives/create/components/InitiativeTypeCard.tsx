import React from "react";
import type { ReactElement } from "react";

interface Props {
  id: string;
  title: string;
  description: string;
  icon: ReactElement;
  selected?: boolean;
  onClick?: () => void;
}

export default function InitiativeTypeCard({ id, title, description, icon, selected, onClick }: Props) {
  return (
    <button
      id={id}
      onClick={onClick}
      aria-pressed={selected}
      className={`flex w-full flex-col items-start justify-start rounded-xl border bg-white p-6 text-left transition focus-visible:outline-none ${selected ? 'border-2 border-[#4F7302] bg-[#f6f9f0] shadow-[0_8px_20px_rgba(79,115,2,0.14)]' : 'border-[#e8e9e2] hover:border-[#cfd9bf] hover:shadow-sm'}`}
      style={{ minHeight: 250 }}
    >
      <div className="w-full flex items-center justify-center">
        <div className={`inline-flex items-center justify-center rounded-xl ${selected ? 'bg-[#4F7302] text-white' : 'bg-[#D6D979] text-[#3E5902]'} h-16 w-16`}>{icon}</div>
      </div>

      <div className="mt-5 w-full">
        <div className="text-lg font-semibold text-[#1a1c18]">{title}</div>
        <div className="mt-2 text-sm text-[#42493f] leading-6">{description}</div>
      </div>
    </button>
  );
}
