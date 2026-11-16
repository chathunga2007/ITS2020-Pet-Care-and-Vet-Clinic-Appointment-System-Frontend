export interface IDoctor {
  _id: string;
  name: string;
  specialization: string;
  phone: string;
  email: string;
  workingHours: string;
  imageURL?: string;
  status: "ACTIVE" | "INACTIVE";
  createdAt?: string;
  updatedAt?: string;
}

export interface DoctorFormData {
  name: string;
  specialization: string;
  phone: string;
  email: string;
  workingHours: string;
  status?: "ACTIVE" | "INACTIVE";
  image?: File | null;
}