import { Check, Circle, PackageCheck } from "lucide-react";

type TimelineItem = {
  key: string;
  label: string;
  state: "done" | "current" | "pending";
};

export default function CooperativeTimeline({ items }: { items: readonly TimelineItem[] }) {
  return (
    <section className="rounded-lg border border-[#c2c9bc] bg-white p-5">
      <h2 className="font-['Hanken_Grotesk'] text-lg font-semibold text-[#1a1c18]">Timeline de iniciativa</h2>
      <div className="mt-6 overflow-x-auto pb-1">
        <ol className="grid min-w-[640px] grid-cols-6 items-start">
          {items.map((item, index) => {
            const isDone = item.state === "done";
            const isCurrent = item.state === "current";
            return (
              <li key={item.key} className="relative flex flex-col items-center text-center">
                {index < items.length - 1 ? (
                  <span
                    className={`absolute left-1/2 top-4 h-px w-full ${
                      isDone ? "bg-[#4F7302]" : "bg-[#e2e3dc]"
                    }`}
                  />
                ) : null}
                <span
                  className={`relative z-10 grid h-9 w-9 place-items-center rounded-full border-4 border-white ${
                    isDone
                      ? "bg-[#4F7302] text-white"
                      : isCurrent
                        ? "bg-[#D6D979] text-[#022601]"
                        : "bg-[#e8e9e2] text-[#73796e]"
                  }`}
                >
                  {isDone ? <Check className="h-4 w-4" /> : isCurrent ? <PackageCheck className="h-4 w-4" /> : <Circle className="h-3 w-3" />}
                </span>
                <p className={`mt-3 text-sm font-semibold ${isCurrent ? "text-[#1a1c18]" : isDone ? "text-[#3E5902]" : "text-[#73796e]"}`}>
                  {item.label}
                </p>
                <p className="mt-1 text-xs text-[#73796e]">
                  {isDone ? "Completada" : isCurrent ? "Actual" : "Pendiente"}
                </p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
