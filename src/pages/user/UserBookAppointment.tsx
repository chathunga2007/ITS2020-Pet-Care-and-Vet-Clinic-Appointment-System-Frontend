import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import { getMyPets } from "../../service/pet.service";
import { getAllDoctors, getDoctorSchedules, type IDoctorScheduleItem } from "../../service/doctor.service";
import { createAppointment, getBookedSlots } from "../../service/appointment.service";
import { getAllServices } from "../../service/service.service";
import type { IPet } from "../../types/pet.types";
import type { IDoctor } from "../../types/doctor.types";
import type { IService } from "../../types/service.types";
import {
  Calendar,
  Clock,
  Dog,
  Stethoscope,
  Plus,
  Loader2,
  AlertCircle,
  CheckCircle2,
  MailCheck,
  Sparkles,
} from "lucide-react";
import toast from "react-hot-toast";
import Swal from "../../utils/sweetalert";

const DEFAULT_SLOTS = [
  "08:00 AM",
  "08:30 AM",
  "09:00 AM",
  "09:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "01:00 PM",
  "01:30 PM",
  "02:00 PM",
  "02:30 PM",
  "03:00 PM",
  "03:30 PM",
  "04:00 PM",
  "04:30 PM",
  "05:00 PM",
];

const timeToMinutes = (timeStr: string): number => {
  if (!timeStr) return 0;
  const match = timeStr.trim().match(/(\d+):(\d+)\s*(AM|PM)?/i);
  if (!match) return 0;
  let hours = parseInt(match[1], 10);
  const minutes = parseInt(match[2], 10);
  const period = match[3]?.toUpperCase();
  if (period === "PM" && hours < 12) hours += 12;
  if (period === "AM" && hours === 12) hours = 0;
  return hours * 60 + minutes;
};

export const UserBookAppointment: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [pets, setPets] = useState<IPet[]>([]);
  const [doctors, setDoctors] = useState<IDoctor[]>([]);
  const [services, setServices] = useState<IService[]>([]);
  const [selectedServiceId, setSelectedServiceId] = useState<string>("");
  const [loading, setLoading] = useState(true);

  const [selectedPetId, setSelectedPetId] = useState<string>(
    searchParams.get("petId") || ""
  );
  const [selectedDoctorId, setSelectedDoctorId] = useState<string>(
    searchParams.get("doctorId") || ""
  );

  const todayStr = useMemo(() => {
    const d = new Date();
    return d.toISOString().split("T")[0];
  }, []);

  const [appointmentDate, setAppointmentDate] = useState<string>(todayStr);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [reason, setReason] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);

  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [doctorSchedules, setDoctorSchedules] = useState<IDoctorScheduleItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [petsData, docsData, servicesData] = await Promise.all([
          getMyPets(),
          getAllDoctors(),
          getAllServices().catch(() => []),
        ]);
        setPets(petsData);
        setDoctors(docsData);
        setServices(servicesData);

        if (petsData.length > 0 && !selectedPetId) {
          setSelectedPetId(petsData[0]._id);
        }
        if (docsData.length > 0 && !selectedDoctorId) {
          setSelectedDoctorId(docsData[0]._id);
        }
        if (servicesData.length > 0 && !selectedServiceId) {
          setSelectedServiceId(servicesData[0]._id);
        }
      } catch (err: any) {
        console.error(err);
        toast.error("Failed to load clinic booking details");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!selectedDoctorId || !appointmentDate) return;

    let isMounted = true;
    const fetchSlotsAndSchedules = async () => {
      try {
        setLoadingSlots(true);
        const [slots, schedules] = await Promise.all([
          getBookedSlots(selectedDoctorId, appointmentDate),
          getDoctorSchedules(selectedDoctorId).catch(() => []),
        ]);
        if (isMounted) {
          setBookedSlots(slots);
          setDoctorSchedules(schedules);
          if (slots.includes(selectedTime)) {
            setSelectedTime("");
          }
        }
      } catch (err) {
        console.error("Failed to fetch doctor booked slots:", err);
      } finally {
        if (isMounted) setLoadingSlots(false);
      }
    };

    fetchSlotsAndSchedules();
    return () => {
      isMounted = false;
    };
  }, [selectedDoctorId, appointmentDate]);

  const currentDoctor = doctors.find((d) => d._id === selectedDoctorId);
  const currentService = services.find((s) => s._id === selectedServiceId);

  const dayOfWeekName = useMemo(() => {
    if (!appointmentDate) return "";
    const parts = appointmentDate.split("-");
    if (parts.length === 3) {
      const d = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
      return d.toLocaleDateString("en-US", { weekday: "long" });
    }
    return "";
  }, [appointmentDate]);

  const activeDaySchedule = useMemo(() => {
    if (!dayOfWeekName || doctorSchedules.length === 0) return null;
    return doctorSchedules.find(
      (s) => s.dayOfWeek.toLowerCase() === dayOfWeekName.toLowerCase()
    );
  }, [dayOfWeekName, doctorSchedules]);

  const isDoctorDayOff = Boolean(activeDaySchedule && activeDaySchedule.isAvailable === false);

  const isOutOfHours = (slot: string) => {
    if (!activeDaySchedule || !activeDaySchedule.isAvailable) return false;
    const slotMins = timeToMinutes(slot);
    const startMins = timeToMinutes(activeDaySchedule.startTime);
    const endMins = timeToMinutes(activeDaySchedule.endTime);
    return slotMins < startMins || slotMins > endMins;
  };

  const commonReasons = [
    "General Health Checkup",
    "Vaccination & Deworming",
    "Emergency Care & Illness",
    "Skin Allergy & Itching",
    "Dental Care & Cleaning",
    "Surgery & Consultation",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedPetId) {
      toast.error("Please select a registered pet for the consultation.");
      return;
    }
    if (!selectedDoctorId) {
      toast.error("Please choose a veterinarian specialist.");
      return;
    }
    if (!appointmentDate) {
      toast.error("Please select an appointment date.");
      return;
    }
    if (isDoctorDayOff) {
      toast.error(`${currentDoctor?.name || "The doctor"} is off duty on ${dayOfWeekName}s. Please choose another date.`);
      return;
    }
    if (!selectedTime) {
      toast.error("Please select an available consultation time slot.");
      return;
    }
    if (isOutOfHours(selectedTime)) {
      toast.error(`Selected time is outside doctor's consulting hours (${activeDaySchedule?.startTime} - ${activeDaySchedule?.endTime}).`);
      return;
    }
    if (!reason.trim()) {
      toast.error("Please describe the visit reason or symptoms.");
      return;
    }

    try {
      setSubmitting(true);
      await createAppointment({
        petId: selectedPetId,
        doctorId: selectedDoctorId,
        serviceId: selectedServiceId || undefined,
        appointmentDate: appointmentDate,
        time: selectedTime,
        reason: reason.trim(),
      });

      await Swal.fire({
        icon: "success",
        title: "Appointment Booked!",
        text: `Your consultation on ${appointmentDate} at ${selectedTime} with ${
          currentDoctor?.name || "the doctor"
        }${currentService ? ` for "${currentService.name}"` : ""} has been submitted. A confirmation email has been dispatched to your email address!`,
        confirmButtonText: "View My Appointments",
      });

      navigate("/user/appointments");
    } catch (err: any) {
      console.error(err);
      const errorMsg =
        err.response?.data?.message ||
        "Failed to schedule appointment. Please check availability and try again.";

      if (err.response?.status === 400 && errorMsg.toLowerCase().includes("already has an active appointment")) {
        await Swal.fire({
          icon: "warning",
          title: "Time Slot Already Booked!",
          text: errorMsg,
          confirmButtonText: "Choose Another Time Slot",
        });
        const updatedSlots = await getBookedSlots(selectedDoctorId, appointmentDate);
        setBookedSlots(updatedSlots);
        setSelectedTime("");
      } else {
        toast.error(errorMsg);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <DashboardLayout
      pageTitle="Schedule Veterinary Visit"
      pageSubtitle="Select your pet, specialist doctor, choose available time slots, and receive instant email confirmation"
    >
      <div className="max-w-4xl mx-auto space-y-6">
        {loading ? (
          <div className="py-24 text-center">
            <Loader2 className="w-10 h-10 text-teal-600 animate-spin mx-auto mb-4" />
            <p className="text-slate-500 dark:text-slate-400 text-sm font-semibold">
              Loading available specialists and schedules...
            </p>
          </div>
        ) : pets.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-teal-200 dark:border-teal-700/50 bg-white dark:bg-[#072124] p-12 text-center shadow-sm">
            <div className="w-16 h-16 rounded-3xl bg-amber-50 dark:bg-amber-950/40 text-amber-500 flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">
              Please Register a Pet First
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-6">
              You must have at least one registered pet profile to book an appointment with our clinic doctors.
            </p>
            <Link
              to="/user/pets"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs sm:text-sm shadow-xl shadow-teal-700/25 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Go to My Pets to Add Profile</span>
            </Link>
          </div>
        ) : (
          <div className="rounded-3xl bg-white dark:bg-[#072124] border border-teal-100/90 dark:border-teal-700/40 p-6 sm:p-10 shadow-lg">
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 text-xs font-bold mb-2">
                <Calendar className="w-3.5 h-3.5" />
                <span>Verified Online Booking • Real-Time Slot Locking</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-800 dark:text-white tracking-tight">
                Book a Clinic Consultation
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                Zero-wait guaranteed visits. Automatically sends an email confirmation upon booking!
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-teal-800 dark:text-teal-300 mb-2.5">
                  1. Select Your Pet *
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {pets.map((p) => (
                    <button
                      key={p._id}
                      type="button"
                      onClick={() => setSelectedPetId(p._id)}
                      className={`p-3.5 rounded-2xl border text-left transition-all flex items-center gap-3 cursor-pointer ${selectedPetId === p._id
                        ? "bg-teal-50 dark:bg-teal-900/40 border-teal-600 ring-2 ring-teal-500/30 shadow-md"
                        : "bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 hover:border-teal-400"
                        }`}
                    >
                      <div className="w-11 h-11 rounded-xl overflow-hidden bg-teal-100 dark:bg-white/10 shrink-0">
                        {p.imageURL ? (
                          <img
                            src={p.imageURL}
                            alt={p.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-teal-600">
                            <Dog className="w-5 h-5" />
                          </div>
                        )}
                      </div>
                      <div className="overflow-hidden">
                        <p className="font-black text-sm text-slate-800 dark:text-white truncate">
                          {p.name}
                        </p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                          {p.breed}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-teal-800 dark:text-teal-300 mb-2.5">
                  2. Choose Specialist / Veterinary Doctor *
                </label>
                {doctors.length === 0 ? (
                  <p className="text-xs text-slate-400 p-4 rounded-xl bg-slate-50 dark:bg-white/5">
                    No active doctors listed. Please contact clinic reception.
                  </p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-64 overflow-y-auto pr-1">
                    {doctors.map((doc) => (
                      <button
                        key={doc._id}
                        type="button"
                        onClick={() => setSelectedDoctorId(doc._id)}
                        className={`p-3.5 rounded-2xl border text-left transition-all flex items-center gap-3 cursor-pointer ${selectedDoctorId === doc._id
                          ? "bg-teal-50 dark:bg-teal-900/40 border-teal-600 ring-2 ring-teal-500/30 shadow-md"
                          : "bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 hover:border-teal-400"
                          }`}
                      >
                        <div className="w-12 h-12 rounded-xl overflow-hidden bg-teal-100 dark:bg-white/10 shrink-0">
                          {doc.imageURL ? (
                            <img
                              src={doc.imageURL}
                              alt={doc.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-teal-600">
                              <Stethoscope className="w-6 h-6" />
                            </div>
                          )}
                        </div>
                        <div className="overflow-hidden">
                          <p className="font-black text-sm text-slate-800 dark:text-white truncate">
                            {doc.name}
                          </p>
                          <p className="text-[11px] text-teal-700 dark:text-teal-300 truncate">
                            {doc.specialization}
                          </p>
                          <p className="text-[10px] text-slate-400 truncate flex items-center gap-1 mt-0.5">
                            <Clock className="w-3 h-3 text-amber-500" />
                            <span>{doc.workingHours || "08:00 AM - 05:00 PM"}</span>
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-teal-800 dark:text-teal-300 mb-2">
                  3. Select Preferred Consultation Date *
                </label>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="relative w-full sm:w-72">
                    <input
                      type="date"
                      required
                      min={todayStr}
                      value={appointmentDate}
                      onChange={(e) => setAppointmentDate(e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white text-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 font-semibold"
                    />
                  </div>

                  {currentDoctor && (
                    <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5 bg-teal-50/60 dark:bg-white/5 px-3 py-2 rounded-xl border border-teal-100 dark:border-white/5">
                      <Clock className="w-3.5 h-3.5 text-teal-600" />
                      <span>
                        Doctor's Schedule ({dayOfWeekName || "Daily"}):{" "}
                        <strong className="text-slate-700 dark:text-slate-200">
                          {activeDaySchedule
                            ? `${activeDaySchedule.startTime} - ${activeDaySchedule.endTime}`
                            : currentDoctor.workingHours || "08:00 AM - 05:00 PM"}
                        </strong>
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between flex-wrap gap-2 mb-2.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-teal-800 dark:text-teal-300">
                    4. Select Available Time Slot *
                  </label>

                  {/* Legend */}
                  <div className="flex items-center gap-2.5 text-[11px] font-semibold text-slate-500 dark:text-slate-400 flex-wrap">
                    <span className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-teal-600 inline-block" /> Available
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" /> Booked
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-600 inline-block" /> Off Hours
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-teal-200 border-2 border-teal-700 inline-block" /> Selected
                    </span>
                  </div>
                </div>

                {isDoctorDayOff ? (
                  <div className="p-5 rounded-2xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/40 text-amber-800 dark:text-amber-300 flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 shrink-0 text-amber-600" />
                    <div>
                      <p className="text-xs font-bold">
                        {currentDoctor?.name || "The doctor"} is off duty on {dayOfWeekName}s.
                      </p>
                      <p className="text-[11px] text-amber-700 dark:text-amber-400 mt-0.5">
                        Please select another appointment date above or choose another veterinarian specialist.
                      </p>
                    </div>
                  </div>
                ) : loadingSlots ? (
                  <div className="p-8 text-center rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                    <Loader2 className="w-6 h-6 text-teal-600 animate-spin mx-auto mb-2" />
                    <p className="text-xs text-slate-500">Checking doctor's real-time schedule for {appointmentDate}...</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-2.5">
                    {DEFAULT_SLOTS.map((slot) => {
                      const isBooked = bookedSlots.includes(slot);
                      const isSelected = selectedTime === slot;
                      const outOfHours = isOutOfHours(slot);
                      const isDisabled = isBooked || outOfHours;

                      return (
                        <button
                          key={slot}
                          type="button"
                          disabled={isDisabled}
                          onClick={() => setSelectedTime(slot)}
                          className={`py-3 px-2 rounded-2xl text-xs font-bold transition-all flex flex-col items-center justify-center gap-1 border relative ${isBooked
                            ? "bg-rose-50/50 dark:bg-rose-950/20 text-rose-400 dark:text-rose-500 border-rose-200/50 dark:border-rose-900/30 cursor-not-allowed line-through opacity-75"
                            : outOfHours
                              ? "bg-slate-100/50 dark:bg-white/5 text-slate-400 dark:text-slate-500 border-slate-200/50 dark:border-white/5 cursor-not-allowed opacity-50"
                              : isSelected
                                ? "bg-teal-700 text-white border-teal-700 ring-2 ring-teal-500/50 shadow-md transform -translate-y-0.5 cursor-pointer"
                                : "bg-slate-50 dark:bg-white/5 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-white/10 hover:border-teal-500 hover:bg-teal-50 dark:hover:bg-teal-950/40 cursor-pointer"
                            }`}
                        >
                          <div className="flex items-center gap-1">
                            <Clock className={`w-3.5 h-3.5 ${isSelected ? "text-white" : isBooked ? "text-rose-400" : outOfHours ? "text-slate-400" : "text-teal-600"}`} />
                            <span>{slot}</span>
                          </div>
                          {isBooked ? (
                            <span className="text-[9px] font-black uppercase text-rose-500 bg-rose-100 dark:bg-rose-950/60 px-1.5 py-0.2 rounded-md">
                              Booked
                            </span>
                          ) : outOfHours ? (
                            <span className="text-[9px] font-bold text-slate-400">
                              Off Hours
                            </span>
                          ) : isSelected ? (
                            <span className="text-[9px] font-black uppercase text-teal-100 bg-teal-800/80 px-1.5 py-0.2 rounded-md flex items-center gap-0.5">
                              <CheckCircle2 className="w-2.5 h-2.5" /> Selected
                            </span>
                          ) : (
                            <span className="text-[9px] font-semibold text-emerald-600 dark:text-emerald-400">
                              Available
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}

                {selectedTime && (
                  <p className="text-xs text-teal-700 dark:text-teal-300 font-bold mt-2.5 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>Selected Slot: {selectedTime} on {appointmentDate}</span>
                  </p>
                )}
              </div>

              {/* Step 5: Select Clinical Service / Treatment */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-teal-800 dark:text-teal-300">
                    5. Select Clinical Service / Treatment *
                  </label>
                  {services.length > 0 && (
                    <span className="text-[11px] font-semibold text-slate-400">
                      {services.length} Services Available
                    </span>
                  )}
                </div>

                {services.length === 0 ? (
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs text-slate-500">
                    Standard general veterinary consulting service will be applied.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {services.map((svc) => {
                      const isSelected = selectedServiceId === svc._id;
                      return (
                        <button
                          key={svc._id}
                          type="button"
                          onClick={() => setSelectedServiceId(svc._id)}
                          className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between cursor-pointer relative group ${
                            isSelected
                              ? "bg-teal-50 dark:bg-teal-900/40 border-teal-600 ring-2 ring-teal-500/30 shadow-md"
                              : "bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 hover:border-teal-400 hover:bg-teal-50/40 dark:hover:bg-teal-950/20"
                          }`}
                        >
                          <div>
                            <div className="flex items-start justify-between gap-2 mb-1.5">
                              <h4 className="font-extrabold text-xs sm:text-sm text-slate-800 dark:text-white line-clamp-1">
                                {svc.name}
                              </h4>
                              {isSelected ? (
                                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                              ) : (
                                <Sparkles className="w-3.5 h-3.5 text-slate-400 group-hover:text-teal-500 shrink-0" />
                              )}
                            </div>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 mb-3">
                              {svc.description || "General clinic treatment and care."}
                            </p>
                          </div>

                          <div className="pt-2 border-t border-slate-200/60 dark:border-white/10 flex items-center justify-between text-xs">
                            <span className="font-extrabold text-emerald-600 dark:text-emerald-400">
                              LKR {svc.price.toLocaleString()}
                            </span>
                            <span className="text-[11px] text-slate-400 flex items-center gap-1 font-medium">
                              <Clock className="w-3 h-3 text-slate-400" />
                              {svc.durationMinutes || 30}m
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}

                {currentService && (
                  <p className="text-xs text-teal-700 dark:text-teal-300 font-bold mt-2.5 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>Selected Service: {currentService.name} (LKR {currentService.price.toLocaleString()} • {currentService.durationMinutes || 30} mins)</span>
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-teal-800 dark:text-teal-300 mb-1.5">
                  6. Reason for Consultation &amp; Symptoms *
                </label>

                <div className="flex flex-wrap gap-2 mb-3">
                  {commonReasons.map((chip) => (
                    <button
                      key={chip}
                      type="button"
                      onClick={() => setReason(chip)}
                      className={`px-3 py-1 rounded-full text-xs font-semibold border transition-colors cursor-pointer ${reason === chip
                        ? "bg-teal-600 text-white border-teal-600 shadow-xs"
                        : "bg-slate-50 dark:bg-white/5 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-white/10 hover:border-teal-400"
                        }`}
                    >
                      {chip}
                    </button>
                  ))}
                </div>

                <textarea
                  rows={3}
                  required
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Describe your pet's symptoms, dietary issues, vaccinations needed, or wellness questions..."
                  className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white placeholder:text-slate-400 text-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 resize-none"
                />
              </div>

              <div className="p-4 rounded-2xl bg-teal-50/80 dark:bg-teal-950/40 border border-teal-200/80 dark:border-teal-700/40 flex items-start gap-3">
                <MailCheck className="w-5 h-5 text-teal-700 dark:text-teal-300 shrink-0 mt-0.5" />
                <div className="text-xs text-teal-900 dark:text-teal-200 leading-relaxed">
                  <strong className="block font-bold mb-0.5">Automated Clinic Notification:</strong>
                  Upon confirming this booking, an official email notification with your visit schedule, appointment reference, and clinic guidelines will be delivered straight to your email.
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting || !selectedTime}
                className="w-full py-4 px-6 rounded-2xl bg-teal-700 hover:bg-teal-800 disabled:opacity-50 text-white font-bold text-sm sm:text-base shadow-xl shadow-teal-700/25 hover:shadow-teal-700/40 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Booking Consultation &amp; Sending Email...</span>
                  </>
                ) : (
                  <>
                    <Calendar className="w-5 h-5" />
                    <span>Confirm Appointment Booking</span>
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default UserBookAppointment;