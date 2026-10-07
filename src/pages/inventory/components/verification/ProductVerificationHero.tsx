import {
  AlertTriangle,
  CheckCircle2,
  Clock3,
  ShieldCheck,
} from "lucide-react";
import type { ProductVerification } from "@/types/product-verification.types";
import ProductVerificationBadge from "./ProductVerificationBadge";

const date = new Intl.DateTimeFormat("es-MX", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

export default function ProductVerificationHero({
  verification,
  onAction,
}: {
  verification: ProductVerification;
  onAction: () => void;
}) {
  const passed = verification.checks.filter(
    (check) => check.status === "passed",
  ).length;
  const total = verification.checks.length;

  const content = {
    verified: {
      eyebrow: "Autenticidad y origen",
      title: "Origen verificado por PÉEK",
      body: "PÉEK revisó la identidad, el origen y la evidencia asociada a este producto.",
      icon: ShieldCheck,
      surface: "bg-[#022601] text-white",
      iconSurface: "bg-[#B6E251] text-[#022601]",
      bodyColor: "text-white/65",
    },
    pending: {
      eyebrow: "Autenticidad y origen",
      title: "Verificación en revisión",
      body: "La evidencia fue recibida y está siendo revisada por PÉEK.",
      icon: Clock3,
      surface: "border border-[#EAD9A8] bg-[#FFF9E9] text-[#5F4A13]",
      iconSurface: "bg-[#F5DF91] text-[#715405]",
      bodyColor: "text-[#7A6632]",
    },
    needs_action: {
      eyebrow: "Autenticidad y origen",
      title: "Falta información",
      body: "Necesitamos una evidencia adicional para continuar con la revisión.",
      icon: AlertTriangle,
      surface: "border border-[#F0CEC8] bg-[#FFF2EF] text-[#773E38]",
      iconSurface: "bg-[#F7D9D4] text-[#A54A42]",
      bodyColor: "text-[#8B5A54]",
    },
    not_requested: {
      eyebrow: "Autenticidad y origen",
      title: "Verifica el origen de este producto",
      body: "Agrega una capa de confianza mostrando quién lo produce y cómo fue elaborado.",
      icon: ShieldCheck,
      surface: "border border-[#DDE4D9] bg-white text-[#263129]",
      iconSurface: "bg-[#EAF4E6] text-[#2E6D36]",
      bodyColor: "text-[#6D7971]",
    },
  } as const;

  const meta = content[verification.status];
  const Icon = meta.icon;
  const canAct =
    verification.status === "needs_action" ||
    verification.status === "not_requested";

  return (
    <section className={["rounded-[24px] p-6", meta.surface].join(" ")}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
        <span
          className={[
            "grid h-12 w-12 shrink-0 place-items-center rounded-[16px]",
            meta.iconSurface,
          ].join(" ")}
        >
          <Icon className="h-6 w-6" />
        </span>

        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-bold uppercase tracking-[0.14em] opacity-70">
            {meta.eyebrow}
          </p>

          <div className="mt-2 flex flex-wrap items-center gap-2">
            <h2 className="font-['Hanken_Grotesk'] text-[24px] font-bold leading-tight">
              {meta.title}
            </h2>
            <ProductVerificationBadge status={verification.status} />
          </div>

          <p className={["mt-2 max-w-2xl text-[12px] leading-5", meta.bodyColor].join(" ")}>
            {meta.body}
          </p>

          {verification.status === "verified" ? (
            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-[10px] text-white/65">
              {verification.verificationCode ? (
                <span className="font-semibold text-[#B6E251]">
                  {verification.verificationCode}
                </span>
              ) : null}
              {verification.verifiedAt ? (
                <span>
                  Verificado el{" "}
                  {date.format(new Date(verification.verifiedAt + "T00:00:00"))}
                </span>
              ) : null}
            </div>
          ) : null}

          {verification.status === "pending" && total > 0 ? (
            <div className="mt-4 max-w-xl">
              <div className="flex items-center justify-between gap-3 text-[10px] font-semibold">
                <span>{passed} de {total} comprobaciones completadas</span>
                <span>{Math.round((passed / total) * 100)}%</span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-black/8">
                <span
                  className="block h-full rounded-full bg-[#B69025]"
                  style={{ width: Math.max(10, (passed / total) * 100) + "%" }}
                />
              </div>
            </div>
          ) : null}

          {canAct ? (
            <button
              type="button"
              onClick={onAction}
              className={[
                "mt-4 inline-flex h-10 items-center gap-2 rounded-full px-4 text-[11px] font-semibold transition",
                verification.status === "not_requested"
                  ? "bg-[var(--peek-brand-900)] text-white hover:bg-[var(--oe-primary-hover)]"
                  : "bg-[#A54A42] text-white hover:bg-[#93423B]",
              ].join(" ")}
            >
              {verification.status === "not_requested" ? (
                <ShieldCheck className="h-4 w-4" />
              ) : (
                <CheckCircle2 className="h-4 w-4" />
              )}
              {verification.status === "not_requested"
                ? "Solicitar verificación"
                : "Completar evidencia"}
            </button>
          ) : null}
        </div>
      </div>
    </section>
  );
}
