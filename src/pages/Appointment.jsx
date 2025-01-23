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

  const [docInfo, setDocInfo] = useState(false);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState('');
  console.log(doctors,'asas');
  

  const navigate = useNavigate();

  const fetchDocInfo = async () => {
    const doc = doctors.find((d) => d.id === parseInt(docId));
    setDocInfo(doc);
  };

  const getAvailableSlots = async () => {
    setDocSlots([]);
    const today = new Date();

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      const endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10);
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      const timeSlots = [];
      while (currentDate < endTime) {
        const formattedTime = currentDate.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        });

        const day = currentDate.getDate();
        const month = currentDate.getMonth() + 1;
        const year = currentDate.getFullYear();
        const slotDate = `${day}_${month}_${year}`;
        const slotTime = formattedTime;

        const isSlotAvailable =
          docInfo.slots_booked[slotDate] &&
          docInfo.slots_booked[slotDate].includes(slotTime)
            ? false
            : true;

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
    // Example token usage check
    if (!token) {
      toast.warning('Login to book appointment');
      return navigate('/login');
    }
    const date = docSlots[slotIndex][0].datetime;
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const slotDate = `${day}_${month}_${year}`;

    try {
      const { data } = await axios.post(
        backendUrl + '/appointments/book',
        { docId, slotDate, slotTime },
        { headers: { token } }
      );
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
    <div className='p-4 sm:p-8 bg-green-50 min-h-screen'>
      <div className='flex flex-col lg:flex-row gap-8'>
        <div className='flex-shrink-0'>
          {/* 
            1. Make the image smaller on large screens (lg:max-w-[200px]).
            2. Use object-cover to ensure the image maintains aspect ratio.
          */}
          <img
            className='bg-teal-600 w-full lg:max-w-[200px] object-cover rounded-lg shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out'
            src={docInfo.image}
            alt='Doctor'
          />
        </div>

        {/* 
          2. Provide more space in the detail card (p-8 instead of p-6).
        */}
        <div className='flex-1 border border-teal-300 rounded-lg p-8 bg-green-100 shadow-md transition-shadow hover:shadow-lg'>
          <p className='text-2xl font-semibold text-teal-800 inline-flex items-center gap-1'>
            {docInfo.name}
            <img
              className='w-4 h-4'
              src={assets.verified_icon}
              alt='Verified Icon'
            />
          </p>
          <p className='mt-1 text-teal-600 leading-relaxed'>
            MBBS ,MS - General Surgery, MCh - Neuro Surgery - {docInfo.specialization}
          </p>
          <button className='py-1 px-3 mt-2 bg-teal-500 text-white rounded-full text-sm hover:bg-teal-600 transition'>
            Experience: {docInfo.experience} Years Experience Overall 
          </button>
          <p className='mt-2 text-teal-600 leading-relaxed'>{docInfo.about}</p>
          <p className='mt-2 text-teal-600 leading-relaxed'>{docInfo.degree}</p>
          <p className='mt-2 text-teal-600 leading-relaxed'>{docInfo.description}</p>
          <p className='mt-2 text-teal-600 leading-relaxed'>{docInfo.city}</p>
          <p className='mt-2 text-teal-600 leading-relaxed'>{docInfo.state}</p>
          <p className='mt-2 text-teal-600 leading-relaxed'>{docInfo.doc_about}</p>


          {/* <p className='mt-4 text-lg text-teal-800 leading-relaxed'>
            <strong>Appointment Fee:</strong> {currencySymbol} 
          </p> */}
        </div>
        <DoctorTimeSlot docId={docId} />
      </div>

      <div className='mt-8'>
        {/* <h3 className='text-2xl font-semibold text-gray-700 text-center'>Booking Slots</h3> */}
      </div>
    </div>
  ) : null;
};

export default Appointment;
