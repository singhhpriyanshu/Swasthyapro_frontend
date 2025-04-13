// // ../components/updateAppointment.js
// import React, { useState, useEffect, useContext } from "react";
// import DatePicker from "react-datepicker";
// import { toast } from "react-toastify";
// import axios from "axios";
// import { AppContext } from "../context/AppContext";

// export default function UpdateAppointment({
//   itemId,
//   currentAppointmentTime,
//   appointmentLocation,
//   onClose, // Callback to close this update UI or refresh
// }) {
//   // We can pull backendUrl, userData, etc. from AppContext
//   const { getCookie,isTokenExpired,refreshAccessToken,backendUrl, userData } = useContext(AppContext);

//   const [startDate, setStartDate] = useState(new Date());
//   const [slot_date, setSlotDate] = useState(null);
//   const [timeSlots, setTimeSlots] = useState([]);
//   const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
//   const [timeId, setTimeId] = useState(null);

//   // For minDate in DatePicker
//   const today = new Date();

//   // Convert the old appointmentTime into HH:MM (for prevtime)
//   const prevtime = new Date(currentAppointmentTime).toTimeString().slice(0, 5);

//   // ---------------  LOGIC  --------------- //

//   // Fetch time slots for a given clinic + date
//   const fetchAvailability = async (clinicId, slot_date) => {
//     try {

//         let access_token = localStorage.getItem('access_token');
  
//       if (!access_token || isTokenExpired(access_token)) {
//         console.log("Access token expired. Refreshing...");
//         await refreshAccessToken(); // Refresh the token
//         access_token = localStorage.getItem('access_token'); // 🔁 Get updated token!
//       }
//       const response = await axios.get(`${backendUrl}/doctor/gettime/${clinicId}`, {
//         params: { slot_date },
//         // body
        
//         headers: {
//             Authorization: `Bearer ${access_token}`,
          
//         }
//       });
//       if (response.data) {
//         setTimeSlots(response.data);
//       } else {
//         toast.error("No availability found for this clinic.");
//       }
//     } catch (error) {
//       console.error("Error fetching availability:", error);
//     }
//   };

//   // When user picks a date
//   const handleCalendarClick = (date) => {
//     // Keep hours consistent or reset
//     date.setHours(12, 0, 0, 0);
//     const formattedDate = date.toISOString().split("T")[0];
//     setSlotDate(formattedDate);
//     fetchAvailability(appointmentLocation, formattedDate);
//   };

//   // When user picks a slot
//   const handleTimeSlotClick = (slot_time, id) => {
//     setTimeId(id);
//     setSelectedTimeSlot(slot_time);
//   };

//   // Submit updated appointment
//   const handleSubmit = async () => {
//     if (!userData) {
//       return toast.error("Login Required");
//     }
//     if (!slot_date || !selectedTimeSlot) {
//       return toast.error("Please select a date and time slot first.");
//     }

//     const data = {
//       id: timeId,
//       appointment_time: `${slot_date} ${selectedTimeSlot}:00`,
//       prevtime: prevtime,
//       appointment_location: appointmentLocation,
//     };

//     try {
//         const accessToken = getCookie('access_token');
//         console.log(accessToken);
        
//         if (!accessToken || isTokenExpired(accessToken)) {
//           console.log("Access token expired. Refreshing...");
//           await refreshAccessToken(); // Refresh the token
//         }

//       const response = await axios.put(
//         `${backendUrl}/appointments/update/${itemId}`,
//         data
//       );
//       if (response) {
//         toast.success("Appointment Successfully Updated");
//         // Optionally call onClose or some callback
//         onClose(); 
//       } else {
//         toast.error("Failed to update appointment.");
//       }
//     } catch (error) {
//       console.error("Error updating appointment:", error);
//       toast.error("Error updating appointment. Please try again.");
//     }
//   };

//   // ---------------  RENDER  --------------- //
//   return (
//     <div style={{ marginTop: "1rem" }}>
//       {/* Date Picker */}
//       <div style={{ display: "flex" }}>
//         <DatePicker
//           minDate={today}
//           selected={startDate}
//           onChange={(date) => {
//             setStartDate(date);
//             handleCalendarClick(date);
//           }}
//         />
//       </div>

//       {/* Time slots */}
//       {timeSlots.length > 0 && (
//         <div className="time-slots-grid mt-4">
//           {timeSlots.map((slot, index) => (
//             slot.status && (
//               <button
//                 key={index}
//                 onClick={() => handleTimeSlotClick(slot.slot_time, slot.id)}
//                 className={`time-slot-button ${
//                   selectedTimeSlot === slot.slot_time
//                     ? "bg-green-500 text-white"
//                     : "bg-gray-200"
//                 }`}
//                 style={{ margin: "0.3rem" }}
//               >
//                 {slot.slot_time}
//               </button>
//             )
//           ))}
//         </div>
//       )}

//       {/* Confirm button */}
//       {selectedTimeSlot && (
//         <button
//           className="bg-blue-500 text-white py-2 px-4 rounded mt-4"
//           onClick={handleSubmit}
//         >
//           Confirm Update
//         </button>
//       )}

//       {/* Cancel/Close button if you want to manually hide */}
//       <button
//         style={{
//           marginLeft: "1rem",
//           backgroundColor: "gray",
//           color: "#fff",
//           padding: "8px 12px",
//           borderRadius: "4px",
//         }}
//         onClick={onClose}
//       >
//         Cancel
//       </button>
//     </div>
//   );
// }
