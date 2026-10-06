"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

export default function WhyChooseSunpermitSection() {
  const bulletPoints = [
    {
      title: "Accurate Data:",
      desc: "Get precise estimates on sunlight exposure and energy potential.",
    },
    {
      title: "Optimized Placement:",
      desc: "Visual maps show where solar panels work best on your roof.",
    },
    {
      title: "Clear ROI Forecasts:",
      desc: "Understand your financial savings before making the switch.",
    },
  ];

  return (
    <section className="relative py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-white text-slate-900 overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* 2-Column Grid Matching Screenshot 2 Exactly */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Heading, Subtitle, Bullet points, Start for free */}
          <div className="lg:col-span-6 space-y-6 lg:pr-4">
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight text-slate-950 leading-[1.18]">
              Maximize Your Solar Potential with Precision Insights
            </h2>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              Using advanced solar analysis, we help you understand how much energy your roof can generate — and how much you can save. With personalized recommendations, you&apos;re empowered to make the most of every sunlit hour.
            </p>

            {/* Checklist items with solid black check circle icons */}
            <div className="space-y-4 pt-2">
              {bulletPoints.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3.5">
                  <div className="w-5 h-5 rounded-full bg-black text-white flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <div className="text-sm leading-snug">
                    <span className="font-bold text-slate-950 mr-1.5">{item.title}</span>
                    <span className="text-slate-600 font-normal">{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Start for free Button */}
            <div className="pt-4">
              <Link
                href="/quick"
                className="inline-block bg-black hover:bg-neutral-800 text-white text-sm font-semibold px-7 py-3.5 rounded-xl shadow-md transition-colors"
              >
                Start for free
              </Link>
            </div>
          </div>

          {/* Right Column: 3D Solar Roof Heatmap + Floating Solar Analysis Card from Screenshot 2 */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative w-full max-w-[500px]"
            >
              <img
                src="/images/solar-precision-insights-card.png"
                alt="Solar Analysis - Precision Insights"
                className="w-full h-auto object-contain rounded-[32px] drop-shadow-sm"
              />
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}
