import React from "react";
import Navbar from "@/components/Navbar";
import SolarAnalyticsHero from "@/components/SolarAnalyticsHero";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import WhyChooseSunpermitSection from "@/components/WhyChooseSunpermitSection";
import InteractiveRoiCalculator from "@/components/InteractiveRoiCalculator";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#070A12] text-slate-100 flex flex-col">
      <main className="flex-1">
        <div id="analytics">
          <SolarAnalyticsHero />
        </div>
        <div id="pricing">
          <InteractiveRoiCalculator />
        </div>
        <AboutSection />
        <ServicesSection />
        <WhyChooseSunpermitSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
