import { useState } from 'react';
import Navbar from '../components/layout/Navbar';
import HeroSection from '../components/home/HeroSection';
import EmergencyBanner from '../components/home/EmergencyBanner';
import ServicesSection from '../components/home/ServicesSection';
import WhyChooseUs from '../components/home/WhyChooseUs';
import DoctorsSection from '../components/home/DoctorsSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import Footer from '../components/layout/Footer';
import AppointmentModal from '../components/home/AppointmentModal';

export default function Home() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('General Checkup & Consultation');

  const handleOpenBooking = (serviceName?: string) => {
    if (serviceName) {
      setSelectedService(serviceName);
    }
    setBookingModalOpen(true);
  };

  const handleCloseBooking = () => {
    setBookingModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col overflow-x-hidden">
      {/* Top Navigation */}
      <Navbar onOpenBooking={() => handleOpenBooking()} />

      {/* Hero Section with Video Background */}
      <main className="flex-grow">
        <HeroSection onOpenBooking={() => handleOpenBooking()} />

        {/* 24/7 Emergency Dispatch Banner */}
        <EmergencyBanner />

        {/* Clinical Services */}
        <ServicesSection onBookService={(service) => handleOpenBooking(service)} />

        {/* Why Choose Our Clinic */}
        <WhyChooseUs />

        {/* Senior Veterinarians */}
        <DoctorsSection onBookWithDoctor={(doctor) => handleOpenBooking(`Consultation with ${doctor}`)} />

        {/* Pet Parents Testimonials */}
        <TestimonialsSection />
      </main>

      {/* Interactive Quick Appointment Booking Modal */}
      <AppointmentModal
        isOpen={bookingModalOpen}
        onClose={handleCloseBooking}
        defaultService={selectedService}
      />

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
