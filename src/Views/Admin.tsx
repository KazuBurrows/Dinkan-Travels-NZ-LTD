import React, { useEffect, useState } from "react";
// import { Driver } from "../types/models";
import AdminNav from "../Components/Admin/AdminNav";
import AdminBookings from "../Components/Admin/AdminBookings";


const Admin = () => {

  return (
    <div className="flex">
        <AdminNav/>
        <div className="w-screen h-screen bg-neutral-100 p-16">
            <AdminBookings/>
        </div>
    </div>
  );
};

export default Admin;
