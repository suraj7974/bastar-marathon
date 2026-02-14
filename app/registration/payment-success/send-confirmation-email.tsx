"use client";

import { useEffect, useRef } from "react";

export function SendConfirmationEmail({ identificationNumber }: { identificationNumber: string }) {
  const sentRef = useRef(false);

  useEffect(() => {
    if (!identificationNumber || sentRef.current) return;
    sentRef.current = true;
    fetch("/api/send-registration-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ identification_number: identificationNumber }),
    }).catch(() => {});
  }, [identificationNumber]);

  return null;
}
