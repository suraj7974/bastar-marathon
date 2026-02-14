"use client";

import { useState, useEffect, useCallback } from "react";
import { useRegistrationStore } from "@/store/useRegistrationStore";
import { useStepStore } from "@/store/useStepStore";
import { step2Schema } from "@/lib/registration-schemas";
import { getUniqueIdentificationNumber, registrationsTable } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const CATEGORIES = ["5KM Run", "10KM Run", "21KM Half Marathon", "42KM Full Marathon"] as const;

const GENDERS = ["Male", "Female", "Other"] as const;

const DEFAULT_COUNTRY = "India";

export function Step2Details() {
  const { form, setForm, setIdentificationNumber } = useRegistrationStore();
  const { nextStep, previousStep } = useStepStore();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [countries, setCountries] = useState<string[]>([DEFAULT_COUNTRY]);
  const [states, setStates] = useState<string[]>([]);
  const [districts, setDistricts] = useState<string[]>([]);
  const [statesLoading, setStatesLoading] = useState(false);
  const [districtsLoading, setDistrictsLoading] = useState(false);
  const [countriesFetched, setCountriesFetched] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);

  const country = form.country?.trim() || DEFAULT_COUNTRY;
  const state = form.state?.trim() || "";
  const city = form.city?.trim() || "";

  const dobDate = form.dob ? new Date(form.dob) : undefined;
  const isDobValid = dobDate && !isNaN(dobDate.getTime());
  const today = new Date();
  today.setHours(23, 59, 59, 999);

  const loadStates = useCallback((countryName: string) => {
    if (!countryName.trim()) {
      setStates([]);
      return;
    }
    setStatesLoading(true);
    setStates([]);
    fetch(`/api/states?country=${encodeURIComponent(countryName)}`)
      .then((r) => r.json())
      .then((data) => setStates(Array.isArray(data) ? data : []))
      .catch(() => setStates([]))
      .finally(() => setStatesLoading(false));
  }, []);

  const loadDistricts = useCallback((countryName: string, stateName: string) => {
    if (!countryName.trim() || !stateName.trim()) {
      setDistricts([]);
      return;
    }
    setDistrictsLoading(true);
    setDistricts([]);
    fetch(
      `/api/cities?country=${encodeURIComponent(countryName)}&state=${encodeURIComponent(stateName)}`
    )
      .then((r) => r.json())
      .then((data) => setDistricts(Array.isArray(data) ? data : []))
      .catch(() => setDistricts([]))
      .finally(() => setDistrictsLoading(false));
  }, []);

  useEffect(() => {
    loadStates(country);
  }, [country, loadStates]);

  useEffect(() => {
    if (state) loadDistricts(country, state);
    else setDistricts([]);
  }, [country, state, loadDistricts]);

  const handleCountryOpenChange = useCallback(
    (open: boolean) => {
      if (open && !countriesFetched) {
        setCountriesFetched(true);
        fetch("/api/countries")
          .then((r) => r.json())
          .then((data) =>
            setCountries(Array.isArray(data) && data.length > 0 ? data : [DEFAULT_COUNTRY])
          )
          .catch(() => setCountries([DEFAULT_COUNTRY]));
      }
    },
    [countriesFetched]
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const payload = {
      fullName: form.fullName?.trim() ?? "",
      email: form.email?.trim() ?? "",
      dob: form.dob ?? "",
      category: form.category ?? "",
      gender: form.gender ?? "",
      country: country,
      state: state,
      city: city,
    };

    const result = step2Schema.safeParse(payload);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        const path = err.path[0];
        if (path && typeof path === "string") {
          fieldErrors[path] = err.message ?? "Invalid";
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setSubmitting(true);
    try {
      const identificationNumber = await getUniqueIdentificationNumber();
      const { error } = await registrationsTable().insert({
        phone: form.phone,
        full_name: result.data.fullName,
        email: result.data.email,
        date_of_birth: result.data.dob,
        category: result.data.category,
        gender: result.data.gender,
        country: result.data.country,
        state: result.data.state,
        city: result.data.city,
        wants_tshirt: false,
        t_shirt_size: null,
        payment_status: "PENDING",
        identification_number: identificationNumber,
      });

      if (error) throw error;

      setForm("fullName", result.data.fullName);
      setForm("email", result.data.email);
      setForm("dob", result.data.dob);
      setForm("category", result.data.category);
      setForm("gender", result.data.gender);
      setForm("country", result.data.country);
      setForm("state", result.data.state);
      setForm("city", result.data.city);
      setIdentificationNumber(identificationNumber);
      nextStep();
    } catch (err) {
      console.error("Registration save error:", err);
      setErrors({ email: "Could not save. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Step 2 — Your details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full name</Label>
            <Input
              id="fullName"
              value={form.fullName ?? ""}
              onChange={(e) => setForm("fullName", e.target.value)}
              placeholder="Full name"
              aria-invalid={!!errors.fullName}
            />
            {errors.fullName && <p className="text-sm text-destructive">{errors.fullName}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={form.email ?? ""}
              onChange={(e) => setForm("email", e.target.value)}
              placeholder="you@example.com"
              aria-invalid={!!errors.email}
            />
            {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
          </div>

          <div className="space-y-2">
            <Label>Date of birth</Label>
            <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
              <PopoverTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !isDobValid && "text-muted-foreground"
                  )}
                  aria-invalid={!!errors.dob}
                >
                  {isDobValid ? format(dobDate!, "PPP") : "Pick date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={isDobValid ? dobDate : undefined}
                  onSelect={(date: Date | undefined) => {
                    if (date) {
                      setForm("dob", format(date, "yyyy-MM-dd"));
                      setCalendarOpen(false);
                    }
                  }}
                  captionLayout="dropdown"
                  disabled={(date: Date) => date > today}
                />
              </PopoverContent>
            </Popover>
            {errors.dob && <p className="text-sm text-destructive">{errors.dob}</p>}
          </div>

          <div className="space-y-2">
            <Label>Gender</Label>
            <Select value={form.gender ?? ""} onValueChange={(v) => setForm("gender", v)}>
              <SelectTrigger className="w-full" aria-invalid={!!errors.gender}>
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                {GENDERS.map((g) => (
                  <SelectItem key={g} value={g}>
                    {g}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.gender && <p className="text-sm text-destructive">{errors.gender}</p>}
          </div>

          <div className="space-y-2">
            <Label>Category</Label>
            <Select value={form.category ?? ""} onValueChange={(v) => setForm("category", v)}>
              <SelectTrigger className="w-full" aria-invalid={!!errors.category}>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.category && <p className="text-sm text-destructive">{errors.category}</p>}
          </div>

          <div className="space-y-2">
            <Label>Country</Label>
            <Select
              value={form.country || DEFAULT_COUNTRY}
              onValueChange={(v) => {
                setForm("country", v);
                setForm("state", "");
                setForm("city", "");
              }}
              onOpenChange={handleCountryOpenChange}
            >
              <SelectTrigger className="w-full" aria-invalid={!!errors.country}>
                <SelectValue placeholder="Select country" />
              </SelectTrigger>
              <SelectContent>
                {countries.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.country && <p className="text-sm text-destructive">{errors.country}</p>}
          </div>

          <div className="space-y-2">
            <Label>State</Label>
            <Select
              value={form.state ?? ""}
              onValueChange={(v) => {
                setForm("state", v);
                setForm("city", "");
              }}
              disabled={!country || statesLoading}
            >
              <SelectTrigger className="w-full" aria-invalid={!!errors.state}>
                <SelectValue
                  placeholder={
                    statesLoading ? "Loading…" : !country ? "Select country first" : "Select state"
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {states.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.state && <p className="text-sm text-destructive">{errors.state}</p>}
          </div>

          <div className="space-y-2">
            <Label>District / City</Label>
            <Select
              value={form.city ?? ""}
              onValueChange={(v) => setForm("city", v)}
              disabled={!state || districtsLoading}
            >
              <SelectTrigger className="w-full" aria-invalid={!!errors.city}>
                <SelectValue
                  placeholder={
                    districtsLoading
                      ? "Loading…"
                      : !state
                        ? "Select state first"
                        : "Select district / city"
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {districts.map((d) => (
                  <SelectItem key={d} value={d}>
                    {d}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.city && <p className="text-sm text-destructive">{errors.city}</p>}
          </div>

          <div className="flex gap-2 pt-2">
            <Button type="button" variant="outline" onClick={previousStep}>
              Back
            </Button>
            <Button type="submit" disabled={submitting} className="flex-1">
              {submitting ? "Saving…" : "Continue"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
