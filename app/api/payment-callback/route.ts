import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { REGISTRATION_SCHEMA, REGISTRATIONS_TABLE } from "@/lib/constants";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

async function handleCallback(url: URL) {
  const identificationNumber = url.searchParams.get("identification_number");
  const success = url.searchParams.get("success");

  if (!identificationNumber) {
    console.error("[payment-callback] No identification_number");
    return new NextResponse(null, {
      status: 302,
      headers: {
        Location: "/registration/payment-failure",
      },
    });
  }

  if (success === "true") {
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
  return await handleCallback(new URL(req.url));
}

export async function POST(req: Request) {
  const url = new URL(req.url);
  try {
    const body = await req.formData();
    const id = body.get("identification_number") ?? url.searchParams.get("identification_number");
    const succ = body.get("success") ?? url.searchParams.get("success");
    if (id) url.searchParams.set("identification_number", String(id));
    if (succ) url.searchParams.set("success", String(succ));
  } catch {
    // use URL params only
  }
  return await handleCallback(url);
}
