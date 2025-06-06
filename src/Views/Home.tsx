import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareArrowUpRight } from "@fortawesome/free-solid-svg-icons";

import Hero from "../Components/Hero";
import FleetSmall from "../Components/FleetSmall";
import About from "../Components/About";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
// #023e7d
// #ffd500
function Home() {
  return (
    <>
    <div className="h-full bg-[#ffd500] md:px-16 px-4 py-8 inter-font overflow-x-hidden">
      <a
        href="/booking"
        className="fixed bottom-16 left-1/2 -translate-x-1/2 bg-sky-300 text-3xl text-white font-bold px-6 py-2 rounded-full flex items-center gap-2 drop-shadow-xl z-50 hover:drop-shadow-2xl hover:scale-125 duration-300 ease-in-out whitespace-nowrap"
      >
        Book Now
        <FontAwesomeIcon
          icon={faSquareArrowUpRight}
          className="text-5xl text-white ml-2"
        />
      </a>

      <Navbar />
      <Hero></Hero>
      <FleetSmall></FleetSmall>
      <About></About>
    </div>
    <Footer />
    </>
  );
}

export default Home;
