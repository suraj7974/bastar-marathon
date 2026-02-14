"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PaymentFailurePage() {
  const searchParams = useSearchParams();
  const identificationNumber = searchParams?.get("identification_number") ?? "";

  return (
    <div className="min-h-screen bg-muted/30 flex items-center justify-center p-4">
      <Card className="max-w-md w-full border-destructive/50">
        <CardHeader>
          <CardTitle className="text-destructive">Payment failed</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Your payment could not be completed. You can try again from the registration page.
          </p>
          {identificationNumber && (
            <p className="text-sm text-muted-foreground">
              Reference: <span className="font-mono">{identificationNumber}</span>
            </p>
          )}
          <div className="flex gap-2">
            <Button asChild variant="outline" className="flex-1">
              <Link href="/">Home</Link>
            </Button>
            <Button asChild className="flex-1">
              <Link href="/registration">Try again</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
