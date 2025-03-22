import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar";
import { DoctorContext } from "../../context/DoctorContext";
import AddTimeSlotModal from "../Doctor/AddTimeSlot";
import UpdateClinicModal from "../Doctor/UpdataClinic"; // <-- New modal for updating a clinic
import { FaTrash, FaEdit, FaPlus, FaClock } from "react-icons/fa";

const DoctorAvailability = () => {
  const { profileData } = useContext(DoctorContext);

  // List of clinics
  const [clinics, setClinics] = useState([]);
  // For “Add Clinic” form modal
  const [showAddClinicForm, setShowAddClinicForm] = useState(false);
  const [clinicForm, setClinicForm] = useState({
    active_status: false,
    clinic_name: "",
    address: "",
    city: "",
    pincode: "",
    state: "",
    phone: "",
    fees: "",
    discount_percentage: "",
  });

  // For Time Slot Modal
  const [showTimeSlotModal, setShowTimeSlotModal] = useState(false);
  const [selectedClinicForSlots, setSelectedClinicForSlots] = useState(null);

  // For Update Clinic Modal
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [clinicToUpdate, setClinicToUpdate] = useState(null); // holds data of the clinic being edited

  // Fetch clinics on mount
  useEffect(() => {
    if (profileData?.doctorId) {
      fetchClinics();
    }
  }, [profileData]);

  // Get all clinics
  const fetchClinics = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/doctor/getclinics/${profileData.doctorId}`
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

  // Toggle “Add Clinic” form
  const handleToggleAddClinic = () => {
    setShowAddClinicForm(!showAddClinicForm);
    // Reset form data
    setClinicForm({
      active_status: false,
      clinic_name: "",
      address: "",
      city: "",
      pincode: "",
      state: "",
      phone: "",
      fees: "",
      discount_percentage: "",
    });
  };

  // Handle form input
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setClinicForm({
      ...clinicForm,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Submit “Add Clinic” form
  const handleAddClinicSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:5000/api/doctor/addclinics/${profileData.doctorId}`,
        clinicForm,
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.status === 201) {
        alert(response.data.message || "Clinic added successfully!");
        setShowAddClinicForm(false);
        fetchClinics(); // Refresh clinic list
      } else {
        alert(
          response.data.Error || "An error occurred while adding the clinic."
        );
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An unexpected error occurred.");
    }
  };

  // Delete a clinic
  const handleDeleteClinic = async (clinicId) => {
    if (!window.confirm("Are you sure you want to delete this clinic?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/doctor/deleteclinics/${clinicId}`);
      setClinics((prev) => prev.filter((c) => c.clinicId !== clinicId));
      alert("Clinic deleted successfully!");
    } catch (error) {
      console.error("Error deleting clinic:", error);
      alert(
        error.response?.data?.error ||
          "An error occurred while deleting the clinic."
      );
    }
  };

  // Time Slot modal open
  const handleOpenTimeSlot = (clinic) => {
    setSelectedClinicForSlots(clinic);
    setShowTimeSlotModal(true);
  };

  // Update Clinic modal open
  const handleOpenUpdateModal = (clinic) => {
    setClinicToUpdate(clinic);
    setShowUpdateModal(true);
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Clinics</h1>
        <h2 className="text-xl font-semibold text-gray-600 mb-6">
          Manage Clinics
        </h2>

        {/* Add Clinic Button */}
        <div className="flex justify-end mb-4">
          <button
            onClick={handleToggleAddClinic}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center gap-2"
          >
            <FaPlus />
            Add Clinic
          </button>
        </div>

        {/* Table of Clinics */}
        <div className="bg-white rounded shadow">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="p-3 font-semibold text-gray-600">NAME</th>
                <th className="p-3 font-semibold text-gray-600">ADDRESS</th>
                <th className="p-3 font-semibold text-gray-600">PHONE</th>
                <th className="p-3 font-semibold text-gray-600">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {clinics.length === 0 ? (
                <tr>
                  <td className="p-3" colSpan="4">
                    No clinics found.
                  </td>
                </tr>
              ) : (
                clinics.map((clinic) => (
                  <tr key={clinic.clinicId} className="border-b hover:bg-gray-50">
                    <td className="p-3">{clinic.clinic_name}</td>
                    <td className="p-3">{clinic.address}</td>
                    <td className="p-3">{clinic.phone || "N/A"}</td>
                    <td className="p-3 flex gap-3 items-center">
                      {/* Edit / Update */}
                      <button
                        className="text-blue-600 hover:text-blue-800"
                        onClick={() => handleOpenUpdateModal(clinic)}
                      >
                        <FaEdit />
                      </button>
                      {/* Delete */}
                      <button
                        className="text-red-600 hover:text-red-800"
                        onClick={() => handleDeleteClinic(clinic.clinicId)}
                      >
                        <FaTrash />
                      </button>
                      {/* Time Slots */}
                      <button
                        className="text-green-600 hover:text-green-800"
                        onClick={() => handleOpenTimeSlot(clinic)}
                      >
                        <FaClock />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

       {/* Add Clinic Form Modal */}
{showAddClinicForm && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white max-w-md w-full max-h-[80vh] overflow-y-auto rounded-lg shadow-lg relative p-6">
      {/* Close Button */}
      <button
        onClick={handleToggleAddClinic}
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
      >
        ×
      </button>

      {/* Modal Header */}
      <h2 className="text-2xl font-semibold mb-4">Add Clinic Information</h2>

      {/* Form */}
      <form onSubmit={handleAddClinicSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            <input
              type="checkbox"
              name="active_status"
              checked={clinicForm.active_status}
              onChange={handleChange}
              className="mr-2"
            />
            Active Status
          </label>
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Clinic/Hospital Name:
          </label>
          <input
            type="text"
            name="clinic_name"
            value={clinicForm.clinic_name}
            onChange={handleChange}
            required
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Address:</label>
          <input
            type="text"
            name="address"
            value={clinicForm.address}
            onChange={handleChange}
            required
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">City:</label>
          <input
            type="text"
            name="city"
            value={clinicForm.city}
            onChange={handleChange}
            required
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Pincode:</label>
          <input
            type="text"
            name="pincode"
            value={clinicForm.pincode}
            onChange={handleChange}
            required
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">State:</label>
          <input
            type="text"
            name="state"
            value={clinicForm.state}
            onChange={handleChange}
            required
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Phone:</label>
          <input
            type="text"
            name="phone"
            value={clinicForm.phone}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Fees:</label>
          <input
            type="number"
            name="fees"
            value={clinicForm.fees}
            onChange={handleChange}
            required
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Discount Percentage:
          </label>
          <input
            type="number"
            name="discount_percentage"
            value={clinicForm.discount_percentage}
            onChange={handleChange}
            required
            className="w-full border rounded p-2"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded w-full"
        >
          Submit
        </button>
      </form>
    </div>
  </div>
)}


        {/* Update Clinic Modal */}
        {showUpdateModal && clinicToUpdate && (
          <UpdateClinicModal
            clinic={clinicToUpdate}
            onClose={() => {
              setShowUpdateModal(false);
              setClinicToUpdate(null);
            }}
            onUpdateSuccess={() => {
              fetchClinics();
              setShowUpdateModal(false);
              setClinicToUpdate(null);
            }}
          />
        )}

        {/* Time Slot Modal */}
        {showTimeSlotModal && (
          <AddTimeSlotModal
            clinic={selectedClinicForSlots}
            onClose={() => setShowTimeSlotModal(false)}
          />
        )}
      </div>
    </div>
  );
};

export default DoctorAvailability;
