import React, { useState } from "react";
import axios from "axios";
import { FaTimes } from "react-icons/fa";

const AddTimeSlotModal = ({ clinic, onClose }) => {
  const [formData, setFormData] = useState({
    slot_date: "",
    end_date: "",
    start_time: "",
    end_time: "",
    status: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "status") {
      setFormData({
        ...formData,
        [name]: value === "Available", // Convert to boolean
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  // Submit new time slot
  const handleSubmit = async () => {
    const { slot_date, end_date, start_time, end_time, status } = formData;
    if (!slot_date || !end_date || !start_time || !end_time || status === "") {
      alert("All fields are required.");
      return;
    }

    try {
      await axios.post(
        `http://localhost:5000/doctor/addtime/${clinic.clinicId}`,
        formData
      );
      alert("Time slot added successfully!");
      onClose(); // close modal
    } catch (error) {
      console.error("Error adding time slot:", error);
      alert(
        error.response?.data?.error ||
          "An error occurred while adding the time slot."
      );
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          <FaTimes />
        </button>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Add Time Slot for {clinic?.clinic_name}
        </h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">
              Start Date:
            </label>
            <input
              type="date"
              name="slot_date"
              value={formData.slot_date}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-500 outline-none"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">
              End Date:
            </label>
            <input
              type="date"
              name="end_date"
              value={formData.end_date}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-500 outline-none"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">
              Start Time:
            </label>
            <input
              type="time"
              name="start_time"
              value={formData.start_time}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-500 outline-none"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">
              End Time:
            </label>
            <input
              type="time"
              name="end_time"
              value={formData.end_time}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-500 outline-none"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">
              Status:
            </label>
            <select
              name="status"
              value={formData.status ? "Available" : ""}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-500 outline-none"
            >
              <option value="">Select Status</option>
              <option value="Available">Available</option>
              <option value="Not Available">Not Available</option>
            </select>
          </div>
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={handleSubmit}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition-all"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg shadow hover:bg-gray-400 transition-all"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTimeSlotModal;
