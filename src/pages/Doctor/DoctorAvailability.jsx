import React from 'react'
import axios from 'axios'
import { useContext,useState } from 'react'
import { useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { assets } from '../../assets/assets'
import { AppContext } from '../../context/AppContext'
import Sidebar from '../../components/Sidebar'
// import "./AddClinic.css"
// import UpdateClinic from '../Doctor/UpdataClinic'
// import DeleteClinic from '../Doctor/DeleteClinic'
import './Availability.css'
import AddTimeSlot from './AddTimeSlot'

const DoctorAvailability = () => {

    

  const { dToken, dashData, getDashData, cancelAppointment, completeAppointment } = useContext(DoctorContext)
  const { slotDateFormat, currency } = useContext(AppContext)
  const {profileData,setProfileData}=useContext(DoctorContext);
  const [isFormVisible, setIsFormVisible] = useState(false);
    const [formData, setFormData] = useState({
        
        active_status: false,
        address: '',
        city: '',
        pincode: '',
        state: '',
        fees: '',
        discount_percentage: ''
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };
  
  
  useEffect(() => {

    if (dToken) {
      getDashData()
    }

  }, [dToken])
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = async (e) => {
      e.preventDefault();

      const availability = { start_time: startTime, end_time: endTime,doctorId:profileData.doctorId };

      try {
          const response = await axios.post('http://localhost:5000/api/doctor/availability', availability);
          if (response.data.success) {
              alert('Availability updated successfully');
          } else {
              alert('Error updating availability: ' + response.data.message);
          }
      } catch (error) {
          console.error('Error submitting availability:', error);
          alert('Failed to update availability');
      }
  };
   
  const handleAddClinicSubmit = async (e) => {
    e.preventDefault();
    const {  active_status, address, city, pincode, state, fees, discount_percentage } = formData;

    const clinicData = {
        active_status,
        address,
        city,
        pincode,
        state,
        fees,
        discount_percentage
    };

    try {
        const response = await axios.post(`http://localhost:5000/doctor/addclinics/${profileData.doctorId}`, clinicData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.status === 201) {
            alert(response.data.message || 'Clinic added successfully!');
        } else {
            alert(response.data.Error || 'An error occurred while adding the clinic.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An unexpected error occurred.');
    }
};





  return (
    <>
    <div style={{display:"flex"}}>
    <Sidebar/>
    {/* <div className='contain'>
            <h2>Manage Availability</h2>
            <form id='form' onSubmit={handleSubmit}>
                <label style={{marginLeft:"15px",marginRight:"35px"}}>
                    Date:
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </label>
                <label style={{marginLeft:"15px",marginRight:"35px"}}>
                    Start Time:
                    <input
                        type="time"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        required
                    />
                </label>
                <label style={{marginLeft:"15px",marginRight:"35px"}}>
                    End Time:
                    <input
                        type="time"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        required
                    />
                </label>
                <button class="bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block mt-5">Update Availability</button>
            </form>
        </div> */}
    <div className="add-clinic-container">
            <button className="toggle-form-button" onClick={() => setIsFormVisible(!isFormVisible)}>
                {isFormVisible ? 'Close Form' : 'Add Clinic Info'}
            </button>
                           
            {isFormVisible && (
                <form className="clinic-form" onSubmit={handleAddClinicSubmit}>
                    <h1>Add Clinic Information</h1>
                    
                    <br /><br />

                    <label id='lb1'>
                        Active Status:
                        <input
                            type="checkbox"
                            name="active_status"
                            checked={formData.active_status}
                            onChange={handleChange}
                        />
                    </label>
                    <br /><br />

                    <label >
                        Address:
                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <br /><br />

                    <label id='lb3'>
                        City:
                        <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <br /><br />

                    <label id='lb4'>
                        Pincode:
                        <input
                            type="text"
                            name="pincode"
                            value={formData.pincode}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <br /><br />

                    <label id='lb5'>
                        State:
                        <input
                            type="text"
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <br /><br />

                    <label id='lb6'>
                        Fees:
                        <input
                            type="number"
                            name="fees"
                            value={formData.fees}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <br /><br />

                    <label id='lb7'>
                        Discount Percentage:
                        <input
                            type="number"
                            name="discount_percentage"
                            value={formData.discount_percentage}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <br /><br />

                    <button id='submit' className="submit-button" type="submit">Submit</button>
                </form>
            )}
        </div>
        <AddTimeSlot/>
    </div>
        {/* <UpdateClinic/> */}
        {/* <DeleteClinic/> */}
 </>
  )
}

export default DoctorAvailability