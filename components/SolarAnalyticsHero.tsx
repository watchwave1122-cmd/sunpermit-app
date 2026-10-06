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
            <Link href="/track-permit" className="hover:text-slate-950 hover:text-orange-600 transition-colors">My Account</Link>
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

          {/* ─── Right Column: Dashboard Image Aligned on the Far Right Side (Flush Right) ─── */}
          <div className="w-full lg:flex-1 flex justify-end overflow-visible">
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
              className="relative w-full max-w-[760px] xl:max-w-[840px] 2xl:max-w-[920px] translate-x-4 sm:translate-x-8 lg:translate-x-12"
            >
              {/* Dashboard image container matching screenshot */}
              <div className="relative rounded-[28px] rounded-r-none overflow-hidden shadow-[0_30px_90px_rgba(0,0,0,0.18)] border border-slate-200/90 border-r-0 bg-white">
                <img
                  src="/images/hero-dashboard-white.jpg"
                  alt="Solar Analysis Dashboard"
                  className="w-full h-auto object-cover rounded-l-[28px]"
                />
              </div>
            </motion.div>
          </div>

        </div>

        {/* ─── Bottom Accreditation Logos Row — Pure Black Transparent Vector SVGs ─── */}
        <div className="mt-14 flex flex-wrap items-center justify-center gap-10 sm:gap-16 opacity-85 hover:opacity-100 transition-opacity">
          {/* 1. NABCEP Certified PV Installation Professional */}
          <div className="flex flex-col items-center justify-center text-center">
            <svg viewBox="0 0 140 70" className="h-10 sm:h-11 w-auto fill-current text-black">
              {/* Starburst badge top arc */}
              <path d="M25,38 C23,32 25,24 30,18 C36,11 46,7 55,5 C65,3 75,3 85,5 C94,7 104,11 110,18 C115,24 117,32 115,38 Z" fill="none" stroke="currentColor" strokeWidth="2.5" strokeDasharray="3,2" />
              <text x="70" y="24" textAnchor="middle" fontSize="10" fontWeight="900" letterSpacing="0.8">NABCEP</text>
              {/* Solid pill banner with cutout/white text */}
              <rect x="20" y="28" width="100" height="15" rx="2" fill="currentColor" />
              <text x="70" y="39.5" textAnchor="middle" fontSize="9.5" fontWeight="900" fill="white" letterSpacing="1.2">CERTIFIED</text>
              <line x1="26" y1="47" x2="114" y2="47" stroke="currentColor" strokeWidth="1.5" />
              <text x="70" y="55" textAnchor="middle" fontSize="6.5" fontWeight="700">PV Installation</text>
              <text x="70" y="63" textAnchor="middle" fontSize="6.5" fontWeight="700">Professional</text>
            </svg>
          </div>

          {/* 2. LG Chem Certified Installer RESU Gen2 */}
          <div className="flex flex-col items-center justify-center text-center">
            <svg viewBox="0 0 90 90" className="h-12 sm:h-14 w-auto text-black">
              {/* Outer circular badge border */}
              <circle cx="45" cy="45" r="41" fill="none" stroke="currentColor" strokeWidth="2" />
              <circle cx="45" cy="45" r="37" fill="none" stroke="currentColor" strokeWidth="0.8" />
              {/* Top and bottom curved text representation */}
              <text x="45" y="19" textAnchor="middle" fontSize="5.5" fontWeight="700" fill="currentColor" letterSpacing="0.5">LG HOME BATTERY</text>
              <text x="45" y="28" textAnchor="middle" fontSize="6" fontWeight="900" fill="currentColor">LG Chem</text>
              {/* Middle banner */}
              <rect x="5" y="36" width="80" height="16" fill="currentColor" rx="1" />
              <text x="45" y="44" textAnchor="middle" fontSize="6.5" fontWeight="900" fill="white" letterSpacing="0.5">CERTIFIED</text>
              <text x="45" y="50" textAnchor="middle" fontSize="5.5" fontWeight="800" fill="white" letterSpacing="0.4">INSTALLER</text>
              {/* Bottom text */}
              <text x="45" y="60" textAnchor="middle" fontSize="5" fontWeight="700" fill="currentColor">RESU Gen2</text>
              <text x="45" y="76" textAnchor="middle" fontSize="5.5" fontWeight="700" fill="currentColor" letterSpacing="0.5">LG HOME BATTERY</text>
            </svg>
          </div>

          {/* 3. ENPHASE Logo */}
          <div className="flex flex-col items-center justify-center text-center">
            <svg viewBox="0 0 90 50" className="h-8 sm:h-10 w-auto text-black fill-none stroke-currentColor">
              {/* Enphase circular stylized 'e' icon */}
              <circle cx="45" cy="18" r="14" strokeWidth="3" />
              <line x1="31" y1="18" x2="59" y2="18" strokeWidth="3" />
              {/* Text label */}
              <text x="45" y="44" textAnchor="middle" fontSize="9" fontWeight="900" fill="currentColor" stroke="none" letterSpacing="2">ENPHASE</text>
            </svg>
          </div>

          {/* 4. EverVolt Certified Installer Panasonic */}
          <div className="flex flex-col items-center justify-center text-center">
            <svg viewBox="0 0 140 50" className="h-9 sm:h-11 w-auto text-black">
              {/* Box frame */}
              <rect x="2" y="2" width="136" height="46" fill="none" stroke="currentColor" strokeWidth="2.5" />
              {/* EverVolt main text with lightning bolt representation */}
              <g transform="translate(14, 25)">
                <text x="0" y="0" fontSize="19" fontWeight="900" fill="currentColor" letterSpacing="-0.5">EverVo</text>
                {/* stylized lightning bolt 'l' */}
                <polygon points="62,-16 67,-16 64,-3 68,-3 59,8 62,-1 58,-1" fill="currentColor" />
                <text x="69" y="0" fontSize="19" fontWeight="900" fill="currentColor">t</text>
                <text x="77" y="-12" fontSize="5" fontWeight="bold" fill="currentColor">TM</text>
              </g>
              {/* Sub-bar */}
              <rect x="2" y="32" width="136" height="16" fill="currentColor" />
              <text x="70" y="44" textAnchor="middle" fontSize="8" fontWeight="800" fill="white" letterSpacing="1">CERTIFIED INSTALLER</text>
            </svg>
          </div>

          {/* 5. Drone Pilot Training */}
          <div className="flex flex-col items-center justify-center text-center">
            <svg viewBox="0 0 90 90" className="h-12 sm:h-14 w-auto text-black fill-none stroke-currentColor">
              {/* Outer circular frame */}
              <circle cx="45" cy="38" r="26" strokeWidth="2.5" />
              {/* Drone center body */}
              <circle cx="45" cy="38" r="4.5" strokeWidth="2" fill="currentColor" />
              {/* 4 Drone arms */}
              <line x1="37" y1="30" x2="53" y2="46" strokeWidth="2" />
              <line x1="37" y1="46" x2="53" y2="30" strokeWidth="2" />
              {/* 4 Propeller motors & guards */}
              <circle cx="34" cy="27" r="4" strokeWidth="1.8" />
              <circle cx="56" cy="27" r="4" strokeWidth="1.8" />
              <circle cx="34" cy="49" r="4" strokeWidth="1.8" />
              <circle cx="56" cy="49" r="4" strokeWidth="1.8" />
              {/* Plaque / Text below */}
              <text x="45" y="73" textAnchor="middle" fontSize="8" fontWeight="900" fill="currentColor" stroke="none" letterSpacing="0.8">DRONE PILOT</text>
              <text x="45" y="82" textAnchor="middle" fontSize="6.5" fontWeight="700" fill="currentColor" stroke="none" letterSpacing="1.2">TRAINING</text>
            </svg>
          </div>
        </div>

      </main>
    </div>
  );
}
