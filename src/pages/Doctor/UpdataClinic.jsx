import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { DoctorContext } from '../../context/DoctorContext';
import './UpdateClinic.css';
import Sidebar from '../../components/Sidebar';

const UpdateClinic = () => {
  const [clinics, setClinics] = useState([]);
  const [selectedClinic, setSelectedClinic] = useState(null);
  const { profileData } = useContext(DoctorContext);
  const [cID, setcID] = useState(null);
  const [formData, setFormData] = useState({
    address: '',
    city: '',
    pincode: '',
    state: '',
    fees: '',
    discount_percentage: '',
  });

  useEffect(() => {
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

    fetchClinics();
  }, [profileData.doctorId]);

  const handleClinicClick = (item) => {
    setSelectedClinic(item.address);
    setcID(item.clinicId);
    setFormData({
      address: item.address || '',
      city: item.city || '',
      pincode: item.pincode || '',
      state: item.state || '',
      fees: item.fees || '',
      discount_percentage: item.discount_percentage || '',
    });
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
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div className="update-clinic-container p-4 md:p-8 bg-gray-100 min-h-screen">
        <h1 className="text-2xl md:text-4xl font-bold text-center mb-6">Update Clinic Information</h1>

        {clinics.length > 0 ? (
          <div className="clinic-list mt-6">
            <h2 className="text-xl font-semibold mb-4">Clinics</h2>
            <ul className="space-y-2">
              {clinics.map((item) => (
                <li key={item.clinicId}>
                  <button
                    onClick={() => handleClinicClick(item)}
                    className="clinic-item bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded border border-gray-300 transition-all duration-300 w-full text-left"
                  >
                    Clinic Address - {item.address}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="text-gray-500 text-center mt-6">No clinics available to display.</p>
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
  );
};

export default UpdateClinic;
