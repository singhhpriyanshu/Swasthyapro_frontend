import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";

import { MdLocationOn, MdAccessTime, MdEvent } from "react-icons/md"; // Icons for location, date, and time

const MyAppointments = () => {
  const { backendUrl, token, userData } = useContext(AppContext);
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [isUpdate, setIsUpdate] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [slot_date, setSlotDate] = useState(null);
  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [timeId, setTimeId] = useState(null);
  const today = new Date();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const { data } = await axios.get(
          `${backendUrl}/user/appointments/get/${userData.userId}`
        );
        if (data) {
          setAppointments(data.appointments);
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
      const response = await axios.delete(
        `${backendUrl}/appointments/delete/${id}`
      );
      if (response.data.Success) {
        toast.success(response.data.Success);
        setShowConfirmPopup(false);
      } else {
        toast.error(response.data.Error || "Failed to cancel appointment.");
      }
    } catch (error) {
      toast.error("Failed to cancel the appointment. Please try again.");
    }
  };

  const fetchAvailability = async (clinicId, slot_date) => {
    try {
      const response = await axios.get(
        `${backendUrl}/doctor/gettime/${clinicId}`,
        {
          params: { slot_date },
        }
      );
      if (response.data) {
        setTimeSlots(response.data);
      } else {
        toast.error("No availability found for this clinic.");
      }
    } catch (error) {
      console.error("Error fetching availability:", error);
    }
  };

  const handleCalendarClick = (clinicId, date) => {
    date.setHours(12, 0, 0, 0);
    const formattedDate = date.toISOString().split("T")[0];
    setSlotDate(formattedDate);
    fetchAvailability(clinicId, formattedDate);
  };

  const handleTimeSlotClick = (slot_time, id) => {
    setTimeId(id);
    setSelectedTimeSlot(slot_time);
  };

  const handleSubmit = async (id, appointmentTime, appointmentLocation) => {
    const date = new Date(appointmentTime);
    const prevtime = date.toTimeString().slice(0, 5);
    if (!userData) {
      alert("Login Required");
    } else {
      if (!slot_date || !selectedTimeSlot) {
        alert("Please select a date and time slot.");
        return;
      }

      const data = {
        id: timeId,
        appointment_time: `${slot_date} ${selectedTimeSlot}:00`,
        prevtime: prevtime,
        appointment_location: appointmentLocation,
      };

      try {
        const response = await axios.put(
          `${backendUrl}/appointments/update/${id}`,
          data
        );
        if (response) {
          toast.success("Appointment Successfully Updated");
          setSelectedTimeSlot(null);
          setSlotDate(null);
        } else {
          toast.error("Failed to update appointment.");
        }
      } catch (error) {
        console.error("Error submitting booking:", error);
      }
    }
  };

  return (
    <div>
      <h1 className="text-xl font-semibold text-gray-800 mb-4">
        Your Appointments
      </h1>
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
                onClick={() => {
                  setIsUpdate(isUpdate === item.id ? null : item.id);
                }}
              >
                Update Appointment
              </button>
              {isUpdate === item.id && (
                <>
                  <div style={{ display: "flex" }}>
                    <DatePicker
                      minDate={today}
                      selected={startDate}
                      onChange={(date) => {
                        setStartDate(date);
                        handleCalendarClick(item.appointmentLocation, date);
                      }}
                    />
                  </div>
                  {timeSlots.length > 0 && (
                    <div className="time-slots-grid mt-4">
                      {timeSlots.map(
                        (slot, index) =>
                          slot.status && (
                            <button
                              key={index}
                              onClick={() =>
                                handleTimeSlotClick(slot.slot_time, slot.id)
                              }
                              className={`time-slot-button ${
                                selectedTimeSlot === slot.slot_time
                                  ? "bg-green-500 text-white"
                                  : "bg-gray-200"
                              }`}
                            >
                              {slot.slot_time}
                            </button>
                          )
                      )}
                    </div>
                  )}

                  {selectedTimeSlot && (
                    <button
                      className="bg-blue-500 text-white py-2 px-4 rounded mt-4"
                      onClick={() => {
                        handleSubmit(
                          item.id,
                          item.appointmentTime,
                          item.appointmentLocation
                        );
                      }}
                      disabled={!slot_date || !selectedTimeSlot}
                    >
                      Confirm Update
                    </button>
                  )}
                </>
              )}
              <button
                className="bg-red-500 text-white py-2 px-4 rounded shadow-lg transform transition-transform duration-300 hover:scale-105 hover:bg-red-600 focus:outline-none"
                onClick={() => setShowConfirmPopup(true)}
              >
                Cancel Appointment
              </button>
              {showConfirmPopup && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                  <div className="bg-white rounded-lg p-6 m-4 shadow-lg max-w-sm">
                    <h2 className="text-lg font-bold mb-4">
                      Confirm Cancellation
                    </h2>
                    <p>Are you sure you want to cancel this appointment?</p>
                    <div className="flex flex-col gap-2">
                      <button
                        className="bg-red-500 text-white py-2 px-4 rounded shadow-lg transform transition-transform duration-300 hover:scale-105 hover:bg-red-600 focus:outline-none"
                        onClick={() => {
                          cancelAppointment(item.id);
                        }}
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
