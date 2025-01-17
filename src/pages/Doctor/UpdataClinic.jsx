import React, { useState, useContext } from 'react';
import axios from 'axios';
import { DoctorContext } from '../../context/DoctorContext';
import './UpdateClinic.css';  // Ensure to import the CSS file
import Sidebar from '../../components/Sidebar'
const UpdateClinic = () => {
  const [doctorId, setDoctorId] = useState('');
  const [clinics, setClinics] = useState([]);
  const [selectedClinic, setSelectedClinic] = useState(null);
  const { profileData, setProfileData } = useContext(DoctorContext);
  const [isUpdateVisible, setisUpdateVisible] = useState(false);
  const [cID, setcID] = useState(null);
  const [formData, setFormData] = useState({
    address: '',
    city: '',
    pincode: '',
    state: '',
    fees: '',
    discount_percentage: '',
  });

  const fetchClinics = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/doctor/getclinics/${profileData.doctorId}`);
      if (response.status === 201) {
        setClinics(response.data['clinic list']);
      } else {
        alert('Failed to fetch clinics.');
      }
    } catch (error) {
      console.error('Error fetching clinics:', error);
      alert('An error occurred while fetching clinic details.');
    }
  };

  const handleClinicClick = async (item) => {
    setSelectedClinic(item.address);
    setcID(item.clinicId);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5000/doctor/updateclinics/${cID}`, formData);
      if (response.status === 201) {
        alert('Clinic information updated successfully!');
        setSelectedClinic(null);
        setcID(null);
      } else {
        alert('Failed to update clinic information.');
      }
    } catch (error) {
      console.error('Error updating clinic information:', error);
      alert('An error occurred while updating clinic details.');
    }
  };

  return (
    <>
    <div style={{display:"flex"}}>
      <Sidebar/>
    <div className="update-clinic-container p-4 md:p-8 bg-gray-100 min-h-screen">
      
      <h1 className="text-2xl md:text-4xl font-bold text-center mb-6">Update Clinic Information</h1>

      <button
        onClick={fetchClinics}
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition-all duration-300"
      >
        Select Clinics
      </button>

      {clinics.length > 0 && (
        <div className="clinic-list mt-6">
          <h2 className="text-xl font-semibold mb-4">Clinics</h2>
          <ul className="space-y-2">
            {clinics.map((item, index) => (
              <li key={item.clinicId}>
                <button
                  onClick={() => handleClinicClick(item)}
                  className="clinic-item bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded border border-gray-300 transition-all duration-300"
                >
                  Clinic Address - {item.address}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {selectedClinic && (
        <div className="clinic-form mt-8 bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Update Clinic (ID: {selectedClinic})</h2>
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <label className="block">
              <span className="block font-medium mb-1">Address:</span>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleFormChange}
                required
                className="input-field"
              />
            </label>
            <label className="block">
              <span className="block font-medium mb-1">City:</span>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleFormChange}
                required
                className="input-field"
              />
            </label>
            <label className="block">
              <span className="block font-medium mb-1">Pincode:</span>
              <input
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleFormChange}
                required
                className="input-field"
              />
            </label>
            <label className="block">
              <span className="block font-medium mb-1">State:</span>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleFormChange}
                required
                className="input-field"
              />
            </label>
            <label className="block">
              <span className="block font-medium mb-1">Fees:</span>
              <input
                type="number"
                name="fees"
                value={formData.fees}
                onChange={handleFormChange}
                required
                className="input-field"
              />
            </label>
            <label className="block">
              <span className="block font-medium mb-1">Discount Percentage:</span>
              <input
                type="number"
                name="discount_percentage"
                value={formData.discount_percentage}
                onChange={handleFormChange}
                required
                className="input-field"
              />
            </label>
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded transition-all duration-300 w-full"
            >
              Update Clinic
            </button>
          </form>
        </div>
      )}
    </div>
    </div>
    </>
  );
};


export default UpdateClinic;
