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

function formatDateToNZString(date: Date | null): string {
  if (!date) return "";
  const nzOffset = 13 * 60; // NZDT is UTC+13
  const localTime = new Date(date.getTime() + nzOffset * 60 * 1000);

  const year = localTime.getUTCFullYear();
  const month = String(localTime.getUTCMonth() + 1).padStart(2, "0");
  const day = String(localTime.getUTCDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function getDayDifference(date1: Date, date2: Date): number {
  const start = new Date(date1);
  const end = new Date(date2);

  // Clear time to make it a pure date comparison (ignores hours, minutes, etc.)
  start.setHours(0, 0, 0, 0);
  end.setHours(0, 0, 0, 0);

  const diffInMs = end.getTime() - start.getTime();
  const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

  return diffInDays + 1;
}

function calculateTotalPrice(
  date1: Date | null,
  date2: Date | null,
  price: number
): number {
  if (!date1 || !date2) {
    return 0;
  }

  const totalPrice = getDayDifference(date1, date2) * price;
  return Math.round(totalPrice * 100) / 100;
}

function GeneralBooking() {
  const setBookingDate = (value: Date) => {
    if (bookingDates[0] && bookingDates[1]) {
      // if both 'startDate' and 'endDate' values are set
      setBookingDates([value, null]);
    } else if (bookingDates[0] && !bookingDates[1]) {
      // if 'startDate' value is set but not 'endDate'
      setBookingDates([bookingDates[0], value]);
    } else {
      // if both 'startDate' and 'endDate' values are null
      setBookingDates([value, null]);
    }
  };

  const [bookingDates, setBookingDates] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);

  return (
    <div className="h-full bg-neutral-100 px-16 py-8 inter-font">
      <div className="h-[600px] relative my-6 mx-auto flex justify-center items-center gap-x-4">
        <div className="flex-[4] text-center flex flex-col justify-center bg-white rounded-3xl h-full">
          <Calendar
            onChange={(val) => {
              console.log(val);
              if (val instanceof Date) {
                // setValue(val);
                setBookingDate(val);
              }
            }}
            value={bookedDates[0]}
            tileDisabled={({ date }) =>
              bookedDates.some((d) => d.toDateString() === date.toDateString())
            }
            tileClassName={({ date, view }) => {
              const classes: string[] = [];

              if (
                bookedDates.some(
                  (d) => d.toDateString() === date.toDateString()
                )
              ) {
                classes.push("booked-date");
              }
              console.log(bookingDates[0] + " : " + bookingDates[1]);

              if (
                bookingDates[0] instanceof Date &&
                view === "month" &&
                date.toDateString() === bookingDates[0].toDateString()
              ) {
                classes.push("selected-date-start");
              }

              if (
                bookingDates[1] instanceof Date &&
                view === "month" &&
                date.toDateString() === bookingDates[1].toDateString()
              ) {
                classes.push("selected-date-end");
              }

              return classes.join(" ") || undefined;
            }}
            className="w-full p-12"
          />
        </div>
        <div className="flex-[2] flex flex-col gap-4 h-full">
          <div className="bg-white p-8 rounded-3xl h-1/5">
            <div className="flex gap-4 justify-center">
              <div>
                <label className="ml-2 text-lg text-neutral-600">
                  Pickup Date
                </label>
                <input
                  className="w-full px-4 py-2 bg-neutral-100 rounded-full"
                  type="date"
                  id="pickup-date"
                  value={formatDateToNZString(bookingDates[0])}
                  onChange={(e) => setBookingDate(new Date(e.target.value))}
                />
              </div>
              <div>
                <label className="ml-2 text-lg text-neutral-600">
                  Dropoff Date
                </label>
                <input
                  className="w-full px-4 py-2 bg-neutral-100 rounded-full"
                  type="date"
                  id="dropoff-date"
                  value={formatDateToNZString(bookingDates[1])}
                  onChange={(e) => setBookingDate(new Date(e.target.value))}
                />
              </div>
            </div>
          </div>
          <div className="bg-white p-8 rounded-3xl h-3/5">
            <h3 className="text-3xl font-semibold uppercase text-center py-4">
              {car.year} {car.model}
            </h3>
            <img
              className="w-[350px] mx-auto"
              src={car.img}
              alt={car.img.toString()}
            />
            <p>details of car here...</p>
          </div>
          <div className="bg-white p-8 rounded-3xl flex h-1/5 items-center">
            <label className="text-2xl font-semibold">Total Price:</label>
            <h2 className="text-3xl font-bold text-sky-400 ml-auto">
              $
              {calculateTotalPrice(bookingDates[0], bookingDates[1], car.price)}{" "}
              <span className="text-sm text-neutral-500">Incl GST</span>
            </h2>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-3xl px-16 py-8">
        <form>
          <div className="flex gap-8">
            <div className="flex flex-col flex-[1]">
              <label className="ml-2 text-lg text-neutral-600">First Name</label>
              <input className="bg-neutral-100 rounded-full px-4 py-2" />
            </div>
            <div className="flex flex-col flex-[1]">
              <label className="ml-2 text-lg text-neutral-600">First Name</label>
              <input className="bg-neutral-100 rounded-full px-4 py-2" />
            </div>
          </div>
          <div className="flex gap-8">
            <div className="flex flex-col flex-[1]">
              <label className="ml-2 text-lg text-neutral-600">Email</label>
              <input className="bg-neutral-100 rounded-full px-4 py-2" />
            </div>
            <div className="flex flex-col flex-[1]">
              <label className="ml-2 text-lg text-neutral-600">Mobile</label>
              <input className="bg-neutral-100 rounded-full px-4 py-2" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default GeneralBooking;
