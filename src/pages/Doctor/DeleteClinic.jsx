import React, { useState, useContext } from "react";
import { DoctorContext } from '../../context/DoctorContext';
import axios from "axios";
import './DeleteClinic.css';
import { AppContext } from '../../context/AppContext';

import Sidebar from '../../components/Sidebar'

const DeleteClinic = () => {
  const [clinics, setClinics] = useState([]);
  const [showClinics, setShowClinics] = useState(false);
  const { profileData } = useContext(DoctorContext);
  const {getCookie,isTokenExpired,refreshAccessToken, backendUrl,token, setToken, userData, setUserData, cart } = useContext(AppContext);
   

  const fetchClinics = async () => {
    try {
      let access_token = localStorage.getItem('access_token');
  
      if (!access_token || isTokenExpired(access_token)) {
        console.log("Access token expired. Refreshing...");
        await refreshAccessToken(); // Refresh the token
        access_token = localStorage.getItem('access_token'); // 🔁 Get updated token!
      }
      const response = await axios.get(`${backendUrl}/api/doctor/getclinics/${profileData.doctorId}`, // body
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });
      if (response.status === 201) {
        setClinics(response.data['clinic list']);
        setShowClinics(true);
      } else {
        alert('Failed to fetch clinics.');
      }
    } catch (error) {
      console.error('Error fetching clinics:', error);
      alert('An error occurred while fetching clinic details.');
    }
  };

  const deleteClinic = async (clinicId) => {
    try {
      let access_token = localStorage.getItem('access_token');
  
      if (!access_token || isTokenExpired(access_token)) {
        console.log("Access token expired. Refreshing...");
        await refreshAccessToken(); // Refresh the token
        access_token = localStorage.getItem('access_token'); // 🔁 Get updated token!
      }
      await axios.delete(`${backendUrl}/api/doctor/deleteclinics/${clinicId}`,  // body
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });
      setClinics((prevClinics) => prevClinics.filter((clinic) => clinic.clinicId !== clinicId));
      alert("Clinic deleted successfully!");
    } catch (error) {
      console.error("Error deleting clinic:", error);
      alert(error.response?.data?.error || "An error occurred while deleting the clinic.");
    }
  };

  const handleDeleteClick = (clinic) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete clinic: ${clinic.address}?`);
    if (confirmDelete) {
      deleteClinic(clinic.clinicId);
    }
  };

  return (
    <dev style={{display:"flex"}}>
            {/* <Sidebar/> */}
    <div className="delete-clinic-container">
      <h1>Manage Clinics</h1>
      {!showClinics && (
        <button className="fetch-button" onClick={fetchClinics}>
          Select Clinic
        </button>
      )}
      {showClinics && (
        <div className="clinic-cards">
          {clinics.length === 0 ? (
            <p>No clinics available.</p>
          ) : (
            clinics.map((clinic) => (
              <div key={clinic.clinicId} className="clinic-card">
                <p><strong>Address:</strong> {clinic.address}</p>
                <button className="delete-button" onClick={() => handleDeleteClick(clinic)}>
                  Remove
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
    </dev>
  );
};

export default DeleteClinic;
