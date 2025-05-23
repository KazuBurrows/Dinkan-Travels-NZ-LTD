import bg from "../assets/images/hyundai-motor-group-Ax5hexSdvCg-unsplash.jpg";

function Hero() {
  return (
    <>
      <div
        style={{
          backgroundImage: `url(${bg})`,
        }}
        className="relative w-full md:h-[700px] h-[300px] bg-cover bg-center bg-no-repeat rounded-3xl flex flex-col overflow-hidden"
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-[#003566] bg-opacity-20 z-0"></div>

        {/* Top content (e.g., Logo) */}
        <div className="flex justify-center relative z-10 py-4">
          <h1 className="text-4xl text-[#003566] font-bold mb-4">Logo</h1>
        </div>

        {/* Bottom content box */}
        <div className="2xl:w-6/12 lg:w-7/12 md:w-10/12 pb-[5%] mx-[5%] text-[#ffd500] mt-auto md:p-12 rounded-lg overflow-hidden break-words relative z-10">
          <h1 className="2xl:text-9xl xl:text-9xl md:text-8xl sm:9xl text-6xl font-bold py-4 uppercase break-words">
            Dinkan Travels
          </h1>
          <p className="text-xl font-semibold break-words md:block hidden">
            Reliable short-term vehicle hire for travel, business, or personal
            use. Our fleet includes cars and vans seating from 5 to 12
            passengers—ideal for individuals and groups alike.
          </p>
        </div>
      </div>
    </>
  );
}

export default Hero;
