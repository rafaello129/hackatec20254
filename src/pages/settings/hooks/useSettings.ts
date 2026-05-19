import { useEffect, useMemo, useState } from "react";
import {
  getBusinessProfile,
  getConnectedServices,
  getSettingsAlerts,
  getTeamMembers,
  getUsageMetrics,
  saveBusinessProfile,
  toggleConnectedService,
} from "@/services/settings.service";
import type { BusinessProfile, ConnectedService, SettingsAlert, TeamMember, UsageMetric } from "@/types/settings.types";

const EMPTY_PROFILE: BusinessProfile = {
  id: "",
  companyName: "",
  industry: "sustainable_technology",
  website: "",
  description: "",
  logoAlt: "Logo empresarial",
};

export function useSettings() {
  const [isLoading, setIsLoading] = useState(true);
  const [savedProfile, setSavedProfile] = useState<BusinessProfile>(EMPTY_PROFILE);
  const [profileDraft, setProfileDraft] = useState<BusinessProfile>(EMPTY_PROFILE);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [connectedServices, setConnectedServices] = useState<ConnectedService[]>([]);
  const [usageMetrics, setUsageMetrics] = useState<UsageMetric[]>([]);
  const [alerts, setAlerts] = useState<SettingsAlert[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSavedAt, setLastSavedAt] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const loadSettings = async () => {
      setIsLoading(true);
      const [profile, members, services, metrics, alertData] = await Promise.all([
        getBusinessProfile(),
        getTeamMembers(),
        getConnectedServices(),
        getUsageMetrics(),
        getSettingsAlerts(),
      ]);

      if (!mounted) return;

      setSavedProfile(profile);
      setProfileDraft(profile);
      setTeamMembers(members);
      setConnectedServices(services);
      setUsageMetrics(metrics);
      setAlerts(alertData);
      setIsLoading(false);
    };

    void loadSettings();

    return () => {
      mounted = false;
    };
  }, []);

  const hasProfileChanges = useMemo(
    () => JSON.stringify(savedProfile) !== JSON.stringify(profileDraft),
    [profileDraft, savedProfile],
  );

  function updateProfileField<K extends keyof BusinessProfile>(field: K, value: BusinessProfile[K]) {
    setProfileDraft((current) => ({ ...current, [field]: value }));
  }

  async function handleSaveChanges() {
    if (isSaving) return;
    setIsSaving(true);
    const profile = await saveBusinessProfile(profileDraft);
    setSavedProfile(profile);
    setProfileDraft(profile);
    setLastSavedAt(new Date().toISOString());
    setIsSaving(false);
  }

  function handleCancelChanges() {
    setProfileDraft(savedProfile);
  }

  async function handleToggleService(serviceId: string) {
    setConnectedServices((current) =>
      current.map((service) =>
        service.id === serviceId ? { ...service, connected: !service.connected } : service,
      ),
    );
    await toggleConnectedService(serviceId);
  }

  return {
    alerts,
    connectedServices,
    handleCancelChanges,
    handleSaveChanges,
    handleToggleService,
    hasProfileChanges,
    isLoading,
    isSaving,
    lastSavedAt,
    profileDraft,
    teamMembers,
    updateProfileField,
    usageMetrics,
  };
}
