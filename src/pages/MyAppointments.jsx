import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Make sure to import the CSS for DatePicker

import {
  MdLocationOn,
  MdAccessTime,
  MdEvent,
} from "react-icons/md"; // Icons for location, date, and time

const MyAppointments = () => {
  const { backendUrl, token, userData } = useContext(AppContext);
  const navigate = useNavigate();

  const [appointments, setAppointments] = useState([]);
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [appointmentToDelete, setAppointmentToDelete] = useState(null);

  // --- RESCHEDULE MODAL State ---
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [appointmentToUpdate, setAppointmentToUpdate] = useState(null);

  // Date chosen by the user in the modal
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Timeslot arrays for morning, afternoon, evening
  const [morningSlots, setMorningSlots] = useState([]);
  const [afternoonSlots, setAfternoonSlots] = useState([]);
  const [eveningSlots, setEveningSlots] = useState([]);

  // For whichever slot the user clicks
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [timeId, setTimeId] = useState(null);

  // === FETCH USER'S APPOINTMENTS ON LOAD ===
  useEffect(() => {
    if (userData) {
      fetchAppointments();
    }
  }, [userData]);

  const fetchAppointments = async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/user/appointments/get/${userData.userId}`
      );
      if (data && data.appointments) {
        // Sort appointments by date from latest to oldest
        const sortedAppointments = data.appointments.sort((a, b) => {
          // Convert appointmentTime to Date objects for comparison
          return new Date(b.appointmentTime) - new Date(a.appointmentTime);
        });
        setAppointments(sortedAppointments);
      } else {
        toast.error(data.message || "No appointments found.");
      }
    } catch (error) {
      toast.error("Failed to fetch appointments. Please try again.");
    }
  };


  // === CANCEL APPOINTMENT FLOW ===
  const handleCancelClick = (appointmentId) => {
    setAppointmentToDelete(appointmentId);
    setShowConfirmPopup(true);
  };
  const cancelAppointment = async () => {
    if (!appointmentToDelete) return;
    try {
      const response = await axios.delete(
        `${backendUrl}/api/appointments/delete/${appointmentToDelete}`
      );
      if (response.data?.Success) {
        toast.success(response.data.Success);
        // Refresh the list
        fetchAppointments();
      } else {
        toast.error(response.data?.Error || "Failed to cancel appointment.");
      }
    } catch (error) {
      toast.error("Failed to cancel the appointment. Please try again.");
    } finally {
      setShowConfirmPopup(false);
      setAppointmentToDelete(null);
    }
  };

  // === OPEN RESCHEDULE MODAL ===
  const handleOpenRescheduleModal = (appointment) => {
    setAppointmentToUpdate(appointment);

    // Default to the original appointment date, or "today" if you prefer
    const originalDate = new Date(appointment.appointmentTime);
    // If you want to always pick a future date, you could do: 
    //   setSelectedDate(new Date());
    // but let's default to the existing date:
    setSelectedDate(originalDate);

    setSelectedTimeSlot(null);
    setTimeId(null);
    setMorningSlots([]);
    setAfternoonSlots([]);
    setEveningSlots([]);

    // Show the modal
    setShowUpdateModal(true);
  };

  // === FETCH AVAILABILITY WHEN SELECTED DATE CHANGES ===
  // We'll do it on each date change inside the modal
  useEffect(() => {
    if (showUpdateModal && appointmentToUpdate) {
      fetchAvailability(appointmentToUpdate.appointmentLocation, selectedDate);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate, showUpdateModal]);

  const fetchAvailability = async (clinicId, date) => {
    if (!date || !clinicId) return;

    // Format date as "YYYY-MM-DD"
    const formattedDate = date.toISOString().split("T")[0];

    try {
      const response = await axios.get(
        `${backendUrl}/api/doctor/gettime/${clinicId}`,
        { params: { slot_date: formattedDate } }
      );
      if (response.data) {
        // response.data is array of { id, slot_time, status }
        categorizeSlots(response.data);
      } else {
        toast.error("No availability found for this clinic.");
      }
    } catch (error) {
      console.error("Error fetching availability:", error);
      toast.error("Could not fetch availability.");
    }
  };

  // Divide time slots into morning/afternoon/evening
  const categorizeSlots = (slotsData) => {
    const morning = [];
    const afternoon = [];
    const evening = [];

    slotsData.forEach((slot) => {
      if (!slot.status) return; // skip if not available

      // slot_time is presumably "HH:mm" (string). Let's parse the hour
      const [hourStr, minuteStr] = slot.slot_time.split(":");
      const hour = parseInt(hourStr, 10);

      if (hour < 12) {
        morning.push(slot);
      } else if (hour < 17) {
        afternoon.push(slot);
      } else {
        evening.push(slot);
      }
    });

    setMorningSlots(morning);
    setAfternoonSlots(afternoon);
    setEveningSlots(evening);
  };

  // === SELECT A TIME SLOT ===
  const handleTimeSlotClick = (slot_time, id) => {
    setSelectedTimeSlot(slot_time);
    setTimeId(id);
  };

  // === CONFIRM THE UPDATE ===
  const handleConfirmUpdate = async () => {
    if (!appointmentToUpdate) return;
    if (!timeId || !selectedTimeSlot) {
      toast.error("Please select a time slot before confirming.");
      return;
    }

    // Build old time (for prevtime) from the original
    const oldDateObj = new Date(appointmentToUpdate.appointmentTime);
    const prevtime = oldDateObj.toTimeString().slice(0, 5); // "HH:MM"

    // Build new appointment_time as "YYYY-MM-DD HH:MM:00"
    const newDateStr = selectedDate.toISOString().split("T")[0];
    const newTimeStr = `${newDateStr} ${selectedTimeSlot}:00`;

    const dataToSend = {
      id: timeId,
      appointment_time: newTimeStr,
      prevtime: prevtime,
      appointment_location: appointmentToUpdate.appointmentLocation,
    };

    try {
      const response = await axios.put(
        `${backendUrl}/api/appointments/update/${appointmentToUpdate.id}`,
        dataToSend
      );
      if (response) {
        toast.success("Appointment Successfully Updated");
        // Close modal
        setShowUpdateModal(false);
        setAppointmentToUpdate(null);

        // Refresh the list instantly so that updated time appears in the UI
        fetchAppointments();
      } else {
        toast.error("Failed to update appointment.");
      }
    } catch (error) {
      console.error("Error submitting booking:", error);
      toast.error("Failed to update appointment.");
    }
  };

  return (
    <div>
      <h1 className="text-xl font-semibold text-gray-800 mb-4">
        Your Appointments
      </h1>
      <div className="space-y-4">
        {appointments.map((item) => (
          <div
            key={item.id}
            className="bg-[#edede9] shadow rounded-lg p-4 border-l-4 border-green-500 flex flex-col sm:flex-row justify-between items-center relative"
          >
            {/* Left side info */}
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

            {/* Scheduled label */}
            {item.statusOfAppointment === 'false' ? <>
              <span className="px-3 py-1 text-sm text-white bg-green-500 rounded-full absolute top-4 right-4">
              Scheduled
            </span>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-4 sm:mt-0">
              <button
                className="bg-green-500 text-white py-2 px-4 rounded shadow-lg transform transition-transform duration-300 hover:scale-105 hover:bg-green-600 focus:outline-none"
                onClick={() => handleOpenRescheduleModal(item)}
              >
                Update Appointment
              </button>
              <button
                className="bg-[#FF6865] text-white py-2 px-4 rounded shadow-lg transform transition-transform duration-300 hover:scale-105 hover:bg-red-600 focus:outline-none"
                onClick={() => handleCancelClick(item.id)}
              >
                Cancel Appointment
              </button>
            </div>
            </>:<>
              <span className="px-3 py-1 text-sm text-white bg-green-500 rounded-full absolute top-4 right-4">
              Completed
            </span>
            </>}
           
          </div>
        ))}
      </div>

      {/* ========== CANCEL CONFIRM POPUP ========== */}
      {showConfirmPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 m-4 shadow-lg max-w-sm">
            <h2 className="text-lg font-bold mb-4">Confirm Cancellation</h2>
            <p>Are you sure you want to cancel this appointment?</p>
            <div className="flex flex-col gap-2 mt-4">
              <button
                className="bg-red-500 text-white py-2 px-4 rounded shadow-lg transform transition-transform duration-300 hover:scale-105 hover:bg-red-600 focus:outline-none"
                onClick={cancelAppointment}
              >
                Yes, Cancel
              </button>
              <button
                className="bg-gray-500 text-white py-2 px-4 rounded shadow-lg transform transition-transform duration-300 hover:scale-105 hover:bg-gray-600 focus:outline-none"
                onClick={() => {
                  setShowConfirmPopup(false);
                  setAppointmentToDelete(null);
                }}
              >
                No, Go Back
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========== RESCHEDULE (UPDATE) MODAL ========== */}
      {showUpdateModal && appointmentToUpdate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white w-full max-w-xl rounded-lg shadow-lg p-4 relative">
            {/* Close button */}
            <button
              onClick={() => setShowUpdateModal(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            >
              ✕
            </button>

            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Update Appointment
            </h2>

            {/* Practitioner info */}
            <div className="mb-4">
              <p className="font-medium">
                Practitioner: {appointmentToUpdate.doctor?.name || "Doctor"}
              </p>
              <p>
                Current:{" "}
                {new Date(appointmentToUpdate.appointmentTime).toLocaleDateString()}
                {" at "}
                {new Date(appointmentToUpdate.appointmentTime).toLocaleTimeString(
                  [],
                  { hour: "2-digit", minute: "2-digit" }
                )}
              </p>
            </div>

            {/* DATE PICKER */}
            <div className="mb-4">
              <label className="block mb-1 font-semibold text-gray-700">
                Select Date:
              </label>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                minDate={new Date()}
                dateFormat="yyyy-MM-dd"
                className="border border-gray-300 rounded px-2 py-1"
              />
            </div>

            {/* TIME SLOTS, divided by Morning / Afternoon / Evening */}
            <div className="mb-4">
              <p className="font-semibold text-gray-800 mb-2">Morning Slots</p>
              <div className="flex flex-wrap gap-2">
                {morningSlots.length > 0 ? (
                  morningSlots.map((slot) => (
                    <button
                      key={slot.id}
                      onClick={() => handleTimeSlotClick(slot.slot_time, slot.id)}
                      className={`px-3 py-1 rounded ${
                        selectedTimeSlot === slot.slot_time
                          ? "bg-blue-600 text-white"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {slot.slot_time}
                    </button>
                  ))
                ) : (
                  <span className="text-sm text-gray-600">No morning slots.</span>
                )}
              </div>
            </div>

            <div className="mb-4">
              <p className="font-semibold text-gray-800 mb-2">Afternoon Slots</p>
              <div className="flex flex-wrap gap-2">
                {afternoonSlots.length > 0 ? (
                  afternoonSlots.map((slot) => (
                    <button
                      key={slot.id}
                      onClick={() => handleTimeSlotClick(slot.slot_time, slot.id)}
                      className={`px-3 py-1 rounded ${
                        selectedTimeSlot === slot.slot_time
                          ? "bg-blue-600 text-white"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {slot.slot_time}
                    </button>
                  ))
                ) : (
                  <span className="text-sm text-gray-600">
                    No afternoon slots.
                  </span>
                )}
              </div>
            </div>

            <div className="mb-4">
              <p className="font-semibold text-gray-800 mb-2">Evening Slots</p>
              <div className="flex flex-wrap gap-2">
                {eveningSlots.length > 0 ? (
                  eveningSlots.map((slot) => (
                    <button
                      key={slot.id}
                      onClick={() => handleTimeSlotClick(slot.slot_time, slot.id)}
                      className={`px-3 py-1 rounded ${
                        selectedTimeSlot === slot.slot_time
                          ? "bg-blue-600 text-white"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {slot.slot_time}
                    </button>
                  ))
                ) : (
                  <span className="text-sm text-gray-600">No evening slots.</span>
                )}
              </div>
            </div>

            {/* CONFIRM APPOINTMENT BUTTON */}
            <div>
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded shadow-lg transform transition-transform duration-300 hover:scale-105 hover:bg-blue-600 focus:outline-none"
                onClick={handleConfirmUpdate}
              >
                Confirm Appointment
              </button>
            </div>
          </div>
        </div>
      )}
      {/* ========== END RESCHEDULE MODAL ========== */}
    </div>
  );
};

export default MyAppointments;
