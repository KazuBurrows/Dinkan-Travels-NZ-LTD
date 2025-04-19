// import { useParams } from "react-router-dom";
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

function CarBooking() {
  // const { id } = useParams();

  return (
    <div className="h-full bg-neutral-100 px-16 py-8 inter-font">
      <div>
        <div className="relative w-full h-[550px] bg-white my-6 mx-auto rounded-3xl flex justify-center items-center p-8 gap-x-4">
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
              className="w-3/5 mx-auto"
              src={car.img}
              alt="toyota highlander 2022"
            />
            <h2 className="text-2xl font-semibold">
              {car.model} {car.brand}
            </h2>
          </div>

          <div className="flex-[1] text-center flex flex-col justify-center">
            <p className="text-lg">per day</p>
            <h2 className="text-5xl font-semibold">${car.price}</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CarBooking;
