import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { CreditCard, ShieldCheck, Lock, CheckCircle2, AlertCircle, Loader2, DollarSign, FileText, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

declare global {
  interface Window {
    Square?: {
      payments(
        appId: string,
        locationId: string
      ): Promise<{
        card(options?: Record<string, unknown>): Promise<{
          attach(selector: string): Promise<void>;
          tokenize(): Promise<{
            status: string;
            token?: string;
            errors?: Array<{ message: string }>;
          }>;
          destroy(): Promise<void>;
        }>;
      }>;
    };
  }
}

const SQUARE_APP_ID = import.meta.env.VITE_SQUARE_APP_ID as string | undefined;
const SQUARE_LOCATION_ID = import.meta.env.VITE_SQUARE_LOCATION_ID as string | undefined;
const SQUARE_ENV = (import.meta.env.VITE_SQUARE_ENV as string | undefined) ?? "sandbox";

const SDK_URL =
  SQUARE_ENV === "production"
    ? "https://web.squarecdn.com/v1/square.js"
    : "https://sandbox.web.squarecdn.com/v1/square.js";

type PaymentState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; paymentId: string }
  | { status: "error"; message: string };

export default function Pay() {
  const [customerName, setCustomerName] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [sdkReady, setSdkReady] = useState(false);
  const [sdkError, setSdkError] = useState<string | null>(null);
  const [paymentState, setPaymentState] = useState<PaymentState>({ status: "idle" });

  const cardRef = useRef<{
    attach(selector: string): Promise<void>;
    tokenize(): Promise<{ status: string; token?: string; errors?: Array<{ message: string }> }>;
    destroy(): Promise<void>;
  } | null>(null);
  const paymentsRef = useRef<Awaited<ReturnType<NonNullable<Window["Square"]>["payments"]>> | null>(null);
  const mountedRef = useRef(false);

  const credentialsConfigured = Boolean(SQUARE_APP_ID && SQUARE_LOCATION_ID);

  useEffect(() => {
    if (!credentialsConfigured) return;

    mountedRef.current = true;

    const existing = document.getElementById("square-sdk");
    if (existing) {
      initSquare();
      return;
    }

    const script = document.createElement("script");
    script.id = "square-sdk";
    script.src = SDK_URL;
    script.async = true;
    script.onload = () => {
      if (mountedRef.current) initSquare();
    };
    script.onerror = () => {
      if (mountedRef.current)
        setSdkError("Failed to load payment processor. Please refresh and try again.");
    };
    document.head.appendChild(script);

    return () => {
      mountedRef.current = false;
      cardRef.current?.destroy().catch(() => {});
    };
  }, [credentialsConfigured]);

  async function initSquare() {
    try {
      if (!window.Square) throw new Error("Square SDK not available");
      const payments = await window.Square.payments(SQUARE_APP_ID!, SQUARE_LOCATION_ID!);
      paymentsRef.current = payments;
      const card = await payments.card({
        style: {
          ".input-container": { borderColor: "rgba(255,255,255,0.15)", borderRadius: "8px" },
          ".input-container.is-focus": { borderColor: "hsl(0 88% 50%)" },
          input: { color: "#ffffff", fontSize: "15px" },
          "input::placeholder": { color: "rgba(255,255,255,0.35)" },
          ".message-text": { color: "rgba(255,255,255,0.6)" },
          ".message-icon": { color: "rgba(255,255,255,0.6)" },
        },
      });
      cardRef.current = card;
      await card.attach("#square-card-container");
      if (mountedRef.current) setSdkReady(true);
    } catch (err) {
      if (mountedRef.current)
        setSdkError("Payment widget failed to load. Please refresh and try again.");
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const parsedAmount = parseFloat(amount);
    if (!customerName.trim() || !invoiceNumber.trim() || isNaN(parsedAmount) || parsedAmount <= 0) {
      setPaymentState({ status: "error", message: "Please fill in all fields with valid values." });
      return;
    }
    if (!cardRef.current) {
      setPaymentState({ status: "error", message: "Card widget not ready. Please wait a moment and try again." });
      return;
    }

    setPaymentState({ status: "loading" });

    const result = await cardRef.current.tokenize();
    if (result.status !== "OK" || !result.token) {
      const msg = result.errors?.[0]?.message ?? "Card information is invalid. Please check and try again.";
      setPaymentState({ status: "error", message: msg });
      return;
    }

    const amountCents = Math.round(parsedAmount * 100);

    const response = await fetch("/api/payments/square", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: result.token,
        customerName: customerName.trim(),
        invoiceNumber: invoiceNumber.trim(),
        amountCents,
      }),
    });

    const data = (await response.json()) as { success?: boolean; paymentId?: string; error?: string };

    if (!response.ok || !data.success) {
      setPaymentState({ status: "error", message: data.error ?? "Payment failed. Please try again or call us." });
      return;
    }

    setPaymentState({ status: "success", paymentId: data.paymentId ?? "" });
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />

      {/* Page Header */}
      <section className="bg-surface pt-32 pb-16 border-b border-white/5">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 mb-6">
              <CreditCard className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Secure Online Payment</span>
            </div>
            <h1 className="font-display font-bold text-4xl md:text-5xl text-white mb-4">
              Pay My Bill
            </h1>
            <p className="text-white/60 text-lg max-w-xl mx-auto">
              Securely pay your invoice online. Your payment is processed through Square — no card data touches our servers.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Payment Form */}
      <section className="flex-1 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-lg mx-auto">
            {!credentialsConfigured ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-surface border border-white/10 rounded-2xl p-10 text-center"
              >
                <CreditCard className="w-12 h-12 text-primary mx-auto mb-4" />
                <h2 className="font-display font-bold text-2xl text-white mb-3">Online Payments Coming Soon</h2>
                <p className="text-white/60 mb-6">
                  Our online payment portal is being set up. In the meantime, please call us to pay your invoice over the phone.
                </p>
                <a
                  href="tel:8136578888"
                  className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
                >
                  Call (813) 657-8888
                </a>
              </motion.div>
            ) : paymentState.status === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-surface border border-green-500/20 rounded-2xl p-10 text-center"
              >
                <div className="w-16 h-16 bg-green-500/15 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-9 h-9 text-green-400" />
                </div>
                <h2 className="font-display font-bold text-2xl text-white mb-3">Payment Successful!</h2>
                <p className="text-white/60 mb-2">
                  Thank you, <span className="text-white font-medium">{customerName}</span>.
                </p>
                <p className="text-white/60 mb-6">
                  Invoice <span className="text-white font-medium">#{invoiceNumber}</span> has been paid for{" "}
                  <span className="text-white font-medium">${parseFloat(amount).toFixed(2)}</span>.
                </p>
                {paymentState.paymentId && (
                  <p className="text-white/40 text-sm mb-8">
                    Confirmation ID: {paymentState.paymentId}
                  </p>
                )}
                <Button
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10"
                  onClick={() => {
                    setPaymentState({ status: "idle" });
                    setCustomerName("");
                    setInvoiceNumber("");
                    setAmount("");
                    setSdkReady(false);
                    cardRef.current = null;
                    paymentsRef.current = null;
                    setTimeout(() => initSquare(), 100);
                  }}
                >
                  Make Another Payment
                </Button>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-surface border border-white/10 rounded-2xl p-8 md:p-10"
              >
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Customer Name */}
                  <div className="space-y-2">
                    <Label htmlFor="customerName" className="text-white/80 text-sm font-medium flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5" />
                      Your Name
                    </Label>
                    <Input
                      id="customerName"
                      type="text"
                      placeholder="Full name or business name"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      required
                      className="bg-white/5 border-white/15 text-white placeholder:text-white/30 focus:border-primary focus:ring-primary/20 h-11"
                    />
                  </div>

                  {/* Invoice Number */}
                  <div className="space-y-2">
                    <Label htmlFor="invoiceNumber" className="text-white/80 text-sm font-medium flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5" />
                      Invoice Number
                    </Label>
                    <Input
                      id="invoiceNumber"
                      type="text"
                      placeholder="e.g. INV-1042"
                      value={invoiceNumber}
                      onChange={(e) => setInvoiceNumber(e.target.value)}
                      required
                      className="bg-white/5 border-white/15 text-white placeholder:text-white/30 focus:border-primary focus:ring-primary/20 h-11"
                    />
                  </div>

                  {/* Amount */}
                  <div className="space-y-2">
                    <Label htmlFor="amount" className="text-white/80 text-sm font-medium flex items-center gap-1.5">
                      <DollarSign className="w-3.5 h-3.5" />
                      Amount (USD)
                    </Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 font-medium select-none">$</span>
                      <Input
                        id="amount"
                        type="number"
                        min="0.01"
                        step="0.01"
                        placeholder="0.00"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                        className="bg-white/5 border-white/15 text-white placeholder:text-white/30 focus:border-primary focus:ring-primary/20 h-11 pl-7"
                      />
                    </div>
                  </div>

                  {/* Square Card Widget */}
                  <div className="space-y-2">
                    <Label className="text-white/80 text-sm font-medium flex items-center gap-1.5">
                      <CreditCard className="w-3.5 h-3.5" />
                      Card Information
                    </Label>
                    <div
                      className={`rounded-xl border transition-colors min-h-[56px] ${
                        sdkReady
                          ? "border-white/15"
                          : "border-white/10 bg-white/5 flex items-center justify-center"
                      }`}
                    >
                      <div id="square-card-container" className="w-full" />
                      {!sdkReady && !sdkError && (
                        <div className="flex items-center gap-2 text-white/40 text-sm py-4">
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Loading secure card form…
                        </div>
                      )}
                      {sdkError && (
                        <div className="flex items-center gap-2 text-red-400 text-sm py-4 px-3">
                          <AlertCircle className="w-4 h-4 shrink-0" />
                          {sdkError}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Error message */}
                  {paymentState.status === "error" && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-start gap-2.5 bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-red-400 text-sm"
                    >
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      {paymentState.message}
                    </motion.div>
                  )}

                  {/* Submit */}
                  <Button
                    type="submit"
                    size="lg"
                    disabled={
                      !sdkReady ||
                      paymentState.status === "loading" ||
                      !customerName.trim() ||
                      !invoiceNumber.trim() ||
                      !amount
                    }
                    className="w-full bg-primary hover:bg-primary/90 text-white font-bold text-base h-13 shadow-lg shadow-primary/30 disabled:opacity-40"
                  >
                    {paymentState.status === "loading" ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Processing…
                      </>
                    ) : (
                      <>
                        <Lock className="w-4 h-4 mr-2" />
                        Pay ${amount ? parseFloat(amount).toFixed(2) : "0.00"}
                      </>
                    )}
                  </Button>

                  {/* Trust badges */}
                  <div className="flex items-center justify-center gap-6 pt-2 border-t border-white/5">
                    <div className="flex items-center gap-1.5 text-white/35 text-xs">
                      <Lock className="w-3 h-3" />
                      SSL Encrypted
                    </div>
                    <div className="flex items-center gap-1.5 text-white/35 text-xs">
                      <ShieldCheck className="w-3 h-3" />
                      Powered by Square
                    </div>
                  </div>
                </form>
              </motion.div>
            )}

            {/* Help text */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-center text-white/40 text-sm mt-6"
            >
              Questions about your invoice?{" "}
              <a href="tel:8136578888" className="text-primary hover:text-primary/80 transition-colors">
                Call (813) 657-8888
              </a>
            </motion.p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
