import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Views/Home';
import CarBooking from './Views/CarBooking';
import GeneralBooking from './Views/GenrealBooking';
import Admin from './Views/Admin';
import Contact from './Views/Contact';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/booking" element={<GeneralBooking />} />
        <Route path="/car-booking/:id" element={<CarBooking />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;
