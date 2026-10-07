import { useMemo, useState } from "react";
import { ArrowLeft, FileQuestion } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import AdjustStockModal from "./components/AdjustStockModal";
import ProductDetailHero from "./components/ProductDetailHero";
import ProductEconomicsCard from "./components/ProductEconomicsCard";
import ProductInventoryCard from "./components/ProductInventoryCard";
import ProductMovementTimeline from "./components/ProductMovementTimeline";
import ProductSupplierCard from "./components/ProductSupplierCard";
import ProductOriginCard from "./components/verification/ProductOriginCard";
import ProductVerificationHero from "./components/verification/ProductVerificationHero";
import VerificationActionModal from "./components/verification/VerificationActionModal";
import VerificationChecklist from "./components/verification/VerificationChecklist";
import VerificationEvidenceGrid from "./components/verification/VerificationEvidenceGrid";
import VerificationEvidenceModal from "./components/verification/VerificationEvidenceModal";
import VerificationInfoDisclosure from "./components/verification/VerificationInfoDisclosure";
import VerificationTimeline from "./components/verification/VerificationTimeline";
import { useInventoryState } from "./context/InventoryProvider";
import { useProductVerification } from "./context/ProductVerificationProvider";
import type { ProductVerificationEvidence } from "@/types/product-verification.types";

export default function ProductDetailPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const {
    isLoading,
    products,
    adjustStock,
    getMovementsByProduct,
  } = useInventoryState();
  const {
    isLoading: verificationLoading,
    getVerification,
    requestVerification,
    completeEvidence,
  } = useProductVerification();

  const [stockDirection, setStockDirection] = useState<
    "add" | "remove" | null
  >(null);
  const [actionOpen, setActionOpen] = useState(false);
  const [selectedEvidence, setSelectedEvidence] =
    useState<ProductVerificationEvidence | null>(null);

  const product = useMemo(
    () => products.find((item) => item.id === productId) ?? null,
    [products, productId],
  );

  const movements = useMemo(
    () => (productId ? getMovementsByProduct(productId) : []),
    [getMovementsByProduct, productId],
  );

  if (isLoading || verificationLoading) {
    return (
      <div className="space-y-5 pb-8">
        <div className="h-10 w-36 animate-pulse rounded-full bg-[#EEF1EB]" />
        <div className="h-[470px] animate-pulse rounded-[26px] border border-[var(--oe-border)] bg-white" />
        <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_360px]">
          <div className="h-[220px] animate-pulse rounded-[24px] border border-[var(--oe-border)] bg-white" />
          <div className="h-[220px] animate-pulse rounded-[24px] border border-[var(--oe-border)] bg-white" />
        </div>
      </div>
    );
  }

  if (!product || !productId) {
    return (
      <div className="grid min-h-[60vh] place-items-center">
        <section className="max-w-[440px] rounded-[26px] border border-[var(--oe-border)] bg-white p-8 text-center">
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-[18px] bg-[#F2F5EF] text-[#66736A]">
            <FileQuestion className="h-6 w-6" />
          </span>
          <h1 className="mt-5 text-[22px] font-semibold text-[#263129]">
            No encontramos este producto
          </h1>
          <p className="mt-2 text-[12px] leading-5 text-[#7A867E]">
            Puede que haya sido eliminado o que el enlace ya no esté disponible.
          </p>
          <button
            type="button"
            onClick={() => navigate("/inventory")}
            className="mt-5 h-10 rounded-full bg-[var(--peek-brand-900)] px-5 text-[11px] font-semibold text-white"
          >
            Volver a Productos
          </button>
        </section>
      </div>
    );
  }

  const verification = getVerification(product.id);
  const hasChecks = verification.checks.length > 0;
  const hasEvidence = verification.evidence.length > 0;
  const hasTimeline = verification.timeline.length > 0;

  return (
    <div className="space-y-5 pb-8">
      <button
        type="button"
        onClick={() => navigate("/inventory")}
        className="inline-flex min-h-10 items-center gap-2 rounded-full px-1 text-[12px] font-semibold text-[#536057] transition hover:text-[var(--oe-primary)]"
      >
        <ArrowLeft className="h-4 w-4" />
        Volver a Productos
      </button>

      <ProductDetailHero
        product={product}
        verificationStatus={verification.status}
        onAdjust={setStockDirection}
      />

      <section className="grid items-start gap-4 xl:grid-cols-[minmax(0,1fr)_360px]">
        <ProductVerificationHero
          verification={verification}
          onAction={() => setActionOpen(true)}
        />

        <aside className="space-y-3">
          {hasTimeline ? (
            <VerificationTimeline timeline={verification.timeline} />
          ) : null}
          <VerificationInfoDisclosure />
        </aside>
      </section>

      {(hasChecks || verification.origin) ? (
        <section className="grid items-start gap-4 lg:grid-cols-2">
          <VerificationChecklist checks={verification.checks} />
          <ProductOriginCard origin={verification.origin} />
        </section>
      ) : null}

      {hasEvidence ? (
        <VerificationEvidenceGrid
          evidence={verification.evidence}
          onOpen={setSelectedEvidence}
        />
      ) : null}

      <section className="grid items-stretch gap-4 md:grid-cols-2 xl:grid-cols-3">
        <ProductInventoryCard
          product={product}
          onAdjust={setStockDirection}
        />
        <ProductEconomicsCard product={product} />
        <ProductSupplierCard
          product={product}
          origin={verification.origin}
        />
      </section>

      <section className="grid items-start gap-4 xl:grid-cols-[minmax(0,1.5fr)_360px]">
        <ProductMovementTimeline movements={movements} />

        <aside className="rounded-[24px] border border-[var(--oe-border)] bg-white p-5 sm:p-6">
          <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[#7A867E]">
            Notas
          </p>
          <h2 className="mt-1 text-[18px] font-semibold text-[#263129]">
            Contexto del producto
          </h2>
          <div className="mt-4 rounded-[16px] bg-[#F6F7F3] p-4 text-[11px] leading-5 text-[#657068]">
            {product.notes || "No hay notas registradas para este producto."}
          </div>
        </aside>
      </section>

      <AdjustStockModal
        product={product}
        direction={stockDirection}
        onClose={() => setStockDirection(null)}
        onSave={adjustStock}
      />

      {actionOpen ? (
        <VerificationActionModal
          productName={product.name}
          verification={verification}
          onClose={() => setActionOpen(false)}
          onRequest={() => requestVerification(product.id)}
          onCompleteEvidence={(title, description) =>
            completeEvidence(product.id, {
              type: "photo",
              title,
              description,
            })
          }
        />
      ) : null}

      <VerificationEvidenceModal
        evidence={selectedEvidence}
        onClose={() => setSelectedEvidence(null)}
      />
    </div>
  );
}
