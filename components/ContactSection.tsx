"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import SunPermitLogo from "@/components/SunPermitLogo";
import {
  Phone,
  Mail,
  ArrowRight,
  MapPin,
  Compass,
  Clock,
  Search,
  CheckCircle,
  Loader2,
  User,
  Building2,
  MessageSquare,
  Sparkles,
  PhoneCall
} from "lucide-react";

export default function ContactSection() {
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
      } else {
        setError(data.message || "Something went wrong. Please try again.");
      }
    } catch {
      setError("Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="contact" className="relative w-full overflow-hidden bg-[#070A12] text-white">
      
      {/* ─── Main Dark Section (Matches Screenshot 1 Layout) ─── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* ─── Left Column: Headline, Pill Button & Exact Screenshot 2 Content ─── */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-8">
            
            {/* Headline (from Screenshot 2) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-3"
            >
              <span className="inline-block text-xs font-bold text-orange-400 uppercase tracking-widest bg-orange-500/10 px-3.5 py-1 rounded-full border border-orange-500/20">
                ENGINEERING CONSULTATION
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.12]">
                Uncertain about some
technical aspects within
your project?{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">
                  Need a
consultation from our
Engineer?
                </span>
              </h2>
            </motion.div>

            {/* Pill Button (Matches Screenshot 1 Exactly: White capsule + black arrow circle) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex items-center gap-4 pt-1"
            >
              <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="group inline-flex items-center justify-between gap-6 bg-white hover:bg-slate-100 text-slate-950 font-bold px-7 py-3.5 rounded-full shadow-2xl shadow-white/10 transition-all hover:scale-105 active:scale-95"
              >
                <span className="text-base font-extrabold">Contact us</span>
                <div className="w-8 h-8 rounded-full bg-slate-950 text-white flex items-center justify-center group-hover:translate-x-1 transition-transform">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </button>

              <a
                href="tel:+1-551-291-2786"
                className="inline-flex items-center gap-2 text-sm font-semibold text-slate-300 hover:text-orange-400 transition-colors px-4 py-3 rounded-full border border-slate-800 hover:border-orange-500/50"
              >
                <PhoneCall className="w-4 h-4 text-orange-400" />
                <span>Call (551) 291-2786</span>
              </a>
            </motion.div>

            {/* Paragraph Text (Exact from Screenshot 2) */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-xl font-normal"
            >
              When it comes to projects involving large system sizes, new technologies, or intricate knowledge of local regulations, navigating the complexities can be challenging. Reach out to us through a quick call or schedule a meeting, and let’s delve into the specifics of your project.
            </motion.p>

          </div>

          {/* ─── Right Column: Floating Light Dashboard Mockup (Matches Screenshot 1) ─── */}
          <div className="lg:col-span-6 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative w-full"
            >
              {/* Dashboard Image (Matches Screenshot Exactly) */}
              <div className="relative rounded-[28px] overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.5)] border border-slate-700/60 bg-white">
                <img
                  src="/images/hero-dashboard-white.jpg"
                  alt="Solar Analysis Dashboard"
                  className="w-full h-auto object-cover"
                />
              </div>
            </motion.div>
          </div>

        </div>
      </div>


      {/* ─── Interactive Contact / Lead Modal ─── */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-lg bg-[#0D1526] border border-white/[0.08] rounded-2xl p-6 sm:p-8 shadow-2xl text-white">
            
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-6">
              <div>
                <h3 className="text-lg font-bold text-white">Engineering Consultation</h3>
                <p className="text-xs text-slate-400">Speak directly with our senior solar engineers</p>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="text-slate-400 hover:text-white text-sm p-1.5 rounded-lg bg-slate-800"
              >
                ✕
              </button>
            </div>

            {submitted ? (
              <div className="flex flex-col items-center justify-center py-8 text-center gap-3">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-emerald-400" />
                </div>
                <h4 className="text-lg font-bold text-white">Consultation Request Received!</h4>
                <p className="text-slate-400 text-xs max-w-xs">
                  We&apos;ve emailed a confirmation to <span className="text-orange-400">{form.email}</span>. An engineer will reach out within 1 business day.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setModalOpen(false); }}
                  className="mt-4 bg-orange-500 hover:bg-orange-400 text-slate-950 font-bold px-6 py-2 rounded-xl text-xs"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                      Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="w-full bg-[#131929] border border-white/[0.08] rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@company.com"
                      className="w-full bg-[#131929] border border-white/[0.08] rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 000-0000"
                      className="w-full bg-[#131929] border border-white/[0.08] rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                      Company
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={form.company}
                      onChange={handleChange}
                      placeholder="Solar EPC LLC"
                      className="w-full bg-[#131929] border border-white/[0.08] rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                    Project Details / Questions
                  </label>
                  <textarea
                    name="message"
                    rows={3}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us about the project size, AHJ jurisdiction, or technical requirements..."
                    className="w-full bg-[#131929] border border-white/[0.08] rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 resize-none"
                  />
                </div>

                {error && (
                  <p className="text-red-400 text-xs bg-red-500/10 p-2 rounded border border-red-500/20">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-amber-400 hover:brightness-110 text-slate-950 font-bold rounded-lg py-2.5 text-xs transition-all shadow-lg"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      Submitting Request...
                    </>
                  ) : (
                    "Submit Consultation Request"
                  )}
                </button>
              </form>
            )}

          </div>
        </div>
      )}

    </section>
  );
}
