import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { CreditCard, ShieldCheck, Lock, CheckCircle2, AlertCircle, Loader2, DollarSign, FileText, User, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
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

type SquareCard = {
  attach(selector: string): Promise<void>;
  tokenize(): Promise<{ status: string; token?: string; errors?: Array<{ message: string }> }>;
  destroy(): Promise<void>;
};

type PaymentState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; paymentId: string; customerName: string; invoiceNumber: string; amount: string; email: string }
  | { status: "error"; message: string };

const inputClass =
  "w-full bg-white/5 border border-white/15 text-white placeholder:text-white/30 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors";
const labelClass = "block text-white/70 text-sm font-medium mb-2";

export default function Pay() {
  const [customerName, setCustomerName] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [sdkReady, setSdkReady] = useState(false);
  const [sdkError, setSdkError] = useState<string | null>(null);
  const [paymentState, setPaymentState] = useState<PaymentState>({ status: "idle" });

  const cardRef = useRef<SquareCard | null>(null);
  const mountedRef = useRef(false);
  const initializingRef = useRef(false);

  const credentialsConfigured = Boolean(SQUARE_APP_ID && SQUARE_LOCATION_ID);

  useEffect(() => {
    if (!credentialsConfigured) return;
    mountedRef.current = true;
    initializingRef.current = false;

    // If Square SDK is already on the page and fully loaded, init immediately.
    if (window.Square) {
      void initSquare();
      return () => {
        mountedRef.current = false;
        if (cardRef.current) { cardRef.current.destroy().catch(() => {}); cardRef.current = null; }
      };
    }

    // Otherwise ensure the script tag exists and listen for load/error.
    let script = document.getElementById("square-sdk") as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement("script");
      script.id = "square-sdk";
      script.src = SDK_URL;
      script.async = true;
      document.head.appendChild(script);
    }

    const handleLoad = () => { if (mountedRef.current) void initSquare(); };
    const handleError = () => {
      if (mountedRef.current)
        setSdkError("Failed to load payment processor. Please refresh and try again.");
    };

    script.addEventListener("load", handleLoad);
    script.addEventListener("error", handleError);

    return () => {
      mountedRef.current = false;
      script!.removeEventListener("load", handleLoad);
      script!.removeEventListener("error", handleError);
      if (cardRef.current) { cardRef.current.destroy().catch(() => {}); cardRef.current = null; }
    };
  }, [credentialsConfigured]);

  async function initSquare() {
    if (initializingRef.current || cardRef.current) return;
    initializingRef.current = true;
    try {
      if (!window.Square) throw new Error("Square SDK not available");
      const payments = await window.Square.payments(SQUARE_APP_ID!, SQUARE_LOCATION_ID!);
      const card = await payments.card();
      if (!mountedRef.current) { await card.destroy(); return; }
      cardRef.current = card;
      await card.attach("#square-card-container");
      if (mountedRef.current) setSdkReady(true);
    } catch (err) {
      console.error("[Square] Init error:", err);
      initializingRef.current = false;
      if (mountedRef.current)
        setSdkError("Payment widget failed to load. Please refresh and try again.");
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const parsedAmount = parseFloat(amount);
    if (!customerName.trim() || !invoiceNumber.trim() || !email.trim() || isNaN(parsedAmount) || parsedAmount <= 0) {
      setPaymentState({ status: "error", message: "Please fill in all fields with valid values." });
      return;
    }
    if (!cardRef.current) {
      setPaymentState({ status: "error", message: "Card widget not ready. Please wait and try again." });
      return;
    }

    setPaymentState({ status: "loading" });

    const result = await cardRef.current.tokenize();
    if (result.status !== "OK" || !result.token) {
      setPaymentState({
        status: "error",
        message: result.errors?.[0]?.message ?? "Card information is invalid. Please check and try again.",
      });
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
        email: email.trim(),
        amountCents,
      }),
    });

    const data = (await response.json()) as { success?: boolean; paymentId?: string; error?: string };

    if (!response.ok || !data.success) {
      setPaymentState({ status: "error", message: data.error ?? "Payment failed. Please try again or call us." });
      return;
    }

    setPaymentState({
      status: "success",
      paymentId: data.paymentId ?? "",
      customerName: customerName.trim(),
      invoiceNumber: invoiceNumber.trim(),
      amount: parsedAmount.toFixed(2),
      email: email.trim(),
    });
  }

  function resetForm() {
    setPaymentState({ status: "idle" });
    setCustomerName("");
    setInvoiceNumber("");
    setEmail("");
    setAmount("");
    setSdkReady(false);
    setSdkError(null);
    cardRef.current = null;
    initializingRef.current = false;
    setTimeout(() => void initSquare(), 150);
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />

      {/* Page Header */}
      <section className="bg-surface pt-36 pb-16 border-b border-white/5">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 mb-6">
              <CreditCard className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Secure Online Payment</span>
            </div>
            <h1 className="font-display font-bold text-4xl md:text-5xl text-white mb-4">Pay My Bill</h1>
            <p className="text-white/60 text-lg max-w-xl mx-auto">
              Securely pay your invoice online. Your card data is handled entirely by Square — it never touches our servers.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="flex-1 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-lg mx-auto">

            {/* No credentials configured */}
            {!credentialsConfigured ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-surface border border-white/10 rounded-2xl p-10 text-center"
              >
                <CreditCard className="w-12 h-12 text-primary mx-auto mb-4" />
                <h2 className="font-display font-bold text-2xl text-white mb-3">Online Payments Coming Soon</h2>
                <p className="text-white/60 mb-6">
                  Our online payment portal is being finalized. In the meantime, please call us to pay your invoice over the phone.
                </p>
                <a
                  href="tel:8136519191"
                  className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  Call (813) 651-9191
                </a>
              </motion.div>

            /* Success state */
            ) : paymentState.status === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-surface border border-green-500/20 rounded-2xl p-10 text-center"
              >
                <div className="w-16 h-16 bg-green-500/15 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-9 h-9 text-green-400" />
                </div>
                <h2 className="font-display font-bold text-2xl text-white mb-3">Payment Successful!</h2>
                <p className="text-white/60 mb-1">
                  Thank you, <span className="text-white font-medium">{paymentState.customerName}</span>.
                </p>
                <p className="text-white/60 mb-3">
                  Invoice <span className="text-white font-medium">#{paymentState.invoiceNumber}</span> paid for{" "}
                  <span className="text-white font-medium">${paymentState.amount}</span>.
                </p>
                <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-lg px-4 py-2 mb-6">
                  <Mail className="w-3.5 h-3.5 text-green-400 shrink-0" />
                  <p className="text-green-300 text-sm">
                    A receipt has been sent to <span className="font-medium">{paymentState.email}</span>
                  </p>
                </div>
                {paymentState.paymentId && (
                  <p className="text-white/35 text-xs mb-8 font-mono">
                    Confirmation: {paymentState.paymentId}
                  </p>
                )}
                <Button
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10"
                  onClick={resetForm}
                >
                  Make Another Payment
                </Button>
              </motion.div>

            /* Payment form */
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-surface border border-white/10 rounded-2xl p-8 md:p-10"
              >
                <form onSubmit={(e) => void handleSubmit(e)} className="space-y-5">

                  {/* Customer Name */}
                  <div>
                    <label htmlFor="customerName" className={labelClass}>
                      <span className="inline-flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5" />
                        Your Name
                      </span>
                    </label>
                    <input
                      id="customerName"
                      type="text"
                      placeholder="Full name or business name"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      required
                      className={inputClass}
                    />
                  </div>

                  {/* Invoice Number */}
                  <div>
                    <label htmlFor="invoiceNumber" className={labelClass}>
                      <span className="inline-flex items-center gap-1.5">
                        <FileText className="w-3.5 h-3.5" />
                        Invoice Number
                      </span>
                    </label>
                    <input
                      id="invoiceNumber"
                      type="text"
                      placeholder="e.g. INV-1042"
                      value={invoiceNumber}
                      onChange={(e) => setInvoiceNumber(e.target.value)}
                      required
                      className={inputClass}
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className={labelClass}>
                      <span className="inline-flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5" />
                        Email Address
                      </span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className={inputClass}
                    />
                    <p className="text-white/30 text-xs mt-1.5">Square will send a receipt to this address after payment.</p>
                  </div>

                  {/* Amount */}
                  <div>
                    <label htmlFor="amount" className={labelClass}>
                      <span className="inline-flex items-center gap-1.5">
                        <DollarSign className="w-3.5 h-3.5" />
                        Amount (USD)
                      </span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 font-medium pointer-events-none select-none">$</span>
                      <input
                        id="amount"
                        type="number"
                        min="0.01"
                        step="0.01"
                        placeholder="0.00"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                        className={`${inputClass} pl-8`}
                      />
                    </div>
                  </div>

                  {/* Square Card Widget */}
                  <div>
                    <label className={labelClass}>
                      <span className="inline-flex items-center gap-1.5">
                        <CreditCard className="w-3.5 h-3.5" />
                        Card Information
                      </span>
                    </label>
                    <div>
                      {!sdkReady && !sdkError && (
                        <div className="flex items-center justify-center gap-2 text-white/35 text-sm py-4 rounded-xl border border-white/10 bg-white/[0.03]">
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Loading secure card form…
                        </div>
                      )}
                      {sdkError && (
                        <div className="flex items-center gap-2 text-red-400 text-sm py-4 px-4 rounded-xl border border-red-500/20 bg-red-500/10">
                          <AlertCircle className="w-4 h-4 shrink-0" />
                          {sdkError}
                        </div>
                      )}
                      <div id="square-card-container" className="w-full" />
                    </div>
                  </div>

                  {/* Error */}
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
                    className="w-full bg-primary hover:bg-primary/90 text-white font-bold text-base py-6 shadow-lg shadow-primary/30 disabled:opacity-40"
                  >
                    {paymentState.status === "loading" ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Processing…
                      </>
                    ) : (
                      <>
                        <Lock className="w-4 h-4 mr-2" />
                        Pay {amount && !isNaN(parseFloat(amount)) ? `$${parseFloat(amount).toFixed(2)}` : "Now"}
                      </>
                    )}
                  </Button>

                  {/* Trust badges */}
                  <div className="flex items-center justify-center gap-6 pt-1 border-t border-white/5">
                    <div className="flex items-center gap-1.5 text-white/30 text-xs">
                      <Lock className="w-3 h-3" />
                      SSL Encrypted
                    </div>
                    <div className="flex items-center gap-1.5 text-white/30 text-xs">
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
              className="text-center text-white/35 text-sm mt-6"
            >
              Questions about your invoice?{" "}
              <a href="tel:8136519191" className="text-primary hover:text-primary/80 transition-colors">
                Call (813) 651-9191
              </a>
            </motion.p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
