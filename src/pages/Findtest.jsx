import React, { useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

// Import images
import BRCA from '../assets/BRCA.jpg';
import BRCA1and2 from '../assets/BRCA1and2.jpg';
import carrierscreening from '../assets/carrierscreening.jpeg';
import cerebralpalsy from '../assets/cerebralpalsy.jpg';
import cervical_cancer_ from '../assets/cervical_cancer_.jpg';
import cervical_cancer_main from '../assets/cervical_cancer_main.jpg';
import Cervical_Cancer_Screening from '../assets/Cervical_Cancer_Screening.jpg';
import nipt from '../assets/nipt.jpg';
import ctlung from '../assets/ctlung.jpg';

const FindTest = () => {
  const [facilities, setFacilities] = useState([]);
  const { backendUrl } = useContext(AppContext);
  const navigate = useNavigate();

  // State to control modal visibility
  const [modalOpen, setModalOpen] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    address: ''
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch facilities on mount
  useEffect(() => {
    fetchFacilities();
  }, []);

  const fetchFacilities = async () => {
    try {
      const response = await axios.get('http://localhost:5000/admin/getfacilityheader');
      if (response.data && response.data['facility list']) {
        setFacilities(response.data['facility list']);
      }
    } catch (error) {
      console.error("Failed to fetch facilities:", error);
    }
  };

  const handleCardClick = (id) => {
    navigate(`/facility/${id}`);
  };

  // Form input change handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  // File input change handler
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Create FormData object
      const submitData = new FormData();
      Object.keys(formData).forEach((key) => {
        submitData.append(key, formData[key]);
      });
      if (file) {
        submitData.append('prescription', file);
      }

      // API call
      const response = await axios.post(`${backendUrl}/bookByprescription/`, submitData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (response.data) {
        toast.success('Prescription submitted successfully!');
        // Reset form data
        setFormData({
          name: '',
          contact: '',
          address: ''
        });
        setFile(null);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error submitting form');
    } finally {
      setLoading(false);
      setModalOpen(false); // close modal after submission
    }
  };

  // Array of images for facility cards
  const facilityImages = [
    BRCA,
    BRCA1and2,
    carrierscreening,
    cerebralpalsy,
    cervical_cancer_,
    cervical_cancer_main,
    Cervical_Cancer_Screening,
    ctlung,
    nipt
  ];

  return (
    <div>
      {/* Facility Cards */}
      <div className="flex flex-wrap justify-center items-center p-4 gap-4">
        {facilities.map((facility, index) => {
          const imageSrc =
            index < facilityImages.length
              ? facilityImages[index]
              : facilityImages[facilityImages.length - 1];
          return (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg w-64 cursor-pointer overflow-hidden transition-transform transform hover:scale-105"
              onClick={() => handleCardClick(facility.facilityId)}
            >
              <img
                src={imageSrc}
                alt={facility.facilityName}
                className="w-full h-40 object-cover"
              />
              <h3 className="text-lg font-bold text-center p-2">
                {facility.facilityName}
              </h3>
            </div>
          );
        })}
      </div>

      {/* Upload Prescription Button */}
      <div className="text-center mt-4">
        <button
          onClick={() => setModalOpen(true)}
          className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Upload Prescription
        </button>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="bg-white rounded-lg shadow-lg p-8 relative w-full max-w-md mx-4"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
          >
            {/* Close button */}
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 text-xl"
              onClick={() => setModalOpen(false)}
            >
              &times;
            </button>

            <h2 className="text-2xl font-bold mb-4 text-center">Upload Prescription</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label htmlFor="contact" className="block text-sm font-medium text-gray-700 mb-1">
                  Contact
                </label>
                <input
                  type="tel"
                  id="contact"
                  name="contact"
                  value={formData.contact}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your contact number"
                />
              </div>

              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  rows="3"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                  placeholder="Enter your address"
                />
              </div>

              <div>
                <label htmlFor="fileInput" className="block text-sm font-medium text-gray-700 mb-1">
                  Upload File
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="fileInput"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="fileInput"
                          name="file"
                          type="file"
                          onChange={handleFileChange}
                          className="sr-only"
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      {file ? file.name : 'No file selected'}
                    </p>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  loading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {loading ? 'Submitting...' : 'Submit'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FindTest;
