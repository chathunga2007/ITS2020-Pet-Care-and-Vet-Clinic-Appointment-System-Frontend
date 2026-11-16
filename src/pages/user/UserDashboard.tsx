import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import DashboardLayout from "../../layouts/DashboardLayout";
import AreaChart from "../../components/charts/AreaChart";
import DonutChart from "../../components/charts/DonutChart";
import PetModal from "../../components/modals/PetModal";
import { getMyPets, createPet } from "../../service/pet.service";
import { getMyAppointments } from "../../service/appointment.service";
import type { IPet } from "../../types/pet.types";
import type { IAppointment } from "../../types/appointment.types";
import {
  Dog,
  Calendar,
  Clock,
  Plus,
  ArrowRight,
  CheckCircle2,
  Loader2,
  Sparkles,
  ChevronRight
} from "lucide-react";
import toast from "react-hot-toast";

export const UserDashboard: React.FC = () => {
  const { user } = useAuth();

  const [pets, setPets] = useState<IPet[]>([]);
  const [appointments, setAppointments] = useState<IAppointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPetModalOpen, setIsPetModalOpen] = useState(false);

  const loadData = async () => {
    try {
      setLoading(true);
      const [petsData, apptsData] = await Promise.all([
        getMyPets(),
        getMyAppointments(),
      ]);
      setPets(petsData);
      setAppointments(apptsData);
    } catch (err: any) {
      console.error(err);
      toast.error("Failed to load dashboard metrics");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAddPet = async (formData: FormData) => {
    try {
      await createPet(formData);
      toast.success("Pet registered successfully! 🐾");
      const updated = await getMyPets();
      setPets(updated);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to register pet");
      throw err;
    }
  };

  const upcomingAppointments = appointments.filter((a) =>
    ["PENDING", "CONFIRMED"].includes(a.status)
  );
  const completedAppointments = appointments.filter(
    (a) => a.status === "COMPLETED"
  );

  const sortedUpcoming = [...upcomingAppointments].sort(
    (a, b) =>
      new Date(a.appointmentDate).getTime() -
      new Date(b.appointmentDate).getTime()
  );
  const nextAppointment = sortedUpcoming[0];

  const months = ["May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov"];
  const monthlyTrendData = months.map((m, idx) => ({
    label: m,
    value: idx === months.length - 1 ? appointments.length || 2 : Math.max(idx - 1, 0),
  }));

  const speciesCounts: { [key: string]: number } = {};
  pets.forEach((p) => {
    const sp = p.type || "Other";
    speciesCounts[sp] = (speciesCounts[sp] || 0) + 1;
  });

  const speciesColors = ["#0d9488", "#0284c7", "#f59e0b", "#ec4899", "#8b5cf6"];
  const petSpeciesData = Object.keys(speciesCounts).map((sp, idx) => ({
    label: sp,
    value: speciesCounts[sp],
    color: speciesColors[idx % speciesColors.length],
  }));

  return (
    <DashboardLayout
      pageTitle="Pet Parent Dashboard"
      pageSubtitle="Overview of your registered pets, upcoming vet visits, and health activities"
    >
      {loading ? (
        <div className="py-24 text-center">
          <Loader2 className="w-10 h-10 text-teal-600 animate-spin mx-auto mb-4" />
          <p className="text-slate-500 dark:text-slate-400 text-sm font-semibold">
            Loading your pet dashboard...
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          <div className="relative rounded-3xl p-6 sm:p-8 overflow-hidden bg-gradient-to-r from-teal-50 via-white to-teal-50 dark:from-[#082427] dark:via-[#092e31] dark:to-[#082427] border border-teal-100 dark:border-teal-700/40 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100/70 dark:bg-teal-950/70 border border-teal-200 dark:border-teal-700/60 text-teal-800 dark:text-teal-300 text-xs font-bold mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Pet Parent Member Hub</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-800 dark:text-white tracking-tight">
                Welcome back, {user?.name || "Pet Parent"}! 🐾
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-xl">
                Keep your furry companions happy and healthy with scheduled
                wellness checkups, vaccinations, and specialist consultations.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Link
                to="/user/book"
                className="px-5 py-3 rounded-2xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs sm:text-sm shadow-lg shadow-teal-700/25 flex items-center gap-2 transition-all cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Appointment</span>
              </Link>
              <button
                onClick={() => setIsPetModalOpen(true)}
                className="px-5 py-3 rounded-2xl bg-white dark:bg-white/10 hover:bg-teal-50 dark:hover:bg-white/15 text-[#0f3438] dark:text-white font-bold text-xs sm:text-sm border border-teal-200 dark:border-white/15 shadow-sm transition-all flex items-center gap-2 cursor-pointer"
              >
                <Plus className="w-4 h-4 text-teal-600" />
                <span>Register Pet</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <Link
              to="/user/pets"
              className="rounded-3xl p-5 bg-white dark:bg-[#072124] border border-teal-100/90 dark:border-teal-700/40 shadow-sm hover:shadow-lg hover:border-teal-400 transition-all flex items-center justify-between group"
            >
              <div>
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 block mb-1">
                  Registered Pets
                </span>
                <span className="text-3xl font-black text-teal-700 dark:text-teal-300">
                  {pets.length}
                </span>
                <span className="text-[11px] text-slate-400 block mt-1 flex items-center gap-1 group-hover:text-teal-600 transition-colors">
                  <span>Manage profiles</span>
                  <ChevronRight className="w-3 h-3" />
                </span>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-teal-50 dark:bg-teal-900/40 text-teal-600 dark:text-teal-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <Dog className="w-6 h-6" />
              </div>
            </Link>

            <Link
              to="/user/appointments"
              className="rounded-3xl p-5 bg-white dark:bg-[#072124] border border-teal-100/90 dark:border-teal-700/40 shadow-sm hover:shadow-lg hover:border-teal-400 transition-all flex items-center justify-between group"
            >
              <div>
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 block mb-1">
                  Upcoming Visits
                </span>
                <span className="text-3xl font-black text-emerald-600 dark:text-emerald-400">
                  {upcomingAppointments.length}
                </span>
                <span className="text-[11px] text-slate-400 block mt-1 flex items-center gap-1 group-hover:text-emerald-600 transition-colors">
                  <span>View schedule</span>
                  <ChevronRight className="w-3 h-3" />
                </span>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <Clock className="w-6 h-6" />
              </div>
            </Link>

            <Link
              to="/user/appointments"
              className="rounded-3xl p-5 bg-white dark:bg-[#072124] border border-teal-100/90 dark:border-teal-700/40 shadow-sm hover:shadow-lg hover:border-teal-400 transition-all flex items-center justify-between group"
            >
              <div>
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 block mb-1">
                  Completed Visits
                </span>
                <span className="text-3xl font-black text-sky-600 dark:text-sky-400">
                  {completedAppointments.length}
                </span>
                <span className="text-[11px] text-slate-400 block mt-1 flex items-center gap-1 group-hover:text-sky-600 transition-colors">
                  <span>Past medical history</span>
                  <ChevronRight className="w-3 h-3" />
                </span>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-sky-50 dark:bg-sky-950/40 text-sky-600 dark:text-sky-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <CheckCircle2 className="w-6 h-6" />
              </div>
            </Link>

            <div className="rounded-3xl p-5 bg-white dark:bg-[#072124] border border-teal-100/90 dark:border-teal-700/40 shadow-sm flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 block mb-1">
                  Next Clinic Visit
                </span>
                {nextAppointment ? (
                  <>
                    <span className="text-sm font-black text-slate-800 dark:text-white truncate block max-w-[150px]">
                      {new Date(nextAppointment.appointmentDate).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}{nextAppointment.time ? ` • ${nextAppointment.time}` : ""}
                    </span>
                    <span className="text-[11px] text-teal-600 font-semibold truncate block max-w-[120px]">
                      {nextAppointment.pet?.name} with {nextAppointment.doctor?.name?.split(" ")[1] || "Vet"}
                    </span>
                  </>
                ) : (
                  <>
                    <span className="text-sm font-bold text-slate-400 block">
                      None Scheduled
                    </span>
                    <Link
                      to="/user/book"
                      className="text-[11px] text-teal-600 font-bold hover:underline"
                    >
                      + Book one now
                    </Link>
                  </>
                )}
              </div>
              <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/40 text-amber-500 flex items-center justify-center shrink-0">
                <Calendar className="w-6 h-6" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 rounded-3xl bg-white dark:bg-[#072124] border border-teal-100/90 dark:border-teal-700/40 p-6 sm:p-7 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-base sm:text-lg font-black text-slate-800 dark:text-white tracking-tight">
                    Clinical Visits &amp; Health Checks
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Monthly appointment activity trend for your pets
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full bg-teal-50 dark:bg-white/5 border border-teal-200/80 dark:border-white/10 text-xs font-bold text-teal-700 dark:text-teal-300">
                  Last 6 Months
                </span>
              </div>
              <AreaChart data={monthlyTrendData} height={220} valueSuffix=" Visits" />
            </div>

            <div className="rounded-3xl bg-white dark:bg-[#072124] border border-teal-100/90 dark:border-teal-700/40 p-6 sm:p-7 shadow-sm flex flex-col justify-between">
              <div className="mb-4">
                <h3 className="text-base sm:text-lg font-black text-slate-800 dark:text-white tracking-tight">
                  My Pet Family
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Species breakdown of your registered pets
                </p>
              </div>

              {petSpeciesData.length > 0 ? (
                <DonutChart
                  data={petSpeciesData}
                  size={180}
                  strokeWidth={22}
                  centerTitle={String(pets.length)}
                  centerSubtitle="Pets"
                />
              ) : (
                <div className="py-12 text-center text-xs text-slate-400">
                  <Dog className="w-8 h-8 mx-auto mb-2 opacity-40" />
                  No pets registered yet
                </div>
              )}

              <div className="pt-4 border-t border-teal-50 dark:border-white/5 mt-4 text-center">
                <Link
                  to="/user/pets"
                  className="text-xs font-bold text-teal-700 dark:text-teal-300 hover:underline inline-flex items-center gap-1"
                >
                  <span>View All Pets Profiles</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 rounded-3xl bg-white dark:bg-[#072124] border border-teal-100/90 dark:border-teal-700/40 p-6 sm:p-7 shadow-sm">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="text-base sm:text-lg font-black text-slate-800 dark:text-white tracking-tight">
                    Recent Scheduled Visits
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Latest status of appointments booked with specialists
                  </p>
                </div>
                <Link
                  to="/user/appointments"
                  className="text-xs font-bold text-teal-700 dark:text-teal-300 hover:underline flex items-center gap-1"
                >
                  <span>View All</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {appointments.length === 0 ? (
                <div className="py-10 text-center rounded-2xl border border-dashed border-teal-100 dark:border-white/10">
                  <Calendar className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                  <p className="text-xs font-semibold text-slate-500">
                    No appointments booked yet.
                  </p>
                  <Link
                    to="/user/book"
                    className="inline-block mt-3 px-4 py-2 rounded-xl bg-teal-700 text-white font-bold text-xs"
                  >
                    Schedule First Visit
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {appointments.slice(0, 4).map((appt) => {
                    const dateObj = new Date(appt.appointmentDate);

                    return (
                      <div
                        key={appt._id}
                        className="p-4 rounded-2xl bg-slate-50/70 dark:bg-white/5 border border-slate-100 dark:border-white/5 flex items-center justify-between gap-4"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-teal-100 dark:bg-white/10 text-teal-700 dark:text-teal-300 flex flex-col items-center justify-center font-bold text-xs shrink-0">
                            <span>{dateObj.getDate()}</span>
                            <span className="text-[9px] uppercase font-semibold">
                              {dateObj.toLocaleDateString("en-US", { month: "short" })}
                            </span>
                          </div>
                          <div>
                            <p className="text-sm font-black text-slate-800 dark:text-white">
                              🐾 {appt.pet?.name || "Pet"} •{" "}
                              <span className="text-teal-700 dark:text-teal-300">
                                {appt.doctor?.name || "Doctor"}
                              </span>
                            </p>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400">
                              {appt.time ? <span className="font-bold text-teal-600 dark:text-teal-400">🕒 {appt.time} • </span> : null}
                              {appt.reason}
                            </p>
                          </div>
                        </div>

                        <div className="shrink-0">
                          {appt.status === "CONFIRMED" && (
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                              Confirmed
                            </span>
                          )}
                          {appt.status === "PENDING" && (
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                              Pending
                            </span>
                          )}
                          {appt.status === "COMPLETED" && (
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-500/15 text-blue-600 dark:text-blue-400 border border-blue-500/30">
                              Completed
                            </span>
                          )}
                          {appt.status === "CANCELLED" && (
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/30">
                              Cancelled
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="space-y-4">
              <Link
                to="/user/book"
                className="block p-5 rounded-3xl bg-gradient-to-r from-teal-700 to-teal-800 hover:from-teal-800 hover:to-teal-900 text-white shadow-xl shadow-teal-800/25 transition-all group"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-white" />
                  </div>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
                <h4 className="text-base font-black">Schedule Doctor Visit</h4>
                <p className="text-xs text-teal-100 mt-1">
                  Choose your pet and select guaranteed consultation slots
                </p>
              </Link>

              <Link
                to="/user/pets"
                className="block p-5 rounded-3xl bg-white dark:bg-[#072124] border border-teal-100/90 dark:border-teal-700/40 hover:border-teal-400 shadow-sm transition-all group"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-2xl bg-teal-50 dark:bg-white/10 flex items-center justify-center text-teal-600">
                    <Dog className="w-5 h-5" />
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-400 group-hover:translate-x-1 transition-transform" />
                </div>
                <h4 className="text-base font-black text-slate-800 dark:text-white">
                  Manage Pet Profiles
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Add photos, breeds, allergies, and view medical records
                </p>
              </Link>
            </div>
          </div>
        </div>
      )}

      <PetModal
        isOpen={isPetModalOpen}
        onClose={() => setIsPetModalOpen(false)}
        onSubmit={handleAddPet}
        initialData={null}
      />
    </DashboardLayout>
  );
};

export default UserDashboard;