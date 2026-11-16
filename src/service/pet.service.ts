import api from "./api";
import type { IPet } from "../types/pet.types";

export const getMyPets = async (): Promise<IPet[]> => {
  const res = await api.get<{ message: string; data: IPet[] }>("/pets/my-pets");
  return res.data.data || [];
};

export const getAllPets = async (): Promise<IPet[]> => {
  const res = await api.get<{ message: string; data: IPet[] }>("/pets/all");
  return res.data.data || [];
};

export const createPet = async (formData: FormData): Promise<IPet> => {
  const res = await api.post<{ message: string; data: IPet }>("/pets", formData);
  return res.data.data;
};

export const updatePet = async (id: string, formData: FormData): Promise<IPet> => {
  const res = await api.put<{ message: string; data: IPet }>(`/pets/${id}`, formData);
  return res.data.data;
};

export const deletePet = async (id: string): Promise<void> => {
  await api.delete(`/pets/${id}`);
};