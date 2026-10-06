export type SupportKind = "Subsidio" | "Crédito" | "Capacitación";
export type SupportSource = "Gobierno" | "Banco" | "Empresa privada";

export interface SupportProgram {
  id: string;
  title: string;
  institution: string;
  source: SupportSource;
  kind: SupportKind;
  region: string;
  sector: string;
  benefit: string;
  description: string;
  deadline: string | null;
  requirements: string[];
  conditions: string;
}

export interface SupportProgress {
  saved: string[];
  applications: string[];
}
