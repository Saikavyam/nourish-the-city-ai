
export type UserRole = "donor" | "recipient" | "admin" | "volunteer" | null;

export type FoodType = "veg" | "non-veg" | "mixed";
export type PerishableType = "perishable" | "non-perishable";
export type DonationStatus = "pending" | "accepted" | "picked" | "delivered" | "expired" | "cancelled";

export interface Location {
  lat: number;
  lng: number;
  address: string;
}

export interface Donation {
  id: string;
  title: string;
  description: string;
  quantity: string;
  foodType: FoodType;
  perishableType: PerishableType;
  expiry: string;
  image?: string;
  status: DonationStatus;
  donorId: string;
  donorName: string;
  recipientId?: string;
  recipientName?: string;
  location: Location;
  createdAt: string;
  pickupDeadline: string;
  feedback?: string;
  rating?: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  verified: boolean;
  avatar?: string;
  organization?: string;
  location?: Location;
}

export interface DonationFormData {
  title: string;
  description: string;
  quantity: string;
  foodType: FoodType;
  perishableType: PerishableType;
  expiry: Date;
  image?: File;
  pickupDeadline: Date;
  location: Location;
}
