import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SpotlightCard from "@/components/react-bits/SpotlightCard";
import ProductAttentionCard from "./components/ProductAttentionCard";
import ProductFilters from "./components/ProductFilters";
import ProductList from "./components/ProductList";
import ProductSummaryCards from "./components/ProductSummaryCards";
import TopSellingProducts from "./components/TopSellingProducts";
import { useInventory } from "./hooks/useInventory";
import type { ProductDisplayData } from "@/types/inventory.types";

export default function InventoryPage() {
  const navigate = useNavigate();

  const {
    isLoading,
    products,
    filteredProducts,
    summary,
    attentionProducts,
    topSellingProducts,
    searchText,
    setSearchText,
    availabilityFilter,
    setAvailabilityFilter,
    categoryFilter,
    setCategoryFilter,
    verificationFilter,
    setVerificationFilter,
    clearFilters,
    getVerification,
    categoryOptions,
  } = useInventory();

  const openProduct = (product: ProductDisplayData) => {
    navigate("/inventory/" + product.id);
  };

  return (
    <div className="space-y-5 pb-5">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-['Hanken_Grotesk'] text-[34px] font-bold leading-none text-[var(--oe-text)]">
            Productos
          </h1>
          <p className="mt-2 text-[13px] text-[var(--oe-text-muted)]">
            Revisa qué tienes disponible, qué se vende y qué necesitas reponer.
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate("/inventory/new")}
          className="inline-flex h-11 w-fit items-center justify-center gap-2 rounded-full bg-[var(--peek-brand-900)] px-5 text-[12px] font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[var(--oe-primary-hover)] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--peek-accent-lime)]"
        >
          <Plus className="h-4 w-4" />
          Agregar producto
        </button>
      </header>

      {isLoading ? (
        <>
          <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {[0, 1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-[132px] animate-pulse rounded-[20px] border border-[var(--oe-border)] bg-white"
              />
            ))}
          </section>

          <section className="grid gap-4 xl:grid-cols-[minmax(0,1.9fr)_360px]">
            <div className="h-[620px] animate-pulse rounded-[24px] border border-[var(--oe-border)] bg-white" />
            <div className="space-y-4">
              <div className="h-[280px] animate-pulse rounded-[24px] border border-[var(--oe-border)] bg-white" />
              <div className="h-[320px] animate-pulse rounded-[24px] border border-[var(--oe-border)] bg-white" />
            </div>
          </section>
        </>
      ) : products.length === 0 ? (
        <section className="rounded-[26px] border border-dashed border-[#D5DDD2] bg-white px-6 py-14 text-center">
          <div className="mx-auto grid h-12 w-12 place-items-center rounded-[16px] bg-[var(--peek-success-soft)] text-[var(--oe-primary)]">
            <Plus className="h-5 w-5" />
          </div>
          <h2 className="mt-4 text-lg font-semibold text-[#263129]">
            Aún no tienes productos registrados
          </h2>
          <p className="mx-auto mt-2 max-w-[480px] text-[12px] leading-5 text-[#77827A]">
            Agrega tus artesanías para empezar a controlar qué tienes disponible
            y qué necesitas reponer.
          </p>
          <button
            type="button"
            onClick={() => navigate("/inventory/new")}
            className="mt-5 inline-flex h-10 items-center gap-2 rounded-full bg-[var(--oe-primary)] px-5 text-[11px] font-semibold text-white"
          >
            <Plus className="h-4 w-4" />
            Agregar primer producto
          </button>
        </section>
      ) : (
        <>
          <ProductSummaryCards
            summary={summary}
            activeFilter={availabilityFilter}
            onFilter={(filter) => {
              setSearchText("");
              setCategoryFilter("all");
              setVerificationFilter("all");
              setAvailabilityFilter(filter);
            }}
          />

          <section className="grid items-start gap-4 xl:grid-cols-[minmax(0,1.9fr)_360px]">
            <SpotlightCard
              spotlightColor="rgba(154, 200, 75, 0.11)"
              className="rounded-[24px] border border-[var(--oe-border)] bg-white p-5 transition-shadow duration-300 hover:shadow-[0_16px_42px_rgba(23,35,27,0.06)] sm:p-6"
            >
              <div className="relative z-[4] flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-[17px] font-semibold text-[var(--oe-text)]">
                    Mis productos
                  </h2>
                  <p className="mt-1 text-[11px] text-[var(--oe-text-muted)]">
                    {filteredProducts.length}{" "}
                    {filteredProducts.length === 1 ? "producto" : "productos"}
                  </p>
                </div>
              </div>

              <div className="relative z-[4] mt-5">
                <ProductFilters
                  searchText={searchText}
                  availabilityFilter={availabilityFilter}
                  categoryFilter={categoryFilter}
                  verificationFilter={verificationFilter}
                  categories={categoryOptions}
                  onSearchChange={setSearchText}
                  onAvailabilityChange={setAvailabilityFilter}
                  onCategoryChange={setCategoryFilter}
                  onVerificationChange={setVerificationFilter}
                  onClear={clearFilters}
                />
              </div>

              <div className="relative z-[4] mt-5">
                <ProductList
                  products={filteredProducts}
                  onSelect={openProduct}
                  getVerificationStatus={(productId) =>
                    getVerification(productId).status
                  }
                />
              </div>
            </SpotlightCard>

            <aside className="space-y-4">
              <ProductAttentionCard
                products={attentionProducts}
                onSelect={openProduct}
                onViewAll={() => {
                  setSearchText("");
                  setCategoryFilter("all");
                  setVerificationFilter("all");
                  setAvailabilityFilter(
                    summary.outOfStock > 0 ? "out_of_stock" : "low_stock",
                  );
                }}
              />
              <TopSellingProducts
                products={topSellingProducts}
                onSelect={openProduct}
              />
            </aside>
          </section>
        </>
      )}
    </div>
  );
}
