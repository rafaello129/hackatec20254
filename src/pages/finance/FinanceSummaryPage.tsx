import PageIntro from "@/components/common/PageIntro";
import CashflowChart from "./components/CashflowChart";
import CooperativeFinancePanel from "./components/CooperativeFinancePanel";
import FinanceAlertPanel from "./components/FinanceAlertPanel";
import FinanceKpiCards from "./components/FinanceKpiCards";
import FinanceSectionTabs from "./components/FinanceSectionTabs";
import FinancialHealthPanel from "./components/FinancialHealthPanel";
import RevenueExpensePanel from "./components/RevenueExpensePanel";
import { useFinance } from "./hooks/useFinance";

export default function FinanceSummaryPage() {
  const { alerts, cashflowPoints, cooperativeRecords, kpis, summary } = useFinance();

  return (
    <div className="w-full max-w-full space-y-6 overflow-hidden">
      <PageIntro
        title="Resumen financiero"
        description={`Vista ejecutiva del periodo ${summary.period.label}: flujo, margen, cobranza y valor generado por cooperativos.`}
      />
      <FinanceSectionTabs />
      <FinanceKpiCards kpis={kpis} />
      <div className="grid gap-4 xl:grid-cols-[minmax(0,1.45fr)_minmax(320px,0.75fr)] xl:items-start">
        <CashflowChart points={cashflowPoints} />
        <RevenueExpensePanel summary={summary} />
      </div>
      <div className="grid gap-4 xl:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] xl:items-start">
        <FinancialHealthPanel summary={summary} />
        <FinanceAlertPanel alerts={alerts} limit={3} />
      </div>
      <CooperativeFinancePanel records={cooperativeRecords} />
    </div>
  );
}
