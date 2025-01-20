import React, { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";
import Sidebar from "../../components/Sidebar";

const DoctorProfile = () => {
  const { profileData, setProfileData } = useContext(DoctorContext);
  const { backendUrl } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);
  const [formData, setFormData] = useState(profileData || {});

  useEffect(() => {
    if (profileData) {
      setFormData(profileData); // Ensure formData is set on initial render
    }
  }, [profileData]);

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
        firstName: formData.firstName,
        last_name: formData.last_name,
        state: formData.state,
        alternate_contact: formData.alternate_contact,
        is_active: formData.is_active,
      };

      const { data } = await axios.put(
        `${backendUrl}/api/doctor/update-profile/${profileData.doctorId}`,
        updateData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (data.success) {
        toast.success("Profile updated successfully!");
        setIsEdit(false);
        setProfileData((prev) => ({ ...prev, ...updateData })); // Update global context
      } else {
        toast.error(data.message || "Failed to update profile");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error updating profile");
    }
  };

  const cancelEdit = () => {
    setFormData(profileData); // Reset to original data
    setIsEdit(false);
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar className="w-full lg:w-64 transition-all duration-300" />
      <div className="flex-1 p-5 bg-gray-100 min-h-screen">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          {/* Doctor's Image */}
          <div>
            <img
              className="w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 rounded object-contain"
              src={profileData?.image_url}
              alt={`${profileData?.firstName || ""} ${profileData?.last_name || ""}`}
            />
          </div>
          {/* Editable Doctor Details */}
          <div className="bg-gradient-to-r from-cyan-100 to-cyan-300 w-full sm:flex-1 bg-white p-4 sm:p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
            <p className="text-xl sm:text-2xl font-bold text-gray-700 flex items-center gap-2">
              {isEdit ? (
                <>
                  <input
                    className="text-xl font-bold text-gray-700 border-b border-gray-300 focus:outline-none"
                    onChange={handleChange}
                    type="text"
                    name="firstName"
                    value={formData.firstName || ""}
                  />
                  <input
                    className="text-xl font-bold text-gray-700 border-b border-gray-300 focus:outline-none"
                    onChange={handleChange}
                    type="text"
                    name="last_name"
                    value={formData.last_name || ""}
                  />
                </>
              ) : (
                `${profileData.firstName || ""} ${profileData.last_name || ""}`
              )}
            </p>
            <p className="text-gray-600 mt-1 text-sm sm:text-base">
              {profileData?.specialization}
            </p>
            <p className="mt-1 flex items-center gap-2 text-gray-600 text-sm sm:text-base">
              <span className="py-1 px-3 bg-primary/20 text-primary text-xs rounded-full">
                {profileData?.yearsOfExperience} Years
              </span>
            </p>
            <p>{profileData.email}</p>


            {/* Editable Fields */}
            <div className="mt-4">
              <label className="block text-gray-700 font-medium text-sm sm:text-base">
                Alternate Contact
              </label>
              {isEdit ? (
                <input
                  type="text"
                  name="alternate_contact"
                  value={formData.alternate_contact || ""}
                  onChange={handleChange}
                  className="w-full p-2 mt-1 border rounded-lg focus:ring focus:ring-primary/40 outline-none"
                />
              ) : (
                <p className="text-gray-600 text-sm sm:text-base">
                  {profileData?.alternate_contact || "Not Available"}
                </p>
              )}
            </div>

            <div className="mt-4">
              <label className="block text-gray-700 font-medium text-sm sm:text-base">
                State
              </label>
              {isEdit ? (
                <input
                  type="text"
                  name="state"
                  value={formData.state || ""}
                  onChange={handleChange}
                  className="w-full p-2 mt-1 border rounded-lg focus:ring focus:ring-primary/40 outline-none"
                />
              ) : (
                <p className="text-gray-600 text-sm sm:text-base">
                  {profileData?.state || "Not Available"}
                </p>
              )}
            </div>

            <div className="mt-4 flex items-center gap-2">
              <input
                type="checkbox"
                name="is_active"
                checked={formData.is_active || false}
                onChange={handleChange}
                className="w-5 h-5"
              />
              <label className="text-gray-700 font-medium text-sm sm:text-base">
                Available
              </label>
            </div>

            <div className="mt-6 flex flex-wrap gap-4">
              {isEdit ? (
                <>
                  <button
                    onClick={updateProfile}
                    className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg shadow hover:bg-primary/80 transition-all"
                  >
                    Save
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg shadow hover:bg-gray-400 transition-all"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEdit(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg shadow hover:bg-primary/80 transition-all"
                >
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
