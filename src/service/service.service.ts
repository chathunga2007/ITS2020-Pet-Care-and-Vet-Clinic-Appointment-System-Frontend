import api from "./api";
import type { IService, CreateServicePayload } from "../types/service.types";

export const getAllServices = async (): Promise<IService[]> => {
  const res = await api.get<{ success: boolean; data: IService[] }>("/services");
  return res.data.data || [];
};

export const createService = async (
  payload: CreateServicePayload
): Promise<IService> => {
  const res = await api.post<{ success: boolean; message: string; data: IService }>(
    "/services",
    payload
  );
  return res.data.data;
};

export const updateService = async (
  id: string,
  payload: Partial<CreateServicePayload>
): Promise<IService> => {
  const res = await api.put<{ success: boolean; message: string; data: IService }>(
    `/services/${id}`,
    payload
  );
  return res.data.data;
};

export const deleteService = async (id: string): Promise<void> => {
  await api.delete<{ success: boolean; message: string }>(`/services/${id}`);
};