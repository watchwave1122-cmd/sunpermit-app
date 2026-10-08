"use client";

import React, { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import confetti from "canvas-confetti";
import {
  CheckCircle2,
  Printer,
  ArrowRight,
  ShieldCheck,
  Receipt,
  Building,
  Mail,
  Calendar,
  Hash,
  Loader2,
  Home,
  Sparkles,
} from "lucide-react";

interface SessionDetails {
  id: string;
  payment_status: string;
  amount_total: number;
  customer_details?: {
    email?: string;
    name?: string;
  };
  metadata?: {
    companyName?: string;
    paymentReference?: string;
    email?: string;
    baseAmount?: string;
    totalAmount?: string;
  };
  created?: number;
  simulated?: boolean;
}

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<SessionDetails | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Launch celebratory confetti burst
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.55 },
    });

    if (!sessionId) {
      setLoading(false);
      return;
    }

    const fetchSession = async () => {
      try {
        const res = await fetch(`/api/checkout-session?session_id=${encodeURIComponent(sessionId)}`);
        if (!res.ok) {
          throw new Error("Could not retrieve payment confirmation.");
        }
        const data = await res.json();
        setSession(data);
      } catch (err: any) {
        console.error("Failed to load session:", err);
        setError(err.message || "Unable to load session details.");
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, [sessionId]);

  const handlePrint = () => {
    window.print();
  };

  const formattedAmount = session?.amount_total
    ? (session.amount_total / 100).toFixed(2)
    : session?.metadata?.totalAmount || "0.00";

  const companyName = session?.metadata?.companyName || session?.customer_details?.name || "Customer";
  const customerEmail = session?.metadata?.email || session?.customer_details?.email || "your email";
  const invoiceRef = session?.metadata?.paymentReference || "N/A";
  const paymentDate = session?.created
    ? new Date(session.created * 1000).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-slate-900 flex flex-col selection:bg-orange-500 selection:text-white">
      <Navbar />

      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8 max-w-2xl mx-auto w-full">
        {loading ? (
          <div className="bg-white rounded-3xl p-12 border border-slate-200/90 shadow-sm text-center space-y-4">
            <Loader2 className="w-10 h-10 text-orange-600 animate-spin mx-auto" />
            <p className="text-sm font-semibold text-slate-700">Verifying payment with Stripe...</p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* ─── Header Card ─── */}
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-sm text-center space-y-4">
              <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
                <CheckCircle2 className="w-12 h-12 stroke-[2.2]" />
              </div>

              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-700 uppercase tracking-wider mb-2">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Stripe Payment Verified
                </span>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
                  Payment Successful!
                </h1>
                <p className="mt-2 text-slate-600 text-sm max-w-md mx-auto">
                  Thank you for your payment. A confirmation and receipt have been dispatched to{" "}
                  <span className="font-semibold text-slate-900">{customerEmail}</span>.
                </p>
              </div>

              {/* Amount Display */}
              <div className="py-4 px-6 rounded-2xl bg-orange-50/70 border border-orange-200/80 inline-block">
                <span className="text-xs font-semibold text-slate-600 block">Total Amount Paid</span>
                <span className="text-3xl sm:text-4xl font-black text-orange-600">
                  ${formattedAmount} <span className="text-sm font-bold text-slate-500">USD</span>
                </span>
              </div>
            </div>

            {/* ─── Official Receipt Details Card ─── */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-5 print:shadow-none print:border-none">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <Receipt className="w-4 h-4 text-orange-600" />
                  <h2 className="text-sm font-bold text-slate-950 uppercase tracking-wider">
                    Receipt Summary
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={handlePrint}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-orange-600 px-3 py-1.5 rounded-lg border border-slate-200 hover:border-orange-300 transition-colors cursor-pointer print:hidden"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Receipt</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1">
                  <span className="text-slate-400 block font-medium flex items-center gap-1.5">
                    <Building className="w-3.5 h-3.5 text-slate-400" /> Company
                  </span>
                  <span className="font-bold text-slate-900 text-sm block">{companyName}</span>
                </div>

                <div className="space-y-1">
                  <span className="text-slate-400 block font-medium flex items-center gap-1.5">
                    <Hash className="w-3.5 h-3.5 text-slate-400" /> Reference / Job ID
                  </span>
                  <span className="font-bold text-slate-900 text-sm block">{invoiceRef}</span>
                </div>

                <div className="space-y-1">
                  <span className="text-slate-400 block font-medium flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-slate-400" /> Billed Email
                  </span>
                  <span className="font-bold text-slate-900 block truncate">{customerEmail}</span>
                </div>

                <div className="space-y-1">
                  <span className="text-slate-400 block font-medium flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" /> Transaction Date
                  </span>
                  <span className="font-bold text-slate-900 block">{paymentDate}</span>
                </div>
              </div>

              {sessionId && (
                <div className="pt-3 border-t border-slate-100">
                  <span className="text-[11px] text-slate-400 block">Stripe Session ID</span>
                  <code className="text-[11px] font-mono text-slate-600 break-all bg-slate-50 p-1.5 rounded-lg block mt-1">
                    {sessionId}
                  </code>
                </div>
              )}
            </div>

            {/* Simulated Demo Notice (shows only when testing locally before entering live Stripe key) */}
            {session?.simulated && (
              <div className="p-4 rounded-2xl bg-amber-50/90 border border-amber-200 text-amber-900 text-xs flex items-start gap-3 print:hidden">
                <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <span className="font-bold block">Developer Preview Mode</span>
                  <p className="text-amber-800 leading-relaxed font-normal">
                    This receipt is a simulated local preview because placeholder Stripe keys are present. To test with official Stripe Checkout, replace <code className="bg-amber-100 px-1 py-0.5 rounded text-[11px] font-mono">STRIPE_SECRET_KEY</code> in <code className="bg-amber-100 px-1 py-0.5 rounded text-[11px] font-mono">.env</code> with your key from the Stripe dashboard.
                  </p>
                </div>
              </div>
            )}

            {/* ─── Actions ─── */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2 print:hidden">
              <Link
                href="/pay-invoice"
                className="w-full sm:w-auto px-6 py-3 bg-white hover:bg-slate-50 text-slate-800 font-bold rounded-2xl text-xs border border-slate-200 transition-all text-center"
              >
                Make Another Payment
              </Link>
              <Link
                href="/"
                className="w-full sm:w-auto px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-2xl text-xs transition-all text-center flex items-center justify-center gap-2 shadow-sm"
              >
                <Home className="w-4 h-4" />
                <span>Return to Home</span>
              </Link>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-orange-600 animate-spin" />
        </div>
      }
    >
      <PaymentSuccessContent />
    </Suspense>
  );
}
