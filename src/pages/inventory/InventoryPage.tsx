import { Plus } from "lucide-react";
import PageIntro from "@/components/common/PageIntro";
import SectionCard from "@/components/common/SectionCard";
import InventoryAlertPanel from "./components/InventoryAlertPanel";
import InventoryCatalogPanel from "./components/InventoryCatalogPanel";
import InventoryDetailPanel from "./components/InventoryDetailPanel";
import InventoryFilters from "./components/InventoryFilters";
import InventoryKpiCards from "./components/InventoryKpiCards";
import InventoryMovementPanel from "./components/InventoryMovementPanel";
import InventoryTable from "./components/InventoryTable";
import { useInventory } from "./hooks/useInventory";

export default function InventoryPage() {
  const {
    isLoading,
    items,
    filteredItems,
    kpis,
    alerts,
    recentMovements,
    catalogItems,
    searchText,
    setSearchText,
    statusFilter,
    setStatusFilter,
    categoryFilter,
    setCategoryFilter,
    clearFilters,
    selectedItemId,
    setSelectedItemId,
    selectedItem,
    selectedItemMovements,
    statusOptions,
    categoryOptions,
  } = useInventory();

  const resolveItemName = (itemId: string) => items.find((item) => item.id === itemId)?.name ?? "Item no identificado";

  return (
    <div className="space-y-6">
      <PageIntro
        title="Inventario"
        description="Controla stock, alertas operativas y catalogo comercial para la operacion diaria."
        actions={
          <button
            type="button"
            disabled
            className="inline-flex items-center gap-2 rounded-lg bg-[#4F7302] px-4 py-2 text-sm font-semibold text-white opacity-80"
          >
            <Plus className="h-4 w-4" />
            Agregar producto
          </button>
        }
      />

      <InventoryKpiCards kpis={kpis} />

      <SectionCard title="Operacion de inventario">
        <div className="space-y-3">
          <InventoryFilters
            searchText={searchText}
            statusFilter={statusFilter}
            categoryFilter={categoryFilter}
            statusOptions={statusOptions}
            categoryOptions={categoryOptions}
            onSearchChange={setSearchText}
            onStatusChange={setStatusFilter}
            onCategoryChange={setCategoryFilter}
            onClearFilters={clearFilters}
          />

          {isLoading ? (
            <div className="rounded-lg border border-[#e2e3dc] bg-[#f9faf3] p-6 text-sm text-[#42493f]">
              Cargando inventario...
            </div>
          ) : (
            <InventoryTable
              items={filteredItems}
              selectedItemId={selectedItemId}
              onSelectItem={setSelectedItemId}
            />
          )}
        </div>

        <p className="mt-3 text-sm text-[#42493f]">
          Mostrando {filteredItems.length} de {items.length} items del inventario operativo.
        </p>
      </SectionCard>

      <div className="grid gap-4 xl:grid-cols-2 xl:items-start">
        <InventoryAlertPanel alerts={alerts} resolveItemName={resolveItemName} />
        <InventoryMovementPanel movements={recentMovements} resolveItemName={resolveItemName} />
      </div>

      <div className="grid gap-4 xl:grid-cols-[1fr_1.2fr] xl:items-start">
        <InventoryDetailPanel item={selectedItem} movements={selectedItemMovements} />
        <InventoryCatalogPanel catalogItems={catalogItems} />
      </div>
    </div>
  );
}
