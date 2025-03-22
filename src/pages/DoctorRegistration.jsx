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
    is_active:'',
    state: '',
    available_time_start: '',
    available_time_end: '',
    image: null,
    degree: '',
    description: '',
    doc_about: '',
    address: '',
    pincode: '',
    city: '',
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, files ,type,checked} = e.target;
    if (name === 'image') {
      setFormData((prevData) => ({
        ...prevData,
        image: files[0],
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: type === 'checkbox' ? checked : value
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
      'is_active',
      'state',
      'available_time_start',
      'available_time_end',
      'degree',
    'description',
    'doc_about',
    'address',
    'pincode',
    'city'
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
      const response = await axios.post(`${backendUrl}/api/auth/doctor/register`, submissionData,{
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
          is_active:'',
          state: '',
          available_time_start: '',
          available_time_end: '',
          image: null,
          degree: '',
    description: '',
    doc_about: '',
    address: '',
    pincode: '',
    city: '',

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
        <div className="form-group">
          <label htmlFor="degree">Degree<span className="required">*</span></label>
          <input
            type="text"
            id="degree"
            name="degree"
            value={formData.degree}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description<span className="required">*</span></label>
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="doc_about">Doctor About<span className="required">*</span></label>
          <input
            type="text"
            id="doc_about"
            name="doc_about"
            value={formData.doc_about}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address<span className="required">*</span></label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="pincode">Pincode<span className="required">*</span></label>
          <input
            type="text"
            id="pincode"
            name="pincode"
            value={formData.pincode}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="city">City<span className="required">*</span></label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="Is_active">Mark Active Status<span className="required">*</span></label>
          <input
            type="checkbox"
            id="is_active"
            name="is_active"
            checked={formData.is_active}
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
