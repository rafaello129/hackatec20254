import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { getInventoryItems, getStockMovements } from "@/services/inventory.service";
import type {
  InventoryItem,
  NewProductInput,
  ProductAvailabilityFilter,
  ProductCategoryFilter,
  ProductVerificationFilter,
  StockAdjustmentInput,
  StockMovement,
} from "@/types/inventory.types";
import { buildProductDisplayData, getProductAvailability } from "../utils/product-display.utils";

interface InventoryContextValue {
  isLoading: boolean;
  items: InventoryItem[];
  movements: StockMovement[];
  products: ReturnType<typeof buildProductDisplayData>;
  searchText: string;
  setSearchText: (value: string) => void;
  availabilityFilter: ProductAvailabilityFilter;
  setAvailabilityFilter: (value: ProductAvailabilityFilter) => void;
  categoryFilter: ProductCategoryFilter;
  setCategoryFilter: (value: ProductCategoryFilter) => void;
  verificationFilter: ProductVerificationFilter;
  setVerificationFilter: (value: ProductVerificationFilter) => void;
  clearFilters: () => void;
  addProduct: (input: NewProductInput) => string;
  adjustStock: (productId: string, input: StockAdjustmentInput) => void;
  getMovementsByProduct: (productId: string) => StockMovement[];
}

const InventoryContext = createContext<InventoryContextValue | null>(null);

export function InventoryProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [movements, setMovements] = useState<StockMovement[]>([]);
  const [searchText, setSearchText] = useState("");
  const [availabilityFilter, setAvailabilityFilter] = useState<ProductAvailabilityFilter>("all");
  const [categoryFilter, setCategoryFilter] = useState<ProductCategoryFilter>("all");
  const [verificationFilter, setVerificationFilter] = useState<ProductVerificationFilter>("all");

  useEffect(() => {
    let mounted = true;

    void Promise.all([getInventoryItems(), getStockMovements()]).then(
      ([inventoryData, movementData]) => {
        if (!mounted) return;
        setItems(inventoryData.map((item) => ({ ...item, tags: [...item.tags] })));
        setMovements(movementData.map((movement) => ({ ...movement })));
        setIsLoading(false);
      },
    );

    return () => {
      mounted = false;
    };
  }, []);

  const products = useMemo(
    () => buildProductDisplayData(items, movements),
    [items, movements],
  );

  const clearFilters = () => {
    setSearchText("");
    setAvailabilityFilter("all");
    setCategoryFilter("all");
    setVerificationFilter("all");
  };

  const addProduct = (input: NewProductInput) => {
    const nextIndex = items.length + 1;
    const id = "inv-local-" + Date.now();
    const sku = "ART-" + String(nextIndex).padStart(4, "0");
    const lowStockAt = Math.max(1, input.lowStockAt ?? 5);
    const quantity = Math.max(0, input.quantity);
    const availability = getProductAvailability(quantity, lowStockAt);
    const today = new Date().toISOString().slice(0, 10);

    const item: InventoryItem = {
      id,
      name: input.name.trim(),
      sku,
      category: "finished_product",
      description:
        input.notes?.trim() || "Producto artesanal registrado en PÉEK.",
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
      preferredSupplier:
        input.supplier?.trim() || "Sin proveedor registrado",
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
        const availability = getProductAvailability(
          nextQuantity,
          item.minStock,
        );

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
        id: "mov-local-" + Date.now(),
        itemId: productId,
        type: input.direction === "add" ? "entrada" : "ajuste",
        quantity: delta,
        reason:
          input.reason?.trim() ||
          (input.direction === "add"
            ? "Agregaste piezas"
            : "Quitaste piezas"),
        date: today,
        responsible: "María López",
      },
      ...current,
    ]);
  };

  const getMovementsByProduct = (productId: string) =>
    movements
      .filter((movement) => movement.itemId === productId)
      .sort((a, b) => b.date.localeCompare(a.date))
      .slice(0, 8);

  return (
    <InventoryContext.Provider
      value={{
        isLoading,
        items,
        movements,
        products,
        searchText,
        setSearchText,
        availabilityFilter,
        setAvailabilityFilter,
        categoryFilter,
        setCategoryFilter,
        verificationFilter,
        setVerificationFilter,
        clearFilters,
        addProduct,
        adjustStock,
        getMovementsByProduct,
      }}
    >
      {children}
    </InventoryContext.Provider>
  );
}

export function useInventoryState() {
  const context = useContext(InventoryContext);
  if (!context) {
    throw new Error("useInventoryState must be used inside InventoryProvider");
  }
  return context;
}
