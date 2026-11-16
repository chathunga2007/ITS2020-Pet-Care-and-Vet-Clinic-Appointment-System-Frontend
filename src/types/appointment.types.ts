export type AppointmentStatus = "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED";

export interface IAppointmentUser {
  _id: string;
  name: string;
  email: string;
  phone?: string;
}

export interface IAppointmentPet {
  _id: string;
  name: string;
  type: string;
  breed: string;
  gender?: string;
  imageURL?: string;
}

export interface IAppointmentDoctor {
  _id: string;
  name: string;
  specialization: string;
  workingHours?: string;
  imageURL?: string;
}

export interface IAppointment {
  _id: string;
  user: IAppointmentUser;
  pet: IAppointmentPet;
  doctor: IAppointmentDoctor;
  appointmentDate: string;
  time?: string;
  reason: string;
  status: AppointmentStatus;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateAppointmentPayload {
  petId: string;
  doctorId: string;
  appointmentDate: string;
  time: string;
  reason: string;
}