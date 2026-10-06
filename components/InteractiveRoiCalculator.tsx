"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import {
  ChevronDown,
  ChevronUp,
  ArrowRight,
  CheckCircle2,
  Sparkles
} from "lucide-react";

export default function InteractiveRoiCalculator() {
  const [quoteStep, setQuoteStep] = useState(1); // Step 1, 2, or 3
  const [validationError, setValidationError] = useState("");

  // Step 1 fields
  const [propertyType, setPropertyType] = useState("");
  const [includeDroneSurvey, setIncludeDroneSurvey] = useState("");
  const [systemType, setSystemType] = useState("");

  // Step 2 fields
  const [systemSizeKw, setSystemSizeKw] = useState("");
  const [workVolume, setWorkVolume] = useState("1-10-jobs");
  const [commercialNotes, setCommercialNotes] = useState(
    "For commercial projects continue form to submit contact details or Reach us out at sales@sunpermit.com"
  );

  // Step 3 fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Price Calculation Logic matching SunPermit rules
  const getDroneAddon = () => (includeDroneSurvey === "Yes" ? 350 : 0);
  const getBatteryAddon = () => (systemType === "With-Battery" ? 100 : 0);
  const getWorkVolumeRate = () => {
    switch (workVolume) {
      case "1-10-jobs":
        return 130;
      case "10-20-jobs":
        return 120;
      case "20-30-jobs":
        return 100;
      case "30+-jobs":
        return 90;
      default:
        return 130;
    }
  };

  const calculatedTotal = getDroneAddon() + getBatteryAddon() + getWorkVolumeRate();

  const handleNextStep = () => {
    if (quoteStep === 1) {
      if (!propertyType) {
        setValidationError("Property Type is required.");
        return;
      }
      if (!includeDroneSurvey) {
        setValidationError("Include Drone Pilot Survey selection is required.");
        return;
      }
      if (!systemType) {
        setValidationError("System Type selection is required.");
        return;
      }
      setValidationError("");
      setQuoteStep(2);
    } else if (quoteStep === 2) {
      if (propertyType === "Residential") {
        const sizeNum = parseFloat(systemSizeKw);
        if (!systemSizeKw || isNaN(sizeNum) || sizeNum < 1) {
          setValidationError("Please enter a valid system size!");
          return;
        }
        if (sizeNum > 30) {
          setValidationError(
            "Cost Estimation is available for Residential Systems Up to 30KW. For residential systems greater than 30KW or commercial systems please contact sales@sunpermit.com"
          );
          return;
        }
      }
      if (!workVolume) {
        setValidationError("Work Volume selection is required.");
        return;
      }
      setValidationError("");
      setQuoteStep(3);
    }
  };

  const handlePreviousStep = () => {
    setValidationError("");
    if (quoteStep > 1) {
      setQuoteStep((prev) => prev - 1);
    }
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setValidationError("Name is required.");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      setValidationError("This field is required. Please input a valid email.");
      return;
    }
    if (!phone.trim()) {
      setValidationError("This field is required. Please input a phone number.");
      return;
    }

    setValidationError("");
    try {
      fetch("/api/submit-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formType: "Quote Wizard",
          senderEmail: email,
          subject: `[SunPermit Quote Request] ${name} (${propertyType}) | ${email}`,
          data: {
            name,
            email,
            phone,
            propertyType,
            includeDroneSurvey,
            systemType,
            systemSizeKw: propertyType === "Residential" ? `${systemSizeKw} KW` : "Commercial Project",
            workVolume,
            estimatedTotal: propertyType === "Residential" ? `$${calculatedTotal.toFixed(2)}` : "Custom quote required",
          },
        }),
      });
    } catch (err) {
      console.error(err);
    }
    setIsSubmitted(true);
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
  };

  const progressPercent = quoteStep === 1 ? "0%" : quoteStep === 2 ? "50%" : "100%";

  return (
    <section id="pricing" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#FAF7F2] text-slate-900 overflow-hidden border-t border-slate-200/80">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[700px] h-[500px] bg-orange-400/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* ─── Left Column: NOT A SEPARATE TEAM, WE ARE PART OF YOU! ─── */}
          <div className="lg:col-span-6 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-3"
            >
              <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-black tracking-tight text-slate-950 uppercase leading-[1.15]">
                NOT A SEPARATE TEAM, WE ARE{" "}
                <span className="text-[#E6561B]">PART OF YOU!</span>
              </h2>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-slate-700 text-sm sm:text-base leading-relaxed font-normal"
            >
              The increasing demand for getting climate-friendly life and the heading toward renewable energy revolutionized the solar industry. Dealing with more clients means more revenue and yes more project management.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-slate-700 text-sm sm:text-base leading-relaxed font-normal"
            >
              To make sure the increasing number of jobs do not affect the quality of project management, it is an opportunity for all the solar companies to let us take responsibility for the project services such as <strong className="text-slate-950 font-bold">permit plan sets</strong>, <strong className="text-slate-950 font-bold">engineering review &amp; stamps</strong>, <strong className="text-slate-950 font-bold">proposal drawings</strong>, etc so that solar installers can provide quality service to their clients and focus on project management.
            </motion.p>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex items-center gap-4 pt-2 text-slate-600 text-sm font-semibold"
            >
              <a
                href="https://www.facebook.com/sunpermit"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white border border-slate-200 hover:border-orange-500 hover:text-[#E6561B] flex items-center justify-center transition-colors shadow-xs"
                title="Facebook"
              >
                f
              </a>
              <a
                href="https://instagram.com/sunpermit"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white border border-slate-200 hover:border-orange-500 hover:text-[#E6561B] flex items-center justify-center transition-colors shadow-xs"
                title="Instagram"
              >
                📷
              </a>
              <a
                href="https://twitter.com/sunpermit"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white border border-slate-200 hover:border-orange-500 hover:text-[#E6561B] flex items-center justify-center transition-colors shadow-xs"
                title="Twitter"
              >
                𝕏
              </a>
              <a
                href="https://www.linkedin.com/company/sunpermit"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white border border-slate-200 hover:border-orange-500 hover:text-[#E6561B] flex items-center justify-center transition-colors shadow-xs"
                title="LinkedIn"
              >
                in
              </a>
            </motion.div>
          </div>

          {/* ─── Right Column: 100% Exact SunPermit Forminator Form 1152 ─── */}
          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-sm relative space-y-6"
            >
              {/* Top Title */}
              <div className="text-center space-y-1">
                <ChevronUp className="w-5 h-5 text-[#E6561B] mx-auto animate-bounce" />
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
                  Get a Quote
                </h3>
              </div>

              {/* Progress Line Bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] font-bold text-slate-500">
                  <span>Progress</span>
                  <span className="text-[#E6561B]">{progressPercent}</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#E6561B] to-amber-500 transition-all duration-300"
                    style={{ width: progressPercent }}
                  />
                </div>
              </div>

              {isSubmitted ? (
                <div className="text-center py-8 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>
                  <h4 className="text-xl font-bold text-slate-900">Quote Submitted Successfully!</h4>
                  <p className="text-xs text-slate-600">
                    Thank you {name}. We will get back to you at {email} shortly with your custom quote.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmitForm} className="space-y-5">
                  
                  {/* ─── PAGE 1 / STEP 1 ─── */}
                  {quoteStep === 1 && (
                    <div className="space-y-5 pt-2">
                      {/* Property Type * */}
                      <div>
                        <label className="block text-xs font-bold text-slate-800 mb-1.5">
                          Property Type <span className="text-[#E6561B]">*</span>
                        </label>
                        <div className="relative">
                          <select
                            value={propertyType}
                            onChange={(e) => {
                              setPropertyType(e.target.value);
                              setValidationError("");
                            }}
                            className="w-full bg-[#FAF7F2] border-b-2 border-slate-300 focus:border-[#E6561B] py-3 px-4 text-xs font-semibold text-slate-900 focus:outline-none appearance-none rounded-t-lg transition-colors cursor-pointer"
                          >
                            <option value="" disabled>Residential or Commercial</option>
                            <option value="Residential">Residential</option>
                            <option value="Commercial">Commercial</option>
                          </select>
                          <ChevronDown className="w-4 h-4 text-slate-500 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </div>

                      {/* Include Drone Pilot Survey * */}
                      <div>
                        <label className="block text-xs font-bold text-slate-800 mb-1.5">
                          Include Drone Pilot Survey <span className="text-[#E6561B]">*</span>
                        </label>
                        <div className="relative">
                          <select
                            value={includeDroneSurvey}
                            onChange={(e) => {
                              setIncludeDroneSurvey(e.target.value);
                              setValidationError("");
                            }}
                            className="w-full bg-[#FAF7F2] border-b-2 border-slate-300 focus:border-[#E6561B] py-3 px-4 text-xs font-semibold text-slate-900 focus:outline-none appearance-none rounded-t-lg transition-colors cursor-pointer"
                          >
                            <option value="" disabled>Yes or No</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                          </select>
                          <ChevronDown className="w-4 h-4 text-slate-500 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </div>

                      {/* System Type * */}
                      <div>
                        <label className="block text-xs font-bold text-slate-800 mb-1.5">
                          System Type <span className="text-[#E6561B]">*</span>
                        </label>
                        <div className="relative">
                          <select
                            value={systemType}
                            onChange={(e) => {
                              setSystemType(e.target.value);
                              setValidationError("");
                            }}
                            className="w-full bg-[#FAF7F2] border-b-2 border-slate-300 focus:border-[#E6561B] py-3 px-4 text-xs font-semibold text-slate-900 focus:outline-none appearance-none rounded-t-lg transition-colors cursor-pointer"
                          >
                            <option value="" disabled>With Battery or Without Battery</option>
                            <option value="With-Battery">With Battery</option>
                            <option value="Without-Battery">Without Battery</option>
                          </select>
                          <ChevronDown className="w-4 h-4 text-slate-500 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ─── PAGE 2 / STEP 2 ─── */}
                  {quoteStep === 2 && (
                    <div className="space-y-5 pt-2">
                      {/* Condition 1: If Property Type = Residential -> System Size (KW) * */}
                      {propertyType === "Residential" && (
                        <div>
                          <label className="block text-xs font-bold text-slate-800 mb-1.5">
                            System Size (KW) <span className="text-[#E6561B]">*</span>
                          </label>
                          <input
                            type="number"
                            min="1"
                            max="30"
                            step="any"
                            value={systemSizeKw}
                            onChange={(e) => {
                              setSystemSizeKw(e.target.value);
                              setValidationError("");
                            }}
                            placeholder="e.g. 10"
                            className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border-b-2 border-slate-300 focus:border-[#E6561B] text-xs font-semibold text-slate-900 focus:outline-none rounded-t-lg"
                          />
                        </div>
                      )}

                      {/* Condition 2: If Property Type = Commercial -> Textarea Notice */}
                      {propertyType === "Commercial" && (
                        <div>
                          <textarea
                            rows={4}
                            value={commercialNotes}
                            onChange={(e) => setCommercialNotes(e.target.value)}
                            className="w-full p-3 bg-[#FAF7F2] border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none"
                          />
                        </div>
                      )}

                      {/* Work Volume & Total Side-by-Side */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-800 mb-1.5">
                            Work Volume <span className="text-[#E6561B]">*</span>
                          </label>
                          <div className="relative">
                            <select
                              value={workVolume}
                              onChange={(e) => setWorkVolume(e.target.value)}
                              className="w-full bg-[#FAF7F2] border-b-2 border-slate-300 focus:border-[#E6561B] py-3 px-4 text-xs font-semibold text-slate-900 focus:outline-none appearance-none rounded-t-lg cursor-pointer"
                            >
                              <option value="" disabled>i.e 10 Jobs</option>
                              <option value="1-10-jobs">1-10 jobs</option>
                              <option value="10-20-jobs">10-20 jobs</option>
                              <option value="20-30-jobs">20-30 jobs</option>
                              <option value="30+-jobs">30+ jobs</option>
                            </select>
                            <ChevronDown className="w-4 h-4 text-slate-500 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                          </div>
                        </div>

                        {/* Calculated Total (Formula: select-3 + select-2 + select-4) */}
                        {propertyType === "Residential" && (
                          <div>
                            <label className="block text-xs font-bold text-slate-800 mb-1.5">Total</label>
                            <div className="px-3.5 py-2.5 bg-[#F1F3F6] border border-slate-200 rounded-xl text-xs font-bold text-slate-900 flex justify-between items-center h-[42px]">
                              <span>${calculatedTotal.toFixed(2)}</span>
                              <span className="text-[10px] text-slate-400 font-normal">Estimated Total</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* ─── PAGE 3 / STEP 3 ─── */}
                  {quoteStep === 3 && (
                    <div className="space-y-4 pt-2">
                      <div>
                        <label className="block text-xs font-bold text-slate-800 mb-1.5">
                          Name <span className="text-[#E6561B]">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="E.g. John Doe"
                          className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border-b-2 border-slate-300 focus:border-[#E6561B] text-xs font-semibold text-slate-900 focus:outline-none rounded-t-lg"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-800 mb-1.5">
                          Email Address <span className="text-[#E6561B]">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="E.g. john@doe.com"
                          className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border-b-2 border-slate-300 focus:border-[#E6561B] text-xs font-semibold text-slate-900 focus:outline-none rounded-t-lg"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-800 mb-1.5">
                          Phone <span className="text-[#E6561B]">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="E.g. +1 300 400 5000"
                          className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border-b-2 border-slate-300 focus:border-[#E6561B] text-xs font-semibold text-slate-900 focus:outline-none rounded-t-lg"
                        />
                      </div>
                    </div>
                  )}

                  {/* Validation Error Message */}
                  {validationError && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs font-medium text-red-600">
                      {validationError}
                    </div>
                  )}

                  {/* Step Action Buttons (Previous / Next / Submit) */}
                  <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-100">
                    {quoteStep > 1 && (
                      <button
                        type="button"
                        onClick={handlePreviousStep}
                        className="px-6 py-2.5 rounded-xl text-xs font-bold bg-[#E6561B] hover:bg-[#D4470F] text-white transition-colors shadow-xs"
                      >
                        Previous
                      </button>
                    )}

                    {quoteStep < 3 ? (
                      <button
                        type="button"
                        onClick={handleNextStep}
                        className="px-8 py-2.5 rounded-xl text-xs font-bold bg-[#E6561B] hover:bg-[#D4470F] text-white transition-colors shadow-xs"
                      >
                        Next
                      </button>
                    ) : (
                      <button
                        type="submit"
                        className="px-8 py-2.5 rounded-xl text-xs font-bold bg-[#E6561B] hover:bg-[#D4470F] text-white transition-colors shadow-xs"
                      >
                        Get Started
                      </button>
                    )}
                  </div>

                </form>
              )}

            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
