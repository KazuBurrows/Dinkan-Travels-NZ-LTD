import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Views/Home';
import CarBooking from './Views/CarBooking';
import GeneralBooking from './Views/GenrealBooking';
import Admin from './Views/Admin';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/booking" element={<GeneralBooking />} />
        <Route path="/car-booking/:id" element={<CarBooking />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;
