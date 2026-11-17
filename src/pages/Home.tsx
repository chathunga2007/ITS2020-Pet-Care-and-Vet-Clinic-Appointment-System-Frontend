import React from "react";
import Navbar from "../components/Navbar";
import HomeLiveBackground from "../components/HomeLiveBackground";
import HeroSection from "../components/HeroSection";
import PuppyLineBanner from "../components/PuppyLineBanner";
import PetBookingWorkflow from "../components/PetBookingWorkflow";
import ServicesSection from "../components/ServicesSection";
import WhyChooseUs from "../components/WhyChooseUs";
import VetsSection from "../components/VetsSection";
import CTASection from "../components/CTASection";
import Footer from "../components/Footer";
import PetChatBot from "../components/PetChatBot";

export const Home: React.FC = () => {
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
    <div className="min-h-screen bg-[#f3faf8] text-slate-800 dark:bg-[#07090e] dark:text-slate-100 flex flex-col selection:bg-teal-600 selection:text-white transition-colors duration-300 relative overflow-x-hidden">
      <HomeLiveBackground />

      <Navbar />

      <main className="flex-1 relative z-10">
        <HeroSection />

        <PuppyLineBanner />

        <ServicesSection />

        <WhyChooseUs />

        <VetsSection />

        <PetBookingWorkflow />

        <CTASection />
      </main>

      <Footer />

      {/* Floating PetCare AI Chatbot on Landing Home Page */}
      <PetChatBot />
    </div>
  );
};

export default Home;