import React from 'react'
import axios from 'axios'
import { useContext,useState } from 'react'
import { useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { assets } from '../../assets/assets'
import { AppContext } from '../../context/AppContext'
import './Availability.css'
import AddTimeSlot from './AddTimeSlot'
import Sidebar from '../../components/Sidebar'
import DeleteClinic from './DeleteClinic'
import UpdateClinic from './UpdataClinic'

const DoctorAvailability = () => {

    

  const { dToken, dashData, getDashData, cancelAppointment, completeAppointment } = useContext(DoctorContext)
  const { slotDateFormat, currency } = useContext(AppContext)
  const {profileData,setProfileData}=useContext(DoctorContext);
  const [isFormVisible, setIsFormVisible] = useState(false);
    const [formData, setFormData] = useState({
        
        active_status: false,
        clinic_name: '',
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

  const handleAddClinicSubmit = async (e) => {
    e.preventDefault();
    const {  clinic_name,active_status, address, city, pincode, state, fees, discount_percentage } = formData;

    const clinicData = {
        clinic_name,
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
    <div className="add-clinic-container">
            <button className="toggle-form-button" onClick={() => setIsFormVisible(!isFormVisible)}>
                {isFormVisible ? 'Close Form' : 'Add Clinic Info'}
            </button>
                           
            {isFormVisible && (
                <form className="clinic-form" onSubmit={handleAddClinicSubmit}>
                    <h1>Add Clinic Information</h1>
                    
                    <br /><br />

                    <label>
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
                        Clinic/Hospital Name:
                        <input
                            type="text"
                            name="clinic_name"
                            value={formData.clinic_name}
                            onChange={handleChange}
                            required
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

                    <label>
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

                    <label>
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

                    <label>
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

                    <label>
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

                    <label>
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
        {/* <DeleteClinic/>
        <UpdateClinic/> */}
    </div>
 </>
  )
}

export default DoctorAvailability