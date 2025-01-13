import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import RelatedDoctors from '../components/RelatedDoctors';
import axios from 'axios';
import { toast } from 'react-toastify';
import DoctorBooking from './Doctor/DoctorBooking';
import DoctorTimeSlot from './DoctorTimeSlot';

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol, backendUrl } = useContext(AppContext);
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  const [docInfo, setDocInfo] = useState(false);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState('');

  const navigate = useNavigate();

  const fetchDocInfo = async () => {
    const docInfo = doctors.find((doc) => doc.id === docId);
    setDocInfo(docInfo);
  };

  const getAvailableSlots = async () => {
    setDocSlots([]);

    let today = new Date();

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10);
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeSlots = [];

      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();

        const slotDate = day + "_" + month + "_" + year;
        const slotTime = formattedTime;

        const isSlotAvailable = docInfo.slots_booked[slotDate] && docInfo.slots_booked[slotDate].includes(slotTime) ? false : true;

        if (isSlotAvailable) {
          timeSlots.push({
            datetime: new Date(currentDate),
            time: formattedTime,
          });
        }

        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      setDocSlots((prev) => [...prev, timeSlots]);
    }
  };

  const bookAppointment = async () => {
    if (!token) {
      toast.warning('Login to book appointment');
      return navigate('/login');
    }

    const date = docSlots[slotIndex][0].datetime;

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    const slotDate = day + "_" + month + "_" + year;

    try {
      const { data } = await axios.post(backendUrl + '/appointments/book', { docId, slotDate, slotTime }, { headers: { token } });
      if (data.success) {
        toast.success(data.message);
        getDoctosData();
        navigate('/my-appointments');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (doctors.length > 0) {
      fetchDocInfo();
    }
  }, [doctors, docId]);

  useEffect(() => {
    if (docInfo) {
      getAvailableSlots();
    }
  }, [docInfo]);

  return docInfo ? (
    <div className='p-4 sm:p-8'>
      <div className='flex flex-col lg:flex-row gap-8'>
        <div className='flex-shrink-0'>
          <img
            className='bg-primary w-full lg:max-w-[300px] rounded-lg shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out'
            src={docInfo.image}
            alt='Doctor'
          />
        </div>

        <div className='flex-1 border border-gray-300 rounded-lg p-6 bg-white shadow-md transition-shadow hover:shadow-lg'>
          <p className='text-3xl font-semibold text-gray-700 flex items-center gap-2'>
            {docInfo.name}
            <img
              className='w-5 h-5'
              src={assets.verified_icon}
              alt='Verified Icon'
            />
          </p>
          <p className='mt-1 text-gray-600'>MBBS4 - {docInfo.specialization}</p>
          <button className='py-1 px-3 mt-2 bg-blue-500 text-white rounded-full text-sm hover:bg-blue-600 transition'>
            Experience: {docInfo.experience} years
          </button>
          <p className='mt-4 text-gray-800'>
            <strong>Clinic Address:</strong> {docInfo.clinic_address}
          </p>
          <p className='mt-2 text-gray-600'>{docInfo.about}</p>
          <p className='mt-4 text-lg text-gray-800'>
            <strong>Appointment Fee:</strong> {currencySymbol} 500
          </p>
        </div>
      </div>

      <div className='mt-8'>
        <h3 className='text-2xl font-semibold text-gray-700 text-center'>Booking Slots</h3>
        <DoctorTimeSlot docId={docId} />
      </div>
    </div>
  ) : null;
};

export default Appointment;
