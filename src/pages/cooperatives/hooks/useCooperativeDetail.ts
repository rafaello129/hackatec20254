import { useEffect, useMemo, useState } from "react";
import {
  getActivitiesByOpportunityId,
  getCooperativeAgreementByOpportunityId,
  getCooperativeOpportunityById,
  getNegotiationMessages,
  getParticipantsByOpportunityId,
  getPostAgreementServices,
} from "@/services/cooperatives.service";
import type {
  CooperativeActivity,
  CooperativeAgreement,
  CooperativeOpportunity,
  CooperativeParticipant,
  NegotiationMessage,
  PostAgreementService,
} from "@/types/cooperatives.types";

export function useCooperativeDetail(opportunityId?: string) {
  const [isLoading, setIsLoading] = useState(true);
  const [opportunity, setOpportunity] = useState<CooperativeOpportunity | null>(null);
  const [agreement, setAgreement] = useState<CooperativeAgreement | null>(null);
  const [participants, setParticipants] = useState<CooperativeParticipant[]>([]);
  const [activities, setActivities] = useState<CooperativeActivity[]>([]);
  const [messages, setMessages] = useState<NegotiationMessage[]>([]);
  const [services, setServices] = useState<PostAgreementService[]>([]);

  useEffect(() => {
    let mounted = true;
    const id = opportunityId ?? "coop-1001";
    const load = async () => {
      setIsLoading(true);
      const [opportunityData, agreementData, participantsData, activitiesData, messagesData, servicesData] =
        await Promise.all([
          getCooperativeOpportunityById(id),
          getCooperativeAgreementByOpportunityId(id),
          getParticipantsByOpportunityId(id),
          getActivitiesByOpportunityId(id),
          getNegotiationMessages(id),
          getPostAgreementServices(id),
        ]);
      if (!mounted) return;
      setOpportunity(opportunityData ?? null);
      setAgreement(agreementData ?? null);
      setParticipants(participantsData);
      setActivities(activitiesData);
      setMessages(messagesData);
      setServices(servicesData);
      setIsLoading(false);
    };
    void load();
    return () => {
      mounted = false;
    };
  }, [opportunityId]);

  const timeline = useMemo(() => {
    const status = opportunity?.status ?? "published";
    const order = ["published", "negotiation", "in_agreement", "active", "in_delivery", "completed"];
    const currentIndex = order.includes(status) ? order.indexOf(status) : 0;
    return [
      { key: "published", label: "Publicada", state: currentIndex > 0 ? "done" : currentIndex === 0 ? "current" : "pending" },
      { key: "negotiation", label: "Negociación", state: currentIndex > 1 ? "done" : currentIndex === 1 ? "current" : "pending" },
      { key: "in_agreement", label: "Acuerdo", state: currentIndex > 2 ? "done" : currentIndex === 2 ? "current" : "pending" },
      { key: "active", label: "Ejecución", state: currentIndex > 3 ? "done" : currentIndex === 3 ? "current" : "pending" },
      { key: "in_delivery", label: "Entrega", state: currentIndex > 4 ? "done" : currentIndex === 4 ? "current" : "pending" },
      { key: "completed", label: "Finalización", state: currentIndex > 5 ? "done" : currentIndex === 5 ? "current" : "pending" },
    ] as const;
  }, [opportunity?.status]);

  return {
    isLoading,
    opportunity,
    agreement,
    participants,
    activities,
    messages,
    services,
    documents: agreement?.documents ?? [],
    timeline,
  };
}
