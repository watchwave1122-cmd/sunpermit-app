"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import SunPermitLogo from "@/components/SunPermitLogo";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Building2,
  FileSpreadsheet,
  Compass,
  CreditCard,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  Zap,
  HelpCircle,
  FileCheck
} from "lucide-react";

export default function QuickOrderPage() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const quickCards = [
    {
      id: "company",
      title: "Submit Your Company Details",
      subtitle: "Only provide details if you are a new user or need to update existing details.",
      icon: Building2,
      href: "/submit-company",
      badge: "One-Time Setup",
      badgeColor: "bg-blue-500/10 text-blue-600 border-blue-500/20",
      cta: "Open Company Form",
    },
    {
      id: "proposal",
      title: "Request Pre-Sale Proposal",
      subtitle: "Aurora Sales Proposal, 3D roof layouts, shade & production analysis.",
      icon: FileSpreadsheet,
      href: "/request-sales-proposal",
      badge: "Quick 4-Hr SLA",
      badgeColor: "bg-amber-500/10 text-amber-600 border-amber-500/20",
      cta: "Order Proposal",
    },
    {
      id: "planset",
      title: "Request Permit Planset",
      subtitle: "Solar Permit Planset along with electrical & structural PE engineering.",
      icon: Compass,
      href: "/permit-planset",
      badge: "Most Popular • $149",
      badgeColor: "bg-orange-500/15 text-orange-600 border-orange-500/30",
      cta: "Order Planset",
      highlight: true,
    },
    {
      id: "invoice",
      title: "Pay Your Invoice",
      subtitle: "Pay using credit card, ACH, or check tracking with instant receipt.",
      icon: CreditCard,
      href: "/pay-invoice",
      badge: "Secure Portal",
      badgeColor: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
      cta: "Pay & Track",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-slate-900 flex flex-col selection:bg-orange-500 selection:text-white">
      
      <Navbar />

      {/* ─── Main Content ─── */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24">
        
        {/* Hero Greeting (Exact text from Screenshot 2) */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-100 border border-orange-200 text-xs font-bold text-orange-700 uppercase tracking-wider mb-2"
          >
            <Sparkles className="w-3.5 h-3.5 text-orange-600" />
            SunPermit Quick Order Hub
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl sm:text-5xl font-extrabold text-slate-950 tracking-tight"
          >
            Hello!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl sm:text-2xl font-bold text-slate-800 leading-snug"
          >
            You can order{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500 font-extrabold">
              a Complete Project
            </span>{" "}
            &amp; Grow Seamlessly
          </motion.p>
        </div>

        {/* ─── 4 Action Cards Grid (Full clickable cards) ─── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {quickCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="h-full"
              >
                <Link
                  href={card.href}
                  onMouseEnter={() => setHoveredCard(card.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className={`relative rounded-3xl p-8 sm:p-10 transition-all flex flex-col justify-between h-full group cursor-pointer bg-white border block ${
                    card.highlight
                      ? "border-orange-300 shadow-xl shadow-orange-500/10 hover:border-orange-500 hover:shadow-2xl"
                      : "border-slate-200 shadow-sm hover:shadow-xl hover:border-slate-300"
                  }`}
                >
                  <div>
                    {/* Top Row: Icon & Badge */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-14 h-14 rounded-2xl bg-[#FFF2E8] text-orange-600 border border-orange-200/80 flex items-center justify-center group-hover:scale-110 group-hover:bg-orange-500 group-hover:text-white transition-all shadow-xs">
                        <Icon className="w-7 h-7" />
                      </div>

                      <span className={`text-[11px] font-bold px-3 py-1 rounded-full border ${card.badgeColor}`}>
                        {card.badge}
                      </span>
                    </div>

                    {/* Card Title */}
                    <h3 className="text-2xl font-extrabold text-slate-950 mb-3 tracking-tight group-hover:text-orange-600 transition-colors">
                      {card.title}
                    </h3>

                    {/* Card Subtitle */}
                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                      {card.subtitle}
                    </p>
                  </div>

                  {/* Bottom CTA Link */}
                  <div className="pt-8 mt-6 border-t border-slate-100 flex items-center justify-between">
                    <span className="inline-flex items-center gap-2 text-sm font-bold text-slate-950 group-hover:text-orange-600 transition-colors">
                      <span>{card.cta}</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform text-orange-500" />
                    </span>

                    <span className="text-xs text-slate-400 font-medium">
                      {card.id === "planset" ? "24-Hr SLA" : card.id === "company" ? "Free Registration" : "Instant"}
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* ─── Trust Indicators ─── */}
        <div className="mt-16 pt-10 border-t border-slate-200/80 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center text-xs font-semibold text-slate-600">
          <div className="flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>50-State Licensed PE Engineers</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>99.8% First-Pass AHJ Approval Rate</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Zap className="w-4 h-4 text-emerald-600" />
            <span>24-Hour Express Turnaround SLA</span>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
