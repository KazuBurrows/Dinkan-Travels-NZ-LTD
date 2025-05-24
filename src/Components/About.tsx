import img1 from "../assets/images/casey-horner-lWEYy30YgWI-unsplash.jpg";
import img2 from "../assets/images/narrow-curvy-road-with-cars-alongside-green-mountains.jpg";
import img3 from "../assets/images/road-surrounded-by-hills-covered-greenery-snow-cloudy-sky-iceland.jpg";
import img4 from "../assets/images/stunning-landscape-norway.jpg";

import tram from "../assets/images/richard-lumborg-TQMjr7WeWwI-unsplash.jpg";

function About() {
  return (
    <>
      {/* DESKTOP VIEW START */}
      <div className="md:block hidden">
        <h1 className="text-5xl text-[#003566] font-bold text-center py-2">
          About
        </h1>
        {/* ROW ONE START */}
        <div className="grid grid-cols-2 gap-4 py-8">
          {/* LEFT COLUMN */}
          <div className="h-[400px] flex items-center justify-center">
            <h1 className="text-8xl font-bold">
              Travel
              <br />
              <span className="text-green-500">Anywhere</span>
            </h1>
          </div>

          {/* RIGHT COLUMN */}
          <div className="flex gap-2">
            {[img1, img2, img3, img4].map((src, i) => (
              <div
                key={i}
                className="bg-black w-[220px] h-[500px] rounded-3xl overflow-hidden"
              >
                <img
                  src={src}
                  alt={`img slot ${i + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
        {/* ROW ONE END */}

        {/* ROW TWO START */}
        <div className="grid grid-cols-2 gap-4 py-8">
          {/* LEFT COLUMN */}
          <div className="flex gap-2 justify-center">
            <div className="bg-black w-4/5 h-[400px] rounded-3xl overflow-hidden">
              <img
                src={tram}
                alt="tram"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="h-[400px] flex items-center justify-center">
            <h1 className="text-8xl font-bold">
              Based in
              <br />
              <span className="text-red-500">Christchurch</span>
            </h1>
          </div>
        </div>
        {/* ROW TWO END */}

        {/* ROW THREE START */}
        <div className="py-8">
          <h2 className="text-8xl font-bold text-center">
            <span className="text-green-500">Renting</span> a car
            <br />
            made <span className="text-red-500">easy!</span>
          </h2>
          <div className="grid grid-cols-3 gap-4  py-20">
            {/* LEFT COLUMN */}
            {/* <div className="ml-auto">
              <div className="bg-black w-80 h-80 rounded-3xl"></div>
            </div> */}

            {/* MIDDLE COLUMN */}
            {/* <div className="mx-auto">
              <div className="bg-black w-80 h-80 rounded-3xl"></div>
            </div> */}

            {/* RIGHT COLUMN */}
            {/* <div className="mr-auto">
              <div className="bg-black w-80 h-80 rounded-3xl"></div>
            </div> */}
          </div>
        </div>
        {/* ROW THREE END */}
      </div>
      {/* DESKTOP VIEW END */}

      {/* MOBILE VIEW START */}
      <div className="md:hidden block">
        {/* <h1 className="text-5xl text-[#003566] font-bold text-center py-2">
          About
        </h1> */}
        {/* ROW ONE START */}
        <div className="flex flex-col py-4">
          {/* TEXT ROW */}
          <div className="h-full flex items-center justify-center py-8">
            <h1 className="text-7xl font-bold text-center">
              Travel
              <br />
              <span className="text-6xl text-green-500">Anywhere</span>
            </h1>
          </div>

          {/* IMAGES ROW */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          {[img1, img2, img3, img4].map((src, i) => (
            <div
              key={i}
              className="bg-black w-full h-[100px] rounded-3xl overflow-hidden"
            >
              <img
                src={src}
                alt={`img slot ${i + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        </div>
        {/* ROW ONE END */}

        {/* ROW TWO START */}
        <div className="flex flex-col gap-8 py-8">
          {/* TEXT ROW */}
          <div className="h-full flex items-center justify-center">
            <h1 className="text-7xl font-bold text-center">
              Based in
              <br />
              <span className="text-5xl text-red-500">Christchurch</span>
            </h1>
          </div>
          {/* IMAGE ROW */}
          <div className="flex justify-center">
            <div className="bg-black w-full h-[200px] rounded-3xl overflow-hidden">
              <img
                src={tram}
                alt="tram"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          
        </div>
        {/* ROW TWO END */}

        {/* ROW THREE START */}
        <div className="py-8">
          <h2 className="text-7xl font-bold text-center">
            <span className="text-green-500">Renting</span> a car
            <br />
            made <span className="text-red-500">easy!</span>
          </h2>

          {/* IMAGE ROW */}
          {/* <div className="flex flex-col items-center gap-8 py-20">
            <div className="bg-black w-80 h-80 rounded-3xl"></div>
            <div className="bg-black w-80 h-80 rounded-3xl"></div>
            <div className="bg-black w-80 h-80 rounded-3xl"></div>
          </div> */}
        </div>
        {/* ROW THREE END */}
      </div>
      {/* MOBILE VIEW END */}
    </>
  );
}

export default About;
