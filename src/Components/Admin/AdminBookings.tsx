import { useEffect, useState } from "react";
import AdminBookingDetail from "./AdminBookingDetail";
import { Booking, Driver } from "../../types/models";

const AdminBookings = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking>();

  const [bookings, setBookings] = useState<Booking[]>([]);

  const openModal = (booking: Booking) => {
    setIsModalOpen(true);
    setSelectedBooking(booking);
  };

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch("https://kazukicomapi.azurewebsites.net/api/GetBookings?");
        if (!response.ok) {
          throw new Error("Failed to fetch bookings");
        }

        const data: Booking[] = await response.json();
        console.log(data);

        let tempBookings: Booking[] = [];
        data.forEach((b, idx) => {
          let currBooking: Booking = {
            id: b.id,
            customer_id: b.customer_id,
            car_id: b.car_id,
            pickup_date: b.pickup_date,
            dropoff_date: b.dropoff_date,
            total_price: b.total_price,
            paid_total: b.paid_total,
            status: b.status,
            drivers: [],
          };
          const drivers: Driver[] = b.drivers.map((d, index) => ({
            id: `driver-${index}`, // or use a real unique ID
            email: d.email || null,
            fullName: d.fullName || null,
            licenceFront: null,
            licenceBack: null,
            licenceFrontUrl: d.licenceFrontUrl || null,
            licenceBackUrl: d.licenceBackUrl || null,
          }));
          currBooking.drivers = drivers;

          tempBookings.push(currBooking);
        });
        setBookings(tempBookings);
      } catch (err: any) {
        // setError(err.message || "Unknown error");
      } finally {
        // setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="bg-white my-6 mx-auto rounded-3xl p-8 gap-x-4 h-full">
      <AdminBookingDetail
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        booking={selectedBooking ?? null}
      />

      <h2 className="text-3xl font-bold mb-4 px-16">Bookings</h2>

      <ul className="flex text-lg font-semibold gap-8 px-16">
        <li className="bg-rose-400 px-4 rounded-full">
          <p>All</p>
        </li>
        {/* <li>
          <a>Pending</a>
        </li>
        <li>
          <a>Confirmed</a>
        </li> */}
        {/* <input type="date" className="ml-auto" />
        <input type="date" /> */}
      </ul>

      <div className="max-h-[85%] overflow-y-auto">
        <table className="table-auto border-separate border-spacing-y-2 w-full text-left px-16">
          <thead>
            <tr>
              <th className="p-4">Email</th>
              <th>Vehicle</th>
              <th>Status</th>
              <th>Paid(%)</th>
              <th>Pickup</th>
              <th className="pr-4">Dropoff</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length > 0 ? (
              bookings.map((booking, i) => {
                return (
                  <tr
                    key={booking.id}
                    onClick={
                      () => openModal(booking) // Pass the booking directly to the modal
                    }
                    className="transform transition-transform duration-200 hover:scale-105 cursor-pointer"
                  >
                    <td className="bg-rose-50 p-4 rounded-l-2xl">
                      {booking.customer_id}
                    </td>
                    <td className="bg-rose-50">2022-toyota-highlander</td>
                    <td className="bg-rose-50">
                      {booking.status}
                    </td>
                    <td className="bg-rose-50">
                      {Math.round(
                        (booking.paid_total / booking.total_price) * 100
                      )}
                      %
                    </td>
                    <td className="bg-rose-50">
                      {new Date(booking.pickup_date).toLocaleDateString(
                        "en-GB"
                      )}
                    </td>
                    <td className="bg-rose-50 pr-4 rounded-r-2xl">
                      {new Date(booking.dropoff_date).toLocaleDateString(
                        "en-GB"
                      )}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={8} className="text-center p-4">
                  No bookings available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminBookings;
