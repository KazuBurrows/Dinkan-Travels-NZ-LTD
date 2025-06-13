import React from 'react';

interface PopupModalProps {
  isOpen: boolean;          // <- parent controls this
  onConfirm: () => void;     // <- parent handles confirm
  onCancel: () => void;      // <- parent handles cancel/close
}

const PopupModal = ({
  isOpen,
  onConfirm,
  onCancel,
}: PopupModalProps) => {
  if (!isOpen) return null; // don't render anything if modal is closed

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
        <h2 className="text-2xl font-semibold mb-4">Are you sure?</h2>
        <div className="flex justify-center gap-4">
          <button 
            className="bg-green-500 text-white font-bold py-2 px-4 rounded" 
            onClick={onConfirm}
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

export default PopupModal;
