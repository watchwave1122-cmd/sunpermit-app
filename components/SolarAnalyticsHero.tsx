"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import SunPermitLogo from "@/components/SunPermitLogo";
import {
  Search,
  MapPin,
  Compass,
  Home,
  Sun,
  Layers,
  Sliders,
  CheckCircle2,
  HelpCircle,
  LogOut,
} from "lucide-react";

export default function SolarAnalyticsHero() {
  const [activeRange, setActiveRange] = useState<"daily" | "weekly" | "monthly" | "yearly">("monthly");

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
          className="absolute -bottom-24 -left-40 w-[1100px] h-[850px] rounded-full blur-[100px] opacity-95"
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
          className="absolute top-1/4 right-10 w-[700px] h-[600px] rounded-full blur-[140px] opacity-60"
          style={{
            background:
              "radial-gradient(circle, rgba(249, 115, 22, 0.5) 0%, rgba(253, 186, 116, 0.3) 50%, transparent 80%)",
          }}
        />

        {/* Fine background noise/grain pattern */}
        <div className="absolute inset-0 opacity-[0.035] bg-repeat bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]" />
      </div>

      {/* ─── Floating Top Pill Navbar (Matches Screenshot) ─── */}
      <header className="relative z-30 pt-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <nav className="bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-2xl shadow-sm px-5 sm:px-8 py-3.5 flex items-center justify-between transition-all">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <SunPermitLogo height={38} />
          </Link>

          {/* Center Links */}
          <div className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
            <Link href="#about" className="hover:text-slate-950 hover:text-orange-600 transition-colors">About Us</Link>
            <Link href="#services" className="hover:text-slate-950 hover:text-orange-600 transition-colors">Services</Link>
            <Link href="#pricing" className="hover:text-slate-950 hover:text-orange-600 transition-colors">Pricing Calculator</Link>
            <Link href="#contact" className="hover:text-slate-950 hover:text-orange-600 transition-colors">Contact Us</Link>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <Link
              href="/quick"
              className="bg-slate-950 hover:bg-slate-800 text-white text-sm font-semibold px-5 py-2.5 rounded-xl shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              Get started
            </Link>
          </div>
        </nav>
      </header>

      {/* ─── Main Hero Content: Space Between Layout (Left on Left, Right on Right) ─── */}
      <main className="relative z-10 w-full pl-4 sm:pl-6 lg:pl-12 xl:pl-16 pr-0 pt-12 lg:pt-16 pb-16 lg:pb-24">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-8">
          
          {/* ─── Left Column: Aligned on the Left Side ─── */}
          <div className="w-full lg:max-w-[480px] xl:max-w-[540px] shrink-0 flex flex-col justify-center space-y-7 text-left pr-4">
            
            {/* Main Headline */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl sm:text-5xl xl:text-[56px] font-extrabold tracking-tight text-slate-950 leading-[1.12]"
            >
              Order solar design<br />
              &amp; engineering<br />
              services
            </motion.h1>

            {/* Subtitle */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-slate-800 text-base sm:text-lg font-normal leading-relaxed max-w-lg"
            >
              Our goal is to provide reliable service by assisting solar industry in every aspect and take part in making the solar network stronger. Get assistance and grow seamlessly.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center gap-6 pt-2"
            >
              <Link
                href="/quick"
                className="bg-slate-950 hover:bg-slate-800 text-white text-base font-semibold px-7 py-3.5 rounded-xl shadow-lg shadow-slate-950/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                Get started
              </Link>
            </motion.div>

            {/* SunPermit Quick Feature Points (Matches Screenshot) */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="pt-2 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-semibold text-slate-800"
            >
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> 24-Hr SLA Guarantee
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> 50-State PE Licensed
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> 99.8% AHJ Pass Rate
              </span>
            </motion.div>

          </div>

          {/* ─── Right Column: Tablet Mockup Aligned on the Far Right Side (Overhanging / Flush Right) ─── */}
          <div className="w-full lg:flex-1 flex justify-end overflow-visible">
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
              className="relative w-full max-w-[760px] xl:max-w-[840px] 2xl:max-w-[920px] translate-x-4 sm:translate-x-8 lg:translate-x-12"
            >
              {/* Sleek Tablet Frame */}
              <div className="relative rounded-[36px] rounded-r-none p-3 sm:p-4 pr-0 bg-gradient-to-b from-slate-800 via-slate-900 to-black shadow-[0_30px_90px_rgba(0,0,0,0.45)] border border-slate-700/60 border-r-0 ring-1 ring-white/10">
                
                {/* Tablet Camera / Sensor Pill */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-2 bg-slate-900 rounded-full flex items-center justify-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-800" />
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-950" />
                </div>

                {/* Tablet Screen Container */}
                <div className="relative rounded-[26px] rounded-r-none bg-[#0A0E1A] overflow-hidden border border-white/[0.06] border-r-0 text-slate-200">
                  
                  {/* Dashboard Top Bar */}
                  <div className="flex items-center justify-between px-4 py-2.5 bg-[#0D1322] border-b border-white/[0.06] text-[11px] text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <span className="text-slate-300 font-medium">Dashboard</span>
                      <span className="text-slate-600">&gt;</span>
                      <span className="text-slate-500">...</span>
                      <span className="text-slate-600">&gt;</span>
                      <span className="text-orange-400 font-semibold">Solar analysis</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <Search className="w-3 h-3 absolute left-2 top-1/2 -translate-y-1/2 text-slate-500" />
                        <input
                          type="text"
                          readOnly
                          placeholder="Search"
                          value=""
                          className="bg-[#080B14] border border-white/[0.08] rounded-md pl-6 pr-2 py-0.5 text-[10px] text-slate-300 placeholder-slate-600 w-28 focus:outline-none cursor-default"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Dashboard Body with Left Icon Rail + Content */}
                  <div className="flex">
                    
                    {/* Left Icon Rail */}
                    <div className="w-11 sm:w-12 bg-[#090D18] border-r border-white/[0.06] py-3.5 flex flex-col items-center justify-between min-h-[460px] select-none">
                      {/* Top App Icon */}
                      <div className="flex flex-col items-center gap-4">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-orange-500 to-amber-400 p-[1.5px] flex items-center justify-center">
                          <div className="w-full h-full bg-[#0A0E1A] rounded-full flex items-center justify-center">
                            <div className="w-3 h-3 rounded-full bg-gradient-to-tr from-orange-500 to-amber-400 -translate-x-0.5" />
                          </div>
                        </div>

                        {/* Rail Nav Icons */}
                        <div className="flex flex-col items-center gap-3 pt-2">
                          <div className="p-1.5 rounded-lg text-slate-400 hover:text-white cursor-pointer transition-colors">
                            <Home className="w-4 h-4" />
                          </div>
                          <div className="p-1.5 rounded-lg text-slate-400 hover:text-white cursor-pointer transition-colors">
                            <Sun className="w-4 h-4" />
                          </div>
                          <div className="p-1.5 rounded-lg bg-orange-500/15 text-orange-400 border border-orange-500/30">
                            <Sliders className="w-4 h-4" />
                          </div>
                          <div className="p-1.5 rounded-lg text-slate-400 hover:text-white cursor-pointer transition-colors">
                            <Layers className="w-4 h-4" />
                          </div>
                        </div>
                      </div>

                      {/* Bottom Utility Icons */}
                      <div className="flex flex-col items-center gap-3">
                        <div className="p-1.5 rounded-lg text-slate-500 hover:text-slate-300 cursor-pointer">
                          <HelpCircle className="w-4 h-4" />
                        </div>
                        <div className="p-1.5 rounded-lg text-slate-500 hover:text-slate-300 cursor-pointer">
                          <LogOut className="w-4 h-4" />
                        </div>
                      </div>
                    </div>

                    {/* Middle Analytics Column */}
                    <div className="flex-1 p-3.5 sm:p-4.5 space-y-3.5 max-w-[340px] sm:max-w-[370px]">
                      
                      {/* Overview Box */}
                      <div className="bg-[#101626] border border-white/[0.06] rounded-xl p-3 shadow-inner">
                        <h4 className="text-[11px] font-bold text-white mb-2.5 tracking-wide">Overview</h4>
                        <div className="space-y-2 text-[10px]">
                          <div className="flex items-start gap-2">
                            <MapPin className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0" />
                            <div>
                              <p className="text-[9px] text-slate-500 uppercase tracking-wider">Address</p>
                              <p className="text-slate-200 font-medium">123 Solar Street, Sunnytown</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <Compass className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0" />
                            <div>
                              <p className="text-[9px] text-slate-500 uppercase tracking-wider">GPS Coordinates</p>
                              <p className="text-slate-200 font-medium">40.7128° N, 74.0060° W</p>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-2 pt-1 border-t border-white/[0.04]">
                            <div>
                              <p className="text-[9px] text-slate-500 uppercase tracking-wider">Time Zone</p>
                              <p className="text-slate-200 font-medium">EDT (UTC -4)</p>
                            </div>
                            <div>
                              <p className="text-[9px] text-slate-500 uppercase tracking-wider">Roof Surface Area</p>
                              <p className="text-slate-200 font-medium">250 m²</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Solar Energy Potential Box */}
                      <div className="bg-[#101626] border border-white/[0.06] rounded-xl p-3 shadow-inner">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-[11px] font-bold text-white tracking-wide">Solar Energy Potential</h4>
                          <div className="flex items-center gap-0.5 bg-[#090D18] p-0.5 rounded-md border border-white/[0.06] text-[8px]">
                            {(["daily", "weekly", "monthly", "yearly"] as const).map((r) => (
                              <button
                                key={r}
                                onClick={() => setActiveRange(r)}
                                className={`px-1.5 py-0.5 rounded capitalize font-medium transition-all ${
                                  activeRange === r 
                                    ? "bg-slate-700 text-white font-bold" 
                                    : "text-slate-400 hover:text-slate-200"
                                }`}
                              >
                                {r}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Equalizer / Bar Histogram Visualization */}
                        <div className="py-1">
                          <div className="flex items-end justify-between gap-1 h-9 px-1">
                            {[20, 25, 40, 55, 75, 95, 80, 60, 45, 30, 20, 15, 35, 50, 70, 90, 100, 85, 65, 45].map((h, i) => (
                              <div
                                key={i}
                                style={{ height: `${h}%` }}
                                className={`w-1 rounded-t-sm transition-all ${
                                  i === 16 
                                    ? "bg-gradient-to-t from-orange-500 to-amber-300 shadow-sm shadow-orange-500/50" 
                                    : i >= 14 && i <= 18 
                                    ? "bg-slate-400" 
                                    : "bg-slate-700/60"
                                }`}
                              />
                            ))}
                          </div>
                          <div className="flex justify-between text-[8px] text-slate-400 px-1 mt-1 border-t border-white/[0.04] pt-0.5">
                            <span>April - 158 kWh</span>
                            <span className="text-orange-400 font-semibold">May - 186 kWh</span>
                          </div>
                        </div>

                        {/* 2x2 Key Metric Tiles */}
                        <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-white/[0.04] text-[9px]">
                          <div className="bg-[#090D18] p-1.5 rounded-lg border border-white/[0.04]">
                            <p className="text-[8px] text-slate-500">Irradiance Intensity</p>
                            <p className="text-slate-100 font-bold text-[11px] mt-0.5">5.1 kWh/m²</p>
                          </div>
                          <div className="bg-[#090D18] p-1.5 rounded-lg border border-white/[0.04]">
                            <p className="text-[8px] text-slate-500">Shading Impact</p>
                            <p className="text-slate-100 font-bold text-[11px] mt-0.5">5% loss</p>
                          </div>
                          <div className="bg-[#090D18] p-1.5 rounded-lg border border-white/[0.04]">
                            <p className="text-[8px] text-slate-500">Panel Efficiency</p>
                            <p className="text-slate-100 font-bold text-[11px] mt-0.5">20.1%</p>
                          </div>
                          <div className="bg-[#090D18] p-1.5 rounded-lg border border-white/[0.04]">
                            <p className="text-[8px] text-slate-500">Energy Output</p>
                            <p className="text-slate-100 font-bold text-[11px] mt-0.5">2.5 MWh/month</p>
                          </div>
                        </div>
                      </div>

                      {/* Solar Generation Efficiency Box */}
                      <div className="bg-[#101626] border border-white/[0.06] rounded-xl p-3 shadow-inner">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="text-[11px] font-bold text-white tracking-wide">Solar Generation Efficiency</h4>
                          <span className="text-[8px] px-1.5 py-0.5 bg-emerald-500/10 text-emerald-400 font-bold rounded border border-emerald-500/20">
                            Live
                          </span>
                        </div>

                        {/* Multi-line Mini Chart with 84% callout badge */}
                        <div className="relative h-14 w-full my-1">
                          <svg className="w-full h-full overflow-visible" viewBox="0 0 200 60" preserveAspectRatio="none">
                            <defs>
                              <linearGradient id="gradOrange" x1="0" y1="0" x2="1" y2="0">
                                <stop offset="0%" stopColor="#F97316" />
                                <stop offset="100%" stopColor="#FBBF24" />
                              </linearGradient>
                              <linearGradient id="gradPurple" x1="0" y1="0" x2="1" y2="0">
                                <stop offset="0%" stopColor="#818CF8" />
                                <stop offset="100%" stopColor="#C084FC" />
                              </linearGradient>
                            </defs>
                            
                            <line x1="0" y1="15" x2="200" y2="15" stroke="#ffffff" strokeOpacity="0.04" />
                            <line x1="0" y1="35" x2="200" y2="35" stroke="#ffffff" strokeOpacity="0.04" />
                            
                            <path
                              d="M0,45 Q30,42 60,36 T120,24 T160,30 T200,20"
                              fill="none"
                              stroke="url(#gradPurple)"
                              strokeWidth="2"
                            />
                            
                            <path
                              d="M0,38 Q40,30 80,18 T140,12 T180,22 T200,10"
                              fill="none"
                              stroke="url(#gradOrange)"
                              strokeWidth="2.5"
                            />
                          </svg>

                          <div className="absolute top-1 left-1/2 -translate-x-1/2 bg-slate-950/90 border border-orange-500/40 px-2 py-0.5 rounded-full text-[9px] font-extrabold text-orange-400 shadow-md">
                            84%
                          </div>
                        </div>

                        {/* Legend */}
                        <div className="space-y-0.5 text-[7.5px] text-slate-400 pt-1 border-t border-white/[0.04]">
                          <div className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                            <span>Expected Solar Generation (MWh)</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                            <span>Actual Energy Output (MWh)</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
                            <span>Energy Loss (%)</span>
                          </div>
                        </div>
                      </div>

                    </div>

                    {/* Right 3D Visualizer Area: Glowing Faceted Solar Crystal (Matches Screenshot) */}
                    <div className="hidden sm:flex flex-1 relative bg-[#070A12] overflow-hidden items-center justify-center p-3">
                      <div className="relative z-10 w-full h-full min-h-[300px] flex items-center justify-center">
                        <img
                          src="/images/hero-3d-cube.jpg"
                          alt="Solar Analytics 3D Model"
                          className="w-full max-w-[280px] h-auto object-contain rounded-2xl drop-shadow-[0_20px_40px_rgba(235,94,36,0.45)]"
                        />
                      </div>
                    </div>

                  </div>

                </div>

              </div>
            </motion.div>
          </div>

        </div>

        {/* ─── Bottom Accreditation Logos Row — Official Logos Uploaded by User ─── */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-10 sm:gap-16 opacity-90 hover:opacity-100 transition-opacity">
          {/* 1. NABCEP */}
          <div className="h-12 sm:h-16 flex items-center justify-center">
            <img
              src="/images/accreditations/nabcep-official.png"
              alt="NABCEP Certified PV Installation Professional"
              className="h-full w-auto object-contain mix-blend-multiply"
            />
          </div>

          {/* 2. LG Chem */}
          <div className="h-12 sm:h-16 flex items-center justify-center">
            <img
              src="/images/accreditations/lg-chem-official.png"
              alt="LG Chem Certified Installer RESU Gen2"
              className="h-full w-auto object-contain mix-blend-multiply"
            />
          </div>

          {/* 3. EverVolt */}
          <div className="h-10 sm:h-14 flex items-center justify-center">
            <img
              src="/images/accreditations/evervolt-official.png"
              alt="EverVolt Certified Installer"
              className="h-full w-auto object-contain mix-blend-multiply"
            />
          </div>

          {/* 4. Drone Pilot */}
          <div className="h-12 sm:h-16 flex items-center justify-center">
            <img
              src="/images/accreditations/drone-pilot-official.png"
              alt="InterNACHI Certified Drone Pilot Training"
              className="h-full w-auto object-contain mix-blend-multiply"
            />
          </div>

          {/* 5. ENPHASE */}
          <div className="h-10 sm:h-14 flex items-center justify-center">
            <img
              src="/images/accreditations/enphase-official.png"
              alt="ENPHASE"
              className="h-full w-auto object-contain mix-blend-multiply"
            />
          </div>
        </div>

      </main>
    </div>
  );
}
