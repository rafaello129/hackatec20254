import { useEffect, useMemo, useState } from "react";
import {
  getCatalogItems,
  getInventoryAlerts,
  getInventoryItems,
  getInventoryKpis,
  getStockMovements,
} from "@/services/inventory.service";
import type {
  CatalogItem,
  InventoryAlert,
  InventoryCategory,
  InventoryItem,
  InventoryKpi,
  InventoryStatus,
  StockMovement,
} from "@/types/inventory.types";

export type InventoryStatusFilter = InventoryStatus | "all";
export type InventoryCategoryFilter = InventoryCategory | "all";

const STATUS_OPTIONS: Array<{ value: InventoryStatusFilter; label: string }> = [
  { value: "all", label: "Todos los estados" },
  { value: "in_stock", label: "En stock" },
  { value: "low_stock", label: "Bajo stock" },
  { value: "out_of_stock", label: "Sin stock" },
  { value: "reserved", label: "Reservado" },
  { value: "discontinued", label: "Descontinuado" },
];

const CATEGORY_OPTIONS: Array<{ value: InventoryCategoryFilter; label: string }> = [
  { value: "all", label: "Todas las categorias" },
  { value: "raw_material", label: "Materia prima" },
  { value: "finished_product", label: "Producto terminado" },
  { value: "service", label: "Servicio" },
  { value: "packaging", label: "Empaque" },
  { value: "equipment", label: "Equipo" },
  { value: "digital", label: "Digital" },
];

export function useInventory() {
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [kpis, setKpis] = useState<InventoryKpi[]>([]);
  const [movements, setMovements] = useState<StockMovement[]>([]);
  const [alerts, setAlerts] = useState<InventoryAlert[]>([]);
  const [catalogItems, setCatalogItems] = useState<CatalogItem[]>([]);
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState<InventoryStatusFilter>("all");
  const [categoryFilter, setCategoryFilter] = useState<InventoryCategoryFilter>("all");
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const loadData = async () => {
      setIsLoading(true);
      const [inventoryData, movementData, alertData, catalogData] = await Promise.all([
        getInventoryItems(),
        getStockMovements(),
        getInventoryAlerts(),
        getCatalogItems(),
      ]);
      const kpiData = await getInventoryKpis(inventoryData);

      if (!mounted) {
        return;
      }

      setItems(inventoryData);
      setMovements(movementData);
      setAlerts(alertData);
      setCatalogItems(catalogData);
      setKpis(kpiData);
      setSelectedItemId((prev) => prev ?? inventoryData[0]?.id ?? null);
      setIsLoading(false);
    };

    void loadData();

    return () => {
      mounted = false;
    };
  }, []);

  const filteredItems = useMemo(() => {
    const term = searchText.trim().toLowerCase();

    return items.filter((item) => {
      const matchesText =
        term.length === 0 ||
        item.name.toLowerCase().includes(term) ||
        item.sku.toLowerCase().includes(term) ||
        item.supplier.toLowerCase().includes(term) ||
        item.location.toLowerCase().includes(term) ||
        item.tags.some((tag) => tag.toLowerCase().includes(term));

      const matchesStatus = statusFilter === "all" || item.status === statusFilter;
      const matchesCategory = categoryFilter === "all" || item.category === categoryFilter;

      return matchesText && matchesStatus && matchesCategory;
    });
  }, [items, searchText, statusFilter, categoryFilter]);

  useEffect(() => {
    if (filteredItems.length === 0) {
      setSelectedItemId(null);
      return;
    }

    const selectedStillVisible = filteredItems.some((item) => item.id === selectedItemId);
    if (!selectedStillVisible) {
      setSelectedItemId(filteredItems[0].id);
    }
  }, [filteredItems, selectedItemId]);

  const selectedItem = useMemo(
    () => filteredItems.find((item) => item.id === selectedItemId) ?? null,
    [filteredItems, selectedItemId],
  );

  const selectedItemMovements = useMemo(() => {
    if (!selectedItem) {
      return [];
    }
    return movements
      .filter((movement) => movement.itemId === selectedItem.id)
      .sort((a, b) => b.date.localeCompare(a.date))
      .slice(0, 4);
  }, [movements, selectedItem]);

  const recentMovements = useMemo(
    () => [...movements].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 6),
    [movements],
  );

  const clearFilters = () => {
    setSearchText("");
    setStatusFilter("all");
    setCategoryFilter("all");
  };

  return {
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
    statusOptions: STATUS_OPTIONS,
    categoryOptions: CATEGORY_OPTIONS,
  };
}
