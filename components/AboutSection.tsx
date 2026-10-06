"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Sun,
  Zap,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Users,
  Leaf,
  Activity,
  FileCheck2
} from "lucide-react";

export default function AboutSection() {
  const [activeSlide, setActiveSlide] = useState(0);

  const handleNext = () => {
    setActiveSlide((prev) => (prev + 1) % 3);
  };

  const handlePrev = () => {
    setActiveSlide((prev) => (prev - 1 + 3) % 3);
  };

  return (
    <section id="about" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#FBF7F2] text-slate-900 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[700px] h-[500px] bg-orange-400/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* ─── Top Header (Matches Screenshot Exactly) ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          {/* Left Tag */}
          <div className="lg:col-span-4">
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-wider text-slate-700 uppercase">
              <span className="w-2 h-2 rounded-full bg-slate-900 animate-pulse" />
              Unlock the full potential of solar energy.
            </div>
            <div className="mt-4">
              <span className="text-xs font-bold text-orange-600 tracking-widest uppercase bg-orange-100/80 px-3 py-1 rounded-full border border-orange-200">
                About SunPermit
              </span>
            </div>
          </div>

          {/* Right Main Heading & Subtext */}
          <div className="lg:col-span-8 space-y-4">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-950 leading-[1.15]">
              NOT A SEPARATE TEAM, WE ARE{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500">
                PART OF YOU!
              </span>
            </h2>
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed max-w-3xl font-normal">
              The increasing demand for getting climate-friendly life and the heading toward renewable energy revolutionized the solar industry. Dealing with more clients means more revenue and yes more project management.
            </p>
          </div>
        </div>

        {/* ─── 3 Feature Cards ─── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          
          {/* ─── Card 1: Dark Analytics Card with Line Chart & 84% Badge ─── */}
          <motion.div 
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
            className="bg-[#0A0E1A] text-white rounded-[28px] p-6 sm:p-7 border border-slate-800 shadow-xl flex flex-col justify-between min-h-[380px] relative overflow-hidden"
          >
            {/* Top Icon */}
            <div>
              <div className="w-10 h-10 rounded-full bg-slate-900 border border-slate-700/80 flex items-center justify-center mb-6">
                <Sun className="w-5 h-5 text-orange-400" />
              </div>

              {/* Stat & Label */}
              <div className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
                +92.4%
              </div>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 font-medium">
                Solar Generation Efficiency
              </p>
            </div>

            {/* Mini Chart Visualization */}
            <div className="relative pt-6">
              {/* Floating 84% Badge */}
              <div className="absolute top-2 left-[58%] -translate-x-1/2 bg-white text-slate-950 font-extrabold text-[11px] px-2.5 py-0.5 rounded-full shadow-md">
                84%
              </div>

              {/* Chart SVG Curve */}
              <div className="h-28 w-full">
                <svg className="w-full h-full" viewBox="0 0 240 80" preserveAspectRatio="none">
                  <defs>
                    <pattern id="diagonalHatch" width="6" height="6" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
                      <line x1="0" y1="0" x2="0" y2="6" stroke="#ffffff" strokeOpacity="0.1" strokeWidth="1.5" />
                    </pattern>
                  </defs>

                  {/* Area fill with pattern between two curves */}
                  <polygon
                    points="0,60 40,54 80,48 120,44 140,20 180,40 240,30 240,65 180,72 140,75 120,70 80,68 40,65 0,72"
                    fill="url(#diagonalHatch)"
                  />

                  {/* Lower curve with dots */}
                  <path
                    d="M 0,72 Q 40,65 80,68 T 140,75 T 240,65"
                    fill="none"
                    stroke="#475569"
                    strokeWidth="1.5"
                  />

                  {/* Upper curve with dots */}
                  <path
                    d="M 0,60 Q 40,54 80,48 T 140,20 T 180,40 T 240,30"
                    fill="none"
                    stroke="#F1F5F9"
                    strokeWidth="2"
                  />

                  {/* Highlight marker dot at peak */}
                  <circle cx="140" cy="20" r="4" fill="#FFFFFF" />
                  <circle cx="140" cy="75" r="3" fill="#94A3B8" />
                  <line x1="140" y1="24" x2="140" y2="72" stroke="#FFFFFF" strokeWidth="1" strokeDasharray="2 2" opacity="0.6" />

                  {/* Key nodes */}
                  <circle cx="40" cy="54" r="2.5" fill="#FFFFFF" />
                  <circle cx="80" cy="48" r="2.5" fill="#FFFFFF" />
                  <circle cx="180" cy="40" r="2.5" fill="#FFFFFF" />
                  <circle cx="240" cy="30" r="2.5" fill="#FFFFFF" />
                </svg>
              </div>

              {/* Months Axis */}
              <div className="flex justify-between text-[10px] text-slate-500 pt-2 border-t border-slate-800">
                <span>Jan</span>
                <span>Feb</span>
                <span>Mar</span>
                <span>Apr</span>
                <span>May</span>
                <span>Jun</span>
              </div>
            </div>
          </motion.div>

          {/* ─── Card 2: Solar Panel Image with Glass Badge ─── */}
          <motion.div 
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
            className="relative rounded-[28px] overflow-hidden shadow-xl border border-slate-200/80 min-h-[380px] flex flex-col justify-between p-6 sm:p-7 group"
          >
            {/* Background Solar Panels Image (User Uploaded) */}
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{
                backgroundImage: `url('/images/environmental-impact-panels.jpg')`,
              }}
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/20" />

            {/* Top Floating Glass Badge */}
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-medium shadow-sm">
                <Leaf className="w-3.5 h-3.5 text-emerald-300" />
                <span>56.3 kg CO₂ saved per month</span>
              </div>
            </div>

            {/* Bottom Title */}
            <div className="relative z-10 text-white">
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-snug">
                Environmental<br />Impact
              </h3>
            </div>
          </motion.div>

          {/* ─── Card 3: Orange Gradient Stat Box + Exact Text from Screenshot 2 ─── */}
          <motion.div 
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
            className="bg-[#F3EBE1] rounded-[28px] p-6 sm:p-7 border border-orange-200/60 shadow-xl flex flex-col justify-between min-h-[380px]"
          >
            {/* Top Orange Container */}
            <div className="bg-gradient-to-br from-[#FF7A30] to-[#E6561B] text-white rounded-2xl p-5 sm:p-6 shadow-md shadow-orange-500/20">
              <div className="flex items-center justify-between mb-4">
                <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <Activity className="w-4 h-4 text-white" />
                </div>
                
                {/* 3 Avatars Stack */}
                <div className="flex -space-x-2 overflow-hidden">
                  <img
                    className="inline-block h-7 w-7 rounded-full ring-2 ring-orange-500 object-cover"
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                    alt="User"
                  />
                  <img
                    className="inline-block h-7 w-7 rounded-full ring-2 ring-orange-500 object-cover"
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
                    alt="User"
                  />
                  <img
                    className="inline-block h-7 w-7 rounded-full ring-2 ring-orange-500 object-cover"
                    src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=100&auto=format&fit=crop&q=80"
                    alt="User"
                  />
                </div>
              </div>

              <div className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                +12,452
              </div>
              <p className="text-xs text-orange-100 font-medium mt-0.5">
                Solar Users Joined
              </p>
            </div>

            {/* Bottom Paragraph (Exact text from Screenshot 2) */}
            <div className="pt-4 space-y-3">
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
               As project volume grows, quality shouldn’t suffer. 
Sun Permit takes ownership of permit plansets, structural
 & electrical engineering stamps, and proposal drawings
 — giving installers the bandwidth to deliver better service
 and win more jobs.
              </p>
            </div>
          </motion.div>

        </div>

        {/* ─── Bottom Navigation Bar ─── */}
        <div className="mt-12 pt-6 border-t border-slate-900/10" />

      </div>
    </section>
  );
}
