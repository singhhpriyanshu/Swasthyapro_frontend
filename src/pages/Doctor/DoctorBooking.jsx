import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AppContext } from "../../context/AppContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DoctorBooking = ({ docId }) => {
    const [availability, setAvailability] = useState({}); // Stores start and end time
    const [selectedDate, setSelectedDate] = useState(null);
    const [timeSlots, setTimeSlots] = useState([]);
    const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
    const [days, setDays] = useState([]);
    const { userData ,appoint_doctor,setappoint_doctor} = useContext(AppContext);
    const [startDate, setStartDate] = useState(new Date());

    // Fetch availability from backend (replace with your API endpoint)
    useEffect(() => {
        const fetchAvailability = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/doctor/available/${docId}`);
                if (response.data.success) {
                    setAvailability(response.data.availability);
                    setDays(getDaysOfWeek());
                }
            } catch (error) {
                console.error("Error fetching availability:", error);
            }
        };
        if (docId) {
            fetchAvailability();
        }

    }, [docId]);

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
    const generateTimeSlots = (startTime, endTime) => {
        const slots = [];
        let currentTime = new Date(`1970-01-01T${startTime}`);
        const end = new Date(`1970-01-01T${endTime}`);
        while (currentTime < end) {
            const nextTime = new Date(currentTime);
            nextTime.setMinutes(currentTime.getMinutes() + 30); // Add 30 minutes
            slots.push({
                start: currentTime.toTimeString().slice(0, 5),
                end: nextTime.toTimeString().slice(0, 5),
            });
            currentTime = nextTime;
        }
        return slots;
    };

    // Handle day click
    const handleDayClick = (day) => {
        setSelectedDate(day.date);
        console.log(selectedDate);
        
        
        
        if (availability.start_time && availability.end_time) {
            setTimeSlots(generateTimeSlots(availability.start_time, availability.end_time));
        }
    };
    const handleCalenderClick=(date)=>{
        const formattedDate = date.toISOString().split("T")[0];
        setSelectedDate(formattedDate);
        if (availability.start_time && availability.end_time) {
            setTimeSlots(generateTimeSlots(availability.start_time, availability.end_time));
        }
    }
    // Handle time slot selection
    const handleTimeSlotClick = (slot) => {
        setSelectedTimeSlot(slot);
        console.log(selectedTimeSlot);
        
    };

    // Submit the selected date and time slot
    const handleSubmit = async () => {

        if (!userData) {
            alert("Login Required")
        } else {

            if (!selectedDate || !selectedTimeSlot) {
                alert("Please select a date and time slot.");
                return;
            }
            console.log(selectedDate);
            console.log(selectedTimeSlot);
            
            
            const data = {
                // date: selectedDate,
                // time_slot: selectedTimeSlot,
                 appointment_time: `${selectedDate} ${selectedTimeSlot.start}:00`,
                doctorId:docId,
                userId:userData.userId

            };
            // console.log(data);
            console.log(data);
            
            

        try {
            const response = await axios.post("http://localhost:5000/api/appointments/book", data);
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
            <div style={{display:"flex"}}>
            <h2 style={{fontSize:"larger",color:"black",marginTop:"15px"}}>Book a Time Slot</h2>
            <DatePicker selected={startDate} onChange={(date) => {setStartDate(date);handleCalenderClick(date);}}  />
            </div>
            
            <div className=" days flex gap-3 items-center w-full overflow-x-scroll mt-4">
                {days.map((day) => (
                    <button
                        key={day.date}
                        onClick={() => handleDayClick(day)}
                        className={selectedDate === day.date ? "selected" : ""}
                    >
                         {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short', day: '2-digit' })}
                        {/* {day.day.slice(0,3)} {day.date} */}
                    </button>
                ))}
            </div>
            <h3 style={{fontSize:"larger",color:"black",marginTop:"15px"}}>Select a Time Slot</h3>
            {timeSlots.length > 0 && (
                <div className=" time-slots flex items-center gap-3 w-full overflow-x-scroll mt-4">
                    
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

            <button   className="bg-primary text-white text-sm font-light px-20 py-3 rounded-full my-6"onClick={handleSubmit}  disabled={!selectedDate || !selectedTimeSlot}>
                Book Appointment
            </button>
            <style>
        {`
          /* From Uiverse.io by adamgiebl */

          .days button {
            font-size: 18px;
            letter-spacing: 2px;
            text-transform: uppercase;
            display: inline-block;
            text-align: center;
            font-weight: bold;
            padding: 0.7em 2em;
            border: 3px solid #62d2a2;
            border-radius: 80px;
            position: relative;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.1);
            color: #62d2a2;
            text-decoration: none;
            transition: 0.3s ease all;
            z-index: 1;
            margin: 5px;
            
          }

          .days button:before {
            transition: 0.5s all ease;
            position: absolute;
            top: 0;
            left: 50%;
            right: 50%;
            bottom: 0;
            opacity: 0;
            content: '';
            background-color: #62d2a2;
            z-index: -1;
          }

          .days button:hover, .days button:focus {
            color: white;
            border-radius:80px;
          }

          .days button:hover:before, .days button:focus:before {
           border-radius:80px;
            transition: 0.5s all ease;
            left: 0;
            right: 0;
            opacity: 1;
          }

          .days button:active {
            transform: scale(0.9);
          }

          /* Styling for the selected button */
          .days button.selected {
            color: white;
            background-color: #62d2a2;
            border-color: #62d2a2;
          }

          .time-slots button {
            background-color: #f0f0f0;
            border: 2px solid #ccc;
            border-radius: 5px;
            padding: 10px 20px;
            font-size: 1rem;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
            margin: 5px;
          }

          .time-slots button:hover {
            background-color: #e0e0e0;
            transform: scale(1.05);
          }

          .time-slots button.selected {
            background-color: #007BFF;
            color: white;
            border-color: #007BFF;
          }

          .submit-btn {
            background-color: #007BFF;
            color: white;
            border: none;
            padding: 15px 30px;
            font-size: 1.2rem;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s ease;
            width: 100%;
            max-width: 250px;
            margin-top: 30px;
            display: block;
            margin-left: auto;
            margin-right: auto;
          }

          .submit-btn:hover {
            background-color: #0056b3;
          }

          .submit-btn:disabled {
            background-color: #ddd;
            cursor: not-allowed;
          }
        `}
      </style>
        </div>
    );
};



export default DoctorBooking;
