import React from "react";
import { useNavigate } from "react-router-dom";
import CreateCooperativeStepper from "./components/CreateCooperativeStepper";
import InitiativeTypeGrid from "./components/InitiativeTypeGrid";
import CreateCooperativeFooter from "./components/CreateCooperativeFooter";
import BasicInfoStep from "./components/BasicInfoStep";
import RequirementsStep from "./components/RequirementsStep";
import TimelineStep from "./components/TimelineStep";

const steps = ["Tipo de iniciativa", "Información básica", "Requisitos", "Cronograma"];

export default function CreateCooperativePage() {
  const navigate = useNavigate();

  const [step, setStep] = React.useState(0);
  const [selectedType, setSelectedType] = React.useState<string | null>("compra_conjunta");

  const [basicInfo, setBasicInfo] = React.useState({
    name: "",
    description: "",
    organizer: "",
    category: "",
    location: "",
    goal: "",
    targetAmount: "",
    participantsRequired: "",
  });

  const [requirements, setRequirements] = React.useState({
    minContribution: "",
    contributionType: "capital",
    productOrService: "",
    minQuantity: "",
    participationDeadline: "",
    conditions: "",
    documents: "",
  });

  const [services, setServices] = React.useState<string[]>([]);

  const [timeline, setTimeline] = React.useState({
    registrationDeadline: "",
    negotiationDate: "",
    executionDate: "",
    deliveryDate: "",
  });

  // Validation checks
  const canProceedFromStep = (s: number) => {
    if (s === 0) return !!selectedType;
    if (s === 1) return basicInfo.name.trim().length > 0;
    if (s === 2) return (requirements.minContribution.trim().length > 0) || services.length > 0;
    return true;
  };

  const handleNext = () => {
    if (!canProceedFromStep(step)) return;
    if (step < 3) setStep((s) => s + 1);
    else {
      // final create simulated
      // show a short success state then redirect
      // For now, redirect to /cooperatives
      navigate("/cooperatives");
    }
  };

  const handleBack = () => setStep((s) => Math.max(0, s - 1));

  return (
    <div className="space-y-6 pb-28"> {/* extra bottom padding for sticky footer */}
      <CreateCooperativeStepper steps={steps} activeIndex={step} />

      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white/80 rounded-2xl px-8 py-8"> 
          <div>
            {step === 0 && (
              <div className="max-w-5xl mx-auto">
                <h1 className="text-center font-['Hanken_Grotesk'] text-3xl font-bold text-[#1a1c18]">Crear nueva iniciativa</h1>
                <p className="mt-4 text-center text-sm text-[#42493f]">Selecciona el tipo de iniciativa cooperativa que quieres lanzar. Cada tipo definirá campos sugeridos, métricas y servicios post-acuerdo disponibles.</p>

                <div className="mt-8 mb-12">
                  <InitiativeTypeGrid selected={selectedType} onSelect={setSelectedType} />
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="py-6">
                <BasicInfoStep value={basicInfo} onChange={setBasicInfo} />
              </div>
            )}

            {step === 2 && (
              <div className="py-6">
                <RequirementsStep value={requirements} onChange={setRequirements} services={services} onToggleService={(s) => {
                  setServices((prev) => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);
                }} />
              </div>
            )}

            {step === 3 && (
              <div className="py-6">
                <TimelineStep value={timeline} onChange={setTimeline} />
              </div>
            )}
          </div>
        </div>
      </div>

      <CreateCooperativeFooter
        onCancel={() => navigate('/cooperatives')}
        onNext={handleNext}
        onBack={handleBack}
        step={step}
        disabledNext={!canProceedFromStep(step)}
      />
    </div>
  );
}
