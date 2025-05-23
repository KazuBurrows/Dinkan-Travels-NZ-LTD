import highlander from "../assets/images/22-Toyota-Highlander-White- side.PNG";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquareArrowUpRight,
  faArrowAltCircleLeft,
  faArrowAltCircleRight,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { Car, fleetImages } from "../types/models";

import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";

function FleetSmall() {
  const [fleet, setFleet] = useState<Car[]>([]);

  useEffect(() => {
    const fetchFleet = async () => {
      try {
        const response = await fetch("https://kazukicomapi.azurewebsites.net/api/GetFleet");
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

  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    mode: "free-snap",
    slides: {
      perView: 1,
      spacing: 15,
    },
  });

  return (
    <div className="w-full pt-12 mx-auto">
      <h1 className="text-5xl text-[#003566] font-bold text-center">
        Our Fleet
      </h1>

      <div ref={sliderRef} className="keen-slider mt-8">
        {/* DESKTOP VEIW START */}
        {fleet.map((car, index) => (
          <div
            key={index}
            className="keen-slider__slide justify-center md:flex hidden"
          >
            <div className="xl:w-8/12 w-11/12 h-[250px] bg-white rounded-3xl flex justify-center items-center p-8 gap-x-4 relative mx-auto">
              <a
                href={`/booking`}
                className="absolute top-4 right-4 flex items-center text-sky-300 text-xl font-bold"
              >
                Book now
                <FontAwesomeIcon
                  icon={faSquareArrowUpRight}
                  className="text-5xl text-sky-300 ml-2 hover:drop-shadow-2xl hover:scale-125 duration-300 ease-in-out"
                />
              </a>

              {/* START Car */}
              <div className="flex-[1] text-center flex flex-col justify-center">
                <p className="text-lg">Seats</p>
                <h2 className="text-6xl font-semibold">
                  {car.seats}
                  <span className="text-base font-normal">total</span>
                </h2>
              </div>

              <div className="flex-[5] text-center flex flex-col justify-center">
                <h2 className="text-xl font-semibold">{car.year}</h2>
                <img
                  className="w-[200px] mx-auto"
                  src={
                    fleetImages[
                      `${car.model}-${car.make}-${car.year}-white`.toLowerCase()
                    ]
                  }
                  alt={`${car.model} ${car.make} ${car.year}`}
                />
                <h2 className="text-2xl font-semibold">
                  {car.model} {car.make}
                </h2>
              </div>

              <div className="flex-[1] text-center flex flex-col justify-center">
                <p className="text-lg">NZD per day</p>
                <h2 className="text-5xl font-semibold">
                  ${car.pricePerDay}
                  <p className="text-sm">GST incl</p>
                </h2>
              </div>
              {/* END Car */}
              {/* <p className="bottom-2 absolute text-sky-400 font-bold text-2xl">Swipe me!</p> */}
            </div>
          </div>
        ))}
        {/* DESKTOP VEIW END */}

        {/* MOBILE VIEW START */}
        {fleet.map((car, index) => (
          <div
            key={index}
            className="keen-slider__slide min-w-full md:hidden"
          >
<div className="w-full h-full bg-white rounded-3xl p-8 space-y-6 relative">
              {/* START Car */}
              <div className="text-center">
                <p className="text-lg">Seats</p>
                <h2 className="text-6xl font-semibold">
                  {car.seats}
                  <span className="text-base font-normal"> total</span>
                </h2>
              </div>

              <div className="text-center">
                <h2 className="text-xl font-semibold">{car.year}</h2>
                <img
                  className="w-[300px] mx-auto"
                  src={
                    fleetImages[
                      `${car.model}-${car.make}-${car.year}-white`.toLowerCase()
                    ]
                  }
                  alt={`${car.model} ${car.make} ${car.year}`}
                />
                <h2 className="text-2xl font-semibold">
                  {car.model} {car.make}
                </h2>
              </div>

              <div className="text-center">
                <p className="text-lg">NZD per day</p>
                <h2 className="text-5xl font-semibold">${car.pricePerDay}</h2>
                <p className="text-sm">GST incl</p>
              </div>
              {/* END Car */}
            </div>
          </div>
        ))}
        {/* MOBILE VIEW END */}
      </div>
      <p className="text-center text-xl text-white py-4">Swipe me!</p>
    </div>
  );
}

export default FleetSmall;
