import React, { useState } from 'react';
import { X, Calendar, Clock, Stethoscope, PawPrint, CheckCircle2, Phone, User as UserIcon } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import toast from 'react-hot-toast';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultService?: string;
}

export const AppointmentModal: React.FC<AppointmentModalProps> = ({
  isOpen,
  onClose,
  defaultService = 'General Checkup & Consultation',
}) => {
  const { user } = useAuth();

  const [petName, setPetName] = useState('');
  const [petType, setPetType] = useState('Dog');
  const [service, setService] = useState(defaultService);
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('10:00 AM');
  const [ownerName, setOwnerName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!petName || !preferredDate || (!user && !phone)) {
      toast.error('Please fill in required fields!');
      return;
    }

    setSubmitted(true);
    toast.success(`Appointment request submitted for ${petName}! Our clinic will call you to confirm.`);

    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 transition-all">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 p-6 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white/10 rounded-2xl backdrop-blur-md">
              <Calendar className="w-6 h-6 text-emerald-200" />
            </div>
            <div>
              <h3 className="text-xl font-bold">Book Vet Appointment</h3>
              <p className="text-xs text-emerald-100/90">Instant booking with certified veterinarians</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-10 text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 className="w-10 h-10 animate-bounce" />
            </div>
            <h4 className="text-2xl font-bold text-slate-800 mb-2">Booking Requested!</h4>
            <p className="text-slate-600 text-sm max-w-xs mb-6">
              Thank you! Our veterinary team has received your appointment request for{' '}
              <strong className="text-emerald-600">{petName}</strong> on {preferredDate}.
            </p>
            <button
              onClick={onClose}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-2.5 rounded-xl shadow-md transition"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
            {/* Pet info grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Pet Name <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <PawPrint className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Milo, Bella"
                    value={petName}
                    onChange={(e) => setPetName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Pet Type</label>
                <select
                  value={petType}
                  onChange={(e) => setPetType(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none"
                >
                  <option value="Dog">Dog 🐶</option>
                  <option value="Cat">Cat 🐱</option>
                  <option value="Bird">Bird 🦜</option>
                  <option value="Rabbit">Rabbit 🐰</option>
                  <option value="Other">Other Pet 🐾</option>
                </select>
              </div>
            </div>

            {/* Service selector */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Select Service <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Stethoscope className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none"
                >
                  <option value="General Consultation & Wellness">General Consultation & Wellness (LKR 2,500)</option>
                  <option value="Vaccination & Preventive Care">Vaccination & Preventive Care (LKR 3,000)</option>
                  <option value="Dental Scaling & Care">Dental Scaling & Care (LKR 4,500)</option>
                  <option value="Surgery & Specialist Care">Surgery & Specialist Care</option>
                  <option value="Pet Spa & Professional Grooming">Pet Spa & Professional Grooming (LKR 3,500)</option>
                  <option value="Emergency Vet Care">🚨 Immediate Emergency Treatment</option>
                </select>
              </div>
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Preferred Date <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="date"
                    required
                    min={new Date().toISOString().split('T')[0]}
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Time Slot</label>
                <div className="relative">
                  <Clock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <select
                    value={preferredTime}
                    onChange={(e) => setPreferredTime(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none"
                  >
                    <option value="09:00 AM">09:00 AM - 10:00 AM</option>
                    <option value="10:30 AM">10:30 AM - 11:30 AM</option>
                    <option value="02:00 PM">02:00 PM - 03:00 PM</option>
                    <option value="04:30 PM">04:30 PM - 05:30 PM</option>
                    <option value="06:30 PM">06:30 PM - 07:30 PM</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Owner contact */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Owner Name</label>
                <div className="relative">
                  <UserIcon className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    placeholder="Your Full Name"
                    value={ownerName}
                    onChange={(e) => setOwnerName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Phone Number <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="tel"
                    required
                    placeholder="07X XXX XXXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Any specific symptoms or special instructions? (Optional)
              </label>
              <textarea
                rows={2}
                placeholder="E.g. Mild fever, skipping meals, vaccination booster due..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full p-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none resize-none"
              ></textarea>
            </div>

            {/* Submit button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-bold py-3 rounded-xl shadow-lg shadow-emerald-600/30 transition transform hover:-translate-y-0.5"
              >
                Confirm Appointment Request
              </button>
              <p className="text-center text-[11px] text-slate-400 mt-2">
                ⚡ No prepayment needed. You will receive an SMS confirmation instantly.
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default AppointmentModal;

