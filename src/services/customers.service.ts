import { customerInteractionsMock, customersMock } from "@/data/mocks/customers.mock";
import type { Customer, CustomerInsight, CustomerInteraction, CustomerKpi } from "@/types/customer.types";

const MS_IN_DAY = 1000 * 60 * 60 * 24;

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0,
  }).format(value);

const getDaysFromNow = (dateISO: string) => {
  const date = new Date(`${dateISO}T00:00:00`);
  const now = new Date();
  return Math.floor((now.getTime() - date.getTime()) / MS_IN_DAY);
};

const opportunityCandidates = (customers: Customer[]) =>
  customers.filter((customer) => customer.status === "active" && customer.healthScore >= 80);

export async function getCustomers(): Promise<Customer[]> {
  return customersMock;
}

export async function getCustomerById(id: string): Promise<Customer | undefined> {
  return customersMock.find((customer) => customer.id === id);
}

export async function getCustomerInteractions(): Promise<CustomerInteraction[]> {
  return customerInteractionsMock;
}

export async function getCustomerKpis(customersInput?: Customer[]): Promise<CustomerKpi[]> {
  const customers = customersInput ?? (await getCustomers());
  const activeCustomers = customers.filter((customer) => customer.status === "active");
  const annualValue = customers.reduce((total, customer) => total + customer.annualValue, 0);
  const riskCustomers = customers.filter((customer) => customer.status === "at_risk" || customer.healthScore < 50);
  const churnRisk = customers.length > 0 ? Math.round((riskCustomers.length / customers.length) * 100) : 0;
  const opportunities = opportunityCandidates(customers).length;

  return [
    {
      id: "active",
      label: "Clientes activos",
      value: activeCustomers.length,
      formattedValue: String(activeCustomers.length),
      hint: "Cartera en operacion",
    },
    {
      id: "annual_value",
      label: "Valor anual estimado",
      value: annualValue,
      formattedValue: formatCurrency(annualValue),
      hint: "Pipeline y contratos vigentes",
    },
    {
      id: "churn_risk",
      label: "Riesgo de churn",
      value: churnRisk,
      formattedValue: `${churnRisk}%`,
      hint: `${riskCustomers.length} cuentas requieren seguimiento`,
    },
    {
      id: "opportunities",
      label: "Nuevas oportunidades",
      value: opportunities,
      formattedValue: String(opportunities),
      hint: "Candidatos para upsell y expansion",
    },
  ];
}

export async function getCustomerInsights(customersInput?: Customer[]): Promise<CustomerInsight[]> {
  const customers = customersInput ?? (await getCustomers());
  const insights: CustomerInsight[] = [];

  const highRisk = customers
    .filter((customer) => customer.status === "at_risk" || customer.healthScore < 50)
    .slice(0, 2);

  highRisk.forEach((customer) => {
    insights.push({
      id: `risk-${customer.id}`,
      customerId: customer.id,
      type: "risk",
      priority: "high",
      title: `${customer.companyName} en riesgo alto`,
      summary: `Health score en ${customer.healthScore}/100 y ultimo contacto hace ${getDaysFromNow(customer.lastInteraction)} dias.`,
      recommendation: "Programar llamada ejecutiva esta semana y renegociar SLA.",
    });
  });

  const upsell = customers
    .filter((customer) => customer.status === "active" && customer.healthScore >= 85 && customer.annualValue < 2000000)
    .slice(0, 1);

  upsell.forEach((customer) => {
    insights.push({
      id: `upsell-${customer.id}`,
      customerId: customer.id,
      type: "upsell",
      priority: "medium",
      title: `Oportunidad de upsell: ${customer.companyName}`,
      summary: "Cuenta saludable con capacidad de ampliar ticket anual.",
      recommendation: "Proponer paquete premium con analytics y automatizacion de entregas.",
    });
  });

  const followUp = customers
    .filter((customer) => getDaysFromNow(customer.lastInteraction) > 30 && customer.status !== "churned")
    .slice(0, 1);

  followUp.forEach((customer) => {
    insights.push({
      id: `followup-${customer.id}`,
      customerId: customer.id,
      type: "follow_up",
      priority: "medium",
      title: `Sin contacto reciente: ${customer.companyName}`,
      summary: `No hay interaccion registrada en los ultimos ${getDaysFromNow(customer.lastInteraction)} dias.`,
      recommendation: "Enviar seguimiento comercial y confirmar plan de compras del proximo trimestre.",
    });
  });

  const reactivation = customers
    .filter((customer) => customer.status === "inactive" || customer.status === "churned")
    .slice(0, 1);

  reactivation.forEach((customer) => {
    insights.push({
      id: `reactivation-${customer.id}`,
      customerId: customer.id,
      type: "reactivation",
      priority: "low",
      title: `Plan de reactivacion para ${customer.companyName}`,
      summary: "Cuenta con historico util para recuperar volumen parcial.",
      recommendation: "Ofrecer incentivo de retorno con contrato semestral y soporte dedicado.",
    });
  });

  return insights;
}
