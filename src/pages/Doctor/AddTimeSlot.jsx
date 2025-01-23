import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { DoctorContext } from "../../context/DoctorContext";

const AddTimeSlot = () => {
  const [clinics, setClinics] = useState([]);
  console.log(clinics, "lmlm");
  
  const { profileData } = useContext(DoctorContext);

  const [selectedClinic, setSelectedClinic] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    slot_date: "",
    end_date: "",
    start_time: "",
    end_time: "",
    status: "",
  });

  useEffect(() => {
    // Fetch clinics when the component mounts
    const fetchClinics = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/doctor/getclinics/${profileData.doctorId}`
        );
        if (response.status === 201) {
          setClinics(response.data["clinic list"]);
        } else {
          alert("Failed to fetch clinics.");
        }
      } catch (error) {
        console.error("Error fetching clinics:", error);
        alert("An error occurred while fetching clinic details.");
      }
    };

    fetchClinics();
  }, [profileData.doctorId]);

  const handleSelectClinic = (clinic) => {
    setSelectedClinic(clinic);
    setShowModal(true); // Open modal when clinic is selected
  };

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

  const handleSubmit = async () => {
    if (
      !formData.slot_date ||
      !formData.end_date ||
      !formData.start_time ||
      !formData.end_time ||
      !formData.status
    ) {
      alert("All fields are required.");
      return;
    }

    try {
      await axios.post(
        `http://localhost:5000/doctor/addtime/${selectedClinic.clinicId}`,
        formData
      );
      alert("Time slot added successfully!");
      setShowModal(false); // Close the modal after successful submission
      setFormData({
        slot_date: "",
        end_date: "",
        start_time: "",
        end_time: "",
        status: "",
      });
    } catch (error) {
      console.error("Error adding time slot:", error);
      alert(
        error.response?.data?.error || "An error occurred while adding the time slot."
      );
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Manage Clinic Time Slots</h1>

      {clinics.length === 0 ? (
        <p className="text-gray-600">No clinics available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clinics.map((clinic) => (
            <div
              key={clinic.clinicId}
              className="p-4 border rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer bg-white"
              onClick={() => handleSelectClinic(clinic)} // Open modal when clicked
            >
              <p className="text-lg font-medium text-gray-700">{clinic.clinic_name}</p>
              <p className="text-lg font-medium text-gray-700">{clinic.address}</p>

            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Add Time Slot for {selectedClinic?.address}
            </h2>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-1">Start Date:</label>
                <input
                  type="date"
                  name="slot_date"
                  value={formData.slot_date}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-500 outline-none"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-1">End Date:</label>
                <input
                  type="date"
                  name="end_date"
                  value={formData.end_date}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-500 outline-none"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-1">Start Time:</label>
                <input
                  type="time"
                  name="start_time"
                  value={formData.start_time}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-500 outline-none"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-1">End Time:</label>
                <input
                  type="time"
                  name="end_time"
                  value={formData.end_time}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-500 outline-none"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-1">Status:</label>
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
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg shadow hover:bg-gray-400 transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddTimeSlot;
