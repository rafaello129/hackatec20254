import type { ReactNode } from "react";
import { HashRouter } from "react-router-dom";
import { InventoryProvider } from "@/pages/inventory/context/InventoryProvider";
import { ProductVerificationProvider } from "@/pages/inventory/context/ProductVerificationProvider";

interface AppProvidersProps {
  children: ReactNode;
}

export default function AppProviders({ children }: AppProvidersProps) {
  return (
    <HashRouter>
      <InventoryProvider>
        <ProductVerificationProvider>
          {children}
        </ProductVerificationProvider>
      </InventoryProvider>
    </HashRouter>
  );
}
