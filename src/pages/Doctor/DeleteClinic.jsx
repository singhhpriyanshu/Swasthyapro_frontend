import React, { useState,useContext } from "react";
import { DoctorContext } from '../../context/DoctorContext'
import axios from "axios";
import './DeleteClinic.css'

 const DeleteClinic=()=> {
  const [clinics, setClinics] = useState([]);
  const [showClinics, setShowClinics] = useState(false); // Controls whether clinics are displayed
      const {profileData,setProfileData}=useContext(DoctorContext);
  

  // Fetch clinics from the backend
  const fetchClinics = async () => {
    try {
        const response = await axios.get(`http://localhost:5000/doctor/getclinics/${profileData.doctorId}`);
        if (response.status === 201) {
            setClinics(response.data['clinic list']);
            console.log(clinics);
            setShowClinics(true);
        } else {
            alert('Failed to fetch clinics.');
        }
    } catch (error) {
        console.error('Error fetching clinics:', error);
        alert('An error occurred while fetching clinic details.');
    }
};


  // Delete a clinic
  const deleteClinic = async (clinicId) => {
    try {
      await axios.delete(`http://localhost:5000/doctor/deleteclinics/${clinicId}`); // Backend delete endpoint
      setClinics((prevClinics) =>
        prevClinics.filter((clinic) => clinic.clinicId !== clinicId)
      );
      alert("Clinic deleted successfully!");
    } catch (error) {
      console.error("Error deleting clinic:", error);
      alert(
        error.response?.data?.error || "An error occurred while deleting the clinic."
      );
    }
  };

  // Handle delete button click
  const handleDeleteClick = (clinic) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete clinic: ${clinic.address}?`
    );
    if (confirmDelete) {
      deleteClinic(clinic.clinicId);
    }
  };

  return (
    <div className="delete">
      <h1>Manage Clinics</h1>

      {/* Button to fetch and display clinics */}
      {!showClinics && (
        <button
          onClick={fetchClinics}
          style={{
            backgroundColor: "#007BFF",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Remove Clinic
        </button>
      )}

      {/* Display clinics if showClinics is true */}
      {showClinics && (
        <div className="remove" style={{ marginTop: "20px" }}>
          {clinics.length === 0 ? (
            <p id="id1">No clinics available.</p>
          ) : (
            clinics.map((clinic) => (
              <div
                key={clinic.clinicId}
                style={{
                  margin: "10px 0",
                  padding: "15px",
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  backgroundColor: "#f9f9f9",
                }}
              >
                <p id="id2">Address : {clinic.address}</p>
                <button
                  onClick={() => handleDeleteClick(clinic)}
                  style={{
                    backgroundColor: "#e63946",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    padding: "8px 12px",
                    cursor: "pointer",
                  }}
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default DeleteClinic;
