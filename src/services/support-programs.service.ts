import { SUPPORT_DEMO_DATE, supportPrograms } from "@/data/mocks/support-programs.mock";

export function getSupportPrograms() {
  return supportPrograms;
}

export function getSupportStatus(deadline: string | null) {
  if (!deadline) return "Permanente";
  if (deadline < SUPPORT_DEMO_DATE) return "Cerrada";
  const days = (Date.parse(deadline) - Date.parse(SUPPORT_DEMO_DATE)) / 86_400_000;
  return days <= 14 ? "Por cerrar" : "Abierta";
}

export function formatSupportDeadline(deadline: string | null) {
  return deadline
    ? new Intl.DateTimeFormat("es-MX", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }).format(new Date(deadline))
    : "Sin fecha de cierre";
}
