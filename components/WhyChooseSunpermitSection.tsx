"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

export default function WhyChooseSunpermitSection() {
  const [sliderValue, setSliderValue] = useState(55);

  const features = [
    {
      title: "Certified Engineers",
      desc: "Licensed PEs for fast, accurate stamps.",
    },
    {
      title: "Compliance & Regulations",
      desc: "Code-compliant plansets that pass the first time.",
    },
    {
      title: "Best In Class Services",
      desc: "Complete support from design to permit approval.",
    },
    {
      title: "Quick Turn Around Time",
      desc: "24-hour express CAD turnaround available.",
    },
    {
      title: "Nationwide Serving",
      desc: "PE-licensed coverage in all 50 states.",
    },
    {
      title: "Mega Saving",
      desc: "Lower costs with fewer resubmittals and delays.",
    },
  ];

  return (
    <section className="relative py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-white text-slate-900 overflow-hidden border-t border-slate-100">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Top Tag */}
        <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-slate-700 uppercase mb-3">
          <span className="w-2 h-2 rounded-full bg-slate-950" />
          <span>EXPLORE THE DASHBOARD IN ACTION</span>
        </div>

        {/* 2-Column Grid Matching Screenshot Exactly */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column */}
          <div className="lg:col-span-6 space-y-5 lg:pr-4">
            <div>
              <span className="text-[11px] font-bold text-orange-600 tracking-widest uppercase bg-orange-100/80 px-3.5 py-1 rounded-full border border-orange-200 inline-block mb-3">
                SUN SERVICES
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold tracking-tight text-slate-950 leading-[1.15]">
                Why Choose Sunpermit?
              </h2>
            </div>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal max-w-xl">
              Choosing a fulfillment partner is always risky when it comes to solar projects.
              We are providing solar services to installers across the United States.
            </p>

            {/* Checklist items with exact requested titles and descriptions */}
            <div className="space-y-4 pt-2">
              {features.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3.5">
                  {/* Concentric Double-Ring Target Icon Matching Screenshot */}
                  <div className="w-5 h-5 rounded-full border-[2px] border-slate-950 flex items-center justify-center shrink-0 mt-0.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-950" />
                  </div>
                  <div className="text-sm leading-snug">
                    <h3 className="font-bold text-slate-950 text-sm">{item.title}</h3>
                    <p className="text-slate-600 font-normal text-xs sm:text-sm mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Action Buttons */}
            <div className="pt-4 flex flex-wrap items-center gap-6">
              <Link
                href="/quick"
                className="bg-slate-950 hover:bg-slate-800 text-white text-sm font-semibold px-7 py-3.5 rounded-xl shadow-md transition-colors"
              >
                Start for free
              </Link>

              <Link
                href="#pricing"
                className="inline-flex items-center gap-1.5 text-sm font-bold text-orange-600 hover:text-orange-700 transition-colors"
              >
                <span>Get a Quote Wizard</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Column: Faceted 3D Solar Model + Floating Solar Analysis Slider Card */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative w-full max-w-[540px] aspect-[4/3] rounded-[36px] bg-[#F7F5F0] border border-slate-200/80 shadow-sm flex items-center justify-center p-8 overflow-hidden"
            >
              {/* Dark container with 3D Solar Model Crystal */}
              <div className="relative z-0 w-60 h-60 sm:w-68 sm:h-68 bg-[#070A12] rounded-2xl flex items-center justify-center overflow-hidden shadow-2xl border border-white/[0.06] p-4">
                <img
                  src="/images/hero-3d-cube.jpg"
                  alt="3D Solar Crystal"
                  className="w-full h-full object-contain drop-shadow-[0_20px_40px_rgba(235,94,36,0.45)]"
                />
              </div>

              {/* Floating Solar Analysis Slider Card */}
              <div className="absolute bottom-6 left-6 z-10 w-[240px] sm:w-[260px] bg-white rounded-2xl p-4 shadow-xl border border-slate-200/90 text-slate-900 space-y-3">
                <div className="text-xs font-bold text-slate-900">
                  Solar Analysis
                </div>

                {/* Slider track with orange-pink gradient */}
                <div className="relative">
                  <div className="h-2 w-full rounded-full bg-gradient-to-r from-purple-500 via-rose-500 to-amber-500 relative">
                    <div
                      className="absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-slate-950 border-2 border-white shadow-sm cursor-pointer"
                      style={{ left: `calc(${sliderValue}% - 7px)` }}
                    />
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={sliderValue}
                    onChange={(e) => setSliderValue(Number(e.target.value))}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  />
                </div>

                {/* Stats */}
                <div className="space-y-1.5 pt-1 text-[10px]">
                  <div className="flex justify-between text-slate-600">
                    <span>Yearly Average Energy</span>
                    <span className="font-bold text-slate-950">1578 kWh/m²</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Sun Exposure</span>
                    <span className="font-bold text-slate-950">79%</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Peak Sun Hours</span>
                    <span className="font-bold text-slate-950">5.3 hours</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Daytime Sun Exposure</span>
                    <span className="font-bold text-slate-950">9.54 h/day</span>
                  </div>
                </div>
              </div>

            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}
