import highlander from "../assets/images/22-Toyota-Highlander-White- side.PNG";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareArrowUpRight } from "@fortawesome/free-solid-svg-icons";
import { Car } from "../../types/models";
import { useEffect, useState } from "react";
import AdminFleetDetail from "./AdminFleetDetail";
import AdminNewCar from "./AdminNewCar";


function AdminFleet() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNewCarModalOpen, setIsNewCarModalOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState<Car>();

  const [fleet, setFleet] = useState<Car[]>([]);

  const openModal = (car: Car) => {
    setIsModalOpen(true);
    setSelectedCar(car);
  };

  const openNewCarModal = () => {
    setIsNewCarModalOpen(true);
  };

  useEffect(() => {
    const fetchFleet = async () => {
      try {
        const response = await fetch("http://localhost:7071/api/GetFleet");
        if (!response.ok) {
          throw new Error("Failed to fetch bookings");
        }

        const rawData = await response.json();

        const data: Car[] = rawData.map((item: any) => ({
          id: item.id,
          carId: item.car_id,
          make: item.make,
          model: item.model,
          year: item.year,
          body: item.body,
          plate: item.plate,
          colour: item.colour,
          fuelType: item.fuel_type,
          ccRating: item.cc_rating,
          fuelEconomy: item.fuel_economy,
          seats: item.seats,
          pricePerDay: item.price_per_day,
          drive: item.drive,
          transmission: item.transmission,
        }));

        setFleet(data);
      } catch (err: any) {
        // setError(err.message || "Unknown error");
      } finally {
        // setLoading(false);
      }
    };

    fetchFleet();
  }, []);

  return (
    <div className="bg-white my-6 mx-auto rounded-3xl p-8 gap-x-4 h-full">
      <AdminFleetDetail
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        car={selectedCar ?? null}
      />
      <AdminNewCar
        isOpen={isNewCarModalOpen}
        onClose={() => setIsNewCarModalOpen(false)}
      />
      <button className="px-6 py-2 bg-green-500 text-white rounded-xl hover:bg-green-700 transition flex ml-auto" onClick={openNewCarModal} type="button">
        New
      </button>
      <h2 className="text-3xl font-bold mb-4 px-16">Fleet</h2>

      <div className="max-h-[85%] overflow-y-auto">
        <table className="table-auto border-separate border-spacing-y-2 w-full text-left px-16">
          <thead>
            <tr>
              <th className="p-4">Make</th>
              <th>Model</th>
              <th>Year</th>
              <th>Seats</th>
              <th>Price Per Day</th>
              <th className="pr-4">Colour</th>
            </tr>
          </thead>
          <tbody>
            {fleet && fleet.length > 0 ? (
              fleet.map((item, index) => (
                <tr key={index}>
                  <td>{item.make}</td>
                  <td>{item.model}</td>
                  <td>{item.year}</td>
                  <td>{item.seats}</td>
                  <td>{item.pricePerDay}</td>
                  <td>{item.colour}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4}>No fleet data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminFleet;
