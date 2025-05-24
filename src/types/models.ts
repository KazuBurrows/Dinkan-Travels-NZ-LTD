import highlandertoyota2022white from "../assets/images/highlander-toyota-2022-white.PNG";
import carnivalkia2022white from "../assets/images/carnival-kia-2022-white.png";
import carnivalkia2023green from "../assets/images/carnival-kia-2023-green.png";
import carnivalkia2023grey from "../assets/images/carnival-kia-2023-grey.png";
import hiacetoyota2022white from "../assets/images/hiace-toyota-2022-white.png";
export const fleetImages: Record<string, string> = {
  "highlander-toyota-2022-white": highlandertoyota2022white,
  "carnival-kia-2022-white": carnivalkia2022white,
  "carnival-kia-2023-green": carnivalkia2023green,
  "carnival-kia-2023-grey": carnivalkia2023grey,
  "hiace-toyota-2022-white": hiacetoyota2022white,
};


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
  licenceFrontUrl: string | null;
  licenceBackUrl: string | null;
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
  drivers: Driver[];
}


export interface Car {
  id: string;
  carId: string;
  make: string;
  model: string;
  year: number;
  body: string;
  plate: string;
  colour: string;
  fuelType: string;
  ccRating: number;
  fuelEconomy: number;
  seats: number;
  pricePerDay: number;
  drive: string;
  transmission: string;
}

