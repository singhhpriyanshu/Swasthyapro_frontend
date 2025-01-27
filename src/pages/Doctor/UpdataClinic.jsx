import React, { useState } from "react";
import axios from "axios";
import { FaTimes } from "react-icons/fa";

const UpdateClinicModal = ({ clinic, onClose, onUpdateSuccess }) => {
  const [formData, setFormData] = useState({
    address: clinic.address || "",
    city: clinic.city || "",
    pincode: clinic.pincode || "",
    state: clinic.state || "",
    fees: clinic.fees || "",
    discount_percentage: clinic.discount_percentage || "",
    phone: clinic.phone || "",
    clinic_name:clinic.clinic_name || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:5000/doctor/updateclinics/${clinic.clinicId}`,
        formData
      );
      if (response.status === 201) {
        alert("Clinic information updated successfully!");
        onUpdateSuccess();
      } else {
        alert("Failed to update clinic information.");
      }
    } catch (error) {
      console.error("Error updating clinic information:", error);
      alert("An error occurred while updating clinic details.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      {/* Modal container with fixed size */}
      <div className="bg-white w-full max-w-md max-h-[80vh] overflow-y-auto rounded-lg shadow-lg relative p-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
        >
          <FaTimes />
        </button>

        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Update Clinic: {clinic.clinic_name}
        </h2>

        <form onSubmit={handleUpdate} className="space-y-4">
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Clinic Name
            </label>
            <input
              type="text"
              name="clinic_name"
              value={formData.clinic_name}
              onChange={handleChange}
              required
              className="border w-full p-2 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="border w-full p-2 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              City
            </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
              className="border w-full p-2 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Pincode
            </label>
            <input
              type="text"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              required
              className="border w-full p-2 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              State
            </label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
              className="border w-full p-2 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Fees
            </label>
            <input
              type="number"
              name="fees"
              value={formData.fees}
              onChange={handleChange}
              required
              className="border w-full p-2 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Discount Percentage
            </label>
            <input
              type="number"
              name="discount_percentage"
              value={formData.discount_percentage}
              onChange={handleChange}
              required
              className="border w-full p-2 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="border w-full p-2 rounded"
            />
          </div>

          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white w-full py-2 rounded"
          >
            Update Clinic
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateClinicModal;
