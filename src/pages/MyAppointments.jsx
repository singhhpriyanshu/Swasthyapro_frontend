import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

import { MdLocationOn, MdAccessTime, MdEvent } from 'react-icons/md'; // Icons for location, date, and time

const MyAppointments = () => {
  const { backendUrl, token, userData } = useContext(AppContext);
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const { data } = await axios.get(`${backendUrl}/user/appointments/get/${userData.userId}`,
           );
        if (data) {
          setAppointments(data.appointments);
          console.log(appointments,"jkjkj");
          
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error("Failed to fetch appointments. Please try again.");
      }
    };

    if (userData) {
      fetchAppointments();
    }
  }, [userData]);

  const cancelAppointment = async (id) => {
    try {
      const response = await axios.delete(`${backendUrl}/appointments/delete/${id}`);
      if (response.data.Success) {
        toast.success(response.data.Success);
        setShowConfirmPopup(false);
        // fetchAppointments(); // Refresh list after cancellation
      } else {
        toast.error(response.data.Error || "failed to cancel appointments");
      }
    } catch (error) {
      toast.error("Failed to cancel the appointment. Please try again.");
    }
  };

  return (
    <div>
      <h1 className="text-xl font-semibold text-gray-800 mb-4">Your Appointments</h1>
      <div className="space-y-4">
        {appointments.map((item, index) => (
          <div
            key={index}
            className="bg-green-100 shadow rounded-lg p-4 border-l-4 border-green-500 flex flex-col sm:flex-row justify-between items-center relative"
          >
            <div className="flex items-center space-x-4">
              <div>
                <h2 className="text-lg font-medium text-gray-900">
                  Appointment with {item.doctor}
                </h2>
                <p className="text-sm font-semibold text-green-700">
                  {item.doctor.specialization}
                </p>
                <div className="text-sm text-gray-600">
                  <p className="flex items-center">
                    <MdLocationOn className="mr-2" />
                    {item.address}
                  </p>
                  <p className="flex items-center">
                    <MdEvent className="mr-1" />
                    Date: {new Date(item.appointmentTime).toLocaleDateString()}
                  </p>
                  <p className="flex items-center">
                    <MdAccessTime className="mr-1" />
                    Time:{" "}
                    {new Date(item.appointmentTime).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            </div>
            <span className="px-3 py-1 text-sm text-white bg-green-500 rounded-full absolute top-4 right-4">
              Scheduled
            </span>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-4 sm:mt-0">
              <button
                className="bg-green-500 text-white py-2 px-4 rounded shadow-lg transform transition-transform duration-300 hover:scale-105 hover:bg-green-600 focus:outline-none"
                onClick={() => navigate(`/update-appointment/${item.id}`)}
              >
                Update Appointment
              </button>
              <button
                className="bg-red-500 text-white py-2 px-4 rounded shadow-lg transform transition-transform duration-300 hover:scale-105 hover:bg-red-600 focus:outline-none"
                onClick={() => setShowConfirmPopup(true)}
              >
                Cancel Appointment
              </button>
              {showConfirmPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 m-4 shadow-lg max-w-sm">
            <h2 className="text-lg font-bold mb-4">Confirm Cancellation</h2>
            <p>Are you sure you want to cancel this appointment?</p>
            <div className="flex flex-col gap-2">
              <button
                className="bg-red-500 text-white py-2 px-4 rounded shadow-lg transform transition-transform duration-300 hover:scale-105 hover:bg-red-600 focus:outline-none"
                onClick={() => {cancelAppointment(item.id)}}
              >
                Yes, Cancel
              </button>
              <button
                className="bg-gray-500 text-white py-2 px-4 rounded shadow-lg transform transition-transform duration-300 hover:scale-105 hover:bg-gray-600 focus:outline-none"
                onClick={() => setShowConfirmPopup(false)}
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
