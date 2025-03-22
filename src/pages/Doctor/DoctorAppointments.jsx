import React, { useContext, useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import axios from 'axios';
import { toast } from 'react-toastify';

import { DoctorContext } from '../../context/DoctorContext';
import { AppContext } from '../../context/AppContext';

const DoctorAppointments = () => {
  const { profileData, appointments, getAppointments } = useContext(DoctorContext);
  const { backendUrl } = useContext(AppContext);

  const [dropdownOpenId, setDropdownOpenId] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  // Update appointment status (and optionally upload a report)
  const handleStatusChange = async (appointment_id, newStatus, reportFile) => {
    try {
      const formData = new FormData();
      if (newStatus) {
        formData.append('status', newStatus);
      }
      if (reportFile) {
        formData.append('report', reportFile);
      }

      const response = await axios.put(`${backendUrl}/api/appointments/update/${appointment_id}`, formData);

      if (response.data) {
        toast('Status Updated Successfully');
        setSelectedFile(null);
        getAppointments(); // Refresh the appointments list
      } else {
        console.error('Failed to update status:', response.data.message);
      }
    } catch (error) {
      console.error('Error updating status:', error.message);
    } finally {
      setDropdownOpenId(null); // Close the dropdown after status update
    }
  };

  const calculateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    return today.getFullYear() - birthDate.getFullYear();
  };

  useEffect(() => {
    if (profileData) {
      getAppointments();
    }
    // eslint-disable-next-line
  }, [profileData]);

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full max-w-6xl m-5">
        <p className="mb-3 text-lg font-medium">All Appointments</p>

        {/* Table Container with horizontal scrolling */}
        <div className="bg-white border rounded text-sm max-h-[80vh] overflow-y-auto overflow-x-auto">
          {/* Header Row (8 columns) */}
          <div className="hidden sm:grid grid-cols-8 gap-3 py-3 px-6 border-b bg-gray-100 font-medium text-gray-800">
            <p>#</p>
            <p>Patient</p>
            <p>Patient Phone</p>
            <p>Age</p>
            <p>Date & Time</p>
            <p>Status</p>
            <p>Upload Report</p>
            <p>Download Prescription</p>
          </div>

          {/* Data Rows */}
          {appointments.map((item, index) => (
            <div
              key={item.id}
              className="grid grid-cols-1 sm:grid-cols-8 gap-3 items-center text-gray-600 py-3 px-6 border-b hover:bg-gray-50"
              style={{ minWidth: '700px' }} // ensures horizontal scroll if narrower
            >
              {/* # (Index) */}
              <p className="sm:col-span-1 font-semibold sm:font-normal">
                {/* Show index only on larger screens */}
                <span className="hidden sm:inline">{index}</span>
              </p>

              {/* Patient Name */}
              <div className="sm:col-span-1 flex items-center gap-2">
                <p>{item.user.first_name + ' ' + item.user.last_name}</p>
              </div>

              {/* Patient Phone */}
              <div className="sm:col-span-1">
                <p className="inline border border-primary px-2 rounded-full text-xs">
                  {item.user.contact}
                </p>
              </div>

              {/* Age */}
              <p className="sm:col-span-1">
                <span className="hidden sm:inline">{calculateAge(item.user.date_of_birth)}</span>
              </p>

              {/* Date & Time */}
              <p className="sm:col-span-1">
                {item.appointment_time.split('T').join(' ')}
              </p>

              {/* Status + "Change" dropdown */}
              <div className="sm:col-span-1 relative">
                <p className="text-xs inline border border-primary px-2 rounded-full">
                  {item.status_of_appointment === 'false' ? 'Pending' : 'Completed'}
                </p>
                <button
                  onClick={() => setDropdownOpenId(dropdownOpenId === item.id ? null : item.id)}
                  className="ml-2 px-2 py-1 text-sm border border-gray-400 rounded hover:bg-gray-100"
                >
                  Change
                </button>
                {dropdownOpenId === item.id && (
                  <div className="absolute bg-white border border-gray-300 rounded mt-1 z-10 shadow">
                    <div
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleStatusChange(item.id, 'completed')}
                    >
                      Completed
                    </div>
                  </div>
                )}
              </div>

              {/* Upload Report */}
              <form className="sm:col-span-1">
                <label htmlFor={`report-${item.id}`} className="block text-xs text-gray-700 mb-1">
                  Upload Report
                </label>
                <input
                  type="file"
                  id={`report-${item.id}`}
                  onChange={handleFileChange}
                  className="text-sm text-gray-900 cursor-pointer file:mr-2 file:py-1 file:px-2 file:border file:rounded file:border-gray-400"
                />
              </form>

              {/* "Add Report" Button (uploads file) */}
              <div className="sm:col-span-1">
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded text-sm hover:bg-green-600"
                  onClick={() => handleStatusChange(item.id, undefined, selectedFile)}
                >
                  Add Report
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoctorAppointments;
