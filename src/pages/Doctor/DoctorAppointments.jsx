import React, { useContext, useEffect, useState } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';
import Sidebar from '../../components/Sidebar';

import { FaFilter, FaCheck, FaTimes, FaClock } from 'react-icons/fa';

const DoctorAppointments = () => {
  const { profileData, appointments, getAppointments, cancelAppointment, completeAppointment } = useContext(DoctorContext);
  const { slotDateFormat, currency } = useContext(AppContext);

  const [filter, setFilter] = useState('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const calculateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    return age;
  };

  const filteredAppointments = appointments.filter((item) => {
    if (filter === 'completed') return item.status === 'completed';
    if (filter === 'not_completed') return item.status === 'not_completed';
    if (filter === 'pending') return item.status === 'pending';
    return true;
  });

  useEffect(() => {
    if (profileData) {
      getAppointments();
    }
  }, [profileData, getAppointments]);

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div className="w-full max-w-6xl m-5">
        <p className="mb-3 text-lg font-medium">All Appointments</p>

        <div className="relative mb-4">
          <button
            className="filter-button flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <FaFilter /> Filter
          </button>
          {isFilterOpen && (
            <div
              className="dropdown bg-white border rounded shadow-md mt-2 p-2 absolute z-10"
              style={{ minWidth: '150px' }}
            >
              <p
                className={`dropdown-item py-2 px-4 hover:bg-gray-100 cursor-pointer ${filter === 'completed' ? 'bg-gray-200' : ''}`}
                onClick={() => {
                  setFilter('completed');
                  setIsFilterOpen(false);
                }}
              >
                <FaCheck className="inline mr-2 text-green-500" /> Completed
              </p>
              <p
                className={`dropdown-item py-2 px-4 hover:bg-gray-100 cursor-pointer ${filter === 'not_completed' ? 'bg-gray-200' : ''}`}
                onClick={() => {
                  setFilter('not_completed');
                  setIsFilterOpen(false);
                }}
              >
                <FaTimes className="inline mr-2 text-red-500" /> Not Completed
              </p>
              <p
                className={`dropdown-item py-2 px-4 hover:bg-gray-100 cursor-pointer ${filter === 'pending' ? 'bg-gray-200' : ''}`}
                onClick={() => {
                  setFilter('pending');
                  setIsFilterOpen(false);
                }}
              >
                <FaClock className="inline mr-2 text-yellow-500" /> Pending
              </p>
            </div>
          )}
        </div>

        <div className="bg-white border rounded-lg text-sm max-h-[80vh] overflow-y-scroll p-4">
          <div className="grid grid-cols-1 gap-4">
            {filteredAppointments.map((item, index) => (
              <div
                key={index}
                className="appointment-item flex flex-wrap justify-between items-center bg-gray-50 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow transform hover:scale-105"
              >
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0">
                    <img
                      src={item.user.image || 'https://via.placeholder.com/50'}
                      alt="Profile"
                      className="w-12 h-12 rounded-full object-cover border"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">{item.user.name}</p>
                    <p className="text-xs text-gray-500">{item.user.phone}</p>
                  </div>
                </div>

                <div className="text-gray-600">
                  <p>Age: {calculateAge(item.user.date_of_birth)}</p>
                </div>

                <div className="text-gray-600">
                  <p>{item.appointment_time}</p>
                </div>

                <div>
                  {item.status === 'completed' && <FaCheck className="text-green-500" />}
                  {item.status === 'not_completed' && <FaTimes className="text-red-500" />}
                  {item.status === 'pending' && <FaClock className="text-yellow-500" />}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorAppointments;
