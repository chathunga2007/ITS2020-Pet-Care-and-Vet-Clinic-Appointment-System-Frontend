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
  // Handle smooth scrolling when navigated with hash from other routes
  React.useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.replace("#", "");
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          const navOffset = 90;
          const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
          window.scrollTo({ top: elementPosition - navOffset, behavior: "smooth" });
        }
      }, 150);
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#f3faf8] text-slate-800 dark:bg-[#07090e] dark:text-slate-100 flex flex-col selection:bg-teal-600 selection:text-white transition-colors duration-300">
      {/* Top Glass Navbar */}
      <Navbar />

      {/* Main Home Sections */}
      <main className="flex-1">
        {/* 1. Cinematic Pet Care Hero with Doctor Care Backdrop */}
        <HeroSection />

        {/* 2. Clinical Services & 24/7 Emergency */}
        <ServicesSection />

        {/* 3. Why Choose Us */}
        <WhyChooseUs />

        {/* 4. Certified Specialists Doctors */}
        <VetsSection />

        {/* 5. How Appointments Work for Members */}
        <PetBookingWorkflow />

        {/* 6. Guest Conversion CTA Banner */}
        <CTASection />
      </main>

      {/* Modern Clinic Footer */}
      <Footer />
    </div>
  );
};

export default Home;
