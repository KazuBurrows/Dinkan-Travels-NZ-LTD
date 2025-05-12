import { Booking, Car } from "../../types/models";
import highlander from "../../assets/images/22-Toyota-Highlander-White- side.PNG";

const car: Car = {
  id: "2022-toyota-highlander",
  brand: "Toyota",
  model: "Highlander",
  year: 2022,
  seats: 7,
  price: 120.95,
  img: highlander,
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
  return isOpen ? (
    <div className="absolute inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50 z-50">
      <div className="relative bg-white p-8 rounded-3xl">
        {booking && (
          <>
            <button className="absolute right-8 font-bold text-3xl text-neutral-400" onClick={onClose}>X</button>
            <h2>Booking Information</h2>
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
                <h2>Status: Confirmed</h2>
                <p>Paid: 100%</p>
                <p>Total: ${booking.total_price}</p>
              </div>
            </div>
            <div>
              <h2 className="text-center">Drivers</h2>
              <table
                id="drivers-table"
                className="bg-neutral-100 rounded-t-2xl justify-evenly w-full text-center"
              >
                <thead>
                  <tr className="">
                    <th className="py-2">Full Name</th>
                    <th>Email</th>
                    <th></th>
                  </tr>
                </thead>
                
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  ) : null;
};

export default AdminBookingDetail;
