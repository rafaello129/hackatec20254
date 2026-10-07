import { Plus, Search } from "lucide-react";
import { useState } from "react";
import AddCustomerModal from "./components/AddCustomerModal";
import CustomerBehaviorFilters from "./components/CustomerBehaviorFilters";
import CustomerDetailDrawer from "./components/CustomerDetailDrawer";
import CustomerSummaryCards from "./components/CustomerSummaryCards";
import CustomerTable from "./components/CustomerTable";
import InactiveCustomersCard from "./components/InactiveCustomersCard";
import ReturningCustomersCard from "./components/ReturningCustomersCard";
import { useCustomers } from "./hooks/useCustomers";

export default function CustomersPage() {
  const [isAddOpen, setIsAddOpen] = useState(false);

  const {
    isLoading,
    filteredCustomers,
    summary,
    returningCustomers,
    inactiveCustomers,
    searchText,
    setSearchText,
    behaviorFilter,
    setBehaviorFilter,
    selectedCustomer,
    selectedCustomerPurchases,
    setSelectedCustomerId,
    openCustomer,
    addCustomer,
  } = useCustomers();

  return (
    <div className="space-y-5 pb-5">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-['Hanken_Grotesk'] text-[34px] font-bold leading-none text-[#172019]">
            Clientes
          </h1>
          <p className="mt-2 text-[13px] text-[#657068]">
            Encuentra clientes y revisa sus compras recientes.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsAddOpen(true)}
          className="inline-flex h-11 w-fit items-center justify-center gap-2 rounded-full bg-[#073B1E] px-5 text-[12px] font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#0B4D29] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9AC84B]"
        >
          <Plus className="h-4 w-4" />
          Agregar cliente
        </button>
      </header>

      {isLoading ? (
        <>
          <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {[0, 1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-[112px] animate-pulse rounded-[18px] border border-[#E3E7DF] bg-white"
              />
            ))}
          </section>
          <section className="grid gap-4 xl:grid-cols-[minmax(0,1.9fr)_360px]">
            <div className="h-[570px] animate-pulse rounded-[24px] border border-[#E3E7DF] bg-white" />
            <div className="space-y-4">
              <div className="h-[245px] animate-pulse rounded-[24px] border border-[#E3E7DF] bg-white" />
              <div className="h-[305px] animate-pulse rounded-[24px] border border-[#E3E7DF] bg-white" />
            </div>
          </section>
        </>
      ) : (
        <>
          <CustomerSummaryCards
            summary={summary}
            onFilter={(filter) => {
              setSearchText("");
              setBehaviorFilter(filter);
            }}
          />

          <section className="grid items-start gap-4 xl:grid-cols-[minmax(0,1.9fr)_360px]">
            <article className="rounded-[24px] border border-[#E3E7DF] bg-white p-5 sm:p-6">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-[17px] font-semibold text-[#172019]">
                    Tus clientes
                  </h2>
                  <p className="mt-1 text-[11px] text-[#7B867E]">
                    {filteredCustomers.length}{" "}
                    {filteredCustomers.length === 1 ? "cliente" : "clientes"}
                  </p>
                </div>
              </div>

              <label className="relative mt-5 block">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#7E8981]" />
                <input
                  value={searchText}
                  onChange={(event) => setSearchText(event.target.value)}
                  placeholder="Buscar por nombre, teléfono o negocio..."
                  className="h-11 w-full rounded-full border border-transparent bg-[#F6F7F2] pl-11 pr-4 text-[12px] text-[#263129] outline-none transition placeholder:text-[#89938C] focus:border-[#CAD7C5] focus:bg-white focus:ring-2 focus:ring-[#9AC84B]/15"
                />
              </label>

              <div className="mt-4">
                <CustomerBehaviorFilters
                  value={behaviorFilter}
                  onChange={setBehaviorFilter}
                />
              </div>

              <div className="mt-5">
                <CustomerTable
                  customers={filteredCustomers}
                  onSelect={openCustomer}
                />
              </div>
            </article>

            <div className="space-y-4">
              <ReturningCustomersCard metric={returningCustomers} />
              <InactiveCustomersCard
                customers={inactiveCustomers}
                onSelect={openCustomer}
                onViewAll={() => {
                  setSearchText("");
                  setBehaviorFilter("inactive");
                }}
              />
            </div>
          </section>
        </>
      )}

      <CustomerDetailDrawer
        customer={selectedCustomer}
        purchases={selectedCustomerPurchases}
        onClose={() => setSelectedCustomerId(null)}
      />

      <AddCustomerModal
        open={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onSave={addCustomer}
      />
    </div>
  );
}
