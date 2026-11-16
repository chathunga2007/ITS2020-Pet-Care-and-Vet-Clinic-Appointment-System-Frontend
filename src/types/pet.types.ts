export interface IPetOwner {
  _id: string;
  name: string;
  email: string;
  phone?: string;
}

export interface IPet {
  _id: string;
  name: string;
  type: string;
  breed: string;
  age: number;
  gender: "MALE" | "FEMALE";
  owner?: IPetOwner | string;
  medicalHistory?: string;
  imageURL?: string;
  status: "ACTIVE" | "DELETED";
  createdAt?: string;
  updatedAt?: string;
}

export interface PetFormData {
  name: string;
  type: string;
  breed: string;
  age: number | string;
  gender: "MALE" | "FEMALE";
  medicalHistory?: string;
  image?: File | null;
}