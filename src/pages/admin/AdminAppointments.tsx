import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import {
  getAllAppointments,
  updateAppointmentStatus,
} from "../../service/appointment.service";
import type {
  IAppointment,
  AppointmentStatus,
} from "../../types/appointment.types";
import {
  Calendar,
  Search,
  Loader2,
  User,
  Phone,
  Mail,
} from "lucide-react";
import toast from "react-hot-toast";

export const AdminAppointments: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialStatus = (searchParams.get("status") as any) || "ALL";

  const [appointments, setAppointments] = useState<IAppointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"ALL" | AppointmentStatus>(initialStatus);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const data = await getAllAppointments();
      setAppointments(data);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to load clinic appointments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleStatusChange = async (
    apptId: string,
    newStatus: AppointmentStatus
  ) => {
    try {
      await updateAppointmentStatus(apptId, newStatus);
      toast.success(`Appointment status updated to ${newStatus}`);
      await fetchAppointments();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to update status");
    }
  };

  const handleFilterClick = (st: "ALL" | AppointmentStatus) => {
    setFilter(st);
    if (st === "ALL") {
      searchParams.delete("status");
      setSearchParams(searchParams);
    } else {
      setSearchParams({ status: st });
    }
  };

  const filteredAppointments = appointments.filter((appt) => {
    const matchesStatus = filter === "ALL" || appt.status === filter;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      appt.pet?.name?.toLowerCase().includes(q) ||
      appt.user?.name?.toLowerCase().includes(q) ||
      appt.user?.email?.toLowerCase().includes(q) ||
      appt.user?.phone?.toLowerCase().includes(q) ||
      appt.doctor?.name?.toLowerCase().includes(q) ||
      appt.reason?.toLowerCase().includes(q);

    return matchesStatus && matchesSearch;
  });

  return (
    <DashboardLayout
      pageTitle="Appointments Management"
      pageSubtitle="Oversee patient booking requests, approve visits, and manage schedules"
    >
      <div className="space-y-6">
        {/* Top Header Card */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/80 dark:bg-[#072124]/90 backdrop-blur-md p-4 sm:p-6 rounded-3xl border border-teal-100 dark:border-teal-700/40 shadow-sm w-full min-w-0">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 dark:bg-white/5 border border-teal-200/80 dark:border-white/10 text-teal-800 dark:text-teal-300 text-xs font-bold mb-2">
              <Calendar className="w-3.5 h-3.5" />
              <span>Hospital Schedule Ledger</span>
            </div>
            <h1 className="text-xl sm:text-3xl font-black text-slate-800 dark:text-white tracking-tight">
              All Clinic Appointments ({appointments.length})
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Review incoming patient bookings and coordinate veterinary coverage
            </p>
          </div>

          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by pet, owner, phone, vet..."
              className="w-full pl-9 pr-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs sm:text-sm focus:outline-none focus:border-teal-500 shadow-sm"
            />
          </div>
        </div>

        {/* Responsive Status Filter Bar */}
        <div className="p-1.5 rounded-2xl bg-white dark:bg-[#072124] border border-teal-100 dark:border-teal-700/40 w-full sm:w-fit shadow-sm">
          <div className="flex flex-wrap items-center gap-1.5">
            {(["ALL", "PENDING", "CONFIRMED", "COMPLETED", "CANCELLED"] as const).map(
              (st) => {
                const count =
                  st === "ALL"
                    ? appointments.length
                    : appointments.filter((a) => a.status === st).length;

                return (
                  <button
                    key={st}
                    onClick={() => handleFilterClick(st)}
                    className={`flex-1 sm:flex-initial min-w-[28%] sm:min-w-0 justify-center px-2.5 sm:px-3.5 py-2 rounded-xl text-[11px] sm:text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${filter === st
                        ? "bg-teal-700 text-white shadow-md shadow-teal-700/20"
                        : "text-slate-600 dark:text-slate-300 hover:text-teal-700 dark:hover:text-white hover:bg-teal-50/60 dark:hover:bg-white/5"
                      }`}
                  >
                    <span>{st.charAt(0) + st.slice(1).toLowerCase()}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full font-black ${filter === st
                          ? "bg-white/20 text-white"
                          : "bg-slate-100 dark:bg-white/10 text-slate-500"
                        }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              }
            )}
          </div>
        </div>

        {loading ? (
          <div className="py-24 text-center">
            <Loader2 className="w-10 h-10 text-teal-600 animate-spin mx-auto mb-4" />
            <p className="text-slate-500 dark:text-slate-400 text-sm font-semibold">
              Loading clinic appointments database...
            </p>
          </div>
        ) : filteredAppointments.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-teal-200 dark:border-teal-700/50 bg-white dark:bg-[#072124] p-12 text-center shadow-sm">
            <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-1">
              No Appointments Found
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              No appointments matching the current filter and search query.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredAppointments.map((appt) => {
              const dateObj = new Date(appt.appointmentDate);
              const formattedDate = dateObj.toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
                year: "numeric",
              });
              const formattedTime = dateObj.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
              });

              let statusPill = (
                <span className="px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-bold bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30 whitespace-nowrap">
                  Pending
                </span>
              );
              if (appt.status === "CONFIRMED") {
                statusPill = (
                  <span className="px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-bold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 whitespace-nowrap">
                    Confirmed
                  </span>
                );
              } else if (appt.status === "COMPLETED") {
                statusPill = (
                  <span className="px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-bold bg-blue-500/15 text-blue-600 dark:text-blue-400 border border-blue-500/30 whitespace-nowrap">
                    Completed
                  </span>
                );
              } else if (appt.status === "CANCELLED") {
                statusPill = (
                  <span className="px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-bold bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/30 whitespace-nowrap">
                    Cancelled
                  </span>
                );
              }

              return (
                <div
                  key={appt._id}
                  className="rounded-2xl sm:rounded-3xl bg-white dark:bg-[#072124] border border-teal-100/90 dark:border-teal-700/40 p-4 sm:p-6 shadow-sm hover:shadow-md transition-all flex flex-col gap-3.5 sm:gap-4 w-full min-w-0 overflow-hidden"
                >
                  {/* Card Header Row: Date badge + Pet/Doctor overview + Status pill */}
                  <div className="flex items-center justify-between gap-2.5 sm:gap-4 w-full min-w-0">
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      {/* Date Square */}
                      <div className="w-13 h-13 sm:w-16 sm:h-16 rounded-2xl bg-teal-50 dark:bg-white/5 border border-teal-200/80 dark:border-teal-700/60 flex flex-col items-center justify-center shrink-0 text-center shadow-xs">
                        <span className="text-[10px] font-black uppercase text-teal-700 dark:text-teal-300">
                          {dateObj.toLocaleDateString("en-US", { month: "short" })}
                        </span>
                        <span className="text-base sm:text-xl font-black text-slate-800 dark:text-white leading-none my-0.5">
                          {dateObj.getDate()}
                        </span>
                        <span className="text-[9px] font-bold text-teal-700 dark:text-teal-300">
                          {appt.time || formattedTime}
                        </span>
                      </div>

                      {/* Patient & Doctor Name */}
                      <div className="min-w-0 flex-1">
                        <h3 className="text-sm sm:text-base font-black text-slate-800 dark:text-white truncate flex items-center gap-1.5 flex-wrap">
                          <span>🐾 {appt.pet?.name || "Patient"}</span>
                          <span className="text-[11px] sm:text-xs font-semibold text-slate-500 dark:text-slate-400">
                            ({appt.pet?.type || "Pet"})
                          </span>
                        </h3>
                        <p className="text-xs sm:text-sm font-bold text-teal-700 dark:text-teal-300 truncate">
                          🩺 {appt.doctor?.name || "Doctor"}
                        </p>
                      </div>
                    </div>

                    {/* Status Pill (ALWAYS visible, right aligned, within screen bounds) */}
                    <div className="shrink-0">
                      {statusPill}
                    </div>
                  </div>

                  {/* Card Middle: Detailed Schedule, Owner Contact & Reason */}
                  <div className="space-y-2 pt-2 border-t border-slate-100/90 dark:border-white/5 text-xs">
                    {/* Date & Time info */}
                    <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 flex-wrap">
                      <span className="flex items-center gap-1 font-semibold text-slate-700 dark:text-slate-300">
                        📅 {formattedDate}
                      </span>
                      <span>•</span>
                      <span className="font-bold text-teal-700 dark:text-teal-300">
                        🕒 {appt.time || formattedTime}
                      </span>
                      {appt.doctor?.specialization && (
                        <>
                          <span>•</span>
                          <span className="text-slate-500 dark:text-slate-400">
                            🩺 {appt.doctor.specialization}
                          </span>
                        </>
                      )}
                    </div>

                    {/* Owner Contact */}
                    <div className="flex items-center gap-x-3 gap-y-1 text-xs text-slate-500 dark:text-slate-400 flex-wrap">
                      <span className="flex items-center gap-1 font-semibold text-slate-700 dark:text-slate-300 shrink-0">
                        <User className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                        <span>Owner: {appt.user?.name || "N/A"}</span>
                      </span>
                      {appt.user?.email && (
                        <span className="flex items-center gap-1 min-w-0 max-w-full">
                          <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span className="truncate max-w-[190px] sm:max-w-none">{appt.user.email}</span>
                        </span>
                      )}
                      {appt.user?.phone && (
                        <span className="flex items-center gap-1 shrink-0">
                          <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span>{appt.user.phone}</span>
                        </span>
                      )}
                    </div>

                    {/* Reason */}
                    {appt.reason && (
                      <p className="text-xs font-medium text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-white/5 px-3 py-2 rounded-xl border border-slate-100 dark:border-white/5 break-words leading-relaxed">
                        <span className="font-bold text-teal-700 dark:text-teal-400">
                          Reason:{" "}
                        </span>
                        {appt.reason}
                      </p>
                    )}
                  </div>

                  {/* Card Footer: Action Buttons (Only shown for PENDING or CONFIRMED) */}
                  {["PENDING", "CONFIRMED"].includes(appt.status) && (
                    <div className="pt-2.5 border-t border-slate-100 dark:border-white/5 flex items-center justify-end gap-2 w-full flex-wrap">
                      {appt.status === "PENDING" && (
                        <button
                          onClick={() => handleStatusChange(appt._id, "CONFIRMED")}
                          className="flex-1 sm:flex-initial px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-colors cursor-pointer text-center"
                        >
                          Confirm Appointment
                        </button>
                      )}

                      {appt.status === "CONFIRMED" && (
                        <button
                          onClick={() => handleStatusChange(appt._id, "COMPLETED")}
                          className="flex-1 sm:flex-initial px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition-colors cursor-pointer text-center"
                        >
                          Mark Completed
                        </button>
                      )}

                      <button
                        onClick={() => handleStatusChange(appt._id, "CANCELLED")}
                        className="flex-1 sm:flex-initial px-4 py-2 rounded-xl text-xs font-bold text-rose-600 bg-rose-50 dark:bg-rose-500/10 hover:bg-rose-100 border border-rose-200 dark:border-rose-500/20 transition-colors cursor-pointer text-center"
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default AdminAppointments;