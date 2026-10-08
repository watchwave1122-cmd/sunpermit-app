"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import SunPermitLogo from "@/components/SunPermitLogo";
import { CheckCircle2 } from "lucide-react";

export default function SolarAnalyticsHero() {
  return (
    <div className="relative w-full overflow-hidden bg-[#FBF8F5] text-slate-900 selection:bg-orange-500 selection:text-white">
      {/* ─── Warm Sunset Aesthetic Background Gradient & Glows (Matches Screenshot) ─── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft top-to-bottom cream to warm terracotta base */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, #FDF9F5 0%, #FBF3EA 18%, #FCE2CD 38%, #F7AF76 60%, #E65A22 78%, #AA3412 92%, #78280E 100%)",
          }}
        />

        {/* Main large rich sunset orange radial bloom in bottom-left */}
        <div
          className="absolute -bottom-24 -left-40 w-[1100px] 2xl:w-[1600px] h-[850px] 2xl:h-[1200px] rounded-full blur-[100px] opacity-95"
          style={{
            background:
              "radial-gradient(circle at 40% 60%, rgba(217, 72, 15, 1) 0%, rgba(235, 94, 36, 0.95) 35%, rgba(245, 142, 62, 0.75) 60%, rgba(254, 204, 152, 0.2) 85%, transparent 100%)",
          }}
        />

        {/* Dark burnt-orange bottom glow */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[40%]"
          style={{
            background:
              "linear-gradient(to bottom, transparent 0%, rgba(142,43,14,0.18) 25%, rgba(104,34,13,0.55) 70%, rgba(78,27,12,0.85) 100%)",
          }}
        />

        {/* Secondary warm ambient glow behind right dashboard */}
        <div
          className="absolute top-1/4 right-10 w-[700px] 2xl:w-[1200px] h-[600px] 2xl:h-[1000px] rounded-full blur-[140px] opacity-60"
          style={{
            background:
              "radial-gradient(circle, rgba(249, 115, 22, 0.5) 0%, rgba(253, 186, 116, 0.3) 50%, transparent 80%)",
          }}
        />

        {/* Fine background noise/grain pattern */}
        <div className="absolute inset-0 opacity-[0.035] bg-repeat bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]" />
      </div>

      {/* ─── Transparent Floating Top Navbar (No Outline, Larger Prominent Logo) ─── */}
      <header className="relative z-30 pt-6 sm:pt-8 px-6 sm:px-10 lg:px-16 xl:px-20 2xl:px-24 w-full">
        <nav className="bg-transparent border-0 shadow-none px-0 py-2 flex items-center justify-between transition-all">
          {/* Logo - Increased Size for High Visibility & Scaling */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <SunPermitLogo className="h-12 sm:h-14 md:h-16 lg:h-[62px] 2xl:h-20 w-auto" />
          </Link>

          {/* Center Links */}
          <div className="hidden md:flex items-center gap-7 2xl:gap-10 text-sm 2xl:text-base font-medium text-slate-700">
            <Link href="#about" className="hover:text-slate-950 hover:text-orange-600 transition-colors">About Us</Link>
            <Link href="#services" className="hover:text-slate-950 hover:text-orange-600 transition-colors">Services</Link>
            <Link href="#pricing" className="hover:text-slate-950 hover:text-orange-600 transition-colors">Pricing Calculator</Link>
            <Link href="#contact" className="hover:text-slate-950 hover:text-orange-600 transition-colors">Contact Us</Link>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <Link
              href="/submit-company"
              className="text-xs 2xl:text-sm font-semibold text-slate-700 hover:text-slate-950 px-3.5 py-1.5 2xl:px-5 2xl:py-2.5 rounded-lg hover:bg-black/5 transition-colors"
            >
              Company Details
            </Link>
          </div>
        </nav>
      </header>

      {/* ─── Main Hero Content: Fluid Responsive at 100% and 50% Zoom (No Empty Edge Void) ─── */}
      <main className="relative z-10 w-full pl-6 sm:pl-10 lg:pl-16 xl:pl-20 2xl:pl-24 pr-0 pt-8 sm:pt-12 pb-14 sm:pb-20 overflow-hidden">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-10 xl:gap-12 2xl:gap-16 w-full">
          
          {/* ─── Left Column: Headline, Subtitle, CTA & Trust Badges ─── */}
          <div className="w-full lg:w-[440px] xl:w-[480px] 2xl:w-[32vw] 2xl:max-w-[700px] shrink-0 flex flex-col justify-center space-y-6 2xl:space-y-8 text-left">
            
            {/* Main Headline (Clean responsive wrap, scales on wide/zoomed screens) */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl sm:text-5xl lg:text-[52px] xl:text-[58px] 2xl:text-[3.8vw] font-black tracking-tight text-[#070A12] leading-[1.08]"
            >
              Order solar design&nbsp;&amp;<br className="hidden sm:inline" />
              engineering services
            </motion.h1>

            {/* Subtitle */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-[#373330] text-xs sm:text-[13px] md:text-sm 2xl:text-[1.1vw] font-normal leading-[1.65] max-w-[460px] 2xl:max-w-[30vw]"
            >
              Our goal is to provide reliable service by assisting solar industry in every aspect and take part in making the solar network stronger. Get assistance and grow seamlessly.
            </motion.p>

            {/* SunPermit Quick Feature Points with Green Checkmark Icons matching Screenshot */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="pt-2 flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] sm:text-xs 2xl:text-[0.9vw] font-semibold text-[#1C1917]"
            >
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 2xl:w-4 2xl:h-4 text-emerald-600 stroke-[2.2]" />
                <span>24-Hr SLA Guarantee</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 2xl:w-4 2xl:h-4 text-emerald-600 stroke-[2.2]" />
                <span>50-State PE Licensed</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 2xl:w-4 2xl:h-4 text-emerald-600 stroke-[2.2]" />
                <span>99.8% AHJ Pass Rate</span>
              </span>
            </motion.div>

          </div>

          {/* ─── Right Column: Dashboard Tablet Mockup (Fluidly Spans to Right Edge at All Zoom Levels) ─── */}
          <div className="w-full lg:flex-1 flex justify-center lg:justify-end items-center pr-0 overflow-visible">
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
              className="relative w-full max-w-[580px] sm:max-w-[680px] lg:max-w-none lg:w-[56vw] xl:w-[58vw] 2xl:w-[60vw] lg:min-w-[650px] xl:min-w-[760px] 2xl:min-w-[920px] shrink-0 lg:translate-x-3 xl:translate-x-6 2xl:translate-x-10"
            >
              {/* Sleek Tablet Frame with All 4 Rounded Corners Matching Screenshot 2 */}
              <div className="relative rounded-[32px] sm:rounded-[40px] lg:rounded-[44px] 2xl:rounded-[54px] p-2.5 sm:p-3.5 2xl:p-5 bg-gradient-to-b from-[#1C202C] via-[#0E111A] to-[#05070B] shadow-[0_30px_90px_rgba(0,0,0,0.6),0_10px_30px_rgba(0,0,0,0.4)] border border-slate-700/70 ring-1 ring-white/10 overflow-hidden">
                
                {/* Tablet Landscape Camera Sensor on Left Bezel */}
                <div className="absolute left-2.5 sm:left-3.5 2xl:left-5 top-1/2 -translate-y-1/2 w-1.5 sm:w-2 2xl:w-2.5 h-1.5 sm:h-2 2xl:h-2.5 rounded-full bg-slate-900 ring-1 ring-white/10 z-20 hidden sm:block" />

                {/* Exact Dashboard Screenshot Image (User Image 1) */}
                <div className="relative rounded-[22px] sm:rounded-[30px] lg:rounded-[34px] 2xl:rounded-[42px] overflow-hidden bg-[#0A0E1A] border border-white/[0.08]">
                  <img
                    src="/images/hero-dashboard-exact.jpg"
                    alt="Solar Analysis Dashboard"
                    className="w-full h-auto block select-none pointer-events-none"
                    loading="eager"
                  />
                </div>
              </div>
            </motion.div>
          </div>

        </div>

        {/* ─── Bottom Accreditation Logos Row — Responsive Scaling ─── */}
        <div className="mt-12 sm:mt-16 lg:mt-20 2xl:mt-28 max-w-5xl 2xl:max-w-7xl mx-auto flex flex-wrap items-center justify-between sm:justify-center gap-6 sm:gap-14 lg:gap-20 2xl:gap-28 px-4">
          {/* 1. NABCEP */}
          <div className="h-8 sm:h-10 md:h-11 2xl:h-16 flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity">
            <img
              src="/images/accreditations/nabcep-official.png"
              alt="NABCEP Certified PV Installation Professional"
              className="h-full w-auto object-contain brightness-0 contrast-200"
            />
          </div>

          {/* 2. LG Chem */}
          <div className="h-9 sm:h-11 md:h-12 2xl:h-16 flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity">
            <img
              src="/images/accreditations/lg-chem-official.png"
              alt="LG Chem Certified Installer RESU Gen2"
              className="h-full w-auto object-contain brightness-0 contrast-200"
            />
          </div>

          {/* 3. ENPHASE */}
          <div className="h-8 sm:h-10 md:h-11 2xl:h-16 flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity">
            <img
              src="/images/accreditations/enphase-official.png"
              alt="ENPHASE"
              className="h-full w-auto object-contain brightness-0 contrast-200"
            />
          </div>

          {/* 4. EverVolt */}
          <div className="h-7 sm:h-9 md:h-10 2xl:h-14 flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity">
            <img
              src="/images/accreditations/evervolt-official.png"
              alt="EverVolt Certified Installer"
              className="h-full w-auto object-contain brightness-0 contrast-200"
            />
          </div>

          {/* 5. Drone Pilot */}
          <div className="h-8 sm:h-10 md:h-11 2xl:h-16 flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity">
            <img
              src="/images/accreditations/drone-pilot-official.png"
              alt="InterNACHI Certified Drone Pilot Training"
              className="h-full w-auto object-contain brightness-0 contrast-200"
            />
          </div>
        </div>

      </main>
    </div>
  );
}
