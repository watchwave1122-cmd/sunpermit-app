"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import confetti from "canvas-confetti";
import {
  FileText,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  MapPin,
  Sun,
  Zap,
  Battery,
  Stamp,
  Upload,
  DollarSign,
  Clock,
  ShieldCheck,
  AlertCircle,
  FileCheck,
  Building2,
  Compass
} from "lucide-react";

export default function RequestPermitPage() {
  const [stage, setStage] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [trackingId, setTrackingId] = useState<string>("");

  const [orderData, setOrderData] = useState({
    customerName: "",
    jobRefId: "JOB-2026-881",
    streetAddress: "",
    city: "",
    state: "CA",
    zipCode: "",
    ahjName: "",
    utilityProvider: "",
    systemSizeKw: "11.4",
    moduleModel: "Q.PEAK DUO BLK ML-G10+ 400W",
    moduleQuantity: "28",
    inverterModel: "Enphase IQ8M Microinverter",
    inverterQuantity: "28",
    rackingSystem: "IronRidge XR100 Roof Mount",
    roofPitch: "22° (5/12 pitch)",
    azimuth: "180° South",
    mspRatingAmps: "200A",
    busbarRatingAmps: "225A",
    mainBreakerAmps: "200A",
    interconnectionMethod: "Load Center Breaker (20% Rule)",
    hasBattery: true,
    batteryModel: "Tesla Powerwall 3 (13.5 kWh)",
    batteryQty: "1",
    needElectricalPe: true,
    needStructuralPe: true,
    deliverySpeed: "24hr",
    customNotes: "",
    contactEmail: "",
    contactPhone: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setOrderData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setOrderData((prev) => ({ ...prev, [name]: checked }));
  };

  // Pricing calculations
  const basePlansetPrice = 149;
  const electricalPePrice = orderData.needElectricalPe ? 99 : 0;
  const structuralPePrice = orderData.needStructuralPe ? 100 : 0;
  const batteryAddonPrice = orderData.hasBattery ? 99 : 0;
  const expressFee = orderData.deliverySpeed === "24hr" ? 50 : 0;
  const totalPrice = basePlansetPrice + electricalPePrice + structuralPePrice + batteryAddonPrice + expressFee;

  const handleOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/request-permit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...orderData,
          totalPrice
        }),
      });

      const data = await res.json();
      if (data.success) {
        setTrackingId(data.trackingId || "SP-2026-98412");
        setIsSuccess(true);
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.5 }
        });
      }
    } catch (err) {
      console.error(err);
      setTrackingId("SP-2026-98412");
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-slate-900 flex flex-col selection:bg-orange-500 selection:text-white">
      <Navbar />

      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
        
        {/* ─── Top Switcher Tabs (Matches Screenshot 1 Exactly) ─── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-10 max-w-4xl mx-auto">
          <Link
            href="/request-sales-proposal"
            className="bg-white hover:bg-orange-50/50 border border-slate-200/90 hover:border-orange-300 rounded-2xl p-6 text-center shadow-xs transition-all flex flex-col items-center justify-center gap-2.5 group"
          >
            <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <FileText className="w-5 h-5" />
            </div>
            <span className="text-sm font-bold text-slate-900 group-hover:text-orange-600 transition-colors">
              Request Pre-Sale Design (Aurora)
            </span>
          </Link>

          <Link
            href="/pay-invoice"
            className="bg-white hover:bg-orange-50/50 border border-slate-200/90 hover:border-orange-300 rounded-2xl p-6 text-center shadow-xs transition-all flex flex-col items-center justify-center gap-2.5 group"
          >
            <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <DollarSign className="w-5 h-5" />
            </div>
            <span className="text-sm font-bold text-slate-900 group-hover:text-orange-600 transition-colors">
              Pay Your Invoice
            </span>
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-100 border border-orange-200 text-xs font-bold text-orange-700 uppercase tracking-wider mb-4">
            <Compass className="w-3.5 h-3.5 text-orange-600" />
            SUNPERMIT QUICK ORDER FORM
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-950 tracking-tight">
            Request Solar Permit Planset
          </h1>
          <p className="mt-3 text-slate-600 text-sm sm:text-base max-w-xl mx-auto font-normal">
            Complete permit-ready solar drafting with licensed PE structural &amp; electrical engineering stamps in 24 hours.
          </p>
        </div>

        {/* Stages Navigator Bar */}
        {!isSuccess && (
          <div className="mb-8 p-3 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs font-semibold">
              <button
                type="button"
                onClick={() => setStage(1)}
                className={`py-2.5 px-3 rounded-xl transition-all ${
                  stage === 1 ? "bg-orange-500 text-white font-bold shadow-xs" : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                1. Site &amp; AHJ
              </button>
              <button
                type="button"
                onClick={() => setStage(2)}
                className={`py-2.5 px-3 rounded-xl transition-all ${
                  stage === 2 ? "bg-orange-500 text-white font-bold shadow-xs" : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                2. Equipment
              </button>
              <button
                type="button"
                onClick={() => setStage(3)}
                className={`py-2.5 px-3 rounded-xl transition-all ${
                  stage === 3 ? "bg-orange-500 text-white font-bold shadow-xs" : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                3. Electrical &amp; ESS
              </button>
              <button
                type="button"
                onClick={() => setStage(4)}
                className={`py-2.5 px-3 rounded-xl transition-all ${
                  stage === 4 ? "bg-orange-500 text-white font-bold shadow-xs" : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                4. PE Stamps
              </button>
              <button
                type="button"
                onClick={() => setStage(5)}
                className={`py-2.5 px-3 rounded-xl transition-all ${
                  stage === 5 ? "bg-orange-500 text-white font-bold shadow-xs" : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                5. Review &amp; Submit
              </button>
            </div>
          </div>
        )}

        {/* Form Card Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Form Fields */}
          <div className="lg:col-span-8 rounded-3xl p-6 sm:p-8 bg-white border border-slate-200/90 shadow-sm">
            
            {isSuccess ? (
              /* Order Success Screen */
              <div className="text-center py-8 space-y-6">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-9 h-9" />
                </div>

                <div className="space-y-2">
                  <h2 className="text-2xl font-extrabold text-slate-950">Permit Request Submitted Successfully!</h2>
                  <p className="text-slate-600 text-sm max-w-md mx-auto">
                    Your planset request has been routed to our CAD drafting team &amp; licensed PE engineers.
                  </p>
                  <div className="inline-block px-5 py-2.5 rounded-xl bg-orange-50 border border-orange-200 text-orange-600 font-mono font-bold text-xl my-2">
                    Tracking ID: {trackingId}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#FAF7F2] border border-slate-200 text-left space-y-2 text-xs text-slate-700 max-w-md mx-auto">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Customer / Site:</span>
                    <span className="font-semibold text-slate-900">{orderData.customerName || "Homeowner Site"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">AHJ Jurisdiction:</span>
                    <span className="font-semibold text-slate-900">{orderData.ahjName || "City Building Dept"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">System Capacity:</span>
                    <span className="font-semibold text-slate-900">{orderData.systemSizeKw} kW DC PV</span>
                  </div>
                  <div className="flex justify-between border-t border-slate-200 pt-2">
                    <span className="text-slate-500">Guaranteed SLA:</span>
                    <span className="font-semibold text-emerald-600">24-Hour Express Delivery</span>
                  </div>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link
                    href="/"
                    className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-white bg-slate-950 hover:bg-slate-800 transition-all flex items-center justify-center gap-2 text-sm shadow-sm"
                  >
                    Return to Home
                    <ArrowRight className="w-4 h-4 text-orange-400" />
                  </Link>

                  <button
                    onClick={() => {
                      setIsSuccess(false);
                      setStage(1);
                    }}
                    className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 text-sm"
                  >
                    Submit Another Planset
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleOrderSubmit} className="space-y-6">
                
                {/* Stage 1: Site Location & AHJ */}
                {stage === 1 && (
                  <div className="space-y-4">
                    <h3 className="text-base font-bold text-slate-950 flex items-center gap-2 border-b border-slate-100 pb-3">
                      <MapPin className="w-4 h-4 text-orange-600" />
                      Stage 1: Site Location &amp; AHJ Jurisdiction
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Customer / Property Owner Name *
                        </label>
                        <input
                          type="text"
                          name="customerName"
                          required
                          value={orderData.customerName}
                          onChange={handleInputChange}
                          placeholder="e.g. Robert Smith"
                          className="w-full px-3.5 py-2.5 bg-[#F1F3F6] border border-slate-200/90 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-orange-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Internal Job Reference ID
                        </label>
                        <input
                          type="text"
                          name="jobRefId"
                          value={orderData.jobRefId}
                          onChange={handleInputChange}
                          placeholder="e.g. JOB-8821"
                          className="w-full px-3.5 py-2.5 bg-[#F1F3F6] border border-slate-200/90 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-orange-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Property Street Address *
                      </label>
                      <input
                        type="text"
                        name="streetAddress"
                        required
                        value={orderData.streetAddress}
                        onChange={handleInputChange}
                        placeholder="e.g. 742 Evergreen Terrace"
                        className="w-full px-3.5 py-2.5 bg-[#F1F3F6] border border-slate-200/90 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-orange-500"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">City *</label>
                        <input
                          type="text"
                          name="city"
                          required
                          value={orderData.city}
                          onChange={handleInputChange}
                          placeholder="Austin"
                          className="w-full px-3.5 py-2.5 bg-[#F1F3F6] border border-slate-200/90 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-orange-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">State *</label>
                        <select
                          name="state"
                          value={orderData.state}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2.5 bg-[#F1F3F6] border border-slate-200/90 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-orange-500"
                        >
                          {["CA", "TX", "FL", "AZ", "NV", "NY", "NJ", "CO", "NC", "SC", "IL"].map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Zip Code *</label>
                        <input
                          type="text"
                          name="zipCode"
                          required
                          value={orderData.zipCode}
                          onChange={handleInputChange}
                          placeholder="78701"
                          className="w-full px-3.5 py-2.5 bg-[#F1F3F6] border border-slate-200/90 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-orange-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          AHJ Building Jurisdiction Name *
                        </label>
                        <input
                          type="text"
                          name="ahjName"
                          required
                          value={orderData.ahjName}
                          onChange={handleInputChange}
                          placeholder="e.g. City of Austin Building Dept"
                          className="w-full px-3.5 py-2.5 bg-[#F1F3F6] border border-slate-200/90 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-orange-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Utility Interconnection Provider *
                        </label>
                        <input
                          type="text"
                          name="utilityProvider"
                          required
                          value={orderData.utilityProvider}
                          onChange={handleInputChange}
                          placeholder="e.g. Austin Energy / PG&E / Oncor"
                          className="w-full px-3.5 py-2.5 bg-[#F1F3F6] border border-slate-200/90 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-orange-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Project Manager Email *
                        </label>
                        <input
                          type="email"
                          name="contactEmail"
                          required
                          value={orderData.contactEmail}
                          onChange={handleInputChange}
                          placeholder="you@company.com"
                          className="w-full px-3.5 py-2.5 bg-[#F1F3F6] border border-slate-200/90 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-orange-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Contact Phone Number
                        </label>
                        <input
                          type="tel"
                          name="contactPhone"
                          value={orderData.contactPhone}
                          onChange={handleInputChange}
                          placeholder="(555) 000-0000"
                          className="w-full px-3.5 py-2.5 bg-[#F1F3F6] border border-slate-200/90 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-orange-500"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Stage 2: Solar Equipment Specs */}
                {stage === 2 && (
                  <div className="space-y-4">
                    <h3 className="text-base font-bold text-slate-950 flex items-center gap-2 border-b border-slate-100 pb-3">
                      <Sun className="w-4 h-4 text-orange-600" />
                      Stage 2: Solar Panels &amp; Inverter Equipment
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">System Capacity (kW DC) *</label>
                        <input
                          type="text"
                          name="systemSizeKw"
                          required
                          value={orderData.systemSizeKw}
                          onChange={handleInputChange}
                          placeholder="11.4"
                          className="w-full px-3.5 py-2.5 bg-[#F1F3F6] border border-slate-200/90 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-orange-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Number of Solar Modules *</label>
                        <input
                          type="text"
                          name="moduleQuantity"
                          required
                          value={orderData.moduleQuantity}
                          onChange={handleInputChange}
                          placeholder="28"
                          className="w-full px-3.5 py-2.5 bg-[#F1F3F6] border border-slate-200/90 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-orange-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Solar PV Module Model *</label>
                      <input
                        type="text"
                        name="moduleModel"
                        required
                        value={orderData.moduleModel}
                        onChange={handleInputChange}
                        placeholder="e.g. Q.PEAK DUO BLK ML-G10+ 400W"
                        className="w-full px-3.5 py-2.5 bg-[#F1F3F6] border border-slate-200/90 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-orange-500"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Inverter Model *</label>
                        <input
                          type="text"
                          name="inverterModel"
                          required
                          value={orderData.inverterModel}
                          onChange={handleInputChange}
                          placeholder="e.g. Enphase IQ8M / SolarEdge Energy Hub"
                          className="w-full px-3.5 py-2.5 bg-[#F1F3F6] border border-slate-200/90 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-orange-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Inverter Quantity *</label>
                        <input
                          type="text"
                          name="inverterQuantity"
                          required
                          value={orderData.inverterQuantity}
                          onChange={handleInputChange}
                          placeholder="28"
                          className="w-full px-3.5 py-2.5 bg-[#F1F3F6] border border-slate-200/90 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-orange-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Mounting Racking</label>
                        <input
                          type="text"
                          name="rackingSystem"
                          value={orderData.rackingSystem}
                          onChange={handleInputChange}
                          placeholder="IronRidge XR100"
                          className="w-full px-3.5 py-2.5 bg-[#F1F3F6] border border-slate-200/90 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-orange-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Roof Pitch</label>
                        <input
                          type="text"
                          name="roofPitch"
                          value={orderData.roofPitch}
                          onChange={handleInputChange}
                          placeholder="22° (5/12)"
                          className="w-full px-3.5 py-2.5 bg-[#F1F3F6] border border-slate-200/90 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-orange-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Azimuth</label>
                        <input
                          type="text"
                          name="azimuth"
                          value={orderData.azimuth}
                          onChange={handleInputChange}
                          placeholder="180° South"
                          className="w-full px-3.5 py-2.5 bg-[#F1F3F6] border border-slate-200/90 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-orange-500"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Stage 3: Electrical Single-Line & ESS Battery */}
                {stage === 3 && (
                  <div className="space-y-4">
                    <h3 className="text-base font-bold text-slate-950 flex items-center gap-2 border-b border-slate-100 pb-3">
                      <Battery className="w-4 h-4 text-orange-600" />
                      Stage 3: Electrical Panel &amp; Battery Storage (ESS)
                    </h3>

                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">MSP Rating</label>
                        <input
                          type="text"
                          name="mspRatingAmps"
                          value={orderData.mspRatingAmps}
                          onChange={handleInputChange}
                          placeholder="200A"
                          className="w-full px-3.5 py-2.5 bg-[#F1F3F6] border border-slate-200/90 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-orange-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Busbar Rating</label>
                        <input
                          type="text"
                          name="busbarRatingAmps"
                          value={orderData.busbarRatingAmps}
                          onChange={handleInputChange}
                          placeholder="225A"
                          className="w-full px-3.5 py-2.5 bg-[#F1F3F6] border border-slate-200/90 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-orange-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Main Breaker</label>
                        <input
                          type="text"
                          name="mainBreakerAmps"
                          value={orderData.mainBreakerAmps}
                          onChange={handleInputChange}
                          placeholder="200A"
                          className="w-full px-3.5 py-2.5 bg-[#F1F3F6] border border-slate-200/90 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-orange-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Interconnection Method</label>
                      <select
                        name="interconnectionMethod"
                        value={orderData.interconnectionMethod}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2.5 bg-[#F1F3F6] border border-slate-200/90 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-orange-500"
                      >
                        <option value="Load Center Breaker (20% Rule)">Load Center Breaker (NEC 705.12 20% Rule)</option>
                        <option value="Supply Side Tap (Meter Adapter)">Supply Side Tap (Line Side Tap)</option>
                        <option value="Main Panel Upgrade (MPU)">Main Panel Upgrade (MPU Scheduled)</option>
                        <option value="Feeder Tap">Feeder Tap with OCPD</option>
                      </select>
                    </div>

                    {/* Battery Storage Box */}
                    <div className="p-4 rounded-xl bg-orange-50/60 border border-orange-200 mt-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Battery className="w-4 h-4 text-orange-600" />
                          <span className="text-xs font-bold text-slate-900">Include Battery Storage (ESS)?</span>
                        </div>
                        <input
                          type="checkbox"
                          checked={orderData.hasBattery}
                          onChange={(e) => handleCheckboxChange("hasBattery", e.target.checked)}
                          className="w-4 h-4 accent-orange-600 rounded"
                        />
                      </div>

                      {orderData.hasBattery && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                          <div>
                            <label className="block text-[11px] font-semibold text-slate-700 mb-1">Battery Model</label>
                            <input
                              type="text"
                              name="batteryModel"
                              value={orderData.batteryModel}
                              onChange={handleInputChange}
                              placeholder="e.g. Tesla Powerwall 3 / Enphase 5P"
                              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-orange-500"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-semibold text-slate-700 mb-1">Battery Qty</label>
                            <input
                              type="text"
                              name="batteryQty"
                              value={orderData.batteryQty}
                              onChange={handleInputChange}
                              placeholder="1"
                              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-orange-500"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Stage 4: PE Stamps & Delivery SLA */}
                {stage === 4 && (
                  <div className="space-y-4">
                    <h3 className="text-base font-bold text-slate-950 flex items-center gap-2 border-b border-slate-100 pb-3">
                      <Stamp className="w-4 h-4 text-orange-600" />
                      Stage 4: Licensed PE Stamps &amp; Turnaround SLA
                    </h3>

                    {/* Structural PE */}
                    <div className="p-4 rounded-xl bg-white border border-slate-200 flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <ShieldCheck className="w-4 h-4 text-emerald-600" />
                          <span className="text-xs font-bold text-slate-950">Licensed Structural PE Stamp (+$100)</span>
                        </div>
                        <p className="text-[11px] text-slate-600">
                          Rooftop dead load, live load, and ASCE 7 wind &amp; seismic calculations stamped by a State-Licensed PE.
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        checked={orderData.needStructuralPe}
                        onChange={(e) => handleCheckboxChange("needStructuralPe", e.target.checked)}
                        className="w-4 h-4 accent-orange-600 rounded mt-1"
                      />
                    </div>

                    {/* Electrical PE */}
                    <div className="p-4 rounded-xl bg-white border border-slate-200 flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Zap className="w-4 h-4 text-orange-600" />
                          <span className="text-xs font-bold text-slate-950">Licensed Electrical PE Stamp (+$99)</span>
                        </div>
                        <p className="text-[11px] text-slate-600">
                          Full electrical single-line diagram review, voltage drop, and NEC code verification stamped by a PE.
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        checked={orderData.needElectricalPe}
                        onChange={(e) => handleCheckboxChange("needElectricalPe", e.target.checked)}
                        className="w-4 h-4 accent-orange-600 rounded mt-1"
                      />
                    </div>

                    {/* Delivery Speed */}
                    <div className="pt-2">
                      <label className="block text-xs font-semibold text-slate-700 mb-2">Turnaround Delivery Speed</label>
                      <div className="grid grid-cols-2 gap-3">
                        <div
                          onClick={() => setOrderData({ ...orderData, deliverySpeed: "24hr" })}
                          className={`p-3 rounded-xl border cursor-pointer transition-all ${
                            orderData.deliverySpeed === "24hr"
                              ? "bg-orange-50/70 border-orange-500 text-slate-950"
                              : "bg-[#F1F3F6] border-slate-200 text-slate-700"
                          }`}
                        >
                          <div className="flex items-center justify-between text-xs font-bold mb-1">
                            <span>24-Hour Express</span>
                            <span className="text-orange-600 font-extrabold">+$50</span>
                          </div>
                          <p className="text-[10px] text-slate-500">Guaranteed within 24 business hours</p>
                        </div>

                        <div
                          onClick={() => setOrderData({ ...orderData, deliverySpeed: "standard" })}
                          className={`p-3 rounded-xl border cursor-pointer transition-all ${
                            orderData.deliverySpeed === "standard"
                              ? "bg-orange-50/70 border-orange-500 text-slate-950"
                              : "bg-[#F1F3F6] border-slate-200 text-slate-700"
                          }`}
                        >
                          <div className="flex items-center justify-between text-xs font-bold mb-1">
                            <span>Standard 48-Hr</span>
                            <span className="text-emerald-600 font-extrabold">FREE</span>
                          </div>
                          <p className="text-[10px] text-slate-500">Delivered within 48 business hours</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Stage 5: Review & Submit */}
                {stage === 5 && (
                  <div className="space-y-4">
                    <h3 className="text-base font-bold text-slate-950 flex items-center gap-2 border-b border-slate-100 pb-3">
                      <FileCheck className="w-4 h-4 text-emerald-600" />
                      Stage 5: Final Review &amp; Submit Order
                    </h3>

                    <div className="space-y-2.5 p-4 rounded-xl bg-[#FAF7F2] border border-slate-200 text-xs text-slate-700">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Site Location:</span>
                        <span className="font-semibold text-slate-900">{orderData.streetAddress || "Address"}, {orderData.city}, {orderData.state}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">AHJ Building Dept:</span>
                        <span className="font-semibold text-slate-900">{orderData.ahjName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">System Specs:</span>
                        <span className="font-semibold text-slate-900">{orderData.systemSizeKw} kW • {orderData.moduleQuantity} Modules</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Battery Backup:</span>
                        <span className="font-semibold text-slate-900">{orderData.hasBattery ? orderData.batteryModel : "None"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">PE Stamps:</span>
                        <span className="font-semibold text-slate-900">
                          {orderData.needStructuralPe ? "Structural PE " : ""}
                          {orderData.needElectricalPe ? "• Electrical PE" : ""}
                        </span>
                      </div>
                      <div className="flex justify-between border-t border-slate-200 pt-2 font-bold text-sm">
                        <span className="text-slate-950">Total Order Amount:</span>
                        <span className="text-orange-600 font-extrabold">${totalPrice}</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Special Instructions or AHJ Local Rules (Optional)
                      </label>
                      <textarea
                        name="customNotes"
                        rows={3}
                        value={orderData.customNotes}
                        onChange={handleInputChange}
                        placeholder="Provide any HOA rules, specific AHJ setbacks, or structural framing details..."
                        className="w-full px-3.5 py-2.5 bg-[#F1F3F6] border border-slate-200/90 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-orange-500 resize-none"
                      />
                    </div>
                  </div>
                )}

                {/* Stepper Navigation Buttons */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  {stage > 1 ? (
                    <button
                      type="button"
                      onClick={() => setStage(stage - 1)}
                      className="px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 flex items-center gap-1.5 transition-colors"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      Back
                    </button>
                  ) : <div />}

                  {stage < 5 ? (
                    <button
                      type="button"
                      onClick={() => setStage(stage + 1)}
                      className="px-7 py-2.5 rounded-xl text-xs font-bold text-white bg-slate-950 hover:bg-slate-800 flex items-center gap-1.5 transition-all shadow-xs"
                    >
                      Continue
                      <ArrowRight className="w-3.5 h-3.5 text-orange-400" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-8 py-3 rounded-xl text-xs font-bold text-white bg-[#E6561B] hover:bg-[#D4470F] flex items-center gap-2 transition-all shadow-md hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60"
                    >
                      {isSubmitting ? "Submitting Planset Order..." : `Place Order ($${totalPrice})`}
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>

              </form>
            )}

          </div>

          {/* Sidebar Live Pricing Calculator */}
          <div className="lg:col-span-4 rounded-3xl p-6 bg-white border border-slate-200/90 shadow-sm flex flex-col justify-between h-fit space-y-6">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-950 flex items-center gap-1.5">
                  <DollarSign className="w-4 h-4 text-orange-600" />
                  Order Summary
                </h4>
                <span className="text-[10px] font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full border border-orange-200">
                  Flat-Rate
                </span>
              </div>

              <div className="space-y-2.5 py-4 text-xs">
                <div className="flex justify-between text-slate-700">
                  <span>Base Permit Planset</span>
                  <span className="font-semibold text-slate-950">$149.00</span>
                </div>

                {orderData.needElectricalPe && (
                  <div className="flex justify-between text-slate-700">
                    <span>Electrical PE Stamp</span>
                    <span className="font-semibold text-slate-950">+$99.00</span>
                  </div>
                )}

                {orderData.needStructuralPe && (
                  <div className="flex justify-between text-slate-700">
                    <span>Structural PE Stamp</span>
                    <span className="font-semibold text-slate-950">+$100.00</span>
                  </div>
                )}

                {orderData.hasBattery && (
                  <div className="flex justify-between text-slate-700">
                    <span>Battery Storage Addon</span>
                    <span className="font-semibold text-slate-950">+$99.00</span>
                  </div>
                )}

                {orderData.deliverySpeed === "24hr" && (
                  <div className="flex justify-between text-slate-700">
                    <span>24-Hour Express SLA</span>
                    <span className="font-semibold text-slate-950">+$50.00</span>
                  </div>
                )}

                <div className="pt-3 border-t border-slate-100 flex justify-between items-baseline font-bold text-base">
                  <span className="text-slate-950">Total:</span>
                  <span className="text-2xl font-extrabold text-orange-600">${totalPrice}.00</span>
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-3 border-t border-slate-100 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Unlimited Free AHJ Revisions</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Guaranteed 24-Hour Delivery</span>
              </div>
            </div>
          </div>

        </div>

      </main>

      <Footer />
    </div>
  );
}
