import { FileText, Plus } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import AddExpenseModal from "./components/AddExpenseModal";
import ExpenseBreakdownCard from "./components/ExpenseBreakdownCard";
import MoneyMovementList from "./components/MoneyMovementList";
import MoneySummaryCards from "./components/MoneySummaryCards";
import ReceivablesCard from "./components/ReceivablesCard";
import SalesExpensesChart from "./components/SalesExpensesChart";
import { useFinance } from "./hooks/useFinance";

export default function FinanceSummaryPage() {
  const [isExpenseOpen, setIsExpenseOpen] = useState(false);

  const {
    moneySummary,
    summaryVisuals,
    chartData,
    period,
    setPeriod,
    filteredMoneyMovements,
    movementFilter,
    setMovementFilter,
    receivables,
    expenseBreakdown,
    registerExpense,
  } = useFinance();

  return (
    <div className="space-y-5 pb-5">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-['Hanken_Grotesk'] text-[34px] font-bold leading-none text-[var(--oe-text)]">
            Mi dinero
          </h1>
          <p className="mt-2 text-[13px] text-[var(--oe-text-muted)]">
            Entiende cuánto vendiste, cuánto gastaste y qué te quedó.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Link
            to="/finance/invoicing"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-[var(--oe-border)] bg-white px-4 text-[11px] font-semibold text-[#5B675F] transition hover:bg-[#F6F8F4]"
          >
            <FileText className="h-4 w-4" />
            Ver facturas
          </Link>

          <button
            type="button"
            onClick={() => setIsExpenseOpen(true)}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[var(--peek-brand-900)] px-5 text-[12px] font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[var(--oe-primary-hover)] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--peek-accent-lime)]"
          >
            <Plus className="h-4 w-4" />
            Registrar gasto
          </button>
        </div>
      </header>

      <MoneySummaryCards summary={moneySummary} visuals={summaryVisuals} />

      <section className="grid items-stretch gap-4 xl:grid-cols-12">
        <div className="xl:col-span-8">
          <SalesExpensesChart
            points={chartData}
            period={period}
            onPeriodChange={setPeriod}
          />
        </div>
        <div className="xl:col-span-4">
          <ReceivablesCard items={receivables} />
        </div>
      </section>

      <section className="grid items-stretch gap-4 xl:grid-cols-12">
        <div className="xl:col-span-8">
          <MoneyMovementList
            movements={filteredMoneyMovements}
            filter={movementFilter}
            onFilterChange={setMovementFilter}
          />
        </div>
        <div className="xl:col-span-4">
          <ExpenseBreakdownCard items={expenseBreakdown} />
        </div>
      </section>

      <AddExpenseModal
        open={isExpenseOpen}
        onClose={() => setIsExpenseOpen(false)}
        onSave={registerExpense}
      />
    </div>
  );
}
