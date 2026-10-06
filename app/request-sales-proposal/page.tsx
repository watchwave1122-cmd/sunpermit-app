"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import confetti from "canvas-confetti";
import {
  Upload,
  CheckCircle2,
  Compass,
  ArrowRight,
  FileSpreadsheet,
  CreditCard
} from "lucide-react";

export default function RequestSalesProposalPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Form states
  const [projectType, setProjectType] = useState("");
  const [projectName, setProjectName] = useState("");
  const [projectAddress, setProjectAddress] = useState("");
  const [isNewConstruction, setIsNewConstruction] = useState("");
  const [sizingStrategy, setSizingStrategy] = useState("");
  const [fireOffset, setFireOffset] = useState("");
  const [billAvailable, setBillAvailable] = useState("");
  const [billFiles, setBillFiles] = useState<File[]>([]);
  const [annualKwh, setAnnualKwh] = useState("");
  const [purchasePreference, setPurchasePreference] = useState("");
  const [projectNotes, setProjectNotes] = useState("");
  const [pricePerWatt, setPricePerWatt] = useState("");
  const [moduleManufacturer, setModuleManufacturer] = useState("");
  const [moduleWattage, setModuleWattage] = useState("");
  const [inverterType, setInverterType] = useState("");
  const [resourceFiles, setResourceFiles] = useState<File[]>([]);
  const [pmEmail, setPmEmail] = useState("");
  const [companyName, setCompanyName] = useState("");

  const handleBillFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setBillFiles(Array.from(e.target.files));
    }
  };

  const handleResourceFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setResourceFiles(Array.from(e.target.files));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await fetch("/api/submit-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formType: "Pre-Sale Proposal (Aurora)",
          senderEmail: pmEmail,
          subject: `[SunPermit] Pre-Sale Proposal Request: ${companyName} (${projectName})`,
          data: {
            companyName,
            pmEmail,
            projectName,
            projectAddress,
            projectType,
            isNewConstruction,
            sizingStrategy,
            fireOffset,
            annualKwh: annualKwh || "Not specified",
            purchasePreference,
            pricePerWatt: pricePerWatt || "Not specified",
            moduleManufacturer: moduleManufacturer || "Not specified",
            moduleWattage: moduleWattage || "Not specified",
            inverterType: inverterType || "Not specified",
            projectNotes: projectNotes || "None",
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

      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto w-full">
        {/* ─── Top Switcher Tabs (Matches Screenshot 2 Exactly) ─── */}
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
            href="/pay-invoice"
            className="bg-white hover:bg-orange-50/50 border border-slate-200/90 hover:border-orange-300 rounded-2xl p-6 text-center shadow-xs transition-all flex flex-col items-center justify-center gap-2.5 group"
          >
            <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <CreditCard className="w-5 h-5" />
            </div>
            <span className="text-sm font-bold text-slate-900 group-hover:text-orange-600 transition-colors">
              Pay Your Invoice
            </span>
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-100 border border-orange-200 text-xs font-bold text-orange-700 uppercase tracking-wider mb-4">
            <FileSpreadsheet className="w-3.5 h-3.5 text-orange-600" />
            AURORA SALES PROPOSAL
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-950 tracking-tight">
            Request Pre-Sale Proposal
          </h1>
          <p className="mt-3 text-slate-600 text-sm sm:text-base max-w-xl mx-auto">
            Get Aurora 3D roof layouts, shading analysis, production metrics, and customer proposal ready in 4 business hours.
          </p>
        </div>

        {isSuccess ? (
          <div className="rounded-3xl p-8 bg-white border border-slate-200 shadow-sm text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h2 className="text-2xl font-extrabold text-slate-950">Proposal Request Submitted!</h2>
            <p className="text-slate-600 text-sm max-w-md mx-auto">
              Our design team is building your Aurora proposal. Updates and final documents will be sent to {pmEmail}.
            </p>
            <button
              onClick={() => setIsSuccess(false)}
              className="px-6 py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl text-xs transition-colors"
            >
              Request Another Proposal
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="rounded-3xl p-6 sm:p-8 bg-white border border-slate-200/90 shadow-sm space-y-6">
            <h2 className="text-lg font-bold text-slate-950 border-b border-slate-100 pb-2">
              Request Sales Proposal
            </h2>

            {/* Project Type */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">Project Type</label>
              <div className="space-y-2">
                {[
                  { value: "Residential-With-Tesla", label: "Residential With Tesla Shingle" },
                  { value: "Residential-With-Traditional-Solar", label: "Residential With Traditional Solar" },
                  { value: "Commercial-With-Traditional-Solar", label: "Commercial With Traditional Solar" },
                ].map((type) => (
                  <label
                    key={type.value}
                    onClick={() => setProjectType(type.value)}
                    className={`p-3 rounded-xl border cursor-pointer flex items-center gap-3 transition-all text-xs font-semibold ${
                      projectType === type.value
                        ? "border-orange-500 bg-orange-50/50 text-slate-900"
                        : "border-slate-200 bg-[#F1F3F6] text-slate-700"
                    }`}
                  >
                    <input
                      type="radio"
                      name="projectType"
                      checked={projectType === type.value}
                      onChange={() => setProjectType(type.value)}
                      className="accent-orange-600"
                    />
                    <span>{type.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Project Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Project Name <span className="text-orange-600">*</span>
              </label>
              <input
                type="text"
                required
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="E.g. Customer Name"
                className="w-full px-3.5 py-2.5 bg-[#F1F3F6] border border-slate-200/90 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-orange-500"
              />
            </div>

            {/* Project Address */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Project Address <span className="text-orange-600">*</span>
              </label>
              <input
                type="text"
                required
                value={projectAddress}
                onChange={(e) => setProjectAddress(e.target.value)}
                placeholder="Street Address, City, State Zipcode"
                className="w-full px-3.5 py-2.5 bg-[#F1F3F6] border border-slate-200/90 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-orange-500"
              />
            </div>

            {/* New Construction */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">
                Is this a new construction? <span className="text-orange-600">*</span>
              </label>
              <div className="space-y-2">
                <label
                  onClick={() => setIsNewConstruction("one")}
                  className={`p-3 rounded-xl border cursor-pointer flex items-center gap-3 transition-all text-xs font-semibold ${
                    isNewConstruction === "one"
                      ? "border-orange-500 bg-orange-50/50 text-slate-900"
                      : "border-slate-200 bg-[#F1F3F6] text-slate-700"
                  }`}
                >
                  <input
                    type="radio"
                    name="newConstruction"
                    checked={isNewConstruction === "one"}
                    onChange={() => setIsNewConstruction("one")}
                    className="accent-orange-600"
                  />
                  <span>Yes, please ignore the roof on map. I'm attaching roof plans.</span>
                </label>
                <label
                  onClick={() => setIsNewConstruction("two")}
                  className={`p-3 rounded-xl border cursor-pointer flex items-center gap-3 transition-all text-xs font-semibold ${
                    isNewConstruction === "two"
                      ? "border-orange-500 bg-orange-50/50 text-slate-900"
                      : "border-slate-200 bg-[#F1F3F6] text-slate-700"
                  }`}
                >
                  <input
                    type="radio"
                    name="newConstruction"
                    checked={isNewConstruction === "two"}
                    onChange={() => setIsNewConstruction("two")}
                    className="accent-orange-600"
                  />
                  <span>No, its an old building. Use roof on map for proposal.</span>
                </label>
              </div>
            </div>

            {/* Sizing Strategy */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">System Sizing Strategy</label>
              <select
                value={sizingStrategy}
                onChange={(e) => setSizingStrategy(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#F1F3F6] border border-slate-200/90 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-orange-500"
              >
                <option value="" disabled>Select Sizing Strategy</option>
                <option value="one">Maximum Roof Space</option>
                <option value="two">Specific System Size</option>
                <option value="Offset-ELectric-Bills">Offset Electricity Bills</option>
                <option value="Offset-ELectricity-Bills">Offset 50% Electricity Bills</option>
              </select>
            </div>

            {/* Fire Offset Dropdown */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Minimum fire offset for module layout (per local fire code)
              </label>
              <select
                value={fireOffset}
                onChange={(e) => setFireOffset(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#F1F3F6] border border-slate-200/90 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-orange-500"
              >
                <option value="" disabled>Select Fire Offset Code</option>
                <option value="No-fire-code-enforced">No fire code enforced</option>
                <option value="18-from-ridge">18" from ridge 3' on hip roofs and 2x 3' pathways from eave to ridge</option>
                <option value="3-from-ridge-only">3' from ridge only</option>
                <option value="3-from-ridge-rake">3' from ridge/rake, 18" from hips/valleys</option>
                <option value="3-fire-code-enforced">3' fire code enforced (NYC, &gt;9.5 degrees)</option>
                <option value="6-fire-code-enforced">6' fire code enforced</option>
                <option value="18-from-ridge-outside">18" from ridge 3' from outside edges</option>
                <option value="3-fire-code-general">3' fire code enforced</option>
                <option value="18-from-edges-only">18" from edges only</option>
                <option value="3-from-edges-only">3' from edges only</option>
                <option value="ground-mount">ground mount, not applicable</option>
                <option value="OTHER">OTHER (Input new code in text field generated)</option>
              </select>
            </div>

            {/* Electricity Bill Available */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">
                Electricity Bill Available? <span className="text-orange-600">*</span>
              </label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold">
                  <input
                    type="radio"
                    name="billAvail"
                    checked={billAvailable === "one"}
                    onChange={() => setBillAvailable("one")}
                    className="accent-orange-600"
                  />
                  Yes
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold">
                  <input
                    type="radio"
                    name="billAvail"
                    checked={billAvailable === "two"}
                    onChange={() => setBillAvailable("two")}
                    className="accent-orange-600"
                  />
                  No
                </label>
              </div>
            </div>

            {/* Bill Upload */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Copy of Electric Bill <span className="text-orange-600">*</span>
              </label>
              <div className="flex items-center gap-3">
                <label className="px-4 py-2 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-xl text-xs font-semibold cursor-pointer transition-colors">
                  Choose File
                  <input type="file" onChange={handleBillFileChange} className="hidden" />
                </label>
                <span className="text-xs text-slate-500">
                  {billFiles.length > 0 ? billFiles[0].name : "No file chosen"}
                </span>
              </div>
            </div>

            {/* Annual Consumption */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Annual Electricity Consumption (kWh) <span className="text-orange-600">*</span>
              </label>
              <input
                type="text"
                required
                value={annualKwh}
                onChange={(e) => setAnnualKwh(e.target.value)}
                placeholder="e.g. 12500"
                className="w-full px-3.5 py-2.5 bg-[#F1F3F6] border border-slate-200/90 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-orange-500"
              />
            </div>

            {/* Purchase Preference */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">
                Customer Purchase Preference <span className="text-orange-600">*</span>
              </label>
              <div className="flex gap-4">
                {["Cash", "Loan", "Both"].map((opt, i) => {
                  const val = i === 0 ? "one" : i === 1 ? "two" : "Both";
                  return (
                    <label key={opt} className="flex items-center gap-2 cursor-pointer text-xs font-semibold">
                      <input
                        type="radio"
                        name="purchasePref"
                        checked={purchasePreference === val}
                        onChange={() => setPurchasePreference(val)}
                        className="accent-orange-600"
                      />
                      {opt}
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Project Notes */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Project Notes & Special Requirements</label>
              <textarea
                rows={4}
                value={projectNotes}
                onChange={(e) => setProjectNotes(e.target.value)}
                className="w-full p-3 bg-[#F1F3F6] border border-slate-200/90 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-orange-500"
              />
            </div>

            {/* Price per Watt */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                $ per Watt offered <span className="text-orange-600">*</span>
              </label>
              <input
                type="text"
                required
                value={pricePerWatt}
                onChange={(e) => setPricePerWatt(e.target.value)}
                placeholder="e.g. 2.85"
                className="w-full px-3.5 py-2.5 bg-[#F1F3F6] border border-slate-200/90 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-orange-500"
              />
              <p className="text-[10px] text-slate-400 mt-1">Price per watt offered to the client.</p>
            </div>

            {/* Equipment Info */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Module Manufacturer <span className="text-orange-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={moduleManufacturer}
                  onChange={(e) => setModuleManufacturer(e.target.value)}
                  placeholder="e.g. Q CELLS"
                  className="w-full px-3.5 py-2.5 bg-[#F1F3F6] border border-slate-200/90 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Module Wattage <span className="text-orange-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={moduleWattage}
                  onChange={(e) => setModuleWattage(e.target.value)}
                  placeholder="e.g. 400W"
                  className="w-full px-3.5 py-2.5 bg-[#F1F3F6] border border-slate-200/90 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Inverter Type <span className="text-orange-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={inverterType}
                  onChange={(e) => setInverterType(e.target.value)}
                  placeholder="e.g. Enphase IQ8M"
                  className="w-full px-3.5 py-2.5 bg-[#F1F3F6] border border-slate-200/90 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>

            {/* Project Resources File Upload */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Project Resources <span className="text-orange-600">*</span>
              </label>
              <div className="border-2 border-dashed border-slate-200 rounded-xl p-4 bg-[#F8FAFC] hover:bg-slate-50 transition-colors text-center relative cursor-pointer group">
                <input
                  type="file"
                  multiple
                  onChange={handleResourceFileChange}
                  className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                />
                <div className="flex flex-col items-center justify-center space-y-1">
                  <Upload className="w-5 h-5 text-slate-400 group-hover:text-orange-500 transition-colors" />
                  <p className="text-xs text-slate-600">
                    Drag and Drop (or) <span className="text-orange-600 font-semibold underline">Choose Files</span>
                  </p>
                  <p className="text-[10px] text-slate-400">Maximum file size allowed is 100 MB.</p>
                </div>
              </div>
              {resourceFiles.length > 0 && (
                <ul className="text-xs text-slate-600 space-y-1 pt-2">
                  {resourceFiles.map((file, idx) => (
                    <li key={idx} className="bg-slate-100 px-2.5 py-1 rounded text-[11px] truncate">
                      {file.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* PM Email & Company Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Project Manager's Email <span className="text-orange-600">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={pmEmail}
                  onChange={(e) => setPmEmail(e.target.value)}
                  placeholder="pm@company.com"
                  className="w-full px-3.5 py-2.5 bg-[#F1F3F6] border border-slate-200/90 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-orange-500"
                />
                <p className="text-[10px] text-slate-400 mt-1">This email will be used to send project updates and notifications.</p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Your Company Name <span className="text-orange-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="ABC, LLC"
                  className="w-full px-3.5 py-2.5 bg-[#F1F3F6] border border-slate-200/90 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>

            {/* Submit */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-3.5 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow-md transition-all disabled:opacity-50"
              >
                {isSubmitting ? "Sending Request..." : "Send Message"}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}
      </main>

      <Footer />
    </div>
  );
}
