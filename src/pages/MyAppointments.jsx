import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import DatePicker from "react-datepicker";
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';

const MyAppointments = () => {
  const { backendUrl, token, userData } = useContext(AppContext);
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(new Date());
  const [appointments, setAppointments] = useState([]);
  const [payment, setPayment] = useState('');
  const [isUpdate, setUpdate] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);

  const [showConfirmPopup, setShowConfirmPopup] = useState(false);

  const fetchAppointments = async () => {
    try {
      const { data } = await axios.get(`http://localhost:5000/api/appointments?userId=${userData.userId}`);
      if (data.success) {
        setAppointments(data.appointments);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Error fetching appointments:", error.message);
    }
  };

  const cancelAppointment = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/appointments/delete/${id}`);
      if (response.data.Success) {
        toast.success(response.data.Success);
        setShowConfirmPopup(false); // Close the popup
      } else {
        toast.error(response.data.Error || "Failed to cancel the appointment.");
      }
    } catch (error) {
      console.error("Error cancelling appointment:", error);
      toast.error("Failed to cancel the appointment. Please try again.");
    }
  };

  useEffect(() => {
    if (userData) {
      fetchAppointments();
    }
  }, fetchAppointments());

  return (
    <div className="px-4 sm:px-8 py-6">
      <p className="pb-3 mt-12 text-lg font-medium text-gray-600 border-b">My Appointments</p>
      <div className="mt-6">
        {appointments.map((item, index) => (
          <div key={index} className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-4 border-b">
            <div>
              <img className="w-36 bg-[#EAEFFF] rounded-md shadow-lg transition-all duration-300 hover:scale-105" src={item.doctor.image_url} alt="Doctor" />
            </div>
            <div className="flex-1 text-sm text-[#5E5E5E]">
              <p className="font-medium">{item.doctor.name}</p>
              <p>{item.doctor.specialty}</p>
              <p className="text-[#464646] font-medium mt-1">Address:</p>
              <p>{item.appointment_location}</p>
              <p className="mt-1"><span className="text-sm text-[#3C3C3C] font-medium">Date & Time:</span> {item.appointment_time}</p>
            </div>
            <div className="flex flex-col gap-2 justify-end text-sm text-center">
              {/* <button onClick={() => setUpdate(true)} className="text-[#696969] sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300 transform hover:scale-105">Update Appointment</button> */}
              <button onClick={() => setShowConfirmPopup(true)} className="text-[#696969] sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300 transform hover:scale-105">Cancel Appointment</button>
              {showConfirmPopup && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center transition-all duration-500 opacity-100">
                  <div className="bg-white rounded-lg p-6 shadow-lg w-11/12 max-w-sm transition-all duration-300 transform scale-100">
                    <h2 className="text-lg font-bold mb-4">Confirm Cancellation</h2>
                    <p className="mb-6">Are you sure you want to cancel this appointment?</p>

                    <div className="flex justify-between">
                      <button
                        onClick={() => { cancelAppointment(item.id); }}
                        className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 transition-all duration-300"
                      >
                        Yes, Cancel
                      </button>
                      <button
                        onClick={() => setShowConfirmPopup(false)}
                        className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-700 transition-all duration-300"
                      >
                        No, Go Back
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointments;
