import React, {useState} from "react";

import { Car, fleetImages } from "../../types/models";



interface AdminFleetDetailProps {
  car: Car | null;
  isOpen: boolean;
  onClose: () => void;
}

const AdminFleetDetail = ({
  car,
  isOpen,
  onClose,
}: AdminFleetDetailProps) => {
  
  return isOpen ? (
    <div className="absolute inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50 z-50">
      <div className="relative bg-white p-8 rounded-3xl max-h-[80vh] overflow-y-auto w-full max-w-xl">
        {car && (
          <>
            <button
              className="absolute right-8 font-bold text-3xl text-neutral-400"
              onClick={onClose}
            >
              X
            </button>
            <h2>Car Id: {car.id}</h2>
            <div className="bg-white p-8 rounded-3xl h-3/5">
              <h3 className="text-3xl font-semibold uppercase text-center py-4">
                {car.year} {car.model}
              </h3>
              <img
                className="w-[350px] mx-auto"
                src={fleetImages[0]}
                alt={fleetImages[0]}
              />
            </div>
            
          </>
        )}
      </div>
    </div>
  ) : null;
};

export default AdminFleetDetail;
