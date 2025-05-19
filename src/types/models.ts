export interface Contact {
  email: string;
  firstName: string;
  lastName: string;
  mobile: string;
}

// models/Driver.ts
export interface Driver {
  id: string;
  email: string | null;
  fullName: string | null;
  licenceFront: File | null;
  licenceBack: File | null;
}


export interface Booking {
  id: string;
  customer_id: string;
  car_id: string;
  pickup_date: string;
  dropoff_date: string;
  total_price: number;
  paid_total: number;
  status: string;
}


export type Car = {
  id: string;
  brand: string;
  model: string;
  year: number;
  seats: number;
  price: number;
  img: string;
};