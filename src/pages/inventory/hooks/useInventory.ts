import { useEffect, useMemo, useState } from "react";
import { getInventoryItems, getStockMovements } from "@/services/inventory.service";
import type {
  InventoryItem,
  ProductAvailability,
  ProductCategory,
  ProductDisplayData,
  StockMovement,
} from "@/types/inventory.types";
import {
  buildProductDisplayData,
  getProductAvailability,
  getProductSummary,
  getProductsNeedingAttention,
  getTopSellingProducts,
} from "../utils/product-display.utils";

export type ProductAvailabilityFilter = "all" | ProductAvailability;
export type ProductCategoryFilter = "all" | ProductCategory;

export interface NewProductInput {
  name: string;
  category: ProductCategory;
  price: number;
  cost?: number;
  quantity: number;
  lowStockAt?: number;
  supplier?: string;
  image?: string;
  notes?: string;
}

export interface StockAdjustmentInput {
  quantity: number;
  direction: "add" | "remove";
  reason?: string;
}

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  "Textiles",
  "Cerámica",
  "Cestería",
  "Decoración",
  "Accesorios",
  "Regalos",
];

export function useInventory() {
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [movements, setMovements] = useState<StockMovement[]>([]);
  const [searchText, setSearchText] = useState("");
  const [availabilityFilter, setAvailabilityFilter] =
    useState<ProductAvailabilityFilter>("all");
  const [categoryFilter, setCategoryFilter] =
    useState<ProductCategoryFilter>("all");
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const loadData = async () => {
      setIsLoading(true);
      const [inventoryData, movementData] = await Promise.all([
        getInventoryItems(),
        getStockMovements(),
      ]);

      if (!mounted) return;

      setItems(inventoryData);
      setMovements(movementData);
      setIsLoading(false);
    };

    void loadData();

    return () => {
      mounted = false;
    };
  }, []);

  const products = useMemo(
    () => buildProductDisplayData(items, movements),
    [items, movements],
  );

  const summary = useMemo(() => getProductSummary(products), [products]);
  const attentionProducts = useMemo(
    () => getProductsNeedingAttention(products),
    [products],
  );
  const topSellingProducts = useMemo(
    () => getTopSellingProducts(products),
    [products],
  );

  const filteredProducts = useMemo(() => {
    const term = searchText.trim().toLowerCase();

    return products.filter((product) => {
      const matchesText =
        term.length === 0 ||
        product.name.toLowerCase().includes(term) ||
        product.category.toLowerCase().includes(term) ||
        product.sku.toLowerCase().includes(term);

      const matchesAvailability =
        availabilityFilter === "all" ||
        product.availability === availabilityFilter;

      const matchesCategory =
        categoryFilter === "all" || product.category === categoryFilter;

      return matchesText && matchesAvailability && matchesCategory;
    });
  }, [products, searchText, availabilityFilter, categoryFilter]);

  const selectedProduct = useMemo(
    () => products.find((product) => product.id === selectedProductId) ?? null,
    [products, selectedProductId],
  );

  const selectedProductMovements = useMemo(() => {
    if (!selectedProductId) return [];

    return movements
      .filter((movement) => movement.itemId === selectedProductId)
      .sort((a, b) => b.date.localeCompare(a.date))
      .slice(0, 6);
  }, [movements, selectedProductId]);

  const clearFilters = () => {
    setSearchText("");
    setAvailabilityFilter("all");
    setCategoryFilter("all");
  };

  const openProduct = (product: ProductDisplayData) => {
    setSelectedProductId(product.id);
  };

  const addProduct = (input: NewProductInput) => {
    const nextIndex = items.length + 1;
    const id = `inv-local-${Date.now()}`;
    const sku = `ART-${String(nextIndex).padStart(4, "0")}`;
    const lowStockAt = Math.max(1, input.lowStockAt ?? 5);
    const quantity = Math.max(0, input.quantity);
    const availability = getProductAvailability(quantity, lowStockAt);
    const today = new Date().toISOString().slice(0, 10);

    const item: InventoryItem = {
      id,
      name: input.name.trim(),
      sku,
      category: "finished_product",
      description: input.notes?.trim() || "Producto artesanal registrado en PÉEK.",
      quantity,
      unit: "piezas",
      minStock: lowStockAt,
      maxStock: Math.max(quantity * 3, lowStockAt * 4, 20),
      status:
        availability === "available"
          ? "in_stock"
          : availability === "low_stock"
            ? "low_stock"
            : "out_of_stock",
      estimatedValue: Math.round(quantity * input.price),
      supplier: input.supplier?.trim() || "Sin proveedor registrado",
      preferredSupplier: input.supplier?.trim() || "Sin proveedor registrado",
      location: "Tienda principal",
      lastUpdated: today,
      tags: [input.category.toLowerCase()],
      availableForCooperative: false,
      cooperativeUseCase: "no_aplica",
      bulkPurchaseEligible: false,
      minimumBulkQuantity: 0,
      image:
        input.image?.trim() ||
        "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=520&h=520&q=82",
      displayCategory: input.category,
      price: Math.max(0, input.price),
      cost: Math.max(0, input.cost ?? 0),
      unitsSoldThisMonth: 0,
      notes: input.notes?.trim() || "",
    };

    setItems((current) => [item, ...current]);
    setSelectedProductId(id);
    return id;
  };

  const adjustStock = (productId: string, input: StockAdjustmentInput) => {
    const amount = Math.max(1, Math.floor(input.quantity));
    const delta = input.direction === "add" ? amount : -amount;
    const today = new Date().toISOString().slice(0, 10);

    setItems((current) =>
      current.map((item) => {
        if (item.id !== productId) return item;

        const nextQuantity = Math.max(0, item.quantity + delta);
        const availability = getProductAvailability(nextQuantity, item.minStock);

        return {
          ...item,
          quantity: nextQuantity,
          status:
            availability === "available"
              ? "in_stock"
              : availability === "low_stock"
                ? "low_stock"
                : "out_of_stock",
          estimatedValue: Math.round(nextQuantity * (item.price ?? 0)),
          lastUpdated: today,
        };
      }),
    );

    setMovements((current) => [
      {
        id: `mov-local-${Date.now()}`,
        itemId: productId,
        type: input.direction === "add" ? "entrada" : "ajuste",
        quantity: delta,
        reason:
          input.reason?.trim() ||
          (input.direction === "add" ? "Agregaste piezas" : "Quitaste piezas"),
        date: today,
        responsible: "María López",
      },
      ...current,
    ]);
  };

  return {
    isLoading,
    items,
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
    clearFilters,
    selectedProductId,
    setSelectedProductId,
    selectedProduct,
    selectedProductMovements,
    openProduct,
    addProduct,
    adjustStock,
    categoryOptions: PRODUCT_CATEGORIES,
  };
}
