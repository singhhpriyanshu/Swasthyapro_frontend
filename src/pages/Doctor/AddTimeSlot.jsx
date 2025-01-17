import React, { useState,useContext } from "react";
import axios from "axios";
import "./AddTimeSlot.css";
import { DoctorContext } from '../../context/DoctorContext'


const AddTimeSlot = () => {
    const [clinics, setClinics] = useState([]);
    const {profileData,setProfileData}=useContext(DoctorContext);
    
    const [selectedClinic, setselectedClinic] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        slot_date: "",
        slot_start_time: "",
        slot_end_time: "",
        status: "",
    });
    const [isClinicsVisible, setClinicsVisible] = useState(false); // Controls visibility of clinic list

    // Fetch clinics associated with the doctor
    const fetchClinics = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/doctor/getclinics/${profileData.doctorId}`);
            if (response.status === 201) {
                setClinics(response.data['clinic list']);
                setClinicsVisible(true);
                console.log(clinics);
                
            } else {
                alert('Failed to fetch clinics.');
            }
        } catch (error) {
            console.error('Error fetching clinics:', error);
            alert('An error occurred while fetching clinic details.');
        }
    };

    // Open the modal for a selected clinic
    const handleSelectClinic = (clinic) => {
        console.log(clinic);
        
        setselectedClinic(clinic)
        setShowModal(true);
        
        
       
    };

    // Handle form input changes
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Submit the form data to the backend
    const handleSubmit = async () => {
        if (
            !formData.slot_date ||
            !formData.slot_start_time ||
            !formData.slot_end_time ||
            !formData.status
        ) {
            alert("All fields are required.");
            return;
        }

        try {
            const response = await axios.post(
                `http://localhost:5000/doctor/addtime/${selectedClinic.clinicId}`,
                formData
            );
            alert("Time slot added successfully!");
            setShowModal(false); // Close the modal after submission
            setFormData({ slot_date: "", slot_start_time: "", slot_end_time: "", status: "" });
        } catch (error) {
            console.error("Error adding time slot:", error);
            alert(
                error.response?.data?.error || "An error occurred while adding the time slot."
            );
        }
    };
    return (
        
          <div className="container">
            <div className="manage-clinic-container">

            {/* Button to fetch and display clinics */}
            <button
                onClick={fetchClinics}
            >
                Manage Clinic Time Slots
            </button>

            {/* Show clinics after fetching */}
            {isClinicsVisible && (
                <div id="time-slot">
                    <h2>Select a clinic to manage time slots:</h2>
                    {clinics.length === 0 ? (
                        <p>No clinics available.</p>
                    ) : (
                        clinics.map((clinic) => (
                            <div
                                key={clinic.clinicId}
                                className="clinic-card"
                                onClick={() => handleSelectClinic(clinic)}
                            >
                                <p>{clinic.address}</p>
                            </div>
                        ))
                    )}
                </div>
            )}

            {/* Modal for adding time slots */}
            { showModal && (
                <div>
                    <div className="">
                        <h2>Add Time Slot</h2>
                        <form>
                            <div>
                                <label>Select Date:</label>
                                <input
                                    type="date"
                                    name="slot_date"
                                    value={formData.slot_date}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label>Start Time:</label>
                                <input
                                    type="time"
                                    name="slot_start_time"
                                    value={formData.slot_start_time}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label>End Time:</label>
                                <input
                                    type="time"
                                    name="slot_end_time"
                                    value={formData.slot_end_time}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label>Status:</label>
                                <select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                >
                                    <option value="">Select Status</option>
                                    <option value="Available">Available</option>
                                    <option value="Not Available">Not Available</option>
                                </select>
                            </div>
                            <button  id="btn" type="button" onClick={handleSubmit}>
                                Submit
                            </button>
                        </form>
                        <button id="btn-cancel" className="cancel-button" onClick={() => setShowModal(false)}>
                            Cancel
                        </button>
                    </div>
                </div>
            )}
            </div>
        </div>
       
    
    
    


  






)}

export default AddTimeSlot;