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
    throw new Error(err?.error ?? "Failed to create order");
  }

  const paymentData = await response.json();

  const form = document.createElement("form");
  form.method = "POST";
  form.action = "https://secure.payu.in/_payment";

  Object.entries(paymentData).forEach(([key, value]) => {
    const input = document.createElement("input");
    input.type = "hidden";
    input.name = key;
    input.value = String(value);
    form.appendChild(input);
  });

  document.body.appendChild(form);
  form.submit();
}
