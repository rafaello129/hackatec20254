import type { ReactNode } from "react";

interface PageIntroProps {
  title: string;
  description: string;
  actions?: ReactNode;
}

export default function PageIntro({ title, description, actions }: PageIntroProps) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
      <div>
        <h1 className="font-['Hanken_Grotesk'] text-3xl font-bold text-[#1a1c18]">{title}</h1>
        <p className="mt-1 max-w-2xl text-sm text-[#42493f]">{description}</p>
      </div>
      {actions ? <div className="flex items-center gap-2">{actions}</div> : null}
    </div>
  );
}
