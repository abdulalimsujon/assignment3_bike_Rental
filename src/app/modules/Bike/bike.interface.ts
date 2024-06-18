export type Bike = {
  name: string;
  description: string;
  pricePerHour: number;
  isAvailable?: boolean; // Optional with default true
  cc: number;
  year: number;
  model: string;
  brand: string;
};
