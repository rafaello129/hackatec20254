import {
  cooperativeActivitiesMock,
  cooperativeAgreementsMock,
  cooperativeKpisMock,
  cooperativeOpportunitiesMock,
  cooperativeParticipantsMock,
  negotiationMessagesMock,
  postAgreementServicesMock,
} from "@/data/mocks/cooperatives.mock";
import type {
  CooperativeActivity,
  CooperativeAgreement,
  CooperativeKpi,
  CooperativeOpportunity,
  CooperativeParticipant,
  NegotiationMessage,
  PostAgreementService,
} from "@/types/cooperatives.types";

export async function getCooperativeOpportunities(): Promise<CooperativeOpportunity[]> {
  return cooperativeOpportunitiesMock;
}

export async function getCooperativeOpportunityById(id: string): Promise<CooperativeOpportunity | undefined> {
  return cooperativeOpportunitiesMock.find((opportunity) => opportunity.id === id);
}

export async function getCooperativeKpis(): Promise<CooperativeKpi[]> {
  return cooperativeKpisMock;
}

export async function getCooperativeAgreements(): Promise<CooperativeAgreement[]> {
  return cooperativeAgreementsMock;
}

export async function getCooperativeAgreementByOpportunityId(opportunityId: string): Promise<CooperativeAgreement | undefined> {
  return cooperativeAgreementsMock.find((agreement) => agreement.opportunityId === opportunityId);
}

export async function getParticipantsByOpportunityId(opportunityId: string): Promise<CooperativeParticipant[]> {
  return cooperativeParticipantsMock.filter((participant) => participant.opportunityId === opportunityId);
}

export async function getActivitiesByOpportunityId(opportunityId: string): Promise<CooperativeActivity[]> {
  return cooperativeActivitiesMock.filter((activity) => activity.opportunityId === opportunityId);
}

export async function getNegotiationMessages(opportunityId: string): Promise<NegotiationMessage[]> {
  return negotiationMessagesMock.filter((message) => message.opportunityId === opportunityId);
}

export async function getPostAgreementServices(opportunityId: string): Promise<PostAgreementService[]> {
  const agreement = await getCooperativeAgreementByOpportunityId(opportunityId);
  return agreement?.postAgreementServices ?? postAgreementServicesMock.slice(0, 3);
}
