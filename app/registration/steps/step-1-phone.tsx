"use client";

import { useState } from "react";
import { useRegistrationStore } from "@/store/useRegistrationStore";
import { useStepStore } from "@/store/useStepStore";
import { step1Schema } from "@/lib/registration-schemas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function Step1Phone() {
  const { form, setForm } = useRegistrationStore();
  const { nextStep } = useStepStore();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const result = step1Schema.safeParse({ phone: form.phone.trim() });
    if (!result.success) {
      setError(result.error.errors[0]?.message ?? "Invalid phone");
      return;
    }
    setForm("phone", result.data.phone);
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Step 1 — Phone number</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="phone">Mobile number</Label>
            <Input
              id="phone"
              type="tel"
              inputMode="numeric"
              maxLength={10}
              placeholder="10-digit mobile number"
              value={form.phone}
              onChange={(e) => setForm("phone", e.target.value.replace(/\D/g, "").slice(0, 10))}
              aria-invalid={!!error}
            />
            {error && (
              <p className="text-sm text-destructive" role="alert">
                {error}
              </p>
            )}
          </div>
          <Button type="submit" className="w-full">
            Continue
          </Button>
        </CardContent>
      </Card>
    </form>
  );
}
