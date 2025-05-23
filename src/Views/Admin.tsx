// import AdminNav from "../Components/Admin/AdminNav";
import AdminBookings from "../Components/Admin/AdminBookings";
import AdminFleet from "../Components/Admin/AdminFleet";
import { useState } from "react";

type NavItem = {
  label: string;
  component: string;
};

const navItems: NavItem[] = [{ label: "Bookings", component: "bookings" }, { label: "Fleet", component: "fleet" }];

const Admin = () => {
  const [activeView, setActiveView] = useState("bookings");

  return (
    <div className="flex">
      <nav className="w-80 h-screen bg-gray-800 text-white p-4 flex flex-col">
        <h1 className="text-xl font-bold mb-6">Admin Center</h1>
        <ul>
          {navItems.map((item) => (
            <li key={item.label}>
              <a
                onClick={() => setActiveView(item.component)}
                className={`cursor-pointer flex items-center gap-3 hover:bg-gray-700 p-2 rounded transition-colors ${
                  activeView === item.component ? "bg-gray-700" : ""
                }`}
                href="javascript:void(0)"
              >
                <span>{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="w-screen h-screen bg-neutral-100 p-16 overflow-y-auto">
        {activeView === "bookings" && <AdminBookings />}
        {activeView === "fleet" && <AdminFleet />}
        {/* Add more views as needed */}
      </div>
    </div>
  );
};

export default Admin;
