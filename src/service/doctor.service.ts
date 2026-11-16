import api from "./api";
import type { IDoctor } from "../types/doctor.types";

export const getAllDoctors = async (): Promise<IDoctor[]> => {
  const res = await api.get<{ message: string; data: IDoctor[] }>("/doctors");
  return res.data.data || [];
};

export const createDoctor = async (formData: FormData): Promise<IDoctor> => {
  const res = await api.post<{ message: string; data: IDoctor }>("/doctors", formData);
  return res.data.data;
};

export const updateDoctor = async (id: string, formData: FormData): Promise<IDoctor> => {
  const res = await api.put<{ message: string; data: IDoctor }>(`/doctors/${id}`, formData);
  return res.data.data;
};

export const deleteDoctor = async (id: string): Promise<void> => {
  await api.delete(`/doctors/${id}`);
};

export interface IDoctorScheduleItem {
  _id?: string;
  doctorId: string;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
  slotDurationMinutes?: number;
  isAvailable?: boolean;
}

export const getDoctorSchedules = async (doctorId: string): Promise<IDoctorScheduleItem[]> => {
  const res = await api.get<{ data: IDoctorScheduleItem[] }>(`/doctor-schedules/${doctorId}`);
  return res.data.data || [];
};

export const setDoctorSchedule = async (schedule: IDoctorScheduleItem): Promise<IDoctorScheduleItem> => {
  const res = await api.post<{ message: string; data: IDoctorScheduleItem }>("/doctor-schedules", schedule);
  return res.data.data;
};