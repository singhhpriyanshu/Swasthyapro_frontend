// src/DoctorRegistration.js

import React, { useState,useContext } from 'react';
import axios from 'axios';
import './DoctorRegistration.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom';






const DoctorRegistration = () => {
  // Define state for all form fields
  const { backendUrl} = useContext(AppContext);
  const navigate=useNavigate()
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    contact: '',
    alternate_contact: '',
    specialization: '',
    years_of_experience: '',
    clinic_address: '',
    clinic_pincode: '',
    state: '',
    available_time_start: '',
    available_time_end: '',
    image: null,
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData((prevData) => ({
        ...prevData,
        image: files[0],
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic client-side validation
    const requiredFields = [
      'first_name',
      'last_name',
      'email',
      'password',
      'contact',
      'specialization',
      'years_of_experience',
      'clinic_address',
      'clinic_pincode',
      'state',
      'available_time_start',
      'available_time_end',
    ];

    for (let field of requiredFields) {
      if (!formData[field]) {
        toast.error(`Please fill the ${field.replace(/_/g, ' ')}`);
        return;
      }
    }

    // Prepare FormData
    const submissionData = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === 'image' && formData.image) {
        submissionData.append(key, formData.image);
      } else {
        submissionData.append(key, formData[key]);
      }
    });

    try {
      // Replace with your actual backend endpoint
      const response = await axios.post(`${backendUrl}/auth/doctor/register`, submissionData,{
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (response.status === 201) {
        toast.success('Doctor registered successfully!');
        // Optionally, reset the form
        setFormData({
          first_name: '',
          last_name: '',
          email: '',
          password: '',
          contact: '',
          alternate_contact: '',
          specialization: '',
          years_of_experience: '',
          clinic_address: '',
          clinic_pincode: '',
          state: '',
          available_time_start: '',
          available_time_end: '',
          image: null,
        });
        navigate('/login')
      }
    } catch (error) {
      if (error.response) {
        // Backend returned an error
        toast.error(error.response.data.error || 'Registration failed!');
      } else {
        // Network or other errors
        toast.error('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="registration-container">
      <h2>Doctor Registration</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        {/* First Name */}
        <div className="form-group">
          <label htmlFor="first_name">First Name<span className="required">*</span></label>
          <input
            type="text"
            id="first_name"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            required
          />
        </div>

        {/* Last Name */}
        <div className="form-group">
          <label htmlFor="last_name">Last Name<span className="required">*</span></label>
          <input
            type="text"
            id="last_name"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            required
          />
        </div>

        {/* Email */}
        <div className="form-group">
          <label htmlFor="email">Email<span className="required">*</span></label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* Password */}
        <div className="form-group">
          <label htmlFor="password">Password<span className="required">*</span></label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        {/* Contact */}
        <div className="form-group">
          <label htmlFor="contact">Contact Number<span className="required">*</span></label>
          <input
            type="tel"
            id="contact"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            required
          />
        </div>

        {/* Alternate Contact */}
        <div className="form-group">
          <label htmlFor="alternate_contact">Alternate Contact Number</label>
          <input
            type="tel"
            id="alternate_contact"
            name="alternate_contact"
            value={formData.alternate_contact}
            onChange={handleChange}
          />
        </div>

        {/* Specialization */}
        <div className="form-group">
          <label htmlFor="specialization">Specialization<span className="required">*</span></label>
          <select
            id="specialization"
            name="specialization"
            value={formData.specialization}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select Specialization
            </option>
            <option value="Gynecologist">Gynecologist</option>
            <option value="General Physician">General Physician</option>
            <option value="Neurologist">Neurologist</option>
            <option value="Oncologist">Oncologist</option>
          </select>
        </div>

        {/* Years of Experience */}
        <div className="form-group">
          <label htmlFor="years_of_experience">Years of Experience<span className="required">*</span></label>
          <input
            type="number"
            id="years_of_experience"
            name="years_of_experience"
            value={formData.years_of_experience}
            onChange={handleChange}
            min="0"
            required
          />
        </div>

        {/* Clinic Address */}
        <div className="form-group">
          <label htmlFor="clinic_address">Clinic Address<span className="required">*</span></label>
          <textarea
            id="clinic_address"
            name="clinic_address"
            value={formData.clinic_address}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        {/* Clinic Pincode */}
        <div className="form-group">
          <label htmlFor="clinic_pincode">Clinic Pincode<span className="required">*</span></label>
          <input
            type="text"
            id="clinic_pincode"
            name="clinic_pincode"
            value={formData.clinic_pincode}
            onChange={handleChange}
            required
          />
        </div>

        {/* State */}
        <div className="form-group">
          <label htmlFor="state">State<span className="required">*</span></label>
          <input
            type="text"
            id="state"
            name="state"
            value={formData.state}
            onChange={handleChange}
            required
          />
        </div>

        {/* Available Time Start */} 
        <div className="form-group">
          <label htmlFor="available_time_start">Available Time Start<span className="required">*</span></label>
          <input
            type="time"
            id="available_time_start"
            name="available_time_start"
            value={formData.available_time_start}
            onChange={handleChange}
            required
          />
        </div>

        {/* Available Time End */}
         <div className="form-group">
          <label htmlFor="available_time_end">Available Time End<span className="required">*</span></label>
          <input
            type="time"
            id="available_time_end"
            name="available_time_end"
            value={formData.available_time_end}
            onChange={handleChange}
            required
          />
        </div>

        {/* Image Upload */}
        <div className="form-group">
          <label htmlFor="image">Profile Image</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleChange}
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="submit-button">Register</button>
      </form>

      {/* Toast Notifications */}
      <ToastContainer />
    </div>
  );
};

export default DoctorRegistration;
