import type { ReturningCustomersMetric } from "@/types/customer.types";

interface ReturningCustomersCardProps {
  metric: ReturningCustomersMetric;
}

export default function ReturningCustomersCard({
  metric,
}: ReturningCustomersCardProps) {
  const stroke = Math.max(0, Math.min(metric.percentage, 100));

  return (
    <article className="rounded-[22px] border border-[#E3E7DF] bg-white p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-[15px] font-semibold text-[#172019]">
            Clientes que regresaron
          </h2>
          <p className="mt-1 text-[11px] text-[#7B867E]">Este mes</p>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-[124px_1fr] items-center gap-4">
        <div className="relative grid h-[116px] w-[116px] place-items-center">
          <svg
            viewBox="0 0 120 120"
            className="h-[116px] w-[116px] -rotate-90"
            aria-label={`${metric.percentage}% de clientes regresaron`}
            role="img"
          >
            <circle
              cx="60"
              cy="60"
              r="44"
              fill="none"
              stroke="#E9EFE7"
              strokeWidth="14"
            />
            <circle
              cx="60"
              cy="60"
              r="44"
              pathLength="100"
              fill="none"
              stroke="#2F873A"
              strokeWidth="14"
              strokeLinecap="round"
              strokeDasharray={`${stroke} ${100 - stroke}`}
              className="transition-all duration-500"
            />
          </svg>

          <div className="absolute text-center">
            <p className="text-[24px] font-bold leading-none text-[#172019]">
              {metric.percentage}%
            </p>
            <p className="mt-1 text-[10px] text-[#7E8981]">
              {metric.returned} de {metric.eligible}
            </p>
          </div>
        </div>

        <div>
          <p className="text-[13px] font-semibold leading-5 text-[#243129]">
            {metric.returned} {metric.returned === 1 ? "cliente volvió" : "clientes volvieron"} a comprar
          </p>
          <p className="mt-2 text-[11px] leading-5 text-[#7B867E]">
            Una forma sencilla de saber si tus clientes están regresando.
          </p>
        </div>
      </div>
    </article>
  );
}
