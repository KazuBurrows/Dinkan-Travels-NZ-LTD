import React, { useEffect, useState } from "react";
import { Driver } from "../types/models";


interface PopupNewDriverModalProps {
  isOpen: boolean; // <- parent controls this
  onConfirm: (driver: Driver) => void; // <- parent handles confirm
  onCancel: () => void; // <- parent handles cancel/close
}

const PopupNewDriverModal = ({
  isOpen,
  onConfirm,
  onCancel,
}: PopupNewDriverModalProps) => {
  const [id, setId] = useState(crypto.randomUUID());
  const [fullName, setFullName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [licenceFront, setLicenceFront] = useState<File | null>(null);
  const [licenceBack, setLicenceBack] = useState<File | null>(null);

  // Reset states on close
  useEffect(() => {
    if (!isOpen) {
      setId(crypto.randomUUID());
      setFullName(null);
      setEmail(null);
      setLicenceFront(null);
      setLicenceBack(null);
    }
  }, [isOpen]);
  
  // don't render if modal is closed
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-center">New Driver</h2>

        <form id="new-driver-modal" className="mx-16 my-4">
          <div className="flex flex-col gap-1 my-2">
            <label className="text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              className="bg-neutral-100 rounded-full px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="John Cena"
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1 my-2">
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              className="bg-neutral-100 rounded-full px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="example@email.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex gap-4 justify-around my-2">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">
                Driver's License (Front)
              </label>

              {licenceFront ? (
                <>
                  <label
                    htmlFor="license-front"
                    className="w-40 h-40 flex items-center justify-center border-2 border-solid border-green-400
                    rounded-md bg-green-300 text-center text-sm text-gray-500"
                  >
                    Uploaded!
                  </label>
                </>
              ) : (
                <>
                  <label
                    htmlFor="license-front"
                    className="w-40 h-40 flex items-center justify-center border-2 border-dashed border-gray-400
                    rounded-md cursor-pointer bg-neutral-100 hover:bg-neutral-200 text-center text-sm text-gray-500"
                  >
                    Click to upload
                  </label>{" "}
                  <input id="license-front" type="file" className="hidden" onChange={(e) => setLicenceFront(e.target.files?.[0] || null)}
                  />
                </>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">
                Driver's License (Back)
              </label>

              {licenceBack ? (
                <>
                  <label
                    htmlFor="license-bac"
                    className="w-40 h-40 flex items-center justify-center border-2 border-solid border-green-400
                    rounded-md bg-green-300 text-center text-sm text-gray-500"
                  >
                    Uploaded!
                  </label>
                </>
              ) : (
                <>
                  <label
                    htmlFor="license-back"
                    className="w-40 h-40 flex items-center justify-center border-2 border-dashed border-gray-400
                    rounded-md cursor-pointer bg-neutral-100 hover:bg-neutral-200 text-center text-sm text-gray-500"
                  >
                    Click to upload
                  </label>{" "}
                  <input id="license-back" type="file" className="hidden" onChange={(e) => setLicenceBack(e.target.files?.[0] || null)}
                  />
                </>
              )}
            </div>
          </div>
        </form>
        <div className="flex justify-center gap-4">
          <button
            className="bg-green-500 text-white font-bold py-2 px-4 rounded"
            onClick={() => onConfirm({
              id, fullName, email, licenceFront, licenceBack,
              licenceFrontUrl: null,
              licenceBackUrl: null
            })}
          >
            Confirm
          </button>
          <button
            className="bg-red-500 text-white font-bold py-2 px-4 rounded"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopupNewDriverModal;
