import bg from "../assets/images/hyundai-motor-group-Ax5hexSdvCg-unsplash.jpg";

function Hero() {
  return (
    <div
      style={{
        backgroundImage: `url(${bg})`,
      }}
      className="w-full h-[800px] bg-cover bg-center bg-no-repeat rounded-3xl p-8 flex flex-col"
    >
      <div className="flex justify-center">
        <h1 className="text-4xl text-[#003566] font-bold mb-4">Logo here</h1>
      </div>

      <div className="w-2/5 pb-[5%] mx-[5%] text-[#ffd500] mt-auto bg-[#003566] bg-opacity-60 p-8 rounded-lg">
        <h1 className="text-9xl font-bold py-4 uppercase">Dinkan Travels</h1>
        <p className="text-xl font-semibold">
          Reliable short-term vehicle hire for travel, business, or personal
          use. Our fleet includes cars and vans seating from 5 to 12
          passengers—ideal for individuals and groups alike.
        </p>
      </div>
    </div>
  );
}

export default Hero;
