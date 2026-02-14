import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import nodemailer from "nodemailer";
import { getRegistrationEmailHtml } from "@/lib/registration-email-template";
import { REGISTRATION_SCHEMA, REGISTRATIONS_TABLE } from "@/lib/constants";

export async function POST(req: Request) {
  let identificationNumber: string;
  try {
    const body = await req.json().catch(() => ({}));
    identificationNumber =
      (body.identification_number ?? body.identificationNumber ?? "")?.trim() || "";
  } catch {
    identificationNumber = "";
  }

  if (!identificationNumber) {
    return NextResponse.json({ error: "Missing identification_number" }, { status: 400 });
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_ANON_KEY;
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT) || 587;
  const secure = process.env.SMTP_SECURE === "true";
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.SMTP_FROM ?? "Marathon <noreply@example.com>";

  if (!host || !user || !pass) {
    console.warn("[send-registration-email] SMTP not configured");
    return NextResponse.json({ error: "Email service not configured" }, { status: 503 });
  }

  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
  }

  const supabase = createClient(supabaseUrl, supabaseKey);
  const { data: row, error: fetchError } = await supabase
    .schema(REGISTRATION_SCHEMA)
    .from(REGISTRATIONS_TABLE)
    .select("email, full_name")
    .eq("identification_number", identificationNumber)
    .maybeSingle();

  if (fetchError || !row?.email) {
    console.error("[send-registration-email] Fetch error or no email:", fetchError);
    return NextResponse.json({ error: "Registration not found or no email" }, { status: 404 });
  }

  const participantName = (row.full_name as string) || "Participant";
  const html = getRegistrationEmailHtml({
    participantName,
    identificationNumber,
  });

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  });

  try {
    const info = await transporter.sendMail({
      from,
      to: row.email as string,
      subject: "Bastar Marathon — Registration confirmed",
      html,
    });
    return NextResponse.json({ ok: true, messageId: info.messageId });
  } catch (err) {
    console.error("[send-registration-email] SMTP error:", err);
    const message = err instanceof Error ? err.message : "Failed to send email";
    return NextResponse.json({ error: "Failed to send email", details: message }, { status: 500 });
  }
}
