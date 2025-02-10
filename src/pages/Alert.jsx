import React from 'react';

const Alert = ({ isOpen, message, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white bg-opacity-75 flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <p className="text-green-700">{message}</p>
        <button onClick={onClose} className="mt-2 px-4 py-2 bg-green-300 rounded hover:bg-green-400 text-white">
          Close
        </button>
      </div>
    </div>
  );
};

export default AlertModal;
