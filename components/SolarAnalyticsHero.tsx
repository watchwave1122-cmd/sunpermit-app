"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import SunPermitLogo from "@/components/SunPermitLogo";
import {
  Search,
  MapPin,
  Home,
  Sun,
  Layers,
  CheckCircle2,
  HelpCircle,
  LogOut,
  Hexagon,
  Grid3X3,
  Building2,
  FileText,
  Settings,
  Crosshair,
  Globe,
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
              href="/submit-company"
              className="text-xs font-semibold text-slate-700 hover:text-slate-950 px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-colors"
            >
              Company Details
            </Link>
          </div>
        </nav>
      </header>

      {/* ─── Main Hero Content: Previous Exact Right-Edge Alignment (Fully Responsive) ─── */}
      <main className="relative z-10 w-full pl-4 sm:pl-8 md:pl-12 lg:pl-16 xl:pl-24 2xl:pl-28 pr-0 pt-8 sm:pt-12 pb-14 sm:pb-20 overflow-hidden">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-8 w-full">
          
          {/* ─── Left Column: Headline, Subtitle, CTA & Trust Badges ─── */}
          <div className="w-full lg:w-[480px] xl:w-[520px] shrink-0 flex flex-col justify-center space-y-6 text-left">
            
            {/* Main Headline (Clean responsive wrap, never isolates '&') */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl sm:text-5xl lg:text-[54px] xl:text-[58px] font-black tracking-tight text-[#070A12] leading-[1.08]"
            >
              Order solar design&nbsp;&amp;<br className="hidden sm:inline" />
              engineering services
            </motion.h1>

            {/* Subtitle */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-[#373330] text-xs sm:text-[13px] md:text-sm font-normal leading-[1.65] max-w-[460px]"
            >
              Our goal is to provide reliable service by assisting solar industry in every aspect and take part in making the solar network stronger. Get assistance and grow seamlessly.
            </motion.p>

            {/* SunPermit Quick Feature Points with Green Checkmark Icons matching Screenshot */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="pt-2 flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] sm:text-xs font-semibold text-[#1C1917]"
            >
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 stroke-[2.2]" />
                <span>24-Hr SLA Guarantee</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 stroke-[2.2]" />
                <span>50-State PE Licensed</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 stroke-[2.2]" />
                <span>99.8% AHJ Pass Rate</span>
              </span>
            </motion.div>

          </div>

          {/* ─── Right Column: Black Dashboard Tablet Mockup Placed Flush On Exact Right Edge ─── */}
          <div className="w-full lg:flex-1 flex justify-center lg:justify-end items-center pr-0 sm:pr-4 lg:pr-0 overflow-visible">
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
              className="relative w-full max-w-[620px] sm:max-w-[700px] lg:max-w-[760px] xl:max-w-[820px] 2xl:max-w-[860px] mx-auto lg:ml-auto lg:mr-0 lg:-mr-4 xl:mr-0"
            >
              {/* Sleek Tablet Frame with All 4 Rounded Corners Matching Screenshot 2 */}
              <div className="relative rounded-[36px] p-2.5 sm:p-3.5 bg-gradient-to-b from-slate-800 via-slate-900 to-black shadow-[0_30px_90px_rgba(0,0,0,0.5)] border border-slate-700/80 ring-1 ring-white/10">
                
                {/* Tablet Camera / Sensor Pill */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-2 bg-slate-900 rounded-full flex items-center justify-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-800" />
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-950" />
                </div>

                {/* Tablet Screen Container with All 4 Rounded Corners */}
                <div className="relative rounded-[26px] bg-[#0A0E1A] overflow-hidden border border-white/[0.08] text-slate-200">
                  
                  {/* Dashboard Top Bar */}
                  <div className="flex items-center justify-between px-4 py-2.5 bg-[#0D1322] border-b border-white/[0.06] text-[11px] text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <span className="text-slate-300 font-medium">Dashboard</span>
                      <span className="text-slate-600">&gt;</span>
                      <span className="text-slate-500">...</span>
                      <span className="text-slate-600">&gt;</span>
                      <span className="text-white font-semibold">Solar analysis</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <Search className="w-3 h-3 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500" />
                        <input
                          type="text"
                          readOnly
                          placeholder="Search"
                          value=""
                          className="bg-[#080B14] border border-white/[0.08] rounded-md pl-7 pr-2.5 py-1 text-[10px] text-slate-300 placeholder-slate-500 w-28 focus:outline-none cursor-default"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Dashboard Body with Left Icon Rail + Content */}
                  <div className="flex">
                    
                    {/* Left Icon Rail */}
                    <div className="w-11 sm:w-12 bg-[#090D18] border-r border-white/[0.06] py-3.5 flex flex-col items-center justify-between min-h-[480px] select-none">
                      {/* Top App Icon */}
                      <div className="flex flex-col items-center gap-4">
                        <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-xs">
                          <div className="w-3 h-3 rounded-full border-2 border-white/90" />
                        </div>

                        {/* Rail Nav Icons (6 icons matching screenshot) */}
                        <div className="flex flex-col items-center gap-3 pt-1">
                          <div className="p-1.5 rounded-lg text-slate-400 hover:text-white cursor-pointer transition-colors">
                            <Home className="w-4 h-4" />
                          </div>
                          <div className="p-1.5 rounded-lg text-slate-400 hover:text-white cursor-pointer transition-colors">
                            <Hexagon className="w-4 h-4" />
                          </div>
                          <div className="p-1.5 rounded-lg text-slate-400 hover:text-white cursor-pointer transition-colors">
                            <Grid3X3 className="w-4 h-4" />
                          </div>
                          <div className="p-1.5 rounded-lg text-slate-400 hover:text-white cursor-pointer transition-colors">
                            <Sun className="w-4 h-4" />
                          </div>
                          <div className="p-1.5 rounded-lg text-slate-400 hover:text-white cursor-pointer transition-colors">
                            <Building2 className="w-4 h-4" />
                          </div>
                          <div className="p-1.5 rounded-lg text-slate-400 hover:text-white cursor-pointer transition-colors">
                            <FileText className="w-4 h-4" />
                          </div>
                        </div>
                      </div>

                      {/* Bottom Utility Icons (3 icons matching screenshot) */}
                      <div className="flex flex-col items-center gap-3">
                        <div className="p-1.5 rounded-lg text-slate-500 hover:text-slate-300 cursor-pointer">
                          <Settings className="w-4 h-4" />
                        </div>
                        <div className="p-1.5 rounded-lg text-slate-500 hover:text-slate-300 cursor-pointer">
                          <HelpCircle className="w-4 h-4" />
                        </div>
                        <div className="p-1.5 rounded-lg text-slate-500 hover:text-slate-300 cursor-pointer">
                          <LogOut className="w-4 h-4" />
                        </div>
                      </div>
                    </div>

                    {/* Middle Analytics Column */}
                    <div className="w-[260px] sm:w-[280px] xl:w-[295px] shrink-0 p-3 sm:p-3.5 space-y-3">
                      
                      {/* Overview Box */}
                      <div className="bg-[#101626]/90 border border-white/[0.06] rounded-xl p-3 shadow-inner">
                        <h4 className="text-[11px] font-bold text-white mb-2 tracking-wide">Overview</h4>
                        <div className="space-y-2 text-[10px]">
                          <div className="flex items-start gap-2.5">
                            <MapPin className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0" />
                            <div>
                              <p className="text-[8.5px] text-slate-500 uppercase tracking-wider">Address</p>
                              <p className="text-slate-200 font-medium">123 Solar Street, Sunnytown</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-2.5">
                            <Crosshair className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0" />
                            <div>
                              <p className="text-[8.5px] text-slate-500 uppercase tracking-wider">GPS Coordinates</p>
                              <p className="text-slate-200 font-medium">40.7128° N, 74.0060° W</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-2.5">
                            <Globe className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0" />
                            <div>
                              <p className="text-[8.5px] text-slate-500 uppercase tracking-wider">Time Zone</p>
                              <p className="text-slate-200 font-medium">EDT (UTC -4)</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-2.5">
                            <Layers className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0" />
                            <div>
                              <p className="text-[8.5px] text-slate-500 uppercase tracking-wider">Roof Surface Area</p>
                              <p className="text-slate-200 font-medium">250 m²</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Solar Energy Potential Box */}
                      <div className="bg-[#101626]/90 border border-white/[0.06] rounded-xl p-3 shadow-inner">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-[11px] font-bold text-white tracking-wide">Solar Energy Potential</h4>
                          <div className="flex items-center gap-0.5 bg-[#090D18] p-0.5 rounded-md border border-white/[0.06] text-[8px]">
                            {(["daily", "weekly", "monthly", "yearly"] as const).map((r) => (
                              <button
                                key={r}
                                onClick={() => setActiveRange(r)}
                                className={`px-1.5 py-0.5 rounded capitalize font-medium transition-all ${
                                  activeRange === r 
                                    ? "bg-white text-slate-950 font-bold shadow-xs" 
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
                                    ? "bg-slate-300" 
                                    : "bg-slate-700/60"
                                }`}
                              />
                            ))}
                          </div>
                          <div className="flex justify-between text-[8px] text-slate-400 px-1 mt-1 border-t border-white/[0.04] pt-0.5">
                            <span>April - 150 kWh</span>
                            <span className="text-orange-400 font-bold">May - 166 kWh</span>
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
                      <div className="bg-[#101626]/90 border border-white/[0.06] rounded-xl p-3 shadow-inner">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="text-[11px] font-bold text-white tracking-wide">Solar Generation Efficiency</h4>
                        </div>

                        {/* Multi-line Mini Chart with axes and 84% callout badge */}
                        <div className="relative h-16 w-full flex items-center my-1">
                          {/* Y-axis labels */}
                          <div className="flex flex-col justify-between h-12 text-[7px] text-slate-500 pr-1 select-none">
                            <span>10</span>
                            <span>8</span>
                            <span>6</span>
                            <span>4</span>
                            <span>2</span>
                            <span>0</span>
                          </div>

                          {/* Chart SVG */}
                          <div className="relative flex-1 h-12">
                            <svg className="w-full h-full overflow-visible" viewBox="0 0 200 60" preserveAspectRatio="none">
                              <defs>
                                <pattern id="diagHatch" width="6" height="6" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
                                  <line x1="0" y1="0" x2="0" y2="6" stroke="#F97316" strokeWidth="1" strokeOpacity="0.35" />
                                </pattern>
                              </defs>
                              
                              <line x1="0" y1="12" x2="200" y2="12" stroke="#ffffff" strokeOpacity="0.04" strokeDasharray="2 2" />
                              <line x1="0" y1="24" x2="200" y2="24" stroke="#ffffff" strokeOpacity="0.04" strokeDasharray="2 2" />
                              <line x1="0" y1="36" x2="200" y2="36" stroke="#ffffff" strokeOpacity="0.04" strokeDasharray="2 2" />
                              <line x1="0" y1="48" x2="200" y2="48" stroke="#ffffff" strokeOpacity="0.04" strokeDasharray="2 2" />
                              
                              {/* Shaded hatched area under orange line */}
                              <path
                                d="M0,40 Q35,32 70,22 T120,14 T160,20 T200,8 L200,60 L0,60 Z"
                                fill="url(#diagHatch)"
                              />

                              {/* Purple/blue secondary line */}
                              <path
                                d="M0,52 Q40,46 80,42 T130,34 T170,30 T200,24"
                                fill="none"
                                stroke="#6366F1"
                                strokeWidth="1.5"
                              />
                              {[ [0,52], [40,46], [80,42], [130,34], [170,30], [200,24] ].map(([cx, cy], i) => (
                                <circle key={i} cx={cx} cy={cy} r="1.8" fill="#818CF8" />
                              ))}

                              {/* Top orange line */}
                              <path
                                d="M0,40 Q35,32 70,22 T120,14 T160,20 T200,8"
                                fill="none"
                                stroke="#F97316"
                                strokeWidth="2"
                              />
                              {[ [0,40], [35,32], [70,22], [120,14], [160,20], [200,8] ].map(([cx, cy], i) => (
                                <circle key={i} cx={cx} cy={cy} r="1.8" fill="#FDBA74" />
                              ))}
                            </svg>

                            {/* 84% Callout Badge */}
                            <div className="absolute top-0 left-[60%] -translate-x-1/2 bg-[#090D18] border border-orange-500/50 px-1.5 py-0.5 rounded-full text-[8px] font-extrabold text-white shadow-md">
                              84%
                            </div>
                          </div>
                        </div>

                        {/* X-axis Month Labels */}
                        <div className="flex justify-between pl-4 pr-1 text-[7.5px] text-slate-500 border-b border-white/[0.04] pb-1 mb-1.5 select-none">
                          <span>Jan</span>
                          <span>Feb</span>
                          <span>Mar</span>
                          <span>Apr</span>
                          <span>May</span>
                          <span>Jun</span>
                        </div>

                        {/* Legend */}
                        <div className="space-y-0.5 text-[7.5px] text-slate-400 pt-0.5">
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

                    {/* Right 3D Visualizer Area: Glowing Faceted Solar House on the Exact Right */}
                    <div className="hidden sm:flex flex-1 relative bg-[#070A12] bg-[radial-gradient(#ffffff12_1px,transparent_1px)] [background-size:16px_16px] overflow-hidden items-center justify-end pr-0">
                      {/* Subtle warm sunset ambient radial glow behind house matching screenshot */}
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[340px] h-[340px] rounded-full blur-[90px] bg-gradient-to-br from-orange-500/25 via-amber-500/15 to-transparent pointer-events-none" />

                      {/* Geometric blueprint facet lines overlay */}
                      <svg className="absolute inset-0 w-full h-full opacity-15 pointer-events-none" viewBox="0 0 400 400" preserveAspectRatio="none">
                        <polygon points="60,40 370,60 340,360 40,320" fill="none" stroke="#F97316" strokeWidth="1" strokeDasharray="3 3" />
                        <line x1="60" y1="40" x2="340" y2="360" stroke="#F97316" strokeWidth="1" strokeDasharray="3 3" />
                        <line x1="370" y1="60" x2="40" y2="320" stroke="#F97316" strokeWidth="1" strokeDasharray="3 3" />
                      </svg>

                      {/* The House aligned to the Exact Right */}
                      <div className="relative z-10 w-full h-full min-h-[350px] flex items-center justify-end pr-0">
                        <img
                          src="/images/hero-solar-house-exact.png"
                          alt="Solar Analytics 3D House Model"
                          className="w-auto h-[290px] sm:h-[320px] lg:h-[350px] xl:h-[370px] max-w-none object-contain drop-shadow-[0_25px_50px_rgba(235,94,36,0.55)] translate-x-1 sm:translate-x-2"
                        />
                      </div>
                    </div>

                  </div>

                </div>

              </div>
            </motion.div>
          </div>

        </div>

        {/* ─── Bottom Accreditation Logos Row — 100% Exactly Matches Screenshot ─── */}
        <div className="mt-12 sm:mt-16 lg:mt-20 max-w-5xl mx-auto flex flex-wrap items-center justify-between sm:justify-center gap-6 sm:gap-14 lg:gap-20 px-4">
          {/* 1. NABCEP */}
          <div className="h-8 sm:h-10 md:h-11 flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity">
            <img
              src="/images/accreditations/nabcep-official.png"
              alt="NABCEP Certified PV Installation Professional"
              className="h-full w-auto object-contain brightness-0 contrast-200"
            />
          </div>

          {/* 2. LG Chem */}
          <div className="h-9 sm:h-11 md:h-12 flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity">
            <img
              src="/images/accreditations/lg-chem-official.png"
              alt="LG Chem Certified Installer RESU Gen2"
              className="h-full w-auto object-contain brightness-0 contrast-200"
            />
          </div>

          {/* 3. ENPHASE */}
          <div className="h-8 sm:h-10 md:h-11 flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity">
            <img
              src="/images/accreditations/enphase-official.png"
              alt="ENPHASE"
              className="h-full w-auto object-contain brightness-0 contrast-200"
            />
          </div>

          {/* 4. EverVolt */}
          <div className="h-7 sm:h-9 md:h-10 flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity">
            <img
              src="/images/accreditations/evervolt-official.png"
              alt="EverVolt Certified Installer"
              className="h-full w-auto object-contain brightness-0 contrast-200"
            />
          </div>

          {/* 5. Drone Pilot */}
          <div className="h-8 sm:h-10 md:h-11 flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity">
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
