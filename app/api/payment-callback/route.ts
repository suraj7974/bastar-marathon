import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { REGISTRATION_SCHEMA, REGISTRATIONS_TABLE } from "@/lib/constants";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

async function handleCallback(identificationNumber: string | null, isSuccess: boolean) {
  if (!identificationNumber) {
    console.error("[payment-callback] No identification_number");
    return new NextResponse(null, {
      status: 302,
      headers: {
        Location: "/registration/payment-failure",
      },
    });
  }

  if (isSuccess) {
    if (supabaseUrl && supabaseAnonKey) {
      const supabase = createClient(supabaseUrl, supabaseAnonKey);
      await supabase
        .schema(REGISTRATION_SCHEMA)
        .from(REGISTRATIONS_TABLE)
        .update({ payment_status: "DONE" })
        .eq("identification_number", identificationNumber);
    }
    return new NextResponse(null, {
      status: 302,
      headers: {
        Location: `/registration/payment-success?identification_number=${identificationNumber}`,
      },
    });
  }

  return new NextResponse(null, {
    status: 302,
    headers: {
      Location: `/registration/payment-failure?identification_number=${identificationNumber}`,
    },
  });
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const identificationNumber = url.searchParams.get("identification_number");
  const success = url.searchParams.get("success") === "true";
  return await handleCallback(identificationNumber, success);
}

export async function POST(req: Request) {
  const url = new URL(req.url);
  let identificationNumber = url.searchParams.get("identification_number");
  let isSuccess = url.searchParams.get("success") === "true";

  try {
    const contentType = req.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
      const body = await req.json();
      if (body.addlParam1) identificationNumber = body.addlParam1;
      if (body.responseCode === "0000") isSuccess = true;
    } else {
      const body = await req.formData();
      const id = body.get("identification_number") || body.get("addlParam1");
      const succ = body.get("success");
      const respCode = body.get("responseCode");

      if (id) identificationNumber = String(id);
      if (succ === "true") isSuccess = true;
      if (respCode === "0000") isSuccess = true;
    }
  } catch (e) {
    console.error("[payment-callback] Error parsing body:", e);
  }

  return await handleCallback(identificationNumber, isSuccess);
}
