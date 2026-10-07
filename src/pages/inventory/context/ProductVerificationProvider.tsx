import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { createEmptyVerification } from "@/data/mocks/product-verification.mock";
import { getProductVerifications } from "@/services/product-verification.service";
import type {
  ProductVerification,
  ProductVerificationEvidence,
} from "@/types/product-verification.types";

interface ProductVerificationContextValue {
  isLoading: boolean;
  verifications: ProductVerification[];
  getVerification: (productId: string) => ProductVerification;
  requestVerification: (productId: string) => void;
  completeEvidence: (
    productId: string,
    evidence: Omit<ProductVerificationEvidence, "id" | "createdAt">,
  ) => void;
}

const ProductVerificationContext =
  createContext<ProductVerificationContextValue | null>(null);

export function ProductVerificationProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [verifications, setVerifications] = useState<ProductVerification[]>([]);

  useEffect(() => {
    let mounted = true;

    void getProductVerifications().then((data) => {
      if (!mounted) return;
      setVerifications(data);
      setIsLoading(false);
    });

    return () => {
      mounted = false;
    };
  }, []);

  const byProduct = useMemo(
    () =>
      new Map(
        verifications.map((verification) => [
          verification.productId,
          verification,
        ]),
      ),
    [verifications],
  );

  const getVerification = (productId: string) =>
    byProduct.get(productId) ?? createEmptyVerification(productId);

  const requestVerification = (productId: string) => {
    const today = new Date().toISOString().slice(0, 10);

    setVerifications((current) => {
      const existing = current.find(
        (item) => item.productId === productId,
      );

      const next: ProductVerification = {
        ...(existing ?? createEmptyVerification(productId)),
        status: "pending",
        submittedAt: existing?.submittedAt ?? today,
        checks: existing?.checks.length
          ? existing.checks
          : [
              {
                id: "identity",
                label: "Identidad del productor",
                description: "Pendiente de revisión.",
                status: "pending",
              },
              {
                id: "origin",
                label: "Taller u origen",
                description: "Pendiente de revisión.",
                status: "pending",
              },
              {
                id: "process",
                label: "Proceso artesanal",
                description: "Pendiente de revisión.",
                status: "pending",
              },
              {
                id: "link",
                label: "Producto vinculado",
                description: "Pendiente de revisión.",
                status: "pending",
              },
            ],
        timeline: [
          {
            id: "requested-" + Date.now(),
            label: "Solicitud recibida",
            description: "PÉEK recibió la solicitud de verificación.",
            date: today,
            status: "complete",
          },
          {
            id: "review-" + Date.now(),
            label: "Revisión en curso",
            description: "La información será revisada por PÉEK.",
            date: today,
            status: "current",
          },
          {
            id: "result-" + Date.now(),
            label: "Resultado",
            date: "",
            status: "pending",
          },
        ],
      };

      return existing
        ? current.map((item) =>
            item.productId === productId ? next : item,
          )
        : [...current, next];
    });
  };

  const completeEvidence = (
    productId: string,
    evidence: Omit<ProductVerificationEvidence, "id" | "createdAt">,
  ) => {
    const today = new Date().toISOString().slice(0, 10);

    setVerifications((current) =>
      current.map((item) => {
        if (item.productId !== productId) return item;

        return {
          ...item,
          status: "pending",
          evidence: [
            ...item.evidence,
            {
              ...evidence,
              id: "ev-local-" + Date.now(),
              createdAt: today,
            },
          ],
          checks: item.checks.map((check) =>
            check.status === "needs_action"
              ? {
                  ...check,
                  status: "pending",
                  description:
                    "Nueva evidencia recibida y pendiente de revisión.",
                }
              : check,
          ),
          timeline: [
            ...item.timeline.filter(
              (event) => event.status !== "pending",
            ),
            {
              id: "evidence-" + Date.now(),
              label: "Evidencia adicional recibida",
              description:
                "PÉEK recibió nueva evidencia para continuar la revisión.",
              date: today,
              status: "current",
            },
            {
              id: "result-" + Date.now(),
              label: "Resultado",
              date: "",
              status: "pending",
            },
          ],
        };
      }),
    );
  };

  return (
    <ProductVerificationContext.Provider
      value={{
        isLoading,
        verifications,
        getVerification,
        requestVerification,
        completeEvidence,
      }}
    >
      {children}
    </ProductVerificationContext.Provider>
  );
}

export function useProductVerification() {
  const context = useContext(ProductVerificationContext);
  if (!context) {
    throw new Error(
      "useProductVerification must be used inside ProductVerificationProvider",
    );
  }
  return context;
}
