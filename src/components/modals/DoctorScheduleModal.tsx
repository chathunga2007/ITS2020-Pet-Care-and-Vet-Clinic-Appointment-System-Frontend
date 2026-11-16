import React, { useState, useEffect } from "react";
import type { IDoctor } from "../../types/doctor.types";
import {
  getDoctorSchedules,
  setDoctorSchedule,
} from "../../service/doctor.service";
import {
  X,
  Calendar,
  Clock,
  CheckCircle2,
  Loader2,
  Save,
  RotateCcw,
} from "lucide-react";
import toast from "react-hot-toast";

interface DoctorScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  doctor: IDoctor | null;
}

const DAYS_OF_WEEK = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const TIME_OPTIONS = [
  "07:00 AM",
  "07:30 AM",
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
  "05:30 PM",
  "06:00 PM",
  "06:30 PM",
  "07:00 PM",
  "08:00 PM",
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

export const DoctorScheduleModal: React.FC<DoctorScheduleModalProps> = ({
  isOpen,
  onClose,
  doctor,
}) => {
  const [schedules, setSchedules] = useState<{
    [day: string]: {
      startTime: string;
      endTime: string;
      slotDurationMinutes: number;
      isAvailable: boolean;
    };
  }>({});
  const [loading, setLoading] = useState(false);
  const [savingDay, setSavingDay] = useState<string | null>(null);
  const [savingAll, setSavingAll] = useState(false);

  useEffect(() => {
    if (!isOpen || !doctor) return;

    const fetchSchedule = async () => {
      try {
        setLoading(true);
        const data = await getDoctorSchedules(doctor._id);

        const initialMap: {
          [day: string]: {
            startTime: string;
            endTime: string;
            slotDurationMinutes: number;
            isAvailable: boolean;
          };
        } = {};

        DAYS_OF_WEEK.forEach((day) => {
          const isWeekend = day === "Saturday" || day === "Sunday";
          initialMap[day] = {
            startTime: "08:00 AM",
            endTime: isWeekend ? "01:00 PM" : "05:00 PM",
            slotDurationMinutes: 30,
            isAvailable: !isWeekend,
          };
        });

        data.forEach((sch) => {
          if (sch.dayOfWeek && initialMap[sch.dayOfWeek]) {
            initialMap[sch.dayOfWeek] = {
              startTime: sch.startTime || "08:00 AM",
              endTime: sch.endTime || "05:00 PM",
              slotDurationMinutes: sch.slotDurationMinutes || 30,
              isAvailable: sch.isAvailable !== undefined ? sch.isAvailable : true,
            };
          }
        });

        setSchedules(initialMap);
      } catch (err: any) {
        console.error("Failed to load doctor schedule:", err);
        toast.error("Failed to fetch doctor schedule records");
      } finally {
        setLoading(false);
      }
    };

    fetchSchedule();
  }, [isOpen, doctor]);

  if (!isOpen || !doctor) return null;

  const handleDayChange = (
    day: string,
    field: "startTime" | "endTime" | "slotDurationMinutes" | "isAvailable",
    value: any
  ) => {
    setSchedules((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [field]: value,
      },
    }));
  };

  const handleSaveSingleDay = async (day: string) => {
    const dayConfig = schedules[day];
    if (!dayConfig) return;

    if (dayConfig.isAvailable && timeToMinutes(dayConfig.startTime) >= timeToMinutes(dayConfig.endTime)) {
      toast.error(`For ${day}, End Time must be later than Start Time!`);
      return;
    }

    try {
      setSavingDay(day);
      await setDoctorSchedule({
        doctorId: doctor._id,
        dayOfWeek: day,
        startTime: dayConfig.startTime,
        endTime: dayConfig.endTime,
        slotDurationMinutes: dayConfig.slotDurationMinutes,
        isAvailable: dayConfig.isAvailable,
      });
      toast.success(`${day} schedule saved! 🗓️`);
    } catch (err: any) {
      console.error(err);
      toast.error(err.response?.data?.message || `Failed to update ${day} schedule`);
    } finally {
      setSavingDay(null);
    }
  };

  const handleSaveAllDays = async () => {
    for (const day of DAYS_OF_WEEK) {
      const cfg = schedules[day];
      if (cfg?.isAvailable && timeToMinutes(cfg.startTime) >= timeToMinutes(cfg.endTime)) {
        toast.error(`For ${day}, End Time must be later than Start Time!`);
        return;
      }
    }

    try {
      setSavingAll(true);
      const promises = DAYS_OF_WEEK.map((day) => {
        const dayConfig = schedules[day];
        return setDoctorSchedule({
          doctorId: doctor._id,
          dayOfWeek: day,
          startTime: dayConfig.startTime,
          endTime: dayConfig.endTime,
          slotDurationMinutes: dayConfig.slotDurationMinutes,
          isAvailable: dayConfig.isAvailable,
        });
      });

      await Promise.all(promises);
      toast.success(`Weekly timetable updated for ${doctor.name}! 🩺`);
      onClose();
    } catch (err: any) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to update full weekly timetable");
    } finally {
      setSavingAll(false);
    }
  };

  const applyDefaultClinicPreset = () => {
    const updated: typeof schedules = {};
    DAYS_OF_WEEK.forEach((day) => {
      const isWeekend = day === "Saturday" || day === "Sunday";
      updated[day] = {
        startTime: "08:00 AM",
        endTime: isWeekend ? "01:00 PM" : "05:00 PM",
        slotDurationMinutes: 30,
        isAvailable: !isWeekend,
      };
    });
    setSchedules(updated);
    toast("Default Mon-Fri clinic hours applied. Click 'Save All' to commit.", {
      icon: "ℹ️",
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="w-full max-w-3xl my-6 rounded-3xl bg-white dark:bg-[#072124] border border-teal-100 dark:border-teal-700/60 shadow-2xl overflow-hidden flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="px-5 sm:px-6 py-4 border-b border-teal-100 dark:border-white/10 flex items-center justify-between bg-teal-50/50 dark:bg-white/5 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-teal-600 text-white flex items-center justify-center shadow-md shadow-teal-600/20">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-slate-800 dark:text-white">
                Working Schedule Roster
              </h2>
              <p className="text-xs text-teal-700 dark:text-teal-300 font-semibold truncate max-w-xs sm:max-w-md">
                {doctor.name} • {doctor.specialization}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 p-3.5 rounded-2xl bg-teal-50/60 dark:bg-white/5 border border-teal-100 dark:border-white/10 text-xs">
            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
              <Clock className="w-4 h-4 text-teal-600 shrink-0" />
              <span>
                Set daily consulting hours &amp; duty availability. Patients can only book slots within active hours.
              </span>
            </div>
            <button
              type="button"
              onClick={applyDefaultClinicPreset}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-teal-900/40 border border-teal-200 dark:border-teal-700 text-teal-700 dark:text-teal-300 font-bold hover:bg-teal-50 transition-colors shrink-0 cursor-pointer self-start sm:self-auto"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Standard Weekday Preset</span>
            </button>
          </div>

          {loading ? (
            <div className="py-20 text-center">
              <Loader2 className="w-8 h-8 text-teal-600 animate-spin mx-auto mb-3" />
              <p className="text-xs font-semibold text-slate-500">
                Fetching specialist timetable...
              </p>
            </div>
          ) : (
            <div className="space-y-2.5">
              {DAYS_OF_WEEK.map((day) => {
                const dayConfig = schedules[day] || {
                  startTime: "08:00 AM",
                  endTime: "05:00 PM",
                  slotDurationMinutes: 30,
                  isAvailable: true,
                };

                const isSavingThisDay = savingDay === day;

                return (
                  <div
                    key={day}
                    className={`p-3 sm:p-4 rounded-2xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-3 ${dayConfig.isAvailable
                        ? "bg-white dark:bg-white/5 border-teal-100 dark:border-teal-700/40"
                        : "bg-slate-50/70 dark:bg-black/20 border-slate-200/60 dark:border-white/5 opacity-80"
                      }`}
                  >
                    {/* Day & Available Toggle */}
                    <div className="flex items-center justify-between md:justify-start gap-3 w-full md:w-44 shrink-0">
                      <div className="flex items-center gap-2.5">
                        <input
                          type="checkbox"
                          id={`avail-${day}`}
                          checked={dayConfig.isAvailable}
                          onChange={(e) =>
                            handleDayChange(day, "isAvailable", e.target.checked)
                          }
                          className="w-4 h-4 rounded text-teal-600 focus:ring-teal-500 cursor-pointer accent-teal-600"
                        />
                        <label
                          htmlFor={`avail-${day}`}
                          className="text-xs sm:text-sm font-black text-slate-800 dark:text-white cursor-pointer select-none"
                        >
                          {day}
                        </label>
                      </div>

                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${dayConfig.isAvailable
                            ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30"
                            : "bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/30"
                          }`}
                      >
                        {dayConfig.isAvailable ? "On Duty" : "Off Duty"}
                      </span>
                    </div>

                    {/* Time Selectors */}
                    {dayConfig.isAvailable ? (
                      <div className="flex flex-wrap items-center gap-2 text-xs flex-1">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[11px] text-slate-400 font-semibold">From:</span>
                          <select
                            value={dayConfig.startTime}
                            onChange={(e) =>
                              handleDayChange(day, "startTime", e.target.value)
                            }
                            className="px-2.5 py-1.5 rounded-xl bg-slate-50 dark:bg-white/10 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white text-xs font-semibold focus:outline-none focus:border-teal-500 cursor-pointer"
                          >
                            {TIME_OPTIONS.map((t) => (
                              <option key={t} value={t} className="text-slate-800">
                                {t}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <span className="text-[11px] text-slate-400 font-semibold">To:</span>
                          <select
                            value={dayConfig.endTime}
                            onChange={(e) =>
                              handleDayChange(day, "endTime", e.target.value)
                            }
                            className="px-2.5 py-1.5 rounded-xl bg-slate-50 dark:bg-white/10 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white text-xs font-semibold focus:outline-none focus:border-teal-500 cursor-pointer"
                          >
                            {TIME_OPTIONS.map((t) => (
                              <option key={t} value={t} className="text-slate-800">
                                {t}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <span className="text-[11px] text-slate-400 font-semibold">Slot:</span>
                          <select
                            value={dayConfig.slotDurationMinutes}
                            onChange={(e) =>
                              handleDayChange(
                                day,
                                "slotDurationMinutes",
                                Number(e.target.value)
                              )
                            }
                            className="px-2 py-1.5 rounded-xl bg-slate-50 dark:bg-white/10 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white text-xs font-semibold focus:outline-none focus:border-teal-500 cursor-pointer"
                          >
                            <option value={15}>15 Min</option>
                            <option value={30}>30 Min</option>
                            <option value={45}>45 Min</option>
                            <option value={60}>60 Min</option>
                          </select>
                        </div>
                      </div>
                    ) : (
                      <div className="text-xs text-slate-400 italic flex-1 py-1">
                        Doctor is unavailable on this day.
                      </div>
                    )}

                    {/* Single Day Save Button */}
                    <div className="shrink-0 self-end md:self-auto">
                      <button
                        type="button"
                        disabled={isSavingThisDay}
                        onClick={() => handleSaveSingleDay(day)}
                        className="px-3 py-1.5 rounded-xl text-xs font-bold bg-teal-50 dark:bg-white/10 hover:bg-teal-100 dark:hover:bg-white/15 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-white/10 transition-colors flex items-center gap-1 cursor-pointer disabled:opacity-50"
                      >
                        {isSavingThisDay ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <Save className="w-3.5 h-3.5" />
                        )}
                        <span>Save Day</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-5 sm:px-6 py-4 border-t border-teal-100 dark:border-white/10 flex items-center justify-between bg-slate-50/70 dark:bg-white/5 shrink-0 gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10 transition-colors cursor-pointer"
          >
            Close
          </button>

          <button
            type="button"
            disabled={savingAll || loading}
            onClick={handleSaveAllDays}
            className="px-5 py-2.5 rounded-xl text-xs font-bold bg-teal-700 hover:bg-teal-800 text-white shadow-lg shadow-teal-700/25 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {savingAll ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <CheckCircle2 className="w-4 h-4" />
            )}
            <span>Save Entire Weekly Schedule</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorScheduleModal;