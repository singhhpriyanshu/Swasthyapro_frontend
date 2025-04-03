import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-toastify";
import Sidebar from "../../components/Sidebar";

const DoctorProfile = () => {
  const { profileData, setProfileData } = useContext(DoctorContext);
  const { getCookie,isTokenExpired,refreshAccessToken,backendUrl } = useContext(AppContext);

  const [isEdit, setIsEdit] = useState(false);
  const [formData, setFormData] = useState(profileData || {});

  useEffect(() => {
    if (profileData) {
      setFormData(profileData);
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
      const accessToken = getCookie('access_token');
      console.log(accessToken);
      
      if (!accessToken || isTokenExpired(accessToken)) {
        console.log("Access token expired. Refreshing...");
        await refreshAccessToken(); // Refresh the token
      }
      const updateData = {
        firstName: formData.firstName,
        last_name: formData.last_name,
        alternate_contact: formData.alternate_contact,
        is_active: formData.is_active,
        address: formData.address,
        doc_about: formData.doc_about,
        pincode: formData.pincode,
        state: formData.state,
        city: formData.city,
        description: formData.description,
        degree: formData.degree,
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
        // Update the global profile data
        setProfileData((prev) => ({ ...prev, ...updateData }));
      } else {
        toast.error(data.message || "Failed to update profile");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "An error occurred updating profile"
      );
    }
  };

  const cancelEdit = () => {
    setFormData(profileData); // revert changes
    setIsEdit(false);
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar on the left */}
      <Sidebar />

      {/* Main content on the right */}
      <div className="flex-1 p-4 md:p-6 bg-gray-100">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Doctor Profile</h1>

        <div className="bg-white rounded-lg shadow p-4 md:p-6 flex flex-col md:flex-row gap-6">
          {/* Profile Image */}
          <div className="flex-shrink-0 flex justify-center md:justify-start">
            <img
              className="w-32 h-32 md:w-48 md:h-48 rounded object-cover border border-gray-300"
              src={profileData?.image_url}
              alt="Doctor"
            />
          </div>

          {/* Profile Fields */}
          <div className="flex-1">
            {/* Name & Email */}
            <div className="mb-4">
              {isEdit ? (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName || ""}
                    onChange={handleChange}
                    className="border-b border-gray-300 focus:outline-none text-xl font-semibold"
                  />
                  <input
                    type="text"
                    name="last_name"
                    value={formData.last_name || ""}
                    onChange={handleChange}
                    className="border-b border-gray-300 focus:outline-none text-xl font-semibold"
                  />
                </div>
              ) : (
                <h2 className="text-xl font-semibold text-gray-700">
                  {profileData?.firstName} {profileData?.last_name}
                </h2>
              )}
              <p className="text-sm text-gray-500 mt-1">
                {profileData?.email || "No email found"}
              </p>
            </div>

            {/* Single-Column Responsive Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Alternate Contact */}
              <div>
                <label className="block text-sm text-gray-600 font-medium">
                  Alternate Contact
                </label>
                {isEdit ? (
                  <input
                    type="text"
                    name="alternate_contact"
                    value={formData.alternate_contact || ""}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded mt-1"
                  />
                ) : (
                  <p className="mt-1 text-gray-700">
                    {profileData?.alternate_contact || "Not Available"}
                  </p>
                )}
              </div>

              {/* Degree */}
              <div>
                <label className="block text-sm text-gray-600 font-medium">
                  Degree
                </label>
                {isEdit ? (
                  <input
                    type="text"
                    name="degree"
                    value={formData.degree || ""}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded mt-1"
                  />
                ) : (
                  <p className="mt-1 text-gray-700">
                    {profileData?.degree || "Not Available"}
                  </p>
                )}
              </div>

              {/* Description */}
              <div className="sm:col-span-2">
                <label className="block text-sm text-gray-600 font-medium">
                  Description
                </label>
                {isEdit ? (
                  <textarea
                    name="description"
                    value={formData.description || ""}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded mt-1"
                  />
                ) : (
                  <p className="mt-1 text-gray-700 whitespace-pre-line">
                    {profileData?.description || "Not Available"}
                  </p>
                )}
              </div>

              {/* Doctor About */}
              <div className="sm:col-span-2">
                <label className="block text-sm text-gray-600 font-medium">
                  Doctor About
                </label>
                {isEdit ? (
                  <textarea
                    name="doc_about"
                    value={formData.doc_about || ""}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded mt-1"
                  />
                ) : (
                  <p className="mt-1 text-gray-700 whitespace-pre-line">
                    {profileData?.doc_about || "Not Available"}
                  </p>
                )}
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm text-gray-600 font-medium">
                  Address
                </label>
                {isEdit ? (
                  <input
                    type="text"
                    name="address"
                    value={formData.address || ""}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded mt-1"
                  />
                ) : (
                  <p className="mt-1 text-gray-700">
                    {profileData?.address || "Not Available"}
                  </p>
                )}
              </div>

              {/* Pincode */}
              <div>
                <label className="block text-sm text-gray-600 font-medium">
                  Pincode
                </label>
                {isEdit ? (
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode || ""}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded mt-1"
                  />
                ) : (
                  <p className="mt-1 text-gray-700">
                    {profileData?.pincode || "Not Available"}
                  </p>
                )}
              </div>

              {/* City */}
              <div>
                <label className="block text-sm text-gray-600 font-medium">
                  City
                </label>
                {isEdit ? (
                  <input
                    type="text"
                    name="city"
                    value={formData.city || ""}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded mt-1"
                  />
                ) : (
                  <p className="mt-1 text-gray-700">
                    {profileData?.city || "Not Available"}
                  </p>
                )}
              </div>

              {/* State */}
              <div>
                <label className="block text-sm text-gray-600 font-medium">
                  State
                </label>
                {isEdit ? (
                  <input
                    type="text"
                    name="state"
                    value={formData.state || ""}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded mt-1"
                  />
                ) : (
                  <p className="mt-1 text-gray-700">
                    {profileData?.state || "Not Available"}
                  </p>
                )}
              </div>

              {/* Active Checkbox */}
              <div className="flex items-center gap-2 sm:col-span-2">
                <input
                  type="checkbox"
                  name="is_active"
                  checked={formData.is_active || false}
                  onChange={handleChange}
                  className="w-5 h-5"
                />
                <label className="text-sm text-gray-600 font-medium">
                  Available
                </label>
              </div>
            </div>

            {/* Edit / Save / Cancel Buttons */}
            <div className="mt-6 flex gap-4">
              {isEdit ? (
                <>
                  <button
                    onClick={updateProfile}
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                  >
                    Save
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEdit(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
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
