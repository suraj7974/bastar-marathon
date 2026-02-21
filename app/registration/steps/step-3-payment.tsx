"use client";

import { useState } from "react";
import { useRegistrationStore } from "@/store/useRegistrationStore";
import { useStepStore } from "@/store/useStepStore";
import { registrationsTable } from "@/lib/supabase";
import { initiatePayment } from "@/lib/icici";
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

const REGISTRATION_FEE = 299;
const TSHIRT_FEE = 200;
const TSHIRT_SIZES = ["S", "M", "L", "XL", "XXL"] as const;

export function Step3Payment() {
  const { form, identificationNumber } = useRegistrationStore();
  const { previousStep } = useStepStore();
  const [wantsTshirt, setWantsTshirt] = useState(false);
  const [tshirtSize, setTshirtSize] = useState<string>("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isFree =
    form.city?.trim().toLowerCase() === "jagdalpur" || form.city?.trim().toLowerCase() === "bastar";
  const registrationFee = isFree ? 0 : REGISTRATION_FEE;
  const tshirtFee = wantsTshirt ? TSHIRT_FEE : 0;
  const totalFee = registrationFee + tshirtFee;

  const canProceedFree = isFree && !wantsTshirt && totalFee === 0 && acceptedTerms;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!acceptedTerms) {
      setError("Please accept the terms and policies to continue.");
      return;
    }
    if (!identificationNumber) {
      setError("Session error. Please go back and complete step 2 again.");
      return;
    }

    setSubmitting(true);
    try {
      await registrationsTable()
        .update({
          wants_tshirt: wantsTshirt,
          t_shirt_size: wantsTshirt && tshirtSize ? tshirtSize : null,
        })
        .eq("identification_number", identificationNumber);

      if (canProceedFree) {
        await registrationsTable()
          .update({ payment_status: "DONE" })
          .eq("identification_number", identificationNumber);

        window.location.href = `/registration/payment-success?identification_number=${identificationNumber}`;
        return;
      }

      await initiatePayment(
        totalFee,
        {
          name: form.fullName ?? "",
          email: form.email ?? "",
          phone: form.phone ?? "",
        },
        identificationNumber
      );
    } catch (err) {
      console.error("Payment error:", err);
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Step 3 — Fee &amp; payment</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3 rounded-lg border p-4">
            <div className="flex justify-between text-sm">
              <span>Registration fee</span>
              <span>₹{registrationFee}</span>
            </div>
            {isFree && (
              <p className="text-sm text-green-600">
                No registration fee for participants from Jagdalpur or Bastar.
              </p>
            )}
            <div className="flex items-center gap-3">
              <Input
                type="checkbox"
                id="tshirt"
                className="h-4 w-4"
                checked={wantsTshirt}
                onChange={(e) => setWantsTshirt(e.target.checked)}
              />
              <Label htmlFor="tshirt" className="cursor-pointer">
                Add T-shirt — ₹{TSHIRT_FEE}
              </Label>
            </div>
            {wantsTshirt && (
              <div className="space-y-2 pl-7">
                <Label>T-shirt size</Label>
                <Select value={tshirtSize} onValueChange={setTshirtSize}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    {TSHIRT_SIZES.map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            <div className="flex justify-between font-semibold border-t pt-2">
              <span>Total</span>
              <span>₹{totalFee}</span>
            </div>
          </div>

          <Card className="bg-muted/50">
            <CardHeader>
              <CardTitle className="text-sm">Policies &amp; terms</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm max-h-48 overflow-y-auto">
              <p>
                By registering you confirm that you are medically fit to participate and accept the
                risks involved in the event. You agree to follow all event rules and instructions.
                The organisers are not liable for any loss, injury or damage to person or property.
                Your image may be used for promotional purposes. Prizes, if any, may require valid
                ID proof for verification.
              </p>
            </CardContent>
          </Card>

          <div className="flex items-start gap-2">
            <Input
              type="checkbox"
              id="terms"
              className="mt-1 h-4 w-4 shrink-0"
              checked={acceptedTerms}
              onChange={(e) => setAcceptedTerms(e.target.checked)}
              aria-invalid={!!error && !acceptedTerms}
            />
            <Label htmlFor="terms" className="cursor-pointer text-sm">
              I have read and accept the terms, policies and fee details above.
            </Label>
          </div>

          {error && (
            <p className="text-sm text-destructive" role="alert">
              {error}
            </p>
          )}

          <div className="flex gap-2">
            <Button type="button" variant="outline" onClick={previousStep}>
              Back
            </Button>
            <Button type="submit" disabled={!acceptedTerms || submitting} className="flex-1">
              {submitting
                ? "Processing…"
                : canProceedFree
                  ? "Complete registration"
                  : "Proceed to payment"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
