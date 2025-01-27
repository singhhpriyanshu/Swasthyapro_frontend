import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AppContext } from "../context/AppContext";

// Importing icons (you can replace with your choice of icons)
import { FaClinicMedical } from "react-icons/fa"; // Example: FontAwesome clinic icon

const DoctorTimeSlot = ({ docId }) => {
  const [clinics, setClinics] = useState([]);
  const [selectedClinic, setSelectedClinic] = useState(null);

  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [timeId, setTimeId] = useState(null);

  const [days, setDays] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [slotDate, setSlotDate] = useState(null);

  const { userData } = useContext(AppContext);

  useEffect(() => {
    fetchClinics();
  }, []);

  const fetchClinics = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/doctor/getclinics/${docId}`
      );
      if (response.status === 201) {
        setClinics(response.data["clinic list"]);
      } else {
        alert("Failed to fetch clinics.");
      }
    } catch (error) {
      console.error("Error fetching clinics:", error);
      alert("An error occurred while fetching clinic details.");
    }
  };

  const getDaysOfWeek = () => {
    const daysOfWeek = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      daysOfWeek.push({
        day: date.toLocaleDateString("en-US", { weekday: "long" }),
        date: date.toISOString().split("T")[0],
      });
    }
    return daysOfWeek;
  };

  const handleClinicClick = (clinic) => {
    setSelectedClinic(clinic);
    setDays(getDaysOfWeek());
    setTimeSlots([]);
    setSelectedTimeSlot(null);
    setTimeId(null);
    setSlotDate(null);
  };

  const handleDayClick = (day) => {
    setSlotDate(day.date);
    setSelectedTimeSlot(null);
    setTimeId(null);
    fetchAvailability(selectedClinic.clinicId, day.date);
  };

  const handleCalendarClick = (date) => {
    const formattedDate = date.toISOString().split("T")[0];
    setSlotDate(formattedDate);
    setSelectedTimeSlot(null);
    setTimeId(null);

    if (selectedClinic) {
      fetchAvailability(selectedClinic.clinicId, formattedDate);
    }
  };

  const fetchAvailability = async (clinicId, dateStr) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/doctor/gettime/${clinicId}`,
        {
          params: { slot_date: dateStr },
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response.data) {
        setTimeSlots(response.data);
      } else {
        alert("No availability found for this clinic.");
      }
    } catch (error) {
      console.error("Error fetching availability:", error);
    }
  };

  const handleTimeSlotClick = (slot_time, id) => {
    setSelectedTimeSlot(slot_time);
    setTimeId(id);
  };

  const filterSlotsByPeriod = (period) => {
    return timeSlots.filter((slot) => {
      const [hourStr] = slot.slot_time.split(":");
      const hour = parseInt(hourStr, 10);
      switch (period) {
        case "morning":
          return hour >= 5 && hour < 12;
        case "afternoon":
          return hour >= 12 && hour < 17;
        case "evening":
          return hour >= 17 && hour < 20;
        case "night":
          return hour >= 20 || hour < 5;
        default:
          return false;
      }
    });
  };

  const renderPeriodSlots = (periodName, title) => {
    const slots = filterSlotsByPeriod(periodName);
    if (!slots.length) return null;

    return (
      <div className="mb-4">
        <h3 className="font-semibold text-gray-700 mb-2">{title}</h3>
        <div className="flex flex-wrap gap-2">
          {slots.map((slot) =>
            slot.status ? (
              <button
                key={slot.id}
                onClick={() => handleTimeSlotClick(slot.slot_time, slot.id)}
                className={`px-3 py-1 rounded border text-sm hover:bg-teal-100 ${
                  selectedTimeSlot === slot.slot_time
                    ? "bg-teal-500 text-white border-teal-500"
                    : "bg-gray-100 text-gray-800 border-gray-300"
                }`}
              >
                {slot.slot_time}
              </button>
            ) : null
          )}
        </div>
      </div>
    );
  };

  const handleSubmit = async () => {
    if (!userData) {
      alert("Login Required");
      return;
    }
    if (!slotDate || !selectedTimeSlot) {
      alert("Please select a date and time slot.");
      return;
    }

    const data = {
      id: timeId,
      appointment_time: `${slotDate} ${selectedTimeSlot}:00`,
      slot_time: selectedTimeSlot,
      doctorId: parseInt(docId, 10),
      userId: userData.userId,
      appointment_location: selectedClinic.clinicId,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/appointments/book",
        data
      );
      if (response.data.success) {
        alert("Booking successful!");
      } else {
        alert("Booking: " + response.data.message);
      }
    } catch (error) {
      console.error("Error submitting booking:", error);
    }
  };

  return (
    <div className="bg-green-100 p-4 rounded-lg">
      
      {clinics.length > 0 ? (
        <div className="mb-4">
         <dev className="flex flex-wrap gap-3 flex items-center justify-between w-full px-4 py-3 rounded-lg border text-sm bg-[#2E8B57]">

<FaClinicMedical className="text-2xl text-white-800" />

<p className="text-lg font-medium text-black-700">Clinic Appointment</p>

</dev>
          <div className="flex flex-wrap gap-3">
  {clinics.map((clinic) => {
    const isSelected =
      selectedClinic && selectedClinic.clinicId === clinic.clinicId;
    return (
      <button
        key={clinic.clinicId}
        onClick={() => handleClinicClick(clinic)}
        className={`flex items-start gap-3 px-4 py-2 rounded-lg border text-sm hover:bg-green-50 ${
          isSelected
            ? "bg-green-300 text-green-900 border-green-400"
            : "bg-green-200 text-green-700 border-green-300"
        }`}
      >
        {/* Icon on the left */}

        <div className="flex flex-wrap gap-3">
                  <p className="font-semibold text-base">{clinic.clinic_name}</p>
                  <p className="text-sm text-green-600">{clinic.address}</p>
                  <div className="text-right">
                    <div className="flex flex-wrap gap-3 font-medium text-base text-green-800">
                      <p>fees :</p>
                      {clinic.discount_percentage > 0 ? (
                        <>
                          <span className="line-through opacity-50">₹{clinic.fees}</span>
                          <span className="ml-2 text-green-600">₹{clinic.discounted_fees}</span>
                          <span className="text-sm text-green-600"> ({clinic.discount_percentage}% off)</span>
                        </>
                      ) : (
                        <span>₹{clinic.fees}</span>
                      )}
                    </div>
                  </div>
                  </div>
      </button>
    );
  })}
</div>

        </div>
      ) : (
        <p className="text-sm text-green-700 mb-4">
          No clinics found for this doctor.
        </p>
      )}

      {/* Show DatePicker + 7-day “tabs” once clinic is selected */}
      {selectedClinic && (
        <>
          <div className="mb-4 flex items-center gap-2">
            <p className="text-sm font-medium text-green-700">Select Date:</p>
            <DatePicker
              selected={startDate}
              onChange={(date) => {
                setStartDate(date);
                handleCalendarClick(date);
              }}
              minDate={new Date()}
              className="border border-green-300 rounded px-2 py-1 text-sm"
            />
          </div>

          <div className="mb-4 flex flex-wrap gap-2">
            {days.map((day) => {
              const isSelected = slotDate === day.date;
              return (
                <button
                  key={day.date}
                  onClick={() => handleDayClick(day)}
                  className={`px-3 py-2 rounded text-sm border hover:bg-green-50 ${
                    isSelected
                      ? "bg-green-300 border-green-400 text-green-900"
                      : "bg-green-200 border-green-300 text-green-700"
                  }`}
                >
                  {new Date(day.date).toLocaleDateString("en-US", {
                    weekday: "short",
                    day: "2-digit",
                  })}
                </button>
              );
            })}
          </div>

          {/* Time Slots by Period */}
          {renderPeriodSlots("morning", "Morning Slots")}
          {renderPeriodSlots("afternoon", "Afternoon Slots")}
          {renderPeriodSlots("evening", "Evening Slots")}
          {renderPeriodSlots("night", "Night Slots")}

          <div className="mt-4">
            <button
              onClick={handleSubmit}
              disabled={!slotDate || !selectedTimeSlot}
              className="w-full px-4 py-2 rounded bg-green-500 text-white text-sm hover:bg-green-600 disabled:opacity-50"
            >
              Pay at Clinic
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default DoctorTimeSlot;
