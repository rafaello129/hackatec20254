import { useMemo } from "react";
import { useInventoryState } from "../context/InventoryProvider";
import { useProductVerification } from "../context/ProductVerificationProvider";
import type { ProductCategory } from "@/types/inventory.types";
import {
  getProductSummary,
  getProductsNeedingAttention,
  getTopSellingProducts,
} from "../utils/product-display.utils";

export type {
  NewProductInput,
  StockAdjustmentInput,
  ProductAvailabilityFilter,
  ProductCategoryFilter,
  ProductVerificationFilter,
} from "@/types/inventory.types";

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  "Textiles",
  "Cerámica",
  "Cestería",
  "Decoración",
  "Accesorios",
  "Regalos",
];

export function useInventory() {
  const state = useInventoryState();
  const { getVerification } = useProductVerification();

  const summary = useMemo(
    () => getProductSummary(state.products),
    [state.products],
  );
  const attentionProducts = useMemo(
    () => getProductsNeedingAttention(state.products),
    [state.products],
  );
  const topSellingProducts = useMemo(
    () => getTopSellingProducts(state.products),
    [state.products],
  );

  const filteredProducts = useMemo(() => {
    const term = state.searchText.trim().toLowerCase();

    return state.products.filter((product) => {
      const matchesText =
        term.length === 0 ||
        product.name.toLowerCase().includes(term) ||
        product.category.toLowerCase().includes(term) ||
        product.sku.toLowerCase().includes(term);

      const matchesAvailability =
        state.availabilityFilter === "all" ||
        product.availability === state.availabilityFilter;

      const matchesCategory =
        state.categoryFilter === "all" ||
        product.category === state.categoryFilter;

      const matchesVerification =
        state.verificationFilter === "all" ||
        getVerification(product.id).status === state.verificationFilter;

      return (
        matchesText &&
        matchesAvailability &&
        matchesCategory &&
        matchesVerification
      );
    });
  }, [
    state.products,
    state.searchText,
    state.availabilityFilter,
    state.categoryFilter,
    state.verificationFilter,
    getVerification,
  ]);

  return {
    ...state,
    filteredProducts,
    summary,
    attentionProducts,
    topSellingProducts,
    getVerification,
    categoryOptions: PRODUCT_CATEGORIES,
  };
}
