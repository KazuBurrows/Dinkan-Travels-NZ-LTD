import React, { useState } from "react";
import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css"; // Default styles

import highlander from "../assets/images/22-Toyota-Highlander-White- side.PNG";

type Car = {
  id: string;
  brand: string;
  model: string;
  year: number;
  seats: number;
  price: number;
  img: string;
};

const car: Car = {
  id: "2022-toyota-highlander",
  brand: "Toyota",
  model: "Highlander",
  year: 2022,
  seats: 7,
  price: 120.95,
  img: highlander,
};

const bookedDates = [
  new Date(2025, 3, 19), // April is month 3 (0-indexed)
  new Date(2025, 3, 20),
  new Date(2025, 3, 21),
  new Date(2025, 3, 22),
  new Date(2025, 3, 23),
  new Date(2025, 3, 24),
];

function GeneralBooking() {
  const [value, setValue] = useState<Date | null>(new Date());

  return (
    <div className="h-full bg-neutral-100 px-16 py-8 inter-font">
      <div className="relative my-6 mx-auto flex justify-center items-center gap-x-4">
        <div className="calendar-container flex-[4] text-center flex flex-col justify-center">
          <Calendar
            onChange={(val) => {
              console.log(val)
              if (val instanceof Date) {
                setValue(val);
              }
            }}
            value={value}
            tileDisabled={({ date }) =>
              bookedDates.some((d) => d.toDateString() === date.toDateString())
            }
            tileClassName={({ date, view }) => {
              const classes: string[] = [];
            
              if (
                bookedDates.some((d) => d.toDateString() === date.toDateString())
              ) {
                classes.push('booked-date');
              }
            
              if (
                value instanceof Date &&
                view === 'month' &&
                date.toDateString() === value.toDateString()
              ) {
                classes.push('selected-date');
              }
            
              return classes.join(' ') || undefined;
            }}
            
            
            className="calendar w-full bg-white rounded-3xl p-16"
          />
        </div>
        <div className="flex-[2] text-center flex flex-col justify-center">
          <h1 className="text-5xl">{value ? value.toString() : ''}</h1>
        </div>
      </div>
      <div>{car.brand}</div>
    </div>
  );
}

export default GeneralBooking;
