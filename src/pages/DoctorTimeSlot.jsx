import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DoctorTimeSlot = ({ docId }) => {
  const [clinics, setClinics] = useState([]); // To store clinics associated with the doctor
  const [selectedClinic, setSelectedClinic] = useState(null);
  const [availability, setAvailability] = useState(null); // Stores start and end time
  const [selectedDate, setSelectedDate] = useState(null);
  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [selectedlocation,setselectedlocation]=useState(null);
  const [days, setDays] = useState([]);
  const { userData } = useContext(AppContext);
  const [startDate, setStartDate] = useState(new Date());

  // Fetch clinics associated with the doctor
//   useEffect(()=>{
//      setDays(getDaysOfWeek());
//   });
  const fetchClinics = async () => {
    try {
        const response = await axios.get(`http://localhost:5000/doctor/getclinics/${docId}`);
        if (response.status === 201) {
            setClinics(response.data['clinic list']);
            console.log(clinics);
            
        } else {
            alert('Failed to fetch clinics.');
        }
    } catch (error) {
        console.error('Error fetching clinics:', error);
        alert('An error occurred while fetching clinic details.');
    }
};

  // Fetch availability for the selected clinic
  const fetchAvailability = async (clinicId) => {
    try {
      const response = await axios.get(`http://localhost:5000/doctor/gettime/${clinicId}`);
      if (response.data) {
        setAvailability(response.data);
        setDays(getDaysOfWeek());
      } else {
        alert("No availability found for this clinic.");
      }
    } catch (error) {
      console.error("Error fetching availability:", error);
    }
  };

  // Generate days of the week with dates
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

  // Generate time slots within the availability range
  const generateTimeSlots = (availability) => {
    const allSlots = []; // To store all generated slots
  
    // Iterate over the availability array
    availability.forEach(({ slot_start_time, slot_end_time }) => {
      if (slot_start_time && slot_end_time) {
        const slots = [];
        let currentTime = new Date(`1970-01-01T${slot_start_time}`);
        const endTime = new Date(`1970-01-01T${slot_end_time}`);
  
        while (currentTime < endTime) {
          const nextTime = new Date(currentTime);
          nextTime.setMinutes(currentTime.getMinutes() + 30); // Add 30-minute interval
          if (nextTime <= endTime) {
            slots.push({
              start: currentTime.toTimeString().slice(0, 5),
              end: nextTime.toTimeString().slice(0, 5),
            });
          }
          currentTime = nextTime;
        }
  
        // Add the slots to the allSlots array
        allSlots.push(...slots);
      }
    });
  
    return allSlots;
  };

  // Handle clinic selection
  const handleClinicClick = (clinic) => {
    setSelectedClinic(clinic);
    fetchAvailability(clinic.clinicId);
    console.log(availability);
    
  };

  // Handle day click
  const handleDayClick = (day) => {
    setSelectedDate(day.date);
    if (availability ) {
      setTimeSlots(generateTimeSlots(availability));
    }
  };

  // Handle calendar click
  const handleCalendarClick=(date)=>{
    const formattedDate = date.toISOString().split("T")[0];
    setSelectedDate(formattedDate);
    if (availability) {
        setTimeSlots(generateTimeSlots(availability));
    }
}

  // Handle time slot selection
  const handleTimeSlotClick = (slot) => {
    setSelectedTimeSlot(slot);
    console.log(selectedClinic);
    
  };

  // Submit the selected date and time slot
  const handleSubmit = async () => {
    if (!userData) {
      alert("Login Required");
    } else {
      if (!selectedDate || !selectedTimeSlot) {
        alert("Please select a date and time slot.");
        return;
      }
      
      
      const data = {
        appointment_time: `${selectedDate} ${selectedTimeSlot.start}:00`,
        doctorId: docId,
        userId: userData.userId,
        clinicId: selectedClinic.clinicId,
        appointment_location:selectedClinic.address
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
    <div>
      <h2 style={{ fontSize: "larger", color: "black", marginTop: "15px" }}>Book a Time Slot</h2>
      <button onClick={fetchClinics} className="fetch-clinics-button">
        Fetch Clinics
      </button>

      {clinics.length > 0 && (
        <div className="clinics-list">
          {clinics.map((clinic) => (
            <button
              key={clinic.clinicId}
              onClick={() => handleClinicClick(clinic)}
              className={selectedClinic === clinic ? "selected" : ""}
            >
              {clinic.address}
            </button>
          ))}
        </div>
      )}

      {selectedClinic && (
        <>
          <div style={{ display: "flex" }}>
            <DatePicker selected={startDate} onChange={(date) => { setStartDate(date); handleCalendarClick(date); }} />
          </div>

          <div className="days flex gap-3 items-center w-full overflow-x-scroll mt-4">
            {days.map((day) => (
              <button
                key={day.date}
                onClick={() => handleDayClick(day)}
                className={selectedDate === day.date ? "selected" : ""}
              >
                {new Date(day.date).toLocaleDateString("en-US", { weekday: "short", day: "2-digit" })}
              </button>
            ))}
          </div>

          <h3 style={{ fontSize: "larger", color: "black", marginTop: "15px" }}>Select a Time Slot</h3>
          {timeSlots.length > 0 && (
            <div className="time-slots flex items-center gap-3 w-full overflow-x-scroll mt-4">
              {timeSlots.map((slot, index) => (
                <button
                  key={index}
                  onClick={() => handleTimeSlotClick(slot)}
                  className={selectedTimeSlot === slot ? "selected" : ""}
                >
                  {slot.start}
                </button>
              ))}
            </div>
          )}

          <button
            className="bg-primary text-white text-sm font-light px-20 py-3 rounded-full my-6"
            onClick={handleSubmit}
            disabled={!selectedDate || !selectedTimeSlot}
          >
            Book Appointment
          </button>
        </>
      )}

      <style>
        {`
          .fetch-clinics-button {
            background-color: #007BFF;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s ease;
          }
          .fetch-clinics-button:hover {
            background-color: #0056b3;
          }

          .clinics-list button {
            margin: 5px;
            padding: 10px 15px;
            background-color: #f0f0f0;
            border: 1px solid #ccc;
            border-radius: 5px;
            cursor: pointer;
          }
          .clinics-list button.selected {
            background-color: #007BFF;
            color: white;
          }
        `}
      </style>
    </div>
  );
};

export default DoctorTimeSlot;
