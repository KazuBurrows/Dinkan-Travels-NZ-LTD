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
        <h1 className="text-4xl text-[#023e7d] font-bold uppercase mb-4">
          Dinkan Travels
        </h1>
      </div>

      <div className="w-2/5 pb-[5%] mx-[5%] text-[#023e7d] mt-auto">
        <h1 className="text-8xl font-bold py-4">Lorem ipsum dolor sit amet</h1>
        <p className="text-2xl font-semibold">
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
          officia deserunt mollit anim id est laborum.
        </p>
      </div>
    </div>
  );
}

export default Hero;
