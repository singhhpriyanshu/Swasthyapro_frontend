import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const MyProfile = () => {

    const [isEdit, setIsEdit] = useState(false)

    const [image, setImage] = useState(false)

    const { token, backendUrl, userData, setUserData, loadUserProfileData } = useContext(AppContext)
    console.log(userData);
    

    // Function to update user profile data using API
    const updateUserProfileData = async () => {

        try {

            const formData = new FormData();

            formData.append('first_name', userData.first_name)
            formData.append('last_name',userData.last_name)
            formData.append('pincode',userData.pincode)
            formData.append('email',userData.email)
            formData.append('contact', userData.contact)
            formData.append('address',userData.address)
            formData.append('dob', userData.dob)

            image && formData.append('image', image)

            const { data } = await axios.put(backendUrl + '/api/user/update-profile', formData)

            if (data.success) {
                toast.success(data.message)
                // await loadUserProfileData()
                setIsEdit(false)
                setImage(false)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }

    }

    return userData ? (
        <div className='max-w-lg flex flex-col gap-2 text-sm pt-5'>

            {isEdit
                ? <label htmlFor='image' >
                    <div className='inline-block relative cursor-pointer'>
                        <img className='w-36 rounded opacity-75' src={image ? URL.createObjectURL(image) : userData.image_url} alt="" />
                        <img className='w-10 absolute bottom-12 right-12' src={image ? '' : assets.upload_icon} alt="" />
                    </div>
                    <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden />
                </label>
                : <img className='w-36 rounded' src={userData.image_url} alt="" />
            }

            {isEdit

                ? 
                <><input className='bg-gray-50 text-3xl font-medium max-w-60' type="text" onChange={(e) => setUserData(prev => ({ ...prev, first_name: e.target.value }))} value={userData.first_name} />
                  <input className='bg-gray-50 text-3xl font-medium max-w-60' type="text" onChange={(e) => setUserData(prev => ({ ...prev, last_name: e.target.value }))} value={userData.last_name} />

                </>
                : <p className='font-medium text-3xl text-[#262626] mt-4'>{userData.firstName+userData.lastName}</p>
            }

            <hr className='bg-[#ADADAD] h-[1px] border-none' />

            <div>
                <p className='text-gray-600 underline mt-3'>CONTACT INFORMATION</p>
                <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-[#363636]'>
                    <p className='font-medium'>Email id:</p>
                    {/* <p className='text-blue-500'>{userData.email}</p> */}
                    {isEdit 
                        ? <input className='bg-gray-50 max-w-52' type="email" onChange={(e) => setUserData(prev => ({ ...prev, email: e.target.value }))} value={userData.email} />
                        : <p className='text-blue-500'>{userData.email}</p>
                    }

                    {/* <p className='font-medium'>Phone:{userData.contact}</p> */}

                    {isEdit
                        ? <input className='bg-gray-50 max-w-52' type="text" onChange={(e) => setUserData(prev => ({ ...prev, contact: e.target.value }))} value={userData.contact} />
                        : <p className='text-blue-500'>{userData.contact}</p>
                    }

                    {/* <p className='font-medium'>Address:{userData.address}</p> */}

                    {isEdit
                        ? <p>
                            <input className='bg-gray-50' type="text" onChange={(e) => setUserData(prev => ({ ...prev, address:e.target.value  }))} value={userData.address} />
                            </p>
                        : <p className='text-gray-500'> {userData.address}</p>
                    }

                </div>
            </div>
            <div>
                <p className='text-[#797979] underline mt-3'>BASIC INFORMATION</p>
                <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-gray-600'>
                    

                    

                    <p className='font-medium'>Birthday:</p>

                    {isEdit
                        ? <input className='max-w-28 bg-gray-50' type='date' onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))} value={userData.dob} />
                        : <p className='text-gray-500'>{userData.dob}</p>
                    }

                </div>
            </div>
            <div className='mt-10'>

                {isEdit
                    ? <>
                    <button onClick={updateUserProfileData} className='border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all'>Save information</button>
                      <button onClick={()=>{setIsEdit(false)}} className="border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all"> Cancel Edit</button>
                      </>
                    : <button onClick={() => setIsEdit(true)} className='border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all'>Edit</button>
                }

            </div>
        </div>
    ) : null
}

export default MyProfile