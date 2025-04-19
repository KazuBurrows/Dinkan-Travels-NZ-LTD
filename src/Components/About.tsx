function About() {
  return (
    <div>
      <h1 className="text-5xl text-gray-800 font-bold text-center py-4">
        About
      </h1>
      {/* ROW ONE START */}
      <div className="grid grid-cols-2 gap-4 py-12">
        {/* LEFT COLUMN */}
        <div className="h-[400px] flex items-center justify-center">
          <h1 className="text-7xl font-bold">
            Travel
            <br />
            <span className="text-amber-400">Anywhere</span>
          </h1>
        </div>

        {/* RIGHT COLUMN */}
        <div className="flex gap-2">
          <div className="bg-black w-[220px] h-[500px] rounded-3xl"></div>
          <div className="bg-black w-[220px] h-[500px] rounded-3xl"></div>
          <div className="bg-black w-[220px] h-[500px] rounded-3xl"></div>
          <div className="bg-black w-[220px] h-[500px] rounded-3xl"></div>
        </div>
      </div>
      {/* ROW ONE END */}

      {/* ROW TWO START */}
      <div className="grid grid-cols-2 gap-4 py-12">
        {/* LEFT COLUMN */}
        <div className="flex gap-2 justify-center">
          <div className="bg-black w-4/5 h-full rounded-3xl"></div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="h-[400px] flex items-center justify-center">
          <h1 className="text-7xl font-bold">
            Based in
            <br />
            <span className="text-red-500">Christchurch</span>
          </h1>
        </div>
      </div>
      {/* ROW TWO END */}
      
      {/* ROW THREE START */}
      <div className="py-16">
        <h2 className="text-7xl font-bold text-center"><span className="text-amber-400">Renting</span> a car<br/>made <span className="text-red-500">easy!</span></h2>
        <div className="grid grid-cols-3 gap-4  py-20">
          {/* LEFT COLUMN */}
          <div className="ml-auto">
            <div className="bg-black w-80 h-80 rounded-3xl"></div>
          </div>

          {/* MIDDLE COLUMN */}
          <div className="mx-auto">
            <div className="bg-black w-80 h-80 rounded-3xl"></div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="mr-auto">
            <div className="bg-black w-80 h-80 rounded-3xl"></div>
          </div>
        </div>
      </div>
      {/* ROW THREE END */}
    </div>
  );
}

export default About;
