"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  CreditCard,
  ShieldCheck,
  ArrowRight,
  Lock,
  Compass,
  FileSpreadsheet,
  AlertCircle,
  Loader2,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

function PayInvoiceForm() {
  const searchParams = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [canceledNotice, setCanceledNotice] = useState(false);

  // Form state
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [aptSuite, setAptSuite] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [amount, setAmount] = useState<number | string>("");
  const [paymentReference, setPaymentReference] = useState("");

  useEffect(() => {
    if (searchParams.get("canceled") === "true") {
      setCanceledNotice(true);
    }
  }, [searchParams]);

  const parsedAmount = typeof amount === "number" ? amount : parseFloat(amount) || 0;
  const merchantFee = parsedAmount * 0.03;
  const totalAmount = (parsedAmount + merchantFee).toFixed(2);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setCanceledNotice(false);

    if (parsedAmount <= 0) {
      setErrorMessage("Please enter a payment amount greater than $0.");
      return;
    }

    if (!companyName.trim()) {
      setErrorMessage("Please enter your Company Name.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          companyName,
          email,
          streetAddress,
          aptSuite,
          city,
          state,
          zip,
          amount: parsedAmount,
          paymentReference,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.url) {
        throw new Error(data.error || "Unable to initiate Stripe checkout. Please try again.");
      }

      // Redirect user to Stripe Hosted Checkout page
      window.location.href = data.url;
    } catch (err: any) {
      console.error("Payment redirect error:", err);
      setErrorMessage(
        err.message || "Failed to connect to Stripe Checkout. Please verify your connection."
      );
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-slate-900 flex flex-col selection:bg-orange-500 selection:text-white">
      <Navbar />

      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8 max-w-2xl mx-auto w-full">
        {/* ─── Top Switcher Tabs (Matches sunpermit.com design) ─── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-10">
          <Link
            href="/permit-planset"
            className="bg-white hover:bg-orange-50/50 border border-slate-200/90 hover:border-orange-300 rounded-2xl p-6 text-center shadow-xs transition-all flex flex-col items-center justify-center gap-2.5 group"
          >
            <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Compass className="w-5 h-5" />
            </div>
            <span className="text-sm font-bold text-slate-900 group-hover:text-orange-600 transition-colors">
              Request Permit Planset (Quick)
            </span>
          </Link>

          <Link
            href="/request-sales-proposal"
            className="bg-white hover:bg-orange-50/50 border border-slate-200/90 hover:border-orange-300 rounded-2xl p-6 text-center shadow-xs transition-all flex flex-col items-center justify-center gap-2.5 group"
          >
            <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <span className="text-sm font-bold text-slate-900 group-hover:text-orange-600 transition-colors">
              Request Pre-Sale Design (Aurora)
            </span>
          </Link>
        </div>

        {/* Top Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 border border-emerald-200 text-xs font-bold text-emerald-800 uppercase tracking-wider mb-4">
            <Lock className="w-3.5 h-3.5 text-emerald-600" />
            SECURE STRIPE CHECKOUT
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
            Pay Your Invoice
          </h1>
          <p className="mt-2 text-slate-600 text-sm max-w-md mx-auto">
            Pay securely with Credit Card, Debit Card, Apple Pay, or Google Pay via Stripe with instant confirmation.
          </p>
        </div>

        {/* Canceled Notification */}
        {canceledNotice && (
          <div className="mb-6 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800 text-xs flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
            <div>
              <span className="font-bold">Payment was canceled.</span> Your invoice has not been charged yet. You can submit the form below whenever you are ready.
            </div>
          </div>
        )}

        {/* Error Notification */}
        {errorMessage && (
          <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block mb-0.5">Payment Notice</span>
              <span>{errorMessage}</span>
            </div>
          </div>
        )}

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="rounded-3xl p-6 sm:p-8 bg-white border border-slate-200/90 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-lg font-bold text-slate-950">
              Billing Details
            </h2>
            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/60">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>PCI-DSS Level 1 Secure</span>
            </div>
          </div>

          {/* Company Name */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Company Name <span className="text-orange-600">*</span>
            </label>
            <input
              type="text"
              required
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="e.g. SunPermit Solar Partners, LLC"
              className="w-full px-3.5 py-2.5 bg-[#F1F3F6] border border-slate-200/90 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-orange-500 transition-colors"
            />
          </div>

          {/* Email Address */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Email Address <span className="text-slate-400 font-normal">(for payment receipt)</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="billing@company.com"
              className="w-full px-3.5 py-2.5 bg-[#F1F3F6] border border-slate-200/90 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-orange-500 transition-colors"
            />
          </div>

          {/* Address Block */}
          <div className="space-y-3 pt-1">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Street Address <span className="text-orange-600">*</span>
              </label>
              <input
                type="text"
                required
                value={streetAddress}
                onChange={(e) => setStreetAddress(e.target.value)}
                placeholder="e.g. 100 Main Street"
                className="w-full px-3.5 py-2.5 bg-[#F1F3F6] border border-slate-200/90 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-orange-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Apartment, suite, unit (optional)</label>
              <input
                type="text"
                value={aptSuite}
                onChange={(e) => setAptSuite(e.target.value)}
                placeholder="Suite 400"
                className="w-full px-3.5 py-2.5 bg-[#F1F3F6] border border-slate-200/90 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-orange-500 transition-colors"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  City <span className="text-orange-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="e.g. Los Angeles"
                  className="w-full px-3.5 py-2.5 bg-[#F1F3F6] border border-slate-200/90 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-orange-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  State / Province <span className="text-orange-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  placeholder="e.g. CA"
                  className="w-full px-3.5 py-2.5 bg-[#F1F3F6] border border-slate-200/90 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-orange-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                ZIP / Postal Code <span className="text-orange-600">*</span>
              </label>
              <input
                type="text"
                required
                value={zip}
                onChange={(e) => setZip(e.target.value)}
                placeholder="e.g. 90210"
                className="w-full px-3.5 py-2.5 bg-[#F1F3F6] border border-slate-200/90 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-orange-500 transition-colors"
              />
            </div>
          </div>

          {/* Amount */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Invoice Amount <span className="text-orange-600">*</span>
            </label>
            <div className="relative">
              <input
                type="number"
                step="0.01"
                min="1"
                required
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="w-full pl-3.5 pr-14 py-2.5 bg-[#F1F3F6] border border-slate-200/90 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-orange-500 font-semibold transition-colors"
              />
              <span className="absolute right-3 top-2.5 text-xs text-slate-500 font-bold">USD</span>
            </div>
          </div>

          {/* Payment Reference */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Payment Reference / Job ID <span className="text-slate-400 font-normal">(Optional)</span>
            </label>
            <input
              type="text"
              value={paymentReference}
              onChange={(e) => setPaymentReference(e.target.value)}
              placeholder="e.g. INV-2026-089 / Residential Planset"
              className="w-full px-3.5 py-2.5 bg-[#F1F3F6] border border-slate-200/90 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-orange-500 transition-colors"
            />
          </div>

          {/* Secure Stripe Hosted Payment Callout */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-white shadow-inner border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-white">
                <CreditCard className="w-4 h-4 text-orange-400" />
                <span>Powered by Stripe Checkout</span>
              </div>
              <div className="flex items-center gap-1 text-[10px] uppercase font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800/80 px-2 py-0.5 rounded-full">
                <Lock className="w-2.5 h-2.5" />
                256-Bit Encrypted
              </div>
            </div>

            <p className="text-[11px] text-slate-300 leading-relaxed font-normal">
              When you click <strong>Pay Now</strong>, you will be redirected to the secure official Stripe payment gateway to complete your transaction with card, Apple Pay, or Google Pay.
            </p>

            {/* Accepted Payment Methods Pill Badges */}
            <div className="pt-1 flex flex-wrap items-center gap-2 text-[10px] font-semibold text-slate-300">
              <span className="px-2.5 py-1 rounded-md bg-white/10 border border-white/10">Visa</span>
              <span className="px-2.5 py-1 rounded-md bg-white/10 border border-white/10">Mastercard</span>
              <span className="px-2.5 py-1 rounded-md bg-white/10 border border-white/10">Amex</span>
              <span className="px-2.5 py-1 rounded-md bg-white/10 border border-white/10">Discover</span>
              <span className="px-2.5 py-1 rounded-md bg-white/10 border border-white/10">Apple Pay</span>
              <span className="px-2.5 py-1 rounded-md bg-white/10 border border-white/10">Google Pay</span>
            </div>
          </div>

          {/* Total Calculation Display */}
          <div className="p-4 rounded-xl bg-orange-50/70 border border-orange-200 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-900 block">Total Payment (incl. 3% fee)</span>
              <span className="text-[10px] text-slate-500">
                Base: ${parsedAmount.toFixed(2)} + Fee: ${merchantFee.toFixed(2)}
              </span>
            </div>
            <span className="text-xl font-extrabold text-orange-600">${totalAmount} USD</span>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting || parsedAmount <= 0}
              className="w-full py-4 bg-orange-600 hover:bg-orange-700 active:scale-[0.99] text-white font-bold rounded-2xl text-sm flex items-center justify-center gap-2.5 shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>Redirecting to Stripe...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Pay Now with Stripe (${totalAmount})</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </>
              )}
            </button>
            <p className="mt-2 text-center text-[11px] text-slate-400">
              Safe &amp; certified checkout. SunPermit never stores your sensitive card data.
            </p>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  );
}

export default function PayInvoicePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-orange-600 animate-spin" />
        </div>
      }
    >
      <PayInvoiceForm />
    </Suspense>
  );
}
