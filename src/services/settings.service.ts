import {
  businessProfileMock,
  connectedServicesMock,
  settingsAlertsMock,
  teamMembersMock,
  usageMetricsMock,
} from "@/data/mocks/settings.mock";
import type { BusinessProfile } from "@/types/settings.types";

export async function getBusinessProfile() {
  return businessProfileMock;
}

export async function getTeamMembers() {
  return teamMembersMock;
}

export async function getConnectedServices() {
  return connectedServicesMock;
}

export async function getUsageMetrics() {
  return usageMetricsMock;
}

export async function getSettingsAlerts() {
  return settingsAlertsMock;
}

export async function saveBusinessProfile(profile: BusinessProfile) {
  return profile;
}

export async function toggleConnectedService(serviceId: string) {
  const service = connectedServicesMock.find((item) => item.id === serviceId);
  return {
    serviceId,
    connected: service ? !service.connected : false,
  };
}
