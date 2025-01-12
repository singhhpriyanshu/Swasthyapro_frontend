import React from 'react'
import { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'
import Sidebar from '../../components/Sidebar'
import './Appointments.css'

const DoctorAppointments = () => {

  const { profileData, appointments, getAppointments, cancelAppointment, completeAppointment } = useContext(DoctorContext)
  const { slotDateFormat,currency } = useContext(AppContext)
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
      <div style={{display:"flex"}}>
         <Sidebar/>
         <div className='w-full max-w-6xl m-5'>
        <p className='mb-3 text-lg font-medium'>All Appointments</p>

        <div className='bg-white border rounded-lg text-sm max-h-[80vh] overflow-y-scroll p-4'>
          <div className='grid grid-cols-1 gap-4'>
            {appointments.map((item, index) => (
              <div
                key={index}
                className='flex flex-wrap justify-between items-center bg-gray-50 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow '
              >
                <div className='flex items-center gap-4'>
                  <div className='flex-shrink-0'>
                    <img
                      src={item.user.image || 'https://via.placeholder.com/50'}
                      alt="Profile"
                      className='w-12 h-12 rounded-full object-cover border'
                    />
                  </div>
                  <div>
                    <p className='font-medium text-gray-700'>{item.user.name}</p>
                    <p className='text-xs text-gray-500'>{item.user.phone}</p>
                  </div>
                </div>

                <div className='text-gray-600'>
                  <p>Age: {calculateAge(item.user.date_of_birth)}</p>
                </div>

                <div className='text-gray-600'>
                  <p>{item.appointment_time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      </div>
    
    
  )
}

export default DoctorAppointments