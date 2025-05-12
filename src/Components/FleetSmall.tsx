import highlander from "../assets/images/22-Toyota-Highlander-White- side.PNG";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareArrowUpRight } from "@fortawesome/free-solid-svg-icons";

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

function FleetSmall() {
  return (
    <div className="w-full py-12">
      <h1 className="text-5xl text-[#023e7d] font-bold text-center">
        Our Fleet
      </h1>
      <div className="relative w-8/12 h-[250px] bg-white my-6 mx-auto rounded-3xl flex justify-center items-center p-8 gap-x-4">
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
  );
}

export default FleetSmall;
