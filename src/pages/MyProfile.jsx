import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const MyProfile = () => {
  const [isEdit, setIsEdit] = useState(false);
  const { getCookie,isTokenExpired,refreshAccessToken,backendUrl, userData, setUserData } = useContext(AppContext);
  const [formData, setFormData] = useState(userData);

  useEffect(() => {
    setFormData(userData); // Sync formData with userData when userData changes
  }, [userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Update the formData state
    setFormData({
      ...formData,
      [name]: value,
    });

    // Instantly update the displayed name while typing
    if (name === "firstName" || name === "lastName") {
      setUserData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Function to update user profile data using API
  const updateUserProfileData = async () => {
    try {

      const accessToken = getCookie('access_token');
      console.log(accessToken);
      
      if (!accessToken || isTokenExpired(accessToken)) {
        console.log("Access token expired. Refreshing...");
        await refreshAccessToken(); // Refresh the token
      }
      const updateData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        dob: formData.dob,
        contact: formData.contact,
        address: formData.address,
      };

      const { data } = await axios.put(
        `${backendUrl}/api/user/update-profile/${userData.userId}`,
        updateData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (data.success) {
        toast.success(data.message);
        setIsEdit(false); // Exit edit mode
        setUserData((prev) => ({ ...prev, ...updateData })); // Update userData in context
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Error updating profile"
      );
      console.error("Error updating profile:", error);
    }
  };

  return userData ? (
    <div className="max-w-4xl mx-auto p-4 sm:p-8 bg-gray-50 shadow rounded-lg">
      {/* Name Section */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-2xl font-bold">
          {userData.firstName} {userData.lastName}
        </div>
        <div className="flex-1">
          {isEdit ? (
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                className="w-full sm:w-auto flex-1 p-2 border rounded-lg focus:ring focus:ring-primary/40 outline-none"
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
              <input
                className="w-full sm:w-auto flex-1 p-2 border rounded-lg focus:ring focus:ring-primary/40 outline-none"
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
          ) : (
            <h1 className="text-3xl font-semibold text-gray-800">
              {userData.firstName} {userData.lastName}
            </h1>
          )}
        </div>
      </div>

      <hr className="my-4 border-gray-300" />

      {/* Contact Information */}
      <div>
        <h2 className="text-lg font-medium text-gray-600">Contact Information</h2>
        <div className="mt-2">
          <p className="text-gray-600">
            <strong>Email:</strong> <span className="text-blue-500">{userData.email}</span>
          </p>
          <p className="mt-2">
            <strong>Contact:</strong>
            {isEdit ? (
              <input
                className="w-full sm:w-auto mt-1 p-2 border rounded-lg focus:ring focus:ring-primary/40 outline-none"
                type="text"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
              />
            ) : (
              <span className="text-gray-700 ml-2">{userData.contact}</span>
            )}
          </p>
          <p className="mt-2">
            <strong>Address:</strong>
            {isEdit ? (
              <textarea
                className="w-full mt-1 p-2 border rounded-lg focus:ring focus:ring-primary/40 outline-none"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            ) : (
              <span className="text-gray-700 ml-2">{userData.address}</span>
            )}
          </p>
        </div>
      </div>

      <hr className="my-4 border-gray-300" />

      {/* Basic Information */}
      <div>
        <h2 className="text-lg font-medium text-gray-600">Basic Information</h2>
        <div className="mt-2">
          <p>
            <strong>Birthday:</strong>
            {isEdit ? (
              <input
                className="w-full sm:w-auto mt-1 p-2 border rounded-lg focus:ring focus:ring-primary/40 outline-none"
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
              />
            ) : (
              <span className="text-gray-700 ml-2">{userData.dob}</span>
            )}
          </p>
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-6 flex gap-4">
        {isEdit ? (
          <>
            <button
              onClick={updateUserProfileData}
              className="px-6 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition-all"
            >
              Save Information
            </button>
            <button
              onClick={() => {
                setIsEdit(false);
                setFormData(userData); // Reset form data
              }}
              className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg shadow hover:bg-gray-400 transition-all"
            >
              Cancel Edit
            </button>
          </>
        ) : (
          <button
            onClick={() => setIsEdit(true)}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition-all"
          >
            Edit
          </button>
        )}
      </div>
    </div>
  ) : (
    <p>Loading...</p>
  );
};

export default MyProfile;
