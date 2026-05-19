import type { ReactNode } from "react";

interface SectionCardProps {
  title: string;
  children: ReactNode;
  actions?: ReactNode;
}

export default function SectionCard({ title, children, actions }: SectionCardProps) {
  return (
    <section className="rounded-lg border border-[#c2c9bc] bg-white">
      <header className="flex items-center justify-between border-b border-[#e2e3dc] px-4 py-3">
        <h2 className="font-['Hanken_Grotesk'] text-lg font-semibold text-[#1a1c18]">{title}</h2>
        {actions}
      </header>
      <div className="p-4">{children}</div>
    </section>
  );
}
