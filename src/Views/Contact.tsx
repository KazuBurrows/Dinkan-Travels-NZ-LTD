
// #023e7d

import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";

// #ffd500
function Contact() {
  return (
    <>
    <div className="h-screen bg-[#ffd500] md:px-16 px-4 py-8 inter-font overflow-x-hidden">
        <Navbar/>

        <h1 className="text-4xl font-bold text-center text-gray-800 py-16">Contact Us</h1>

        <div className="space-y-4 text-2xl text-gray-700 break-words">
          <div>
            <p className="font-semibold text-3xl">Business Name:</p>
            <p>Dinkan Travels</p>
          </div>

          <div>
            <p className="font-semibold ">Email:</p>
            <p>support@dinkantravels.co.nz</p>
          </div>

          <div>
            <p className="font-semibold">Mobile:</p>
            <p>+64 12 345 6789</p>
          </div>

          <div>
            <p className="font-semibold">Pickup Location:</p>
            <p>123 Main Street, Christchurch 8011, New Zealand</p>
          </div>

          <div>
            <p className="font-semibold">Drop-off Location:</p>
            <p>Airport Road, Christchurch International Airport</p>
          </div>
          </div>

          
    </div>
    <Footer/>
    </>
  );
}

export default Contact;
