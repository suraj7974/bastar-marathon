import { NextResponse } from "next/server";
import crypto from "crypto";
import { format } from "date-fns";
import { ICICI_CONFIG } from "@/lib/constants";

interface CreateOrderBody {
  amount: number;
  name: string;
  email: string;
  phone: string;
  identification_number: string;
}

function generateICICIHash(params: Record<string, string>): string {
  // Sort keys alphabetically
  const sortedKeys = Object.keys(params).sort();

  // Concatenate values
  const data = sortedKeys.map((key) => params[key]).join("");

  // Generate HMAC-SHA256
  return crypto.createHmac("sha256", ICICI_CONFIG.key).update(data).digest("hex");
}

export async function POST(req: Request) {
  try {
    const body: CreateOrderBody = await req.json();
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

    const timestamp = Math.floor(Date.now() / 1000);
    const random = Math.floor(Math.random() * 99);
    const merchantTxnNo = `TXN${timestamp}${random}`;

    const txnDate = format(new Date(), "yyyyMMddHHmmss"); // Format: YYYYMMDDHHMMSS

    const payloadParams = {
      merchantId: ICICI_CONFIG.merchantId,
      aggregatorID: ICICI_CONFIG.aggregatorID,
      merchantTxnNo: merchantTxnNo,
      amount: body.amount.toFixed(2),
      currencyCode: "356", // INR
      payType: "0", // 0 for all
      customerEmailID: body.email,
      transactionType: "SALE",
      returnURL: `${baseUrl}/api/payment-callback`,
      txnDate: txnDate,
      customerMobileNo: body.phone,
      customerName: body.name,
      addlParam1: body.identification_number, // Storing identification_number here
    };

    // Generate secure hash
    const secureHash = generateICICIHash(payloadParams);

    // Final payload with secureHash
    const payload = {
      ...payloadParams,
      secureHash,
    };

    console.log("[ICICI] Request Payload:", JSON.stringify(payload, null, 2));

    // Call ICICI API
    const response = await fetch(ICICI_CONFIG.url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("[ICICI] API Error:", response.status, errorText);
      throw new Error(`ICICI API returned ${response.status}`);
    }

    const data = await response.json();
    console.log("[ICICI] Response Data:", JSON.stringify(data, null, 2));

    if (data.responseCode !== "R1000" && data.responseCode !== "0000") {
      console.error("[ICICI] Response Error (Logic):", data);
      throw new Error(data.respDescription || "Payment initiation failed");
    }

    // Return the redirect URL provided by ICICI
    // Append tranCtx to the redirectURI as required by the gateway
    const paymentUrl = `${data.redirectURI}?tranCtx=${data.tranCtx}`;

    return NextResponse.json({
      paymentUrl,
      txnid: merchantTxnNo,
    });
  } catch (error) {
    console.error("[create-order] Error:", error);
    return NextResponse.json(
      {
        error: "Failed to create order",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
