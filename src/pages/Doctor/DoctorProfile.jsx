import React, { useContext, useState } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";
import Sidebar from "../../components/Sidebar";
import { FaEdit, FaSave, FaTimes } from "react-icons/fa";
import { MdCheckCircle } from "react-icons/md";

const DoctorProfile = () => {
  const { profileData, setProfileData } = useContext(DoctorContext);
  const { backendUrl } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);
  const [formData, setFormData] = useState(profileData);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const updateProfile = async () => {
    try {
      const updateData = {
        doctorId: profileData.doctorId,
        state: formData.state,
        clinic_address: formData.clinic_address,
        alternate_contact: formData.alternate_contact,
        clinic_pincode: formData.clinic_pincode,
        is_active: formData.is_active,
      };

      const { data } = await axios.put(
        `${backendUrl}/api/doctor/update-profile`,
        updateData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (data.success) {
        toast.success(data.message);
        setIsEdit(false);
        setProfileData((prev) => ({ ...prev, ...updateData }));
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Error updating profile"
      );
    }
  };

  const cancelEdit = () => {
    setFormData(profileData);
    setIsEdit(false);
  };

  return (
    <div className="flex flex-col lg:flex-row">
      <Sidebar />
      <div className="flex-1 p-5 bg-gray-100 min-h-screen">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-shrink-0">
            <img
              className="w-full lg:w-64 h-auto rounded-lg shadow-md hover:shadow-lg transition-shadow"
              src={profileData.image_url}
              alt={`${profileData.firstName} ${profileData.last_name}`}
            />
          </div>
          <div className="flex-1 bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <p className="text-2xl font-bold text-gray-700 flex items-center gap-2">
              {profileData.firstName} {profileData.last_name}
            </p>
            <p className="text-gray-600 mt-1">{profileData.specialization}</p>
            <p className="mt-1 flex items-center gap-2 text-gray-600">
              <span className="py-1 px-3 bg-primary/20 text-primary text-xs rounded-full">
                {profileData.yearsOfExperience} Years
              </span>
            </p>

            <div className="mt-4">
              <label className="block text-gray-700 font-medium">
                Alternate Contact
              </label>
              {isEdit ? (
                <input
                  type="text"
                  name="alternate_contact"
                  value={formData.alternate_contact}
                  onChange={handleChange}
                  className="w-full p-2 mt-1 border rounded-lg focus:ring focus:ring-primary/40 outline-none"
                />
              ) : (
                <p className="text-gray-600">{profileData.alternate_contact}</p>
              )}
            </div>

            <div className="mt-4">
              <label className="block text-gray-700 font-medium">
                Clinic Address
              </label>
              {isEdit ? (
                <input
                  type="text"
                  name="clinic_address"
                  value={formData.clinic_address}
                  onChange={handleChange}
                  className="w-full p-2 mt-1 border rounded-lg focus:ring focus:ring-primary/40 outline-none"
                />
              ) : (
                <p className="text-gray-600">{profileData.clinic_address}</p>
              )}
            </div>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium">
                  Clinic Pincode
                </label>
                {isEdit ? (
                  <input
                    type="text"
                    name="clinic_pincode"
                    value={formData.clinic_pincode}
                    onChange={handleChange}
                    className="w-full p-2 mt-1 border rounded-lg focus:ring focus:ring-primary/40 outline-none"
                  />
                ) : (
                  <p className="text-gray-600">{profileData.clinic_pincode}</p>
                )}
              </div>
              <div>
                <label className="block text-gray-700 font-medium">
                  State
                </label>
                {isEdit ? (
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="w-full p-2 mt-1 border rounded-lg focus:ring focus:ring-primary/40 outline-none"
                  />
                ) : (
                  <p className="text-gray-600">{profileData.state}</p>
                )}
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2">
              <input
                type="checkbox"
                name="is_active"
                checked={formData.is_active}
                onChange={handleChange}
                className="w-5 h-5"
              />
              <label className="text-gray-700 font-medium">Available</label>
            </div>

            <div className="mt-6 flex gap-4">
              {isEdit ? (
                <>
                  <button
                    onClick={updateProfile}
                    className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg shadow hover:bg-primary/80 transition-all"
                  >
                    <FaSave />
                    Save
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg shadow hover:bg-gray-400 transition-all"
                  >
                    <FaTimes />
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEdit(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg shadow hover:bg-primary/80 transition-all"
                >
                  <FaEdit />
                  Edit
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
