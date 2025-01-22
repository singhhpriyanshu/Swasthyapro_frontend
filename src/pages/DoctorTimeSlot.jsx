import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import  '../pages/TimeSlot.css' // <-- Commented out: using inline styles now

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
  const [timeId, settimeId] = useState(null);

  useEffect(() => {
    fetchClinics();
  }, []);

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

  const fetchAvailability = async (clinicId, slot_date) => {
    try {
      const response = await axios.get(`http://localhost:5000/doctor/gettime/${clinicId}`, {
        params: { slot_date: slot_date },
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.data) {
        setTimeSlots(response.data);
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

  const handleClinicClick = (clinic) => {
    setSelectedClinic(clinic);
    setDays(getDaysOfWeek());
  };

  const handleDayClick = (day) => {
    const selecteddate = day.date;
    setslot_date(selecteddate);
    fetchAvailability(selectedClinic.clinicId, selecteddate);
  };

  const handleCalendarClick = (date) => {
    const formattedDate = date.toISOString().split("T")[0];
    setslot_date(formattedDate);
  };

  const handleTimeSlotClick = (slot_time, id) => {
    settimeId(id);
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
        id: timeId,
        appointment_time: `${slot_date} ${selectedTimeSlot}:00`,
        slot_time: selectedTimeSlot,
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

  // Helper: Determine which “period” a slot belongs to by hour
  const filterSlotsByPeriod = (period) => {
    return timeSlots.filter(slot => {
      const hour = parseInt(slot.slot_time.split(":")[0], 10);
      switch (period) {
        case "morning":
          return hour >= 5 && hour < 12;  // 5 AM to 11 AM
        case "afternoon":
          return hour >= 12 && hour < 17; // 12 PM to 4 PM
        case "evening":
          return hour >= 17 && hour < 20; // 5 PM to 7 PM
        case "night":
          return (hour >= 20 && hour <= 23) || (hour >= 0 && hour < 5);
        default:
          return false;
      }
    });
  };

  // Renders the slots for a given period (morning, afternoon, evening, night).
  const renderPeriodSlots = (periodName, title) => {
    const slots = filterSlotsByPeriod(periodName);
    if (!slots.length) return null;

    return (
      <div style={styles.periodsContainer}>
        <div style={styles.periodTitle}>{title}</div>
        <div style={styles.timeSlotsList}>
          {slots.map((slot, index) =>
            slot.status ? (
              <button
                key={index}
                onClick={() => handleTimeSlotClick(slot.slot_time, slot.id)}
                style={{
                  ...styles.timeSlotCard,
                  ...(selectedTimeSlot === slot.slot_time ? styles.selectedTimeSlotCard : {})
                }}
              >
                {slot.slot_time}
              </button>
            ) : null
          )}
        </div>
      </div>
    );
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Pick Your Time Slot Now</h2>

      {clinics.length > 0 && (
        <div style={styles.clinicsList}>
          {clinics.map((clinic) => {
            const isSelected = selectedClinic === clinic;
            return (
              <div
                key={clinic.clinicId}
                onClick={() => handleClinicClick(clinic)}
                style={{
                  ...styles.clinicCard,
                  ...(isSelected ? styles.selectedClinicCard : {})
                }}
              >
                {clinic.address}
              </div>
            );
          })}
        </div>
      )}

      {selectedClinic && (
        <>
          <div style={styles.datePickerContainer}>
            <p>Select Date: </p>
            <DatePicker
              selected={startDate}
              onChange={(date) => {
                setStartDate(date);
                handleCalendarClick(date);
              }}
            />
          </div>

          <div style={styles.daysList}>
            {days.map((day) => {
              const isSelected = slot_date === day.date;
              return (
                <button
                  key={day.date}
                  onClick={() => handleDayClick(day)}
                  style={{
                    ...styles.dayCard,
                    ...(isSelected ? styles.selectedDayCard : {})
                  }}
                >
                  {new Date(day.date).toLocaleDateString("en-US", {
                    weekday: "short",
                    day: "2-digit"
                  })}
                </button>
              );
            })}
          </div>

          {timeSlots.length > 0 && (
            <>
              {renderPeriodSlots("morning", "Morning Slots")}
              {renderPeriodSlots("afternoon", "Afternoon Slots")}
              {renderPeriodSlots("evening", "Evening Slots")}
              {renderPeriodSlots("night", "Night Slots")}
            </>
          )}

          <button
            style={styles.submitButton}
            onClick={handleSubmit}
            onMouseDown={(e) => e.target.style.backgroundColor = '#388E3C'} 
            onMouseUp={(e) => e.target.style.backgroundColor = '#4caf50'}
            disabled={!slot_date || !selectedTimeSlot}
          >
            Pay At Clinic
          </button>
        </>
      )}
    </div>
  );
};

// Inline styles (instead of external CSS):
const styles = {
  container: {
    // maxWidth: '600px',
    width: '450px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    border: '1px solid #ccc',
    borderRadius: '6px'
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '10px',
    textAlign: 'center',
    color: 'Green'
  },
  clinicsList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    margin: '10px 0'
  },
  clinicCard: {
    flex: '1 1 auto',
    backgroundColor: '#f5f5f5',
    padding: '10px',
    borderRadius: '4px',
    cursor: 'pointer',
    textAlign: 'center',
    border: '1px solid #ddd'
  },
  // Changed from #d2e2ff (bluish) + #4994ff → greenish shades:
  selectedClinicCard: {
    backgroundColor: '#b2f2b4', // Light green background
    borderColor: '#66bb6a'      // Green border
  },
  datePickerContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    margin: '10px 0'
  },
  daysList: {
    display: 'flex',
    gap: '10px',
    margin: '10px 0'
  },
  dayCard: {
    backgroundColor: '#eee',
    padding: '8px',
    borderRadius: '4px',
    cursor: 'pointer',
    border: '1px solid transparent'
  },
  selectedDayCard: {
    backgroundColor: '#c8e6c9',
    borderColor: '#2e7d32'
  },
  subTitle: {
    fontSize: '20px',
    fontWeight: 'bold',
    marginTop: '20px',
    marginBottom: '10px'
  },
  timeSlotsList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px'
  },
  timeSlotCard: {
    padding: '8px 12px',
    backgroundColor: '#fafafa',
    borderRadius: '4px',
    cursor: 'pointer',
    border: '1px solid #ddd'
  },
  selectedTimeSlotCard: {
    backgroundColor: '#ffe599',
    borderColor: '#ffd966'
  },
  periodsContainer: {
    marginBottom: '10px'
  },
  periodTitle: {
    margin: '10px 0 5px',
    fontWeight: 'bold'
  },
  submitButton: {
    marginTop: '20px',
    padding: '10px 20px',
    backgroundColor: '#4caf50',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  }
};

export default DoctorTimeSlot;
