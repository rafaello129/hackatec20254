import { useMemo, useState } from "react";
import { ArrowLeft, FileQuestion } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import AdjustStockModal from "./components/AdjustStockModal";
import ProductDetailHero from "./components/ProductDetailHero";
import ProductEconomicsCard from "./components/ProductEconomicsCard";
import ProductInventoryCard from "./components/ProductInventoryCard";
import ProductAuthenticityDetails from "./components/verification/ProductAuthenticityDetails";
import ProductVerificationHero from "./components/verification/ProductVerificationHero";
import VerificationActionModal from "./components/verification/VerificationActionModal";
import VerificationEvidenceModal from "./components/verification/VerificationEvidenceModal";
import { useInventoryState } from "./context/InventoryProvider";
import { useProductVerification } from "./context/ProductVerificationProvider";
import type { ProductVerificationEvidence } from "@/types/product-verification.types";

export default function ProductDetailPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { isLoading, products, adjustStock } = useInventoryState();
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

  if (isLoading || verificationLoading) {
    return (
      <div className="space-y-5 pb-8">
        <div className="h-10 w-36 animate-pulse rounded-full bg-[#EEF1EB]" />
        <div className="h-[470px] animate-pulse rounded-[26px] border border-[var(--oe-border)] bg-white" />
        <div className="h-[180px] animate-pulse rounded-[24px] border border-[var(--oe-border)] bg-white" />
        <div className="grid gap-4 md:grid-cols-2">
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
  const showDetails =
    verification.origin ||
    verification.checks.length > 0 ||
    verification.evidence.length > 0;

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

      <ProductVerificationHero
        verification={verification}
        onAction={() => setActionOpen(true)}
      />

      {showDetails ? (
        <ProductAuthenticityDetails
          verification={verification}
          onOpenEvidence={setSelectedEvidence}
        />
      ) : null}

      <section className="grid gap-4 md:grid-cols-2">
        <ProductInventoryCard
          product={product}
          onAdjust={setStockDirection}
        />
        <ProductEconomicsCard product={product} />
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
