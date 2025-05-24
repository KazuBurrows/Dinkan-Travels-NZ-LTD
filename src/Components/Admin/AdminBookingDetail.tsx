import React, {useState} from "react";

import { Booking, Car, fleetImages } from "../../types/models";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-solid-svg-icons";

const car: Car = {
  id: "2022-toyota-highlander",
  make: "Toyota",
  model: "Highlander",
  year: 2022,
  seats: 7,
  pricePerDay: 120.95,
  carId: "",
  body: "",
  plate: "",
  colour: "",
  fuelType: "",
  ccRating: 0,
  fuelEconomy: 0,
  drive: "",
  transmission: "",
};

interface AdminBookingDetailProps {
  booking: Booking | null;
  isOpen: boolean;
  onClose: () => void;
}

const AdminBookingDetail = ({
  booking,
  isOpen,
  onClose,
}: AdminBookingDetailProps) => {
  const [comments, setComments] = useState<string>("");
  
  // START Submission confirmation modal
  const handleConfirm = async (status: string) => {

    var formData = new FormData();
    formData.append("id", String(booking?.id));
    formData.append("customer_id", String(booking?.customer_id));
    formData.append("status", status);
    formData.append("comments", comments);

    const url = "https://kazukicomapi.azurewebsites.net/api/UpdateStatusBooking?"; // Your Azure API endpoint
    // const url = "http://localhost:7071/api/UpdateStatusBooking"; // Your Azure API endpoint
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

    onClose();
  };
  // END Submission confirmation modal

  return isOpen ? (
    <div className="absolute inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50 z-50">
      <div className="relative bg-white p-8 rounded-3xl max-h-[80vh] overflow-y-auto w-full max-w-xl">
        {booking && (
          <>
            <button
              className="absolute right-8 font-bold text-3xl text-neutral-400"
              onClick={onClose}
            >
              X
            </button>
            <h2>Booking Id: {booking.id}</h2>
            <div className="bg-white p-8 rounded-3xl h-3/5">
              <h3 className="text-3xl font-semibold uppercase text-center py-4">
                {car.year} {car.model}
              </h3>
              <img
                className="w-[350px] mx-auto"
                src={fleetImages[0]}
                alt={fleetImages[0]}
              />
              {/* <p>details of car here...</p> */}
            </div>
            <div className="flex gap-2 w-full justify-around py-2 text-center">
              <p className="bg-neutral-100 p-2 w-full rounded-3xl">
                {new Date(booking.pickup_date).toLocaleString("en-NZ", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour12: false, // Ensures 24-hour format
                })}
              </p>
              <p className="bg-neutral-100 p-2 w-full rounded-3xl">
                {new Date(booking.dropoff_date).toLocaleString("en-NZ", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour12: false, // Ensures 24-hour format
                })}
              </p>
            </div>
            <div className="flex py-2 gap-2">
              <div className="flex-[1] flex flex-col justify-center bg-neutral-100 rounded-3xl h-full p-6">
                <h2>Kazuki Burrows</h2>
                <p>{booking.customer_id}</p>
                <p>0273442257</p>
              </div>
              <div className="flex-[1] flex flex-col justify-center bg-neutral-100 rounded-3xl h-full p-6">
                <h2 className="capitalize">Status: {booking.status}</h2>
                {/* <p>Paid: {booking.paid_total}%</p> */}
                <p>Total: ${booking.total_price}</p>
              </div>
            </div>
            <div>
              <h2 className="text-center">Drivers</h2>
              <table
                id="drivers-table"
                className="bg-neutral-100 rounded-2xl justify-evenly w-full text-left"
              >
                <thead>
                  <tr>
                    <th className="py-2 pl-2">Full Name</th>
                    <th>Email</th>
                    <th>Licences</th>
                  </tr>
                </thead>
                <tbody>
                  {booking.drivers.map((driver, idx) => (
                    <tr key={driver.id}>
                      <th className="font-normal pl-2">{driver.fullName}</th>
                      <th className="font-normal">{driver.email}</th>
                      <th>
                        <a href={driver.licenceFrontUrl ?? ""} target="_blank" rel="noreferrer">
                          <FontAwesomeIcon
                            icon={faFile}
                            className="text-2xl text-rose-300 hover:drop-shadow-2xl hover:scale-125 duration-300 ease-in-out"
                          />
                        </a>
                        <a href={driver.licenceBackUrl ?? ""} target="_blank" rel="noreferrer">
                          <FontAwesomeIcon
                            icon={faFile}
                            className="text-2xl text-blue-300 hover:drop-shadow-2xl hover:scale-125 duration-300 ease-in-out ml-2"
                          />
                        </a>
                      </th>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="py-8 flex flex-col gap-4">
  

                <textarea
                  className="w-full min-h-[100px] p-3 border border-gray-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Add a comment..."
                  onChange={(e) => setComments(e.target.value)}
                />
                <div className="flex gap-4">
                  <button className="px-6 py-2 bg-green-500 text-white rounded-xl hover:bg-green-700 transition" onClick={() => handleConfirm("accepted")} type="button">
                    Accept
                  </button>
                  <button className="px-6 py-2 bg-red-500 text-white rounded-xl hover:bg-red-700 transition" onClick={() => handleConfirm("declined")} type="button">
                    Decline
                  </button>
                </div>
              </div>


            </div>
          </>
        )}
      </div>
    </div>
  ) : null;
};

export default AdminBookingDetail;
// function closeModal() {
//   throw new Error("Function not implemented.");
// }

