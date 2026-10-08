"use client";

import React from "react";
import Link from "next/link";
import SunPermitLogo from "@/components/SunPermitLogo";
import { Phone } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="w-full bg-white text-slate-900 border-t border-slate-200/80 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ─── Top Header Row: Logo & Direct Contact Callouts (Matches Screenshot 2 Exactly) ─── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-14 border-b border-slate-100">
          <Link href="/" className="inline-block group">
            <SunPermitLogo height={42} />
          </Link>

          <div className="flex flex-wrap items-center gap-8 sm:gap-14">
            {/* Callout 1: Phone */}
            <div>
              <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                CALL US DIRECT
              </span>
              <a
                href="tel:+1-551-291-2786"
                className="text-lg sm:text-xl font-bold text-slate-950 hover:text-orange-600 transition-colors"
              >
                (551) 291-2786
              </a>
            </div>

            {/* Callout 2: Email */}
            <div>
              <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                EMAIL SUPPORT
              </span>
              <a
                href="mailto:support@sunpermit.com"
                className="text-lg sm:text-xl font-bold text-slate-950 hover:text-orange-600 transition-colors"
              >
                support@sunpermit.com
              </a>
            </div>
          </div>
        </div>

        {/* ─── Main 4 Columns Section (Matches Screenshot 2 Exactly) ─── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 py-14 border-b border-slate-100">
          
          {/* Column 1: Volume Bundles CTA (Left 5 Cols) */}
          <div className="lg:col-span-5 space-y-4 pr-0 sm:pr-4">
            <span className="inline-block text-[10px] font-bold text-orange-600 uppercase tracking-widest bg-orange-50 px-3 py-1 rounded-full border border-orange-200/90">
              VOLUME BUNDLES
            </span>

            <h3 className="text-2xl sm:text-[28px] font-extrabold text-slate-950 tracking-tight leading-tight">
              Got a good work volume?<br />
              Ask about our bundles.
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal max-w-md">
              You can subscribe to our bundle packages to offer you one-stop solution for your projects. Our bundle includes design &amp; engineering stamps, interconnection, permitting, rebate, HOA etc.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                href="/request-permit"
                className="bg-slate-950 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold px-6 py-3 rounded-full transition-all shadow-sm hover:scale-[1.02] active:scale-[0.98]"
              >
                Get a Quote
              </Link>
              
              <a
                href="tel:+1-551-291-2786"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-800 hover:text-orange-600 px-5 py-3 rounded-full border border-slate-200 hover:border-orange-300 transition-colors bg-white shadow-xs"
              >
                <Phone className="w-3.5 h-3.5 text-orange-500" />
                <span>Call Us Now</span>
              </a>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div className="lg:col-span-2 space-y-3.5">
            <h4 className="text-sm font-bold text-slate-950">Navigation</h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600">
              <li>
                <Link href="#about" className="hover:text-slate-950 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#services" className="hover:text-slate-950 transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="#pricing" className="hover:text-slate-950 transition-colors">
                  Pricing Calculator
                </Link>
              </li>
              <li>
                <Link href="/permit-planset" className="hover:text-slate-950 transition-colors">
                  Permit Plansets
                </Link>
              </li>
              <li>
                <Link href="/submit-company" className="hover:text-slate-950 transition-colors">
                  Company Onboarding
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Follow us */}
          <div className="lg:col-span-2 space-y-3.5">
            <h4 className="text-sm font-bold text-slate-950">Follow us</h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600">
              <li>
                <a
                  href="https://instagram.com/sunpermit"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-slate-950 transition-colors"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/sunpermit"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-slate-950 transition-colors"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/company/sunpermit"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-slate-950 transition-colors"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com/sunpermit"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-slate-950 transition-colors"
                >
                  Twitter
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Legal */}
          <div className="lg:col-span-3 space-y-3.5">
            <h4 className="text-sm font-bold text-slate-950">Legal</h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600">
              <li>
                <Link href="/submit-company" className="hover:text-slate-950 transition-colors">
                  Terms &amp; Conditions
                </Link>
              </li>
              <li>
                <Link href="/submit-company" className="hover:text-slate-950 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/submit-company" className="hover:text-slate-950 transition-colors">
                  Sustainability Policy
                </Link>
              </li>
              <li>
                <Link href="/submit-company" className="hover:text-slate-950 transition-colors">
                  ESG Policy
                </Link>
              </li>
              <li>
                <a href="mailto:support@sunpermit.com" className="hover:text-slate-950 transition-colors">
                  Support
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* ─── Bottom Row: Copyright & Back to Top (Matches Screenshot 2 Exactly) ─── */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-slate-500">
          <p>
            Copyright @ SUNPERMIT, LLC {new Date().getFullYear()}
          </p>

          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 text-slate-700 hover:text-slate-950 transition-colors font-semibold cursor-pointer"
          >
            <span>Back to top</span>
            <span className="text-sm">↑</span>
          </button>
        </div>

      </div>
    </footer>
  );
}
