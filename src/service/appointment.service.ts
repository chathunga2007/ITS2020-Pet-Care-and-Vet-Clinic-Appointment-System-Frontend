import api from "./api";
import type {
  IAppointment,
  CreateAppointmentPayload,
  AppointmentStatus,
} from "../types/appointment.types";

export const createAppointment = async (
  payload: CreateAppointmentPayload
): Promise<IAppointment> => {
  const res = await api.post<{ message: string; data: IAppointment }>(
    "/appointments",
    payload
  );
  return res.data.data;
};

export const getMyAppointments = async (): Promise<IAppointment[]> => {
  const res = await api.get<{ message: string; data: IAppointment[] }>(
    "/appointments/my-appointments"
  );
  return res.data.data || [];
};

export const getAllAppointments = async (): Promise<IAppointment[]> => {
  const res = await api.get<{ message: string; data: IAppointment[] }>(
    "/appointments/all"
  );
  return res.data.data || [];
};

export const updateAppointmentStatus = async (
  id: string,
  status: AppointmentStatus
): Promise<IAppointment> => {
  const res = await api.put<{ message: string; data: IAppointment }>(
    `/appointments/${id}/status`,
    { status }
  );
  return res.data.data;
};

export const getBookedSlots = async (
  doctorId: string,
  date: string
): Promise<string[]> => {
  const res = await api.get<{ data: string[] }>("/appointments/booked-slots", {
    params: { doctorId, date },
  });
  return res.data.data || [];
};

export const cancelAppointment = async (id: string): Promise<IAppointment> => {
  const res = await api.put<{ message: string; data: IAppointment }>(
    `/appointments/${id}/cancel`
  );
  return res.data.data;
};