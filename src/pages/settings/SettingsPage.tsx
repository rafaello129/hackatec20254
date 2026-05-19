import PageIntro from "@/components/common/PageIntro";
import BusinessProfileCard from "./components/BusinessProfileCard";
import ConnectedServicesCard from "./components/ConnectedServicesCard";
import EnterpriseLogoCard from "./components/EnterpriseLogoCard";
import InstantAlertsCard from "./components/InstantAlertsCard";
import SettingsHeaderActions from "./components/SettingsHeaderActions";
import TeamAccessCard from "./components/TeamAccessCard";
import UsageStatsCards from "./components/UsageStatsCards";
import { useSettings } from "./hooks/useSettings";

export default function SettingsPage() {
  const {
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
  } = useSettings();

  if (isLoading) {
    return (
      <div className="rounded-lg border border-[#c2c9bc] bg-white p-6 text-sm text-[#42493f]">
        Cargando ajustes del sistema...
      </div>
    );
  }

  return (
    <div className="w-full max-w-full space-y-5 overflow-hidden">
      <PageIntro
        title="Ajustes"
        description="Administra la configuración empresarial, permisos del equipo y servicios conectados."
        actions={
          <SettingsHeaderActions
            hasChanges={hasProfileChanges}
            isSaving={isSaving}
            onCancel={handleCancelChanges}
            onSave={handleSaveChanges}
          />
        }
      />

      {lastSavedAt ? (
        <div className="rounded-lg border border-[#D6D979] bg-[#f4f6d6] px-4 py-2 text-sm font-medium text-[#3E5902]">
          Cambios guardados localmente para esta sesión.
        </div>
      ) : null}

      <div className="grid w-full max-w-full gap-4 xl:grid-cols-[minmax(0,2fr)_minmax(280px,1fr)] xl:items-start">
        <div className="min-w-0 space-y-4">
          <BusinessProfileCard profile={profileDraft} onChange={updateProfileField} />
          <TeamAccessCard members={teamMembers} />
        </div>

        <aside className="min-w-0 space-y-4">
          <EnterpriseLogoCard profile={profileDraft} />
          <ConnectedServicesCard services={connectedServices} onToggle={handleToggleService} />
          <InstantAlertsCard alert={alerts[0]} />
        </aside>
      </div>

      <UsageStatsCards metrics={usageMetrics} />
    </div>
  );
}
