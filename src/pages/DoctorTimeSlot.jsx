import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import  '../pages/TimeSlot.css' // Import the external CSS file

const DoctorTimeSlot = ({ docId }) => {
  const [clinics, setClinics] = useState([]);
  const [selectedClinic, setSelectedClinic] = useState(null);
  const [availability, setAvailability] = useState(null);
  const [slot_date, setslot_date] = useState(null);
  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [days, setDays] = useState([]);
  const { userData } = useContext(AppContext);
  const [startDate, setStartDate] = useState(new Date());

  const fetchClinics = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/doctor/getclinics/${docId}`);
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

  const fetchAvailability = async (clinicId,slot_date) => {
    try {
      const response = await axios.get(`http://localhost:5000/doctor/gettime/${clinicId}`,{
        params: { slot_date: slot_date },  // Sending slot_date as a query parameter
        headers: {
          'Content-Type': 'application/json'  // Correct content type for GET requests
        }
      });
      if (response.data) {
        
        setTimeSlots(response.data);
        console.log(response.data,'kll');
        // setDays(getDaysOfWeek());
      } else {
        alert("No availability found for this clinic.");
      }
    } catch (error) {
      console.error("Error fetching availability:", error);
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

  // const generateTimeSlots = (availability) => {
  //   const allSlots = [];
  //   availability.forEach(({ slot_start_time, slot_end_time }) => {
  //     if (slot_start_time && slot_end_time) {
  //       const slots = [];
  //       let currentTime = new Date(`1970-01-01T${slot_start_time}`);
  //       const endTime = new Date(`1970-01-01T${slot_end_time}`);

  //       while (currentTime < endTime) {
  //         const nextTime = new Date(currentTime);
  //         nextTime.setMinutes(currentTime.getMinutes() + 30);
  //         if (nextTime <= endTime) {
  //           slots.push({
  //             start: currentTime.toTimeString().slice(0, 5),
  //             end: nextTime.toTimeString().slice(0, 5),
  //           });
  //         }
  //         currentTime = nextTime;
  //       }

  //       allSlots.push(...slots);
  //     }
  //   });

  //   return allSlots;
  // };

  const handleClinicClick = (clinic) => {
    setSelectedClinic(clinic);
    // fetchAvailability(clinic.clinicId);
    setDays(getDaysOfWeek())
  };

  const handleDayClick = (day) => {
    // console.log('jhj');
    
    setslot_date(day.date);
   fetchAvailability(selectedClinic.clinicId,slot_date);

  };

  const handleCalendarClick = (date) => {
    const formattedDate = date.toISOString().split("T")[0];
    setslot_date(formattedDate);
   
  };

  const handleTimeSlotClick = (slot_time) => {
    setSelectedTimeSlot(slot_time);
  };

  const handleSubmit = async () => {
    if (!userData) {
      alert("Login Required");
    } else {
      if (!slot_date || !selectedTimeSlot) {
        alert("Please select a date and time slot.");
        return;
      }

      const data = {
        appointment_time: `${slot_date} ${selectedTimeSlot}:00`,
        slot_time:selectedTimeSlot,
        doctorId: parseInt(docId),
        userId: userData.userId,
        appointment_location: selectedClinic.clinicId
      };

      try {
        const response = await axios.post("http://localhost:5000/appointments/book", data);
        if (response.data.success) {
          alert("Booking successful!");
        } else {
          alert("Booking Success: " + response.data.message);
        }
      } catch (error) {
        console.error("Error submitting booking:", error);
      }
    }
  };

  return (
    <div className="doctor-time-slot-container">
      <h2 className="title">Book a Time Slot</h2>
      <button onClick={fetchClinics} className="fetch-clinics-button">
        Select Clinics
      </button>

      {clinics.length > 0 && (
        <div className="clinics-list">
          {clinics.map((clinic) => (
            <div
              key={clinic.clinicId}
              onClick={() => handleClinicClick(clinic)}
              className={`clinic-card ${selectedClinic === clinic ? "selected" : ""}`}
            >
              {clinic.address}
            </div>
          ))}
        </div>
      )}

      {selectedClinic && (
        <>
          <div className="date-picker-container">
          <p>Select Date:-</p>
            <DatePicker
              selected={startDate}
              onChange={(date) => {
                setStartDate(date);
                handleCalendarClick(date);
              }}
            />
          </div>

          <div className="days-list">
            {days.map((day) => (
              <button
                key={day.date}
                onClick={() => handleDayClick(day)}
                className={`day-card ${slot_date === day.date ? "selected" : ""}`}
              >
                {new Date(day.date).toLocaleDateString("en-US", { weekday: "short", day: "2-digit" })}
              </button>
            ))}
          </div>

          <h3 className="sub-title">Select a Time Slot</h3>
          {timeSlots.length > 0 && (
            <div className="time-slots-list">
              {timeSlots.map((slot, index) => (
                (slot.status ? <button
                  key={index}
                  onClick={() => handleTimeSlotClick(slot.slot_time)}
                  className={`time-slot-card ${selectedTimeSlot === slot ? "selected" : ""}`}
                >
                  {slot.slot_time}
                </button>:<></>)
                
              ))}
            </div>
          )}

          <button
            className="submit-button"
            onClick={handleSubmit}
            disabled={!slot_date || !selectedTimeSlot}
          >
            Book Appointment
          </button>
        </>
      )}
    </div>
  );
};

export default DoctorTimeSlot;
