"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SunPermitLogo from "@/components/SunPermitLogo";
import { 
  FileText, 
  Building2, 
  Search, 
  Menu, 
  X, 
  Zap, 
  ArrowRight,
  Sparkles
} from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { label: "About Us", href: "/#about" },
    { label: "Services", href: "/#services" },
    { label: "Pricing Calculator", href: "/#pricing" },
    { label: "Contact Us", href: "/#contact" },
    { label: "Quick Hub", href: "/quick" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-md transition-all shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Official Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <SunPermitLogo height={50} className="h-11 sm:h-12 md:h-14 w-auto" />
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-700">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`transition-colors hover:text-orange-600 ${
                  isActive ? "text-orange-600 font-bold" : "text-slate-700"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTA Action Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/submit-company"
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:text-slate-950 bg-slate-100 hover:bg-slate-200 transition-all flex items-center gap-1.5"
          >
            <Building2 className="w-3.5 h-3.5 text-orange-500" />
            Company Details
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-lg bg-slate-100 text-slate-700 hover:text-slate-950"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 shadow-lg">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-orange-600"
            >
              {item.label}
            </Link>
          ))}

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <Link
              href="/submit-company"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center px-4 py-2.5 rounded-lg text-sm font-medium bg-slate-100 text-slate-800"
            >
              Submit Company Details
            </Link>
            <Link
              href="/quick"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center px-4 py-2.5 rounded-lg text-sm font-bold bg-slate-950 text-white"
            >
              Quick Order Hub
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
