import React, { useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

// Import images
import Braca12 from '../assets/Braca12.jpg';
import double_marker from '../assets/double_marker.jpg';
import preimplantation_test_header from '../assets/preimplantation_test_header.jpg';
import senior_citizen_health_packages from '../assets/senior_citizen_health_packages.jpg';
import germ_line_mutation_test from '../assets/germ_line_mutation_test.jpg';
import cervical_cancer_main from '../assets/cervical_cancer_main.jpg';
import Cervical_Cancer_Screening from '../assets/Cervical_Cancer_Screening.jpg';
import nipt from '../assets/nipt.jpg';
import ctlung from '../assets/ctlung.jpg';
import infectious_diseases from '../assets/infectious_diseases.jpg';
import Routine_Health_Check_ups from '../assets/Routine_Health_Check_ups.png';

const FindTest = () => {
  const [facilities, setFacilities] = useState([]);
  const {getCookie,isTokenExpired,refreshAccessToken, backendUrl } = useContext(AppContext);
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
  const [consentChecked, setConsentChecked] = useState(false);

  // Fetch facilities on mount
  useEffect(() => {
    fetchFacilities();
  }, []);

  const fetchFacilities = async () => {
    try {
      const response = await axios.get('https://www.swasthyapro.com/api/admin/getfacilityheader');
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
      let access_token = localStorage.getItem('access_token');
  
      if (!access_token || isTokenExpired(access_token)) {
        console.log("Access token expired. Refreshing...");
        await refreshAccessToken(); // Refresh the token
        access_token = localStorage.getItem('access_token'); // 🔁 Get updated token!
      }
        const submitData = new FormData();
        Object.keys(formData).forEach((key) => {
          submitData.append(key, formData[key]);
        });
        if (file) {
          submitData.append('prescription', file);
        }
  
        // API call
        const response = await axios.post(`${backendUrl}/api/bookByprescription/`, submitData, {
          headers: { 'Content-Type': 'multipart/form-data',
                      Authorization: `Bearer ${access_token}`
           },
          
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
    Routine_Health_Check_ups,
    infectious_diseases,
    nipt,
    Braca12,
    ctlung,
    Cervical_Cancer_Screening,
    preimplantation_test_header,
    double_marker,
    germ_line_mutation_test,
    senior_citizen_health_packages,
  ];

  const handleConsentChange = (e) => {
    setConsentChecked(e.target.checked);
  };

  return (
    <div style={{marginTop:-48,}} >
       {/* Upload Prescription Button */}
       <div className="flex justify-center items-center gap-6 p-4  rounded-lg">
  <h2 className="text-3xl font-200 text-green-700">One upload, all your health details!</h2>
  <button
    onClick={() => setModalOpen(true)}
    className="px-6 py-3 bg-green-600 text-white font-10 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
  >
    Upload Prescription
  </button>
</div>


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
              <h3 className="text-lg font-bold text-center p-2" style={{fontSize:15}}>
                {facility.facilityName}
              </h3>
            </div>
          );
        })}
      </div>

     

      {/* Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 "
          onClick={() => setModalOpen(false)}
        >
          <div
            className="bg-white rounded-lg shadow-lg p-8 relative w-full max-w-2xl mx-4 h-screen overflow-y-auto"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
          >
            {/* Close button */}
           


            <form onSubmit={handleSubmit} className="space-y-6 mt-10">
            <h2 className="text-2xl font-bold mb-4 text-green-600 text-center">Upload Prescription</h2>

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
                  // disabled={!consentChecked}
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
                  // disabled={!consentChecked}
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
                  // disabled={!consentChecked}
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
                          // disabled={!consentChecked}
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
              <div
  className="p-4 border border-gray-300 rounded-md h-20 w-400 overflow-y-auto"
>
  <p>Dear User,</p>
  <p>For a seamless experience, our support team may assist you in booking your test and ensuring smooth report delivery. However, to protect your privacy, your prescription and test report remain encrypted by default and can only be accessed with your explicit approval.</p>
  <p>&#x1F4C3; Consent Terms</p>
  <p>&#10004; Purpose of Access:</p>
  <p>&#8226; The support team may request temporary access only to assist with test booking or report-related queries if required.</p>
  <p>&#10004; Encryption & Security:</p>
  <p>&#8226; Your prescription and test reports are securely encrypted by default.</p>
  <p>&#8226; The support team cannot access them without your explicit approval via OTP or on-call consent.</p>
  <p>&#10004; Temporary & Limited Viewing:</p>
  <p>&#8226; Access is temporary and will be automatically restricted after test booking or issue resolution.</p>
  <p>&#8226; No data will be stored, copied, or shared.</p>
  <p>&#10004; Access Logging & Transparency:</p>
  <p>&#8226; Every decryption request is logged for audit & security purposes.</p>
  <p>&#10004; User Rights:</p>
  <p>&#8226; You have the right to request permanent deletion of all stored data at any time.</p>
  <p>&#10004; Third-Party Disclosure:</p>
  <p>&#8226; Your prescription and reports will not be shared with any third party without your explicit consent.</p>
  <p>________________________________________</p>
  <p>&#x2709; User Action Required</p>
  <p>(By proceeding, you acknowledge that you have read and agreed to this data access policy.)</p>
</div>

<div className="flex justify-center mt-4">
              <input
                type="checkbox"
                id="consent"
                checked={consentChecked}
                onChange={handleConsentChange}
              />
              <label htmlFor="consent" className="ml-2">
                I agree to the terms and conditions
              </label>
            </div>


             <button
  type="submit"
  disabled={loading || !consentChecked}
  className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
    loading || !consentChecked ? 'bg-gray-300' : 'bg-blue-600 hover:bg-blue-700'
  } focus:outline-none focus:ring-2 focus:ring-blue-500 ${
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