import { notFound } from "next/navigation";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SendConfirmationEmail } from "./send-confirmation-email";
import { REGISTRATION_SCHEMA, REGISTRATIONS_TABLE } from "@/lib/constants";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function PaymentSuccessPage({ searchParams }: Props) {
  const params = await searchParams;
  const identificationNumber =
    (typeof params.identification_number === "string"
      ? params.identification_number
      : (params.identification_number?.[0] ?? "")
    )?.trim() || "";

  if (!identificationNumber) {
    notFound();
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    notFound();
  }

  const supabase = createClient(supabaseUrl, supabaseKey);
  const { data: row, error } = await supabase
    .schema(REGISTRATION_SCHEMA)
    .from(REGISTRATIONS_TABLE)
    .select("identification_number")
    .eq("identification_number", identificationNumber)
    .maybeSingle();

  if (error || !row) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-muted/30 flex items-center justify-center p-4">
      <SendConfirmationEmail identificationNumber={identificationNumber} />
      <Card className="max-w-md w-full">
        <CardHeader>
          <CardTitle className="text-green-600">Registration complete</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Your payment was successful. Keep your identification number for your records.
          </p>
          <p className="font-mono text-lg font-medium bg-muted rounded-lg px-3 py-2">
            {identificationNumber}
          </p>
          <Button asChild className="w-full">
            <Link href="/">Back to home</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
