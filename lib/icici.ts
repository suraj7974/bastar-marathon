export async function initiatePayment(
  amount: number,
  formData: { name: string; email: string; phone: string },
  identificationNumber: string
): Promise<void> {
  const response = await fetch("/api/create-order", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      amount,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      identification_number: identificationNumber,
    }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err?.details || err?.error || "Failed to create order");
  }

  const data = await response.json();

  if (data.paymentUrl) {
    window.location.href = data.paymentUrl;
  } else {
    throw new Error("Invalid payment configuration received");
  }
}
