import React from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import PetBookingWorkflow from "../components/PetBookingWorkflow";
import ServicesSection from "../components/ServicesSection";
import WhyChooseUs from "../components/WhyChooseUs";
import VetsSection from "../components/VetsSection";
import CTASection from "../components/CTASection";
import Footer from "../components/Footer";

export const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 flex flex-col selection:bg-sky-400 selection:text-slate-950">
      {/* Top Glass Navbar */}
      <Navbar />

      {/* Main Home Sections */}
      <main className="flex-1">
        {/* Cinematic Pet Care Hero with Doctor Care Backdrop */}
        <HeroSection />

        {/* Core Feature: Add Pets & Schedule Appointments Workflow */}
        <PetBookingWorkflow />

        {/* Clinical Services */}
        <ServicesSection />

        {/* Why Choose Us */}
        <WhyChooseUs />

        {/* Certified Specialists Doctors */}
        <VetsSection />

        {/* Guest Conversion CTA Banner */}
        <CTASection />
      </main>

      {/* Modern Clinic Footer */}
      <Footer />
    </div>
  );
};

export default Home;
