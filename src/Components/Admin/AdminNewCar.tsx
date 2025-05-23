import React, { useState } from "react";

import { Car } from "../../types/models";

interface AdminNewCarProps {
  isOpen: boolean;
  onClose: () => void;
}

const AdminNewCar = ({ isOpen, onClose }: AdminNewCarProps) => {
  const [make, setMake] = useState<string>("");
  const [model, setModel] = useState<string>("");
  const [year, setYear] = useState<number>(2020);
  const [body, setBody] = useState<string>("");
  const [plate, setPlate] = useState<string>("");
  const [colour, setColour] = useState<string>("");
  const [fuelType, setFuelType] = useState<string>("");
  const [ccRating, setCcRating] = useState<number>(0);
  const [fuelEconomy, setFuelEconomy] = useState<number>(0);
  const [seats, setSeats] = useState<number>(0);
  const [pricePerDay, setPricePerDay] = useState<number>(0);
  const [drive, setDrive] = useState<string>("");
  const [transmission, setTransmission] = useState<string>("");

    const submitNewCar = async () => {
        var formData = new FormData();
        formData.append("make", make);
        formData.append("model", model);
        formData.append("year", String(year));
        formData.append("body", body);
        formData.append("plate", plate);
        formData.append("colour", colour);
        formData.append("fuelType", fuelType);
        formData.append("ccRating", String(ccRating));
        formData.append("fuelEconomy", String(fuelEconomy));
        formData.append("seats", String(seats));
        formData.append("pricePerDay", String(pricePerDay));
        formData.append("drive", drive);
        formData.append("transmission", transmission);

        const url = "https://kazukicomapi.azurewebsites.net/api/PostFleet?"; // Your Azure API endpoint
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

  return isOpen ? (
    <div className="absolute inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50 z-50">
      <div className="relative bg-white p-8 rounded-3xl max-h-[80vh] overflow-y-auto w-full max-w-xl">
        <button
          className="absolute right-8 font-bold text-3xl text-neutral-400"
          onClick={onClose}
        >
          X
        </button>
        <h2>New Car</h2>
        <div className="bg-white p-8 rounded-3xl h-3/5 overflow-y-auto">
          <form className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium">Make</label>
              <input
                type="text"
                value={make}
                onChange={(e) => setMake(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Model</label>
              <input
                type="text"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Year</label>
              <input
                type="number"
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Body</label>
              <input
                type="text"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Plate</label>
              <input
                type="text"
                value={plate}
                onChange={(e) => setPlate(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Colour</label>
              <input
                type="text"
                value={colour}
                onChange={(e) => setColour(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Fuel Type</label>
              <input
                type="text"
                value={fuelType}
                onChange={(e) => setFuelType(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">CC Rating</label>
              <input
                type="number"
                value={ccRating}
                onChange={(e) => setCcRating(Number(e.target.value))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Fuel Economy</label>
              <input
                type="number"
                value={fuelEconomy}
                onChange={(e) => setFuelEconomy(Number(e.target.value))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Seats</label>
              <input
                type="number"
                value={seats}
                onChange={(e) => setSeats(Number(e.target.value))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Price Per Day</label>
              <input
                type="number"
                value={pricePerDay}
                onChange={(e) => setPricePerDay(Number(e.target.value))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Drive</label>
              <input
                type="text"
                value={drive}
                onChange={(e) => setDrive(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                placeholder="Two Wheel Drive"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Transmission</label>
              <input
                type="text"
                value={transmission}
                onChange={(e) => setTransmission(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                placeholder="Manuel"
              />
            </div>
          </form>
        </div>

        <button className="px-6 py-2 bg-green-500 text-white rounded-xl hover:bg-green-700 transition flex ml-auto" onClick={submitNewCar}>
          Create
        </button>
      </div>
    </div>
  ) : null;
};

export default AdminNewCar;
