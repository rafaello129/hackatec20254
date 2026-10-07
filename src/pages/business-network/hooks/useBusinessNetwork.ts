import { useEffect, useState } from "react";
import { analyzeNetworkProject, createNetworkPlan, getInitialNetworkPlan, type AnalyzeNetworkProjectInput, type NetworkPlan } from "@/services/businessNetwork.service";
import type { NetworkAssistantMessage, NetworkProject } from "@/types/businessNetwork.types";

// Persist only editable inputs and connection IDs; reference data stays in the service.
const storageKey = "peek-network-plans-v1";
type SavedPlan = { project: NetworkProject; input: AnalyzeNetworkProjectInput; connected: string[] };
const isText = (value: unknown): value is string => typeof value === "string";
function isSavedPlan(value: unknown): value is SavedPlan {
  if (!value || typeof value !== "object") return false;
  const { project: p, input: i, connected } = value as SavedPlan;
  return !!p && !!i && [p.id, p.title, p.description, p.targetLocation, p.category].every(isText) &&
    [p.quantity, p.budgetMin, p.budgetMax].every((n) => typeof n === "number" && Number.isFinite(n) && n >= 0) &&
    ["draft", "analyzing", "optimized", "ready"].includes(p.status) &&
    [i.goal, i.quantity, i.budgetRange, i.targetLocation].every(isText) && Array.isArray(connected) && connected.every(isText);
}

function syncChainWithPartners(chainSteps: NetworkPlan["chainSteps"], partners: NetworkPlan["partners"]) {
  return chainSteps.map((step) => {
    const connected = partners.find((partner) => partner.connected && partner.type === step.type);
    if (!connected || (step.status !== "pending" && step.status !== "unresolved")) return step;
    return { ...step, partnerName: connected.name, status: "optimized" as const, description: "Aliado conectado y listo para coordinar esta etapa." };
  });
}

function loadPlans(): { plans: NetworkPlan[]; activeId: string } {
  const initial = getInitialNetworkPlan();
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) ?? "null");
    if (Array.isArray(saved?.plans) && saved.plans.length && saved.plans.every(isSavedPlan) &&
      new Set(saved.plans.map((p: SavedPlan) => p.project.id)).size === saved.plans.length) {
      const plans: NetworkPlan[] = saved.plans.map((entry: SavedPlan) => {
        const base = entry.project.id === initial.project.id ? initial : { partners: [], chainSteps: [], suggestions: [], messages: [], summary: null };
        const partners = base.partners.map((p) => ({ ...p, connected: entry.connected.includes(p.id) }));
        return { ...base, project: entry.project, input: entry.input, partners, chainSteps: syncChainWithPartners(base.chainSteps, partners) };
      });
      return { plans, activeId: plans.some((p) => p.project.id === saved.activeId) ? saved.activeId : plans[0].project.id };
    }
  } catch { /* Fall back to the initial plan if storage is unavailable or invalid. */ }
  return { plans: [initial], activeId: initial.project.id };
}

export function useBusinessNetwork() {
  const [state, setState] = useState(loadPlans);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [storageWarning, setStorageWarning] = useState(false);
  const active = state.plans.find((plan) => plan.project.id === state.activeId) ?? state.plans[0];

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify({ activeId: state.activeId, plans: state.plans.map((plan) => ({ project: plan.project, input: plan.input, connected: plan.partners.filter((p) => p.connected).map((p) => p.id) })) }));
      setStorageWarning(false);
    } catch { setStorageWarning(true); }
  }, [state]);

  function updatePlan(id: string, update: (plan: NetworkPlan) => NetworkPlan) {
    setState((current) => ({ ...current, plans: current.plans.map((plan) => plan.project.id === id ? update(plan) : plan) }));
  }
  function selectPlan(id: string) {
    setState((current) => current.plans.some((plan) => plan.project.id === id) ? { ...current, activeId: id } : current);
  }
  function addPlan(project: Omit<NetworkProject, "id" | "status">) {
    const plan = createNetworkPlan(project);
    setState((current) => ({ plans: [...current.plans, plan], activeId: plan.project.id }));
  }
  function updateBuilderInput(field: keyof AnalyzeNetworkProjectInput, value: string) {
    updatePlan(active.project.id, (plan) => ({ ...plan, input: { ...plan.input, [field]: value } }));
  }
  async function analyzeProject() {
    if (isAnalyzing) return;
    setIsAnalyzing(true);
    const id = active.project.id;
    try {
      const result = await analyzeNetworkProject(active.input, active.project);
      updatePlan(id, (plan) => ({ ...plan, project: result.project, messages: [result.message, ...plan.messages] }));
    } finally { setIsAnalyzing(false); }
  }
  function connectPartner(id: string) {
    updatePlan(active.project.id, (plan) => {
      const selected = plan.partners.find((partner) => partner.id === id);
      if (!selected || selected.connected) return plan;
      const partners = plan.partners.map((partner) => partner.id === id ? { ...partner, connected: true } : partner);
      const chainSteps = syncChainWithPartners(plan.chainSteps, partners);
      const hasOpenStep = chainSteps.some((step) => step.status === "pending" || step.status === "unresolved");
      const message: NetworkAssistantMessage = {
        id: `msg-connect-${Date.now()}`, role: "assistant",
        content: `${selected.name} se integró a la red. Actualicé la cadena productiva y marqué su etapa como optimizada.`,
        createdAt: new Date().toISOString(),
      };
      return { ...plan, partners, chainSteps, project: { ...plan.project, status: hasOpenStep ? plan.project.status : "ready" }, messages: [message, ...plan.messages] };
    });
  }

  return { ...active, plans: state.plans, activeId: active.project.id, selectPlan, addPlan, storageWarning,
    isLoading: false, isAnalyzing, builderInput: active.input, updateBuilderInput, analyzeProject, connectPartner };
}
