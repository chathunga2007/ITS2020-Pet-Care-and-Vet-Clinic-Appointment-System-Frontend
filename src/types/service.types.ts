export interface IService {
  _id: string;
  name: string;
  description?: string;
  price: number;
  durationMinutes?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateServicePayload {
  name: string;
  description?: string;
  price: number;
  durationMinutes?: number;
}