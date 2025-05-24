import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css"; // Default styles

import PopupModal from "../Components/PopupModal";
import { Contact, Driver, Car, fleetImages } from "../types/models";
import PopupNewDriverModal from "../Components/PopupNewDriverModal";
import Navbar from "../Components/Navbar";

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

const toFormData = (bookingRequest: any): FormData => {
  const formData = new FormData();

  // Add simple fields
  formData.append("carId", bookingRequest.carId);
  formData.append("pickupDate", bookingRequest.pickupDate);
  formData.append("dropoffDate", bookingRequest.dropoffDate);
  formData.append("contact.firstName", bookingRequest.contact.firstName);
  formData.append("contact.lastName", bookingRequest.contact.lastName);
  formData.append("contact.mobile", bookingRequest.contact.mobile);
  formData.append("contact.email", bookingRequest.contact.email);
  // Add more contact fields if needed

  // Add drivers (array of objects)
  bookingRequest.drivers.forEach((driver: any, index: number) => {
    formData.append(`drivers[${index}].fullName`, driver.fullName);
    formData.append(`drivers[${index}].email`, driver.email);

    if (driver.licenceFront) {
      formData.append(`drivers[${index}].licenceFront`, driver.licenceFront);
    }

    if (driver.licenceBack) {
      formData.append(`drivers[${index}].licenceBack`, driver.licenceBack);
    }

    // Append other fields as needed
  });

  return formData;
};

function GeneralBooking() {
  const [fleet, setFleet] = useState<Car[]>([]);
  const [selectedCarId, setSelectedCarId] = useState<string>("");

  const [contactFirstName, setContactFirstName] = useState<string>("");
  const [contactLastName, setContactLastName] = useState<string>("");
  const [contactEmail, setContactEmail] = useState<string>("");
  const [contactMobile, setContactMobile] = useState<string>("");

  const [bookedDates] = useState<Date[]>([]);
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

  // function getDateRange(startDate: Date, endDate: Date) {
  //   const dates = [];
  //   const currentDate = new Date(startDate);

  //   while (currentDate <= endDate) {
  //     dates.push(new Date(currentDate)); // clone the date
  //     currentDate.setDate(currentDate.getDate() + 1); // go to next day
  //   }

  //   return dates;
  // }

  // START New driver modal
  const [isNewDriverModalOpen, setIsNewDriverModalOpen] = useState(false);
  const openNewDriverModal = () => setIsNewDriverModalOpen(true);
  const closeNewDriverModal = () => setIsNewDriverModalOpen(false);

  const [drivers, setDrivers] = useState<Driver[]>([]);

  const addDriver = (driver: Driver) => {
    closeNewDriverModal();

    const driversTable = document.getElementById(
      "drivers-table"
    ) as HTMLTableElement | null;

    if (driversTable) {
      // Create a new row
      const newRow = driversTable.insertRow();

      // Create Full Name cell
      const fullNameCell = newRow.insertCell();
      fullNameCell.textContent = driver?.fullName ?? "";

      // Create Email cell
      const emailCell = newRow.insertCell();
      emailCell.textContent = driver?.email ?? "";

      // Delete button cell
      const deleteCell = newRow.insertCell();
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.onclick = () => {
        newRow.remove();
      };
      deleteCell.appendChild(deleteButton);

      setDrivers([...drivers, driver]);
    }
  };
  // END Submission confirmation modal

  // START Submission confirmation modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleConfirm = async () => {
    let pickupDate = bookingDates[0];
    let dropoffDate = bookingDates[1];

    let contact: Contact = {
      email: contactEmail,
      firstName: contactFirstName,
      lastName: contactLastName,
      mobile: contactMobile,
    };

    const bookingRequest = {
      carId: selectedCarId,
      pickupDate: pickupDate,
      dropoffDate: dropoffDate,
      contact: contact,
      drivers: drivers,
    };
// console.log("carid", selectedCarId)
    const formData = toFormData(bookingRequest);

    const url = "https://kazukicomapi.azurewebsites.net/api/PostBooking?"; // Your Azure API endpoint
    // const url = "http://localhost:7071/api/PostBooking?"; // Your Azure API endpoint
    try {
      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // const result = await response.json(); // Parse the response as JSON
      // console.log(result); // Handle the result (e.g., display message, update state)
    } catch (error) {
      console.error("Error:", error);
    }

    setContactFirstName("");
    setContactLastName("");
    setContactEmail("");
    setContactMobile("");
    setBookingDates([null, null]);
    setDrivers([]);

    alert("Booking request submitted. We'll be in touch shortly!");

    closeModal();
    window.location.replace('/');
  };
  // END Submission confirmation modal

  useEffect(() => {
    // const fetchBookings = async () => {
    //   try {
    //     const response = await fetch(
    //       "https://kazukicomapi.azurewebsites.net/api/GetReservedBookings?"
    //     );
    //     if (!response.ok) {
    //       throw new Error("Failed to fetch bookings");
    //     }

    //     const data: Booking[] = await response.json();
    //     console.log(data);

    //     data.forEach((booking) => {
    //       const newDates = getDateRange(
    //         new Date(booking.pickup_date),
    //         new Date(booking.dropoff_date)
    //       );

    //       // use functional update to avoid stale bookedDates
    //       setBookedDates((prev) => [...prev, ...newDates]);
    //     });
    //   } catch (err: any) {
    //     // setError(err.message || "Unknown error");
    //   } finally {
    //     // setLoading(false);
    //   }
    // };

    const fetchFleet = async () => {
      try {
        const response = await fetch(
          "https://kazukicomapi.azurewebsites.net/api/GetFleet"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch bookings");
        }

        const rawData = await response.json();

        const cars: Car[] = rawData.map((item: any) => ({
          id: item.id, // if missing, assign default or generate
          carId: item.car_id,
          make: item.make,
          model: item.model,
          year: item.year,
          body: item.body || "",
          plate: item.plate || "",
          colour: item.colour || "",
          fuelType: item.fuel_type || "",
          ccRating: item.cc_rating || 0,
          fuelEconomy: item.fuel_economy || 0,
          seats: item.seats || 0,
          pricePerDay: item.price_per_day,
          drive: item.drive || "",
          transmission: item.transmission || "",
        }));

        setFleet(cars);
      } catch (err: any) {
        // setError(err.message || "Unknown error");
      } finally {
        // setLoading(false);
      }
    };

    // fetchBookings();
    fetchFleet();
  }, []);
  const selectedCar = fleet.find((car) => car.id === selectedCarId);

  return (
    <>
      <Navbar />
      {/* DESKTOP VIEW START */}
      <div className="h-full bg-neutral-100 px-16 py-8 inter-font lg:block hidden">
        <div className="h-[600px] relative my-6 mx-auto flex justify-center items-center gap-x-4">
          <div className="flex-[4] text-center flex flex-col justify-center bg-white rounded-3xl h-full">
            <Calendar
              onChange={(val) => {
                // console.log(val);
                if (val instanceof Date) {
                  // setValue(val);
                  setBookingDate(val);
                }
              }}
              value={bookingDates[0]}
              tileDisabled={({ date }) =>
                bookedDates.some(
                  (d) => d.toDateString() === date.toDateString()
                )
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
                // console.log(bookingDates[0] + " : " + bookingDates[1]);

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
            <div className="bg-white px-8 pt-4 rounded-3xl h-full">
              <div>
                <label htmlFor="car-select">Choose a vehicle:</label>
                <select
                  id="car-select"
                  value={selectedCarId}
                  onChange={(e) => setSelectedCarId(e.target.value)}
                >
                  <option value="">-- Select a vehicle --</option>
                  {fleet.map((car) => (
                    <option key={car.id} value={car.id}>
                      {car.year} {car.make} {car.model} - {car.colour}
                    </option>
                  ))}
                </select>
              </div>
              {selectedCar && (
                <>
                  <h3 className="text-3xl font-semibold uppercase text-center py-4">
                    {selectedCar.year} {selectedCar.model}
                  </h3>
                  <img
                    className="w-[350px] mx-auto"
                    src={
                      fleetImages[
                        `${selectedCar.model}-${selectedCar.make}-${selectedCar.year}-white`.toLowerCase()
                      ]
                    }
                    alt={selectedCar.model}
                  />
                  <p className="text-center">{selectedCar.pricePerDay}</p>
                  <div className="w-full py-8 rounded-3xl flex h-1/5 items-center mt-4">
                    <label className="text-2xl font-semibold">
                      Total Price:
                    </label>
                    <h2 className="text-3xl font-bold text-sky-400 ml-auto">
                      $
                      {calculateTotalPrice(
                        bookingDates[0],
                        bookingDates[1],
                        selectedCar.pricePerDay
                      )}{" "}
                      <span className="text-sm text-neutral-500">Incl GST</span>
                    </h2>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="flex gap-x-4 overflow-x-auto">
          <PopupNewDriverModal
            isOpen={isNewDriverModalOpen}
            onConfirm={addDriver}
            onCancel={closeNewDriverModal}
          ></PopupNewDriverModal>
          <div className="flex-[4] bg-white rounded-3xl px-16 py-8 min-w-0 overflow-hidden">
            <div className="gap-8">
              <h2 className="text-3xl font-semibold text-center my-4">
                Drivers
              </h2>
              <div id="drivers">
                <table
                  id="drivers-table"
                  className="bg-neutral-100 rounded-t-2xl justify-evenly w-full text-center"
                >
                  <tr className="text-lg">
                    <th className="py-2">Full Name</th>
                    <th>Email</th>
                    <th></th>
                  </tr>
                </table>
              </div>
              <div className="flex justify-center my-4">
                <button
                  className="bg-green-300 py-2 px-4 text-xl text-white font-bold rounded-full"
                  onClick={openNewDriverModal}
                >
                  +
                </button>
              </div>{" "}
            </div>
          </div>
          <form className="flex-[2] bg-white rounded-3xl px-16 py-8 min-w-0 overflow-hidden">
            <h2 className="text-3xl font-semibold text-center my-4">
              Contact Information
            </h2>
            <div className="gap-8">
              <div className="flex flex-col flex-[1] my-4">
                <label className="ml-2 text-lg text-neutral-600">
                  First Name
                </label>
                <input
                  className="bg-neutral-100 rounded-full px-4 py-2"
                  onChange={(e) => setContactFirstName(e.target.value)}
                />
              </div>
              <div className="flex flex-col flex-[1] my-4">
                <label className="ml-2 text-lg text-neutral-600">
                  Last Name
                </label>
                <input
                  className="bg-neutral-100 rounded-full px-4 py-2"
                  onChange={(e) => setContactLastName(e.target.value)}
                />
              </div>
              <div className="flex flex-col flex-[1] my-4">
                <label className="ml-2 text-lg text-neutral-600">Email</label>
                <input
                  className="bg-neutral-100 rounded-full px-4 py-2"
                  onChange={(e) => setContactEmail(e.target.value)}
                />
              </div>
              <div className="flex flex-col flex-[1] my-4">
                <label className="ml-2 text-lg text-neutral-600">Mobile</label>
                <input
                  className="bg-neutral-100 rounded-full px-4 py-2"
                  onChange={(e) => setContactMobile(e.target.value)}
                />
              </div>
            </div>
          </form>
        </div>
        <div className="flex justify-center my-4">
          <button
            className="bg-green-300 py-2 px-4 text-xl text-white font-bold rounded-full"
            onClick={openModal}
          >
            Submit
          </button>
        </div>
        <PopupModal
          isOpen={isModalOpen}
          onConfirm={handleConfirm}
          onCancel={closeModal}
        />
      </div>
      {/* DESKTOP VIEW END */}

      {/* MOBILE VIEW START */}
      <div className="h-full bg-neutral-100 px-2 py-8 inter-font lg:hidden block">
        <div className="h-full relative my-6 mx-auto justify-center items-center gap-x-4">
          <div className="bg-white p-8 rounded-3xl h-3/5 my-4">
            <h3 className="text-3xl font-semibold uppercase text-center py-4">
              {/* {car.year} {car.model} */}
            </h3>
            <img
              className="w-[350px] mx-auto"
              src={fleetImages[0]}
              alt={fleetImages[0]}
            />
            <p>details of car here...</p>
          </div>
          <div className="text-center justify-center bg-white rounded-3xl h-full py-8">
            <Calendar
              onChange={(val) => {
                // console.log(val);
                if (val instanceof Date) {
                  // setValue(val);
                  setBookingDate(val);
                }
              }}
              value={bookingDates[0]}
              tileDisabled={({ date }) =>
                bookedDates.some(
                  (d) => d.toDateString() === date.toDateString()
                )
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
                // console.log(bookingDates[0] + " : " + bookingDates[1]);

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
              className="w-full p-2"
            />
          </div>
          <div className="gap-4 h-full my-4">
            <div className="bg-white p-8 rounded-3xl h-1/5">
              <div className="gap-4 justify-center">
                <div className="my-4">
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

            <div className="bg-white p-8 rounded-3xl flex h-1/5 items-center my-4">
              <label className="text-2xl font-semibold">Total Price:</label>
              <h2 className="text-3xl font-bold text-sky-400 ml-auto">
                $
                {calculateTotalPrice(
                  bookingDates[0],
                  bookingDates[1],
                  // car.pricePerDay
                  1
                )}{" "}
                <span className="text-sm text-neutral-500">Incl GST</span>
              </h2>
            </div>
          </div>
        </div>

        <div className="gap-x-4 overflow-x-auto">
          <PopupNewDriverModal
            isOpen={isNewDriverModalOpen}
            onConfirm={addDriver}
            onCancel={closeNewDriverModal}
          ></PopupNewDriverModal>
          <div className="bg-white rounded-3xl px-2 py-8 min-w-0 overflow-hidden">
            <div className="gap-8">
              <h2 className="text-3xl font-semibold text-center my-4">
                Drivers
              </h2>
              <div id="drivers">
                <table
                  id="drivers-table"
                  className="bg-neutral-100 rounded-t-2xl justify-evenly w-full text-center"
                >
                  <tr className="text-lg">
                    <th className="py-2">Full Name</th>
                    <th>Email</th>
                    <th></th>
                  </tr>
                </table>
              </div>
              <div className="flex justify-center my-4">
                <button
                  className="bg-green-300 py-2 px-4 text-xl text-white font-bold rounded-full"
                  onClick={openNewDriverModal}
                >
                  +
                </button>
              </div>{" "}
            </div>
          </div>
          <form className="bg-white rounded-3xl px-4 py-8 min-w-0 overflow-hidden my-4">
            <h2 className="text-3xl font-semibold text-center my-4">
              Contact Information
            </h2>
            <div className="gap-8">
              <div className="flex flex-col flex-[1] my-4">
                <label className="ml-2 text-lg text-neutral-600">
                  First Name
                </label>
                <input
                  className="bg-neutral-100 rounded-full px-4 py-2"
                  onChange={(e) => setContactFirstName(e.target.value)}
                />
              </div>
              <div className="flex flex-col flex-[1] my-4">
                <label className="ml-2 text-lg text-neutral-600">
                  Last Name
                </label>
                <input
                  className="bg-neutral-100 rounded-full px-4 py-2"
                  onChange={(e) => setContactLastName(e.target.value)}
                />
              </div>
              <div className="flex flex-col flex-[1] my-4">
                <label className="ml-2 text-lg text-neutral-600">Email</label>
                <input
                  className="bg-neutral-100 rounded-full px-4 py-2"
                  onChange={(e) => setContactEmail(e.target.value)}
                />
              </div>
              <div className="flex flex-col flex-[1] my-4">
                <label className="ml-2 text-lg text-neutral-600">Mobile</label>
                <input
                  className="bg-neutral-100 rounded-full px-4 py-2"
                  onChange={(e) => setContactMobile(e.target.value)}
                />
              </div>
            </div>
          </form>
        </div>
        <div className="flex justify-center my-4">
          <button
            className="bg-green-300 py-2 px-4 text-xl text-white font-bold rounded-full"
            onClick={openModal}
          >
            Submit
          </button>
        </div>
        <PopupModal
          isOpen={isModalOpen}
          onConfirm={handleConfirm}
          onCancel={closeModal}
        />
      </div>
      {/* MOBILE VIEW END */}
    </>
  );
}

export default GeneralBooking;
