import React from "react";

interface Props { steps: string[]; activeIndex: number }

export default function CreateCooperativeStepper({ steps, activeIndex }: Props) {
  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="relative py-6">
        <div className="absolute inset-0 flex items-center" aria-hidden>
          <div className="w-full h-px bg-[#e8e9e2]" />
        </div>

        <ol className="relative flex items-center justify-between space-x-4">
          {steps.map((label, i) => {
            const active = i === activeIndex;
            const completed = i < activeIndex;
            return (
              <li key={label} className="flex-1 flex flex-col items-center text-center">
                <div className="flex items-center w-full">
                  <div className="mx-auto relative">
                    <div className={`flex items-center justify-center rounded-full ${active ? 'bg-[#4F7302] text-white' : completed ? 'bg-[#a7d298] text-white' : 'bg-[#f3f4ed] text-[#42493f]'} h-12 w-12 text-sm font-semibold`}>
                      {i + 1}
                    </div>
                    {/* connector colored for completed steps */}
                    {i < steps.length - 1 && (
                      <div className={`absolute left-1/2 transform translate-x-6 top-1/2 w-[240px] h-px ${completed ? 'bg-[#4F7302]' : 'bg-[#e8e9e2]'}`} />
                    )}
                  </div>
                </div>

                <div className="mt-3 text-xs text-[#42493f]">
                  <div className="uppercase text-[10px] tracking-[0.12em]">PASO {i + 1}</div>
                  <div className="mt-1 font-['Hanken_Grotesk'] text-sm font-semibold text-[#1a1c18]">{label}</div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
