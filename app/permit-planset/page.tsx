"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import confetti from "canvas-confetti";
import {
  Building2,
  Home,
  Battery,
  Upload,
  FileText,
  CheckCircle2,
  Compass,
  Sun,
  ShieldCheck,
  ArrowRight,
  CreditCard,
  FileSpreadsheet
} from "lucide-react";

interface FileUploadProps {
  label: string;
  required?: boolean;
  hint?: string;
  files: File[];
  onFilesChange: (files: File[]) => void;
}

function FileUploadZone({ label, required, hint, files, onFilesChange }: FileUploadProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      onFilesChange([...files, ...selectedFiles]);
    }
  };

  const removeFile = (index: number) => {
    onFilesChange(files.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-semibold text-slate-700">
        {label} {required && <span className="text-orange-600">*</span>}
      </label>
      <div className="border-2 border-dashed border-slate-200 rounded-xl p-4 bg-[#F8FAFC] hover:bg-slate-50 transition-colors text-center relative cursor-pointer group">
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
        />
        <div className="flex flex-col items-center justify-center space-y-1">
          <Upload className="w-5 h-5 text-slate-400 group-hover:text-orange-500 transition-colors" />
          <p className="text-xs text-slate-600">
            Drag and Drop (or) <span className="text-orange-600 font-semibold underline">Choose Files</span>
          </p>
          {hint && <p className="text-[10px] text-slate-400">{hint}</p>}
        </div>
      </div>
      {files.length > 0 && (
        <ul className="text-xs text-slate-600 space-y-1 pt-1">
          {files.map((file, idx) => (
            <li key={idx} className="flex items-center justify-between bg-slate-100 px-2.5 py-1 rounded-md text-[11px]">
              <span className="truncate max-w-[200px]">{file.name}</span>
              <button
                type="button"
                onClick={() => removeFile(idx)}
                className="text-red-500 hover:text-red-700 font-bold ml-2"
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function PermitPlansetPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Form Fields
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [projectName, setProjectName] = useState("");
  const [projectAddress, setProjectAddress] = useState("");
  const [propertyCategory, setPropertyCategory] = useState<"residential" | "commercial" | "">("");
  const [serviceOption, setServiceOption] = useState("");
  const [hasBattery, setHasBattery] = useState(false);
  const [storageDetails, setStorageDetails] = useState(
    `Battery Make and Model: \nAnswer:\n\nNo. of units (Quantity): \nAnswer:\n\nStorage Type (Whole Home/Partial Backup): \nAnswer:`
  );
  const [submissionPref, setSubmissionPref] = useState<"quick" | "detailed" | "">("");
  const [systemInfo, setSystemInfo] = useState(
    `Number of PV modules: \nAnswer:\n\nMake/Model of PV modules: \nAnswer:\n\nNumber of inverters: \nAnswer:\n\nMake/Model of inverters: \nAnswer:\n\nNumber of Power Optimizers: \nAnswer:\n\nMake/Model of Power Optimizer: \nAnswer:\n\nRacking Make/Model: \nAnswer:`
  );
  const [generalNotes, setGeneralNotes] = useState("");
  const [systemType, setSystemType] = useState<"roofmount" | "groundmount" | "">("");

  // Detailed Textareas
  const [roofmountDetails, setRoofmountDetails] = useState(
    `Utility Name: \nAnswer:\n\nJurisdiction: \nAnswer:\n\nConfiguration: \nAnswer:\n\nType: \nAnswer:\n\nResidential: \nAnswer:\n\nSystem Size (DC): \nAnswer:\n\nAdd-on to an existing system?: \nAnswer:\n\nSystem Type: \nAnswer:\n\nSystem Information: \nAnswer:\n\nNumber of PV modules: \nAnswer:\n\nMake/Model of PV modules: \nAnswer:\n\nNumber of inverters: \nAnswer:\n\nMake/Model of inverters: \nAnswer:\n\nNumber of Power Optimizers: \nAnswer:\n\nMake/Model of Power Optimizer: \nAnswer:\n\nMonitoring devices: \nAnswer:\n\nAC/DC Disconnect Make/Model: \nAnswer:\n\nRacking Make/Model: \nAnswer:\n\nInterconnection Location: \nAnswer:\n\nSite Structural Information (Roof Mounted) Roof pitch: \nAnswer:\n\nRoof measurements: \nAnswer:\n\nQuantity of arrays: \nAnswer:\n\nAdd arrays and information accordingly: \nAnswer:\n\nRoof-Mount Attachment Type: \nAnswer:\n\nRoof type (Hint: asphalt shingle, cemented): \nAnswer:\n\nStructure Type (Hint: Truss): \nAnswer:\n\nAdd rafter size and spacing: \nAnswer:\n\nAdd information for all arrays accordingly: \nAnswer:\n\nSite Electrical Information: \nAnswer:\n\nString Design Required?: \nAnswer:\n\nInverter Location (specific wall): \nAnswer:\n\nAC Disconnect Location: \nAnswer:\n\nIf breaker Upsizing/Downsizing require or not, if yes explain: \nAnswer:\n\nExisting Electrical Grounding: (Hint Ground Rod): \nAnswer:\n\nMain Electrical Panel Location: (Hint External Wall): \nAnswer:\n\nInternal Main Electrical Panel Orientation: (Hint Basement): \nAnswer:\n\nMain Electrical Panel Main Breaker Rating: \nAnswer:\n\nMain Electrical Panel Rating (Main Bus Rating): \nAnswer:\n\nService Voltage at Interconnection (hint 1P 3W 120/240 V): \nAnswer:\n\nExisting Meter Location: (Hint External Wall): \nAnswer:\n\nUtility Entrance: (Hint Underground): \nAnswer:\n\nAC-Side Information: \nAnswer:\n\nPV Revenue Meter: \nAnswer:\n\nUtility Disconnect: \nAnswer:\n\nUtility Disconnect Type: \nAnswer:\n\nExternal Utility Disconnect Location: \nAnswer:\n\nExternal Utility Disconnect: \nAnswer:\n\nOrientation: (Hint North): \nAnswer:`
  );

  const [groundmountDetails, setGroundmountDetails] = useState(
    `Utility Name:\nAnswer:\n\nJurisdiction:\nAnswer:\n\nConfiguration:\nAnswer:\n\nType:\nAnswer:\n\nResidential:\nAnswer:\n\nSystem Size (DC):\nAnswer:\n\nAdd-on to an existing system?:\nAnswer:\n\nSystem Type:\nAnswer:\n\nSystem Information:\nAnswer:\n\nNumber of PV modules:\nAnswer:\n\nMake/Model of PV modules:\nAnswer:\n\nNumber of inverters:\nAnswer:\n\nMake/Model of inverters:\nAnswer:\n\nNumber of Power Optimizers:\nAnswer:\n\nMake/Model of Power Optimizer:\nAnswer:\n\nMonitoring devices:\nAnswer:\n\nAC/DC Disconnect Make/Model:\nAnswer:\n\nRacking Make/Model:\nAnswer:\n\nInterconnection Location:\nAnswer:\n\nSite Structural Information (Ground Mounted):\nAnswer:\n\nGround Mount Racking:\nAnswer:\n\nQuantity of Columns:\nAnswer:\n\nQuantity of Rows:\nAnswer:\n\nFront Clearance (Ft):\nAnswer:\n\nRear Clearance (Ft):\nAnswer:\n\nArray Quantity:\nAnswer:\n\nAdd information for all arrays accordingly:\nAnswer:\n\nAdd information for all arrays accordingly:\nAnswer:\n\nGround Type (Hint: Soil Type):\nAnswer:\n\nTrenching (Ft) (Also mention wire size and conduit type):\nAnswer:\n\nAdditional Notes:\nAnswer:\n\nSite Electrical Information:\nAnswer:\n\nString Design Required?:\nAnswer:\n\nInverter Location (specific wall):\nAnswer:\n\nAC Disconnect Location::\nAnswer:\n\nIf breaker Upsizing/Downsizing require or not, if yes explain:\nAnswer:\n\nExisting Electrical Grounding: (Hint Ground Rod):\nAnswer:\n\nMain Electrical Panel Location: (Hint External Wall):\nAnswer:\n\nInternal Main Electrical Panel Orientation: (Hint Basement):\nAnswer:\n\nMain Electrical Panel Main Breaker Rating::\nAnswer:\n\nMain Electrical Panel Rating (Main Bus Rating)::\nAnswer:\n\nService Voltage at Interconnection (hint 1P 3W 120/240 V):\nAnswer:\n\nExisting Meter Location: (Hint External Wall):\nAnswer:\n\nUtility Entrance: (Hint Underground):\nAnswer:\n\nAC-Side Information:\nAnswer:\n\nPV Revenue Meter:\nAnswer:\n\nUtility Disconnect:\nAnswer:\n\nUtility Disconnect Type:\nAnswer:\n\nExternal Utility Disconnect Location:\nAnswer:\n\nExternal Utility Disconnect:\nAnswer:\n\nOrientation: (Hint North):\nAnswer:`
  );

  // File Upload States
  const [checklistFiles, setChecklistFiles] = useState<File[]>([]);
  const [cadFiles, setCadFiles] = useState<File[]>([]);
  const [layoutFiles, setLayoutFiles] = useState<File[]>([]);
  const [utilityBillFiles, setUtilityBillFiles] = useState<File[]>([]);
  const [roofPicFiles, setRoofPicFiles] = useState<File[]>([]);
  const [atticPicFiles, setAtticPicFiles] = useState<File[]>([]);
  const [electricPicFiles, setElectricPicFiles] = useState<File[]>([]);
  const [propertySketchFiles, setPropertySketchFiles] = useState<File[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await fetch("/api/submit-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formType: "Permit Planset",
          senderEmail: email,
          subject: `[SunPermit] New Permit Planset Request: ${companyName} (${projectName})`,
          data: {
            companyName,
            email,
            projectName,
            projectAddress,
            propertyCategory,
            serviceOption,
            hasBattery: hasBattery ? "Yes" : "No",
            storageDetails: hasBattery ? storageDetails : "None",
            submissionPreference: submissionPref,
            systemType,
            generalNotes: generalNotes || "None",
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

      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
        {/* ─── Top Switcher Tabs (Matches Screenshot 1 Exactly) ─── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-10">
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
            <Compass className="w-3.5 h-3.5 text-orange-600" />
            SUNPERMIT PERMIT PLANSET
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-950 tracking-tight">
            Permit Planset (Beta)
          </h1>
          <p className="mt-3 text-slate-600 text-sm sm:text-base max-w-xl mx-auto">
            Upload your project files or provide comprehensive details to generate a complete permit-ready engineering planset.
          </p>
        </div>

        {isSuccess ? (
          <div className="rounded-3xl p-8 bg-white border border-slate-200 shadow-sm text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h2 className="text-2xl font-extrabold text-slate-950">Project Submitted Successfully!</h2>
            <p className="text-slate-600 text-sm max-w-md mx-auto">
              Our drafting team and engineers are reviewing your submission. You will receive an invoice and status updates via email.
            </p>
            <button
              onClick={() => setIsSuccess(false)}
              className="px-6 py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl text-xs transition-colors"
            >
              Submit Another Project
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="rounded-3xl p-6 sm:p-8 bg-white border border-slate-200/90 shadow-sm space-y-8">
            {/* Section 1: Company Info */}
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-slate-950 border-b border-slate-100 pb-2">
                Request Permit Planset (Beta)
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Your Company Name <span className="text-orange-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="E.g. SUNPERMIT, LLC"
                    className="w-full px-3.5 py-2.5 bg-[#F1F3F6] border border-slate-200/90 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Your Email Address <span className="text-orange-600">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Project Manager Email"
                    className="w-full px-3.5 py-2.5 bg-[#F1F3F6] border border-slate-200/90 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Project Details */}
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-slate-950 border-b border-slate-100 pb-2">
                Project Details
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    New Project Name <span className="text-orange-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    placeholder="Job Name"
                    className="w-full px-3.5 py-2.5 bg-[#F1F3F6] border border-slate-200/90 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-orange-500"
                  />
                </div>
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
              </div>

              {/* Property Category */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-2">
                  Property Category <span className="text-orange-600">*</span>
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <div
                    onClick={() => setPropertyCategory("residential")}
                    className={`p-4 rounded-xl border cursor-pointer flex items-center gap-3 transition-all ${
                      propertyCategory === "residential"
                        ? "border-orange-500 bg-orange-50/50"
                        : "border-slate-200 bg-[#F1F3F6]"
                    }`}
                  >
                    <Home className={`w-5 h-5 ${propertyCategory === "residential" ? "text-orange-600" : "text-slate-500"}`} />
                    <span className="text-xs font-bold text-slate-800">Residential</span>
                  </div>
                  <div
                    onClick={() => setPropertyCategory("commercial")}
                    className={`p-4 rounded-xl border cursor-pointer flex items-center gap-3 transition-all ${
                      propertyCategory === "commercial"
                        ? "border-orange-500 bg-orange-50/50"
                        : "border-slate-200 bg-[#F1F3F6]"
                    }`}
                  >
                    <Building2 className={`w-5 h-5 ${propertyCategory === "commercial" ? "text-orange-600" : "text-slate-500"}`} />
                    <span className="text-xs font-bold text-slate-800">Commercial</span>
                  </div>
                </div>
              </div>

              {/* Services */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-2">
                  Services <span className="text-orange-600">*</span>
                </label>
                <div className="space-y-3">
                  {[
                    "Permit Planset + Structural Engineering (Roof Load Calculation Report)",
                    "Permit Planset + Structural Engineering (Roof Load Calculation Report) + Electrical Engineering",
                    "Full Project (Design + Engineering + Permit/Interconnection)"
                  ].map((option) => (
                    <label
                      key={option}
                      onClick={() => setServiceOption(option)}
                      className={`p-3.5 rounded-xl border cursor-pointer flex items-center gap-3 transition-all text-xs font-semibold ${
                        serviceOption === option
                          ? "border-orange-500 bg-orange-50/50 text-slate-900"
                          : "border-slate-200 bg-[#F1F3F6] text-slate-700"
                      }`}
                    >
                      <input
                        type="radio"
                        name="services"
                        checked={serviceOption === option}
                        onChange={() => setServiceOption(option)}
                        className="accent-orange-600"
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Battery Backup Checkbox */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hasBattery}
                    onChange={(e) => setHasBattery(e.target.checked)}
                    className="w-4 h-4 accent-orange-600 rounded"
                  />
                  <span className="text-xs font-bold text-slate-800 flex items-center gap-2">
                    <Battery className="w-4 h-4 text-orange-600" />
                    Select if system has storage backup (Battery Backup)
                  </span>
                </label>

                {hasBattery && (
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Storage Backup Details <span className="text-orange-600">*</span>
                    </label>
                    <textarea
                      rows={6}
                      value={storageDetails}
                      onChange={(e) => setStorageDetails(e.target.value)}
                      className="w-full p-3 bg-white border border-slate-200 rounded-xl text-xs font-mono text-slate-800 focus:outline-none focus:border-orange-500"
                    />
                  </div>
                )}
              </div>

              {/* Project Submission Preference */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-2">
                  Project submission preference <span className="text-orange-600">*</span>
                </label>
                <div className="space-y-3">
                  <div
                    onClick={() => setSubmissionPref("quick")}
                    className={`p-3.5 rounded-xl border cursor-pointer flex items-start gap-3 transition-all ${
                      submissionPref === "quick"
                        ? "border-orange-500 bg-orange-50/50"
                        : "border-slate-200 bg-[#F1F3F6]"
                    }`}
                  >
                    <input
                      type="radio"
                      name="subPref"
                      checked={submissionPref === "quick"}
                      onChange={() => setSubmissionPref("quick")}
                      className="mt-0.5 accent-orange-600"
                    />
                    <div>
                      <div className="text-xs font-bold text-slate-900">
                        I just want to upload my own checklist and project pictures. (Quick Project Submission)
                      </div>
                    </div>
                  </div>

                  <div
                    onClick={() => setSubmissionPref("detailed")}
                    className={`p-3.5 rounded-xl border cursor-pointer flex items-start gap-3 transition-all ${
                      submissionPref === "detailed"
                        ? "border-orange-500 bg-orange-50/50"
                        : "border-slate-200 bg-[#F1F3F6]"
                    }`}
                  >
                    <input
                      type="radio"
                      name="subPref"
                      checked={submissionPref === "detailed"}
                      onChange={() => setSubmissionPref("detailed")}
                      className="mt-0.5 accent-orange-600"
                    />
                    <div>
                      <div className="text-xs font-bold text-slate-900">
                        I want to provide complete project details. (Detailed Project Submission)
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-[11px] text-slate-500 mt-2 font-medium">
                  ** Going with Quick Project Submission option our engineer may require to confirm more details if necessary.
                </p>
              </div>

              {/* System Information — ONLY shown when Quick Project Submission ("quick") is selected */}
              {submissionPref === "quick" && (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    System Information
                  </label>
                  <textarea
                    rows={8}
                    value={systemInfo}
                    onChange={(e) => setSystemInfo(e.target.value)}
                    className="w-full p-3 bg-[#F1F3F6] border border-slate-200/90 rounded-xl text-xs font-mono text-slate-800 focus:bg-white focus:outline-none focus:border-orange-500"
                  />
                </div>
              )}

              {/* General Notes */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  General Notes
                </label>
                <textarea
                  rows={4}
                  value={generalNotes}
                  onChange={(e) => setGeneralNotes(e.target.value)}
                  placeholder="Project Instructions"
                  className="w-full p-3 bg-[#F1F3F6] border border-slate-200/90 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-orange-500"
                />
              </div>

              {/* System Type */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-2">
                  System Type <span className="text-orange-600">*</span>
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <div
                    onClick={() => setSystemType("roofmount")}
                    className={`p-4 rounded-xl border cursor-pointer flex items-center gap-3 transition-all ${
                      systemType === "roofmount"
                        ? "border-orange-500 bg-orange-50/50"
                        : "border-slate-200 bg-[#F1F3F6]"
                    }`}
                  >
                    <Home className={`w-5 h-5 ${systemType === "roofmount" ? "text-orange-600" : "text-slate-500"}`} />
                    <span className="text-xs font-bold text-slate-800">Roofmount</span>
                  </div>
                  <div
                    onClick={() => setSystemType("groundmount")}
                    className={`p-4 rounded-xl border cursor-pointer flex items-center gap-3 transition-all ${
                      systemType === "groundmount"
                        ? "border-orange-500 bg-orange-50/50"
                        : "border-slate-200 bg-[#F1F3F6]"
                    }`}
                  >
                    <Sun className={`w-5 h-5 ${systemType === "groundmount" ? "text-orange-600" : "text-slate-500"}`} />
                    <span className="text-xs font-bold text-slate-800">Groundmount</span>
                  </div>
                </div>
              </div>

              {/* Core File Uploads */}
              <div className="space-y-4 pt-2">
                <FileUploadZone
                  label="Upload my own checklist (Information collected during site inspection)"
                  required
                  hint="Maximum file size allowed is 100 MB."
                  files={checklistFiles}
                  onFilesChange={setChecklistFiles}
                />

                <FileUploadZone
                  label="CAD File - (Optional)"
                  hint="Maximum file size allowed is 100 MB."
                  files={cadFiles}
                  onFilesChange={setCadFiles}
                />
              </div>

              {/* System Type Deep Details Textarea — ONLY shown when Detailed Project Submission ("detailed") AND a System Type is selected */}
              {submissionPref === "detailed" && systemType === "roofmount" && (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Roofmount Detailed Information
                  </label>
                  <textarea
                    rows={12}
                    value={roofmountDetails}
                    onChange={(e) => setRoofmountDetails(e.target.value)}
                    className="w-full p-3 bg-[#F1F3F6] border border-slate-200/90 rounded-xl text-xs font-mono text-slate-800 focus:bg-white focus:outline-none focus:border-orange-500"
                  />
                </div>
              )}
              {submissionPref === "detailed" && systemType === "groundmount" && (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Groundmount Detailed Information
                  </label>
                  <textarea
                    rows={12}
                    value={groundmountDetails}
                    onChange={(e) => setGroundmountDetails(e.target.value)}
                    className="w-full p-3 bg-[#F1F3F6] border border-slate-200/90 rounded-xl text-xs font-mono text-slate-800 focus:bg-white focus:outline-none focus:border-orange-500"
                  />
                </div>
              )}

              {/* Additional Document File Uploads */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                <FileUploadZone
                  label="Proposed Layout (Feasibility Study from upstream service)"
                  hint="Max size: 20 MB"
                  files={layoutFiles}
                  onFilesChange={setLayoutFiles}
                />
                <FileUploadZone
                  label="Electric Utility Bill"
                  hint="Max size: 20 MB"
                  files={utilityBillFiles}
                  onFilesChange={setUtilityBillFiles}
                />
                <FileUploadZone
                  label="Roof Pictures"
                  hint="Max size: 20 MB"
                  files={roofPicFiles}
                  onFilesChange={setRoofPicFiles}
                />
                <FileUploadZone
                  label="Attic Pictures"
                  hint="Max size: 20 MB"
                  files={atticPicFiles}
                  onFilesChange={setAtticPicFiles}
                />
                <FileUploadZone
                  label="Electric Pictures (include pictures of MSP Box, breaker, electric meter)"
                  hint="Max size: 20 MB"
                  files={electricPicFiles}
                  onFilesChange={setElectricPicFiles}
                />
                <FileUploadZone
                  label="Property sketch mentioning location of MSP/meter/roof vent/chimney."
                  hint="Max size: 20 MB"
                  files={propertySketchFiles}
                  onFilesChange={setPropertySketchFiles}
                />
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center gap-4 pt-6 border-t border-slate-100">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3.5 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow-md transition-all disabled:opacity-50"
                >
                  {isSubmitting ? "Submitting Project..." : "Submit Project"}
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  className="text-xs text-slate-400 hover:text-slate-600 underline font-medium cursor-not-allowed"
                  title="Fill in form fields before saving as draft"
                >
                  Save as Draft
                </button>
              </div>
            </div>
          </form>
        )}
      </main>

      <Footer />
    </div>
  );
}
