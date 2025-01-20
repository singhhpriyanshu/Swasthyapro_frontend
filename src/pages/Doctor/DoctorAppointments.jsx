import React  from'react'
import { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'
import Sidebar from '../../components/Sidebar'
import axios from 'axios'
import { toast } from 'react-toastify'

const DoctorAppointments = () => {

  const { profileData, appointments, getAppointments, cancelAppointment, completeAppointment } = useContext(DoctorContext)
  const {backendUrl, slotDateFormat, currency } = useContext(AppContext)
  const [dropdownOpenId, setDropdownOpenId] = useState(null); // Track open dropdown by ID

  const handleStatusChange = async (appointment_id, newStatus) => {
    try {
      // Send the updated status to the backend
      const response = await axios.put(
        `${backendUrl}/appointments/update/${appointment_id}`,
        {status:newStatus},
        
      );

      if (response.data.success) {
        console.log("Status updated successfully:", response.data.message);
        toast("Status Updated Successfully")
        getAppointments(); // Refresh the appointments list
      } else {
        console.error("Failed to update status:", response.data.message);
      }
    } catch (error) {
      console.error("Error updating status:", error.message);
    } finally {
      setDropdownOpenId(null); // Close the dropdown after status update
    }
  };

  const calculateAge = (dob) => {
    const today = new Date()
    const birthDate = new Date(dob)
    let age = today.getFullYear() - birthDate.getFullYear()
    return age
  }

  useEffect(() => {
    if (profileData) {
      getAppointments()
    }
  }, [])


  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div className='w-full max-w-6xl m-5 '>

        <p className='mb-3 text-lg font-medium'>All Appointments</p>

        <div className='bg-white border rounded text-sm max-h-[80vh] overflow-y-scroll'>
          <div className='max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-3 px-6 border-b'>
            <p>#</p>
            <p>Patient</p>
            <p>Patient Phone</p>
            <p>Age</p>
            <p>Date & Time</p>
            <p>Status</p>
            <p>Change Staus of appointment</p>

            {/* <p>Action</p> */}
          </div>
          {appointments.map((item, index) => (
            <div className='flex flex-wrap justify-between max-sm:gap-5 max-sm:text-base sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50' key={index}>
              <p className='max-sm:hidden'>{index}</p>
              <div className='flex items-center gap-2'>
                {/* <img src={item.userData.image} className='w-8 rounded-full' alt="" /> <p>{item.userData.name}</p> */}
                <p>{item.user.first_name + item.user.last_name}</p>
              </div>
              <div>
                <p className='text-xs inline border border-primary px-2 rounded-full'>
                  {/* {item.payment?'Online':'CASH'} */}
                  {item.user.contact}
                </p>
              </div>
              <p className='max-sm:hidden'>{calculateAge(item.user.date_of_birth)}</p>
              <p>{item.appointment_time.split('T')}</p>
              {/* <p>{currency}{item.amount}</p> */}
              <div>
                <p className='text-xs inline border border-primary px-2 rounded-full'>{item.status_of_appointment}</p>
                <button
                  onClick={() =>
                    setDropdownOpenId(dropdownOpenId === item.id ? null : item.id)
                  }
                  className="ml-2 px-2 py-1 text-sm border border-gray-400 rounded hover:bg-gray-100"
                >
                  Change
                </button>
                {dropdownOpenId === item.id && (
                  <div className="absolute bg-white border border-gray-300 rounded mt-1 z-10 shadow">
                    <div
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleStatusChange(item.id, "Completed")}
                    >
                      Completed
                    </div>
                    <div
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleStatusChange(item.id, "Pending")}
                    >
                      Pending
                    </div>
                    <div
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleStatusChange(item.id, "Cancelled")}
                    >
                      Cancelled
                    </div>
                  </div>
                )}






              </div>

            </div>
          ))}
        </div>

      </div>
    </div>


  )
}

export default DoctorAppointments