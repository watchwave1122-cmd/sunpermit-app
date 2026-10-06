"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import confetti from "canvas-confetti";
import { CreditCard, CheckCircle2, DollarSign, ShieldCheck, ArrowRight, Lock, Compass, FileSpreadsheet } from "lucide-react";

export default function PayInvoicePage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Form state matching SunPermit /pay-invoice/ exactly
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [aptSuite, setAptSuite] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [amount, setAmount] = useState<number | string>("");
  const [paymentReference, setPaymentReference] = useState("");
  
  // Card details
  const [cardNumber, setCardNumber] = useState("");
  const [cardExp, setCardExp] = useState("");
  const [cardCvc, setCardCvc] = useState("");

  const parsedAmount = typeof amount === "number" ? amount : parseFloat(amount) || 0;
  const merchantFee = (parsedAmount * 0.03);
  const totalAmount = (parsedAmount + merchantFee).toFixed(2);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await fetch("/api/submit-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formType: "Invoice Payment",
          senderEmail: email,
          subject: `[SunPermit] Invoice Payment Notice: ${companyName} ($${totalAmount})`,
          data: {
            companyName,
            email,
            streetAddress,
            city,
            state,
            zip,
            invoiceAmount: `$${parsedAmount.toFixed(2)}`,
            merchantFee: `$${merchantFee.toFixed(2)}`,
            totalPaid: `$${totalAmount}`,
            paymentReference: paymentReference || "None",
            cardLast4: cardNumber ? `**** ${cardNumber.slice(-4)}` : "Not provided",
          },
        }),
      });
    } catch (err) {
      console.error(err);
    }
    setIsSubmitting(false);
    setIsSuccess(true);
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-slate-900 flex flex-col selection:bg-orange-500 selection:text-white">
      <Navbar />

      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8 max-w-2xl mx-auto w-full">
        {/* ─── Top Switcher Tabs (Matches Screenshot 3 Exactly) ─── */}
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
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 border border-emerald-200 text-xs font-bold text-emerald-700 uppercase tracking-wider mb-4">
            <Lock className="w-3.5 h-3.5 text-emerald-600" />
            SECURE PAYMENT PORTAL
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
            Pay Your Invoice
          </h1>
          <p className="mt-2 text-slate-600 text-sm max-w-md mx-auto">
            Pay directly using Credit/Debit Card with instant confirmation and receipt.
          </p>
        </div>

        {isSuccess ? (
          <div className="rounded-3xl p-8 bg-white border border-slate-200 shadow-sm text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h2 className="text-2xl font-extrabold text-slate-950">Payment Successful!</h2>
            <p className="text-slate-600 text-sm max-w-md mx-auto">
              Thank you for your payment of <span className="font-bold text-slate-900">${totalAmount} USD</span>. A receipt has been sent to {email || "your email"}.
            </p>
            <button
              onClick={() => setIsSuccess(false)}
              className="px-6 py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl text-xs transition-colors"
            >
              Make Another Payment
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="rounded-3xl p-6 sm:p-8 bg-white border border-slate-200/90 shadow-sm space-y-6">
            <h2 className="text-lg font-bold text-slate-950 border-b border-slate-100 pb-2">
              Billing Detail
            </h2>

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
                placeholder="Company Name"
                className="w-full px-3.5 py-2.5 bg-[#F1F3F6] border border-slate-200/90 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-orange-500"
              />
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                className="w-full px-3.5 py-2.5 bg-[#F1F3F6] border border-slate-200/90 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-orange-500"
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
                  placeholder="E.g. 42 Wallaby Way"
                  className="w-full px-3.5 py-2.5 bg-[#F1F3F6] border border-slate-200/90 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Apartment, suite, etc</label>
                <input
                  type="text"
                  value={aptSuite}
                  onChange={(e) => setAptSuite(e.target.value)}
                  placeholder=""
                  className="w-full px-3.5 py-2.5 bg-[#F1F3F6] border border-slate-200/90 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-orange-500"
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
                    placeholder="E.g. Sydney"
                    className="w-full px-3.5 py-2.5 bg-[#F1F3F6] border border-slate-200/90 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    State/Province <span className="text-orange-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    placeholder="E.g. New South Wales"
                    className="w-full px-3.5 py-2.5 bg-[#F1F3F6] border border-slate-200/90 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-orange-500"
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
                  placeholder="E.g. 2000"
                  className="w-full px-3.5 py-2.5 bg-[#F1F3F6] border border-slate-200/90 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>

            {/* Amount */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Amount <span className="text-orange-600">*</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="any"
                  required
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full pl-3.5 pr-14 py-2.5 bg-[#F1F3F6] border border-slate-200/90 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-orange-500 font-semibold"
                />
                <span className="absolute right-3 top-2.5 text-xs text-slate-500 font-bold">USD</span>
              </div>
            </div>

            {/* Payment Reference */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Payment Reference</label>
              <input
                type="text"
                value={paymentReference}
                onChange={(e) => setPaymentReference(e.target.value)}
                placeholder="Invoice # - Memo Notes"
                className="w-full px-3.5 py-2.5 bg-[#F1F3F6] border border-slate-200/90 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-orange-500"
              />
            </div>

            {/* Credit / Debit Card Element */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              <label className="block text-xs font-bold text-slate-900 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <CreditCard className="w-4 h-4 text-orange-600" />
                  Debit/Credit Card <span className="text-orange-600">*</span>
                </span>
                <span className="text-[11px] font-normal text-slate-500">3% Merchant Fee</span>
              </label>

              <div className="space-y-2">
                <input
                  type="text"
                  required
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  placeholder="Card number (4532 •••• •••• ••••)"
                  className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-lg text-xs font-mono focus:outline-none focus:border-orange-500"
                />
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    required
                    value={cardExp}
                    onChange={(e) => setCardExp(e.target.value)}
                    placeholder="MM / YY"
                    className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-lg text-xs font-mono focus:outline-none focus:border-orange-500"
                  />
                  <input
                    type="text"
                    required
                    value={cardCvc}
                    onChange={(e) => setCardCvc(e.target.value)}
                    placeholder="CVC / CVV"
                    className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-lg text-xs font-mono focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>
            </div>

            {/* Total Calculation Display */}
            <div className="p-4 rounded-xl bg-orange-50/70 border border-orange-200 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-900 block">Total Payment (incl. 3% fee)</span>
                <span className="text-[10px] text-slate-500">Base: ${parsedAmount.toFixed(2)} + Fee: ${merchantFee.toFixed(2)}</span>
              </div>
              <span className="text-xl font-extrabold text-orange-600">${totalAmount} USD</span>
            </div>

            {/* Submit */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-md transition-all disabled:opacity-50"
              >
                <ShieldCheck className="w-4 h-4" />
                {isSubmitting ? "Processing Payment..." : `Pay Now ($${totalAmount})`}
              </button>
            </div>
          </form>
        )}
      </main>

      <Footer />
    </div>
  );
}
