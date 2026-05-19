import { Plus } from "lucide-react";
import PageIntro from "@/components/common/PageIntro";
import NetworkAssistantPanel from "./components/NetworkAssistantPanel";
import NetworkProjectBuilder from "./components/NetworkProjectBuilder";
import NetworkQuickActions from "./components/NetworkQuickActions";
import NetworkSuggestionsPanel from "./components/NetworkSuggestionsPanel";
import NetworkSummaryBar from "./components/NetworkSummaryBar";
import ProductionChainVisualization from "./components/ProductionChainVisualization";
import RecommendedBusinessCards from "./components/RecommendedBusinessCards";
import { useBusinessNetwork } from "./hooks/useBusinessNetwork";

export default function BusinessNetworkPage() {
  const {
    isLoading,
    isAnalyzing,
    project,
    partners,
    chainSteps,
    suggestions,
    quickActions,
    messages,
    summary,
    builderInput,
    updateBuilderInput,
    analyzeProject,
    connectPartner,
  } = useBusinessNetwork();

  return (
    <div className="w-full max-w-full space-y-5 overflow-hidden">
      <PageIntro
        title="Red de negocios"
        description="Encuentra proveedores, servicios y aliados para construir operaciones comerciales completas."
        actions={
          <button className="inline-flex items-center gap-2 rounded-lg bg-[#4F7302] px-4 py-2 text-sm font-semibold text-white hover:bg-[#3E5902]">
            <Plus className="h-4 w-4" />
            Crear solicitud
          </button>
        }
      />

      {isLoading || !project || !summary ? (
        <div className="rounded-lg border border-[#c2c9bc] bg-white p-6 text-sm text-[#42493f]">Cargando red de negocios...</div>
      ) : (
        <>
          <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_340px] xl:items-start">
            <main className="min-w-0 space-y-4">
              <NetworkProjectBuilder input={builderInput} isAnalyzing={isAnalyzing} onChange={updateBuilderInput} onAnalyze={analyzeProject} />
              <section className="rounded-lg border border-[#c2c9bc] bg-white p-4">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#4F7302]">Proyecto activo</p>
                    <h2 className="font-['Hanken_Grotesk'] text-2xl font-bold text-[#1a1c18]">{project.title}</h2>
                    <p className="mt-1 max-w-3xl text-sm text-[#42493f]">{project.description}</p>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="rounded-lg border border-[#e2e3dc] bg-[#f9faf3] px-3 py-2"><p className="text-xs text-[#42493f]">Cantidad</p><p className="font-semibold text-[#1a1c18]">{project.quantity}</p></div>
                    <div className="rounded-lg border border-[#e2e3dc] bg-[#f9faf3] px-3 py-2"><p className="text-xs text-[#42493f]">Categoria</p><p className="font-semibold text-[#1a1c18]">{project.category}</p></div>
                    <div className="rounded-lg border border-[#e2e3dc] bg-[#f9faf3] px-3 py-2"><p className="text-xs text-[#42493f]">Destino</p><p className="font-semibold text-[#1a1c18]">{project.targetLocation}</p></div>
                  </div>
                </div>
              </section>
              <ProductionChainVisualization steps={chainSteps} />
              <RecommendedBusinessCards partners={partners} onConnect={connectPartner} />
            </main>
            <aside className="min-w-0 space-y-4">
              <NetworkSuggestionsPanel suggestions={suggestions} />
              <NetworkQuickActions actions={quickActions} />
              <NetworkAssistantPanel messages={messages} />
            </aside>
          </div>
          <NetworkSummaryBar summary={summary} />
        </>
      )}
    </div>
  );
}
