import { create } from "zustand";
import type { Step1Form, Step2Form } from "@/lib/registration-schemas";

type RegistrationForm = Step1Form & Partial<Step2Form>;

interface RegistrationState {
  form: RegistrationForm;
  identificationNumber: string | null;
  setForm: <K extends keyof RegistrationForm>(field: K, value: RegistrationForm[K]) => void;
  setIdentificationNumber: (id: string) => void;
  reset: () => void;
}

const DEFAULT_COUNTRY = "India";

const initialForm: RegistrationForm = {
  phone: "",
  fullName: "",
  email: "",
  dob: "",
  category: "",
  gender: "",
  country: DEFAULT_COUNTRY,
  state: "",
  city: "",
};

export const useRegistrationStore = create<RegistrationState>((set) => ({
  form: initialForm,
  identificationNumber: null,

  setForm: (field, value) =>
    set((state) => ({
      form: { ...state.form, [field]: value },
    })),

  setIdentificationNumber: (id) => set({ identificationNumber: id }),

  reset: () =>
    set({
      form: initialForm,
      identificationNumber: null,
    }),
}));
