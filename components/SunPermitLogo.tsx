"use client";

import React from "react";
import Image from "next/image";

interface SunPermitLogoProps {
  className?: string;
  variant?: "full" | "icon";
  height?: number;
}

export default function SunPermitLogo({ className = "", variant = "full", height = 50 }: SunPermitLogoProps) {
  if (variant === "icon") {
    return (
      <div className={`relative inline-flex items-center justify-center ${className}`}>
        <svg viewBox="0 0 100 65" className="h-8 w-auto overflow-visible" fill="none">
          {/* Sun Rays */}
          <path
            d="M 50,5 L 50,0 M 68,10 L 71,6 M 82,23 L 87,21 M 87,41 L 93,42 M 32,10 L 29,6 M 18,23 L 13,21 M 13,41 L 7,42"
            stroke="#F59E0B"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Sun Body */}
          <path
            d="M 22,42 A 28,28 0 0,1 78,42 Z"
            fill="#FBBF24"
          />
          <path
            d="M 22,42 A 28,28 0 0,1 78,42 Z"
            fill="url(#sunGlow)"
          />
          {/* Curved Wings / Swoosh */}
          <path
            d="M 12,46 Q 50,38 50,58 Q 50,38 88,46 Q 50,48 50,62 Q 50,48 12,46 Z"
            fill="#F59E0B"
          />
          <defs>
            <linearGradient id="sunGlow" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#F97316" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      <img
        src="/images/sunpermit-logo.png"
        alt="SunPermit Logo"
        className="h-9 w-auto object-contain drop-shadow-xs"
      />
    </div>
  );
}
