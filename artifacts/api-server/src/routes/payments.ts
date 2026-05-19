import { Router, type IRouter } from "express";

const router: IRouter = Router();

router.post("/payments/square", async (req, res): Promise<void> => {
  const { token, customerName, invoiceNumber, amountCents, email } = req.body as {
    token: unknown;
    customerName: unknown;
    invoiceNumber: unknown;
    amountCents: unknown;
    email: unknown;
  };

  if (
    typeof token !== "string" ||
    !token ||
    typeof customerName !== "string" ||
    !customerName ||
    typeof invoiceNumber !== "string" ||
    !invoiceNumber ||
    typeof amountCents !== "number" ||
    amountCents < 1 ||
    typeof email !== "string" ||
    !email
  ) {
    res.status(400).json({ error: "Missing or invalid required fields" });
    return;
  }

  const accessToken = process.env.SQUARE_ACCESS_TOKEN;
  const locationId = process.env.SQUARE_LOCATION_ID;
  const squareEnv = process.env.SQUARE_ENV ?? "sandbox";

  if (!accessToken || !locationId) {
    req.log.error("Square credentials not configured");
    res.status(500).json({ error: "Payment service not configured" });
    return;
  }

  const baseUrl =
    squareEnv === "production"
      ? "https://connect.squareup.com"
      : "https://connect.squareupsandbox.com";

  const idempotencyKey = crypto.randomUUID();

  const response = await fetch(`${baseUrl}/v2/payments`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      "Square-Version": "2024-01-17",
    },
    body: JSON.stringify({
      source_id: token,
      idempotency_key: idempotencyKey,
      amount_money: {
        amount: Math.round(amountCents),
        currency: "USD",
      },
      location_id: locationId,
      buyer_email_address: email,
      note: `Invoice #${invoiceNumber} – ${customerName}`,
    }),
  });

  const data = (await response.json()) as Record<string, unknown>;

  if (!response.ok) {
    const errors = data.errors as Array<{ detail?: string }> | undefined;
    const message = errors?.[0]?.detail ?? "Payment failed. Please try again.";
    req.log.warn({ status: response.status, message }, "Square payment failed");
    res.status(400).json({ error: message });
    return;
  }

  const payment = data.payment as Record<string, unknown> | undefined;
  req.log.info({ paymentId: payment?.id }, "Square payment succeeded");
  res.json({ success: true, paymentId: payment?.id });
});

export default router;
