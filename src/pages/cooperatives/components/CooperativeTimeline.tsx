type TimelineItem = {
  key: string;
  label: string;
  state: "done" | "current" | "pending";
};

export default function CooperativeTimeline({ items }: { items: readonly TimelineItem[] }) {
  return (
    <section className="rounded-lg border border-[#c2c9bc] bg-white p-4">
      <h3 className="mb-3 font-['Hanken_Grotesk'] text-lg font-semibold text-[#1a1c18]">Timeline cooperativo</h3>
      <ol className="grid gap-3 md:grid-cols-3 xl:grid-cols-6">
        {items.map((item, index) => (
          <li key={item.key} className="rounded-lg border border-[#e2e3dc] bg-[#f9faf3] p-3">
            <div
              className={`mb-2 inline-flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
                item.state === "done"
                  ? "bg-[#4F7302] text-white"
                  : item.state === "current"
                    ? "bg-[#D6D979] text-[#3E5902]"
                    : "bg-[#e8e9e2] text-[#42493f]"
              }`}
            >
              {index + 1}
            </div>
            <p className="text-sm font-semibold text-[#1a1c18]">{item.label}</p>
            <p className="text-xs text-[#42493f]">
              {item.state === "done" ? "Completada" : item.state === "current" ? "Actual" : "Pendiente"}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
