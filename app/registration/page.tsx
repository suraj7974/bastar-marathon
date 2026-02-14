"use client";

import { useStepStore } from "@/store/useStepStore";
import { Step1Phone } from "./steps/step-1-phone";
import { Step2Details } from "./steps/step-2-details";
import { Step3Payment } from "./steps/step-3-payment";
import { cn } from "@/lib/utils";

const STEPS = [
  { label: "Phone", step: 1 },
  { label: "Details", step: 2 },
  { label: "Payment", step: 3 },
] as const;

export default function RegistrationPage() {
  const { currentStep } = useStepStore();

  return (
    <div className="min-h-screen bg-muted/30 py-8 px-4">
      <div className="max-w-2xl mx-auto space-y-8">
        <header className="text-center">
          <h1 className="text-2xl font-bold">Bastar Marathon — Registration</h1>
        </header>

        <nav className="flex justify-center gap-2" aria-label="Registration steps">
          {STEPS.map(({ label, step }) => (
            <div
              key={step}
              className={cn(
                "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                currentStep === step
                  ? "bg-primary text-primary-foreground"
                  : currentStep > step
                    ? "bg-primary/20 text-primary"
                    : "bg-muted text-muted-foreground"
              )}
            >
              {step}. {label}
            </div>
          ))}
        </nav>

        <section aria-live="polite">
          {currentStep === 1 && <Step1Phone />}
          {currentStep === 2 && <Step2Details />}
          {currentStep === 3 && <Step3Payment />}
        </section>
      </div>
    </div>
  );
}
