import { Outlet } from "react-router-dom";
import PageIntro from "@/components/common/PageIntro";
import FinanceSectionTabs from "./components/FinanceSectionTabs";

export default function FinancePage() {
  return (
    <div className="space-y-6">
      <PageIntro
        title="Finanzas"
        description="Control financiero con vistas de resumen, contabilidad y facturación."
      />
      <FinanceSectionTabs />
      <Outlet />
    </div>
  );
}
