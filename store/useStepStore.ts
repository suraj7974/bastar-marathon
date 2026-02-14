import { create } from "zustand";

const TOTAL_STEPS = 3;

interface StepState {
  currentStep: number;
  totalSteps: number;
  nextStep: () => void;
  previousStep: () => void;
  setStep: (step: number) => void;
}

export const useStepStore = create<StepState>((set) => ({
  currentStep: 1,
  totalSteps: TOTAL_STEPS,

  nextStep: () =>
    set((s) => ({
      currentStep: Math.min(s.currentStep + 1, TOTAL_STEPS),
    })),

  previousStep: () =>
    set((s) => ({
      currentStep: Math.max(s.currentStep - 1, 1),
    })),

  setStep: (step) =>
    set({
      currentStep: Math.max(1, Math.min(step, TOTAL_STEPS)),
    }),
}));
