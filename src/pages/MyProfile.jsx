import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';

const MyProfile = () => {
    const [isEdit, setIsEdit] = useState(false);
    const [image, setImage] = useState(false);

    const { token, backendUrl, userData, setUserData, loadUserProfileData } = useContext(AppContext);

    const updateUserProfileData = async () => {
        try {
            const formData = new FormData();
            formData.append('name', userData.name);
            formData.append('phone', userData.phone);
            formData.append('address', JSON.stringify(userData.address));
            formData.append('gender', userData.gender);
            formData.append('dob', userData.dob);
            image && formData.append('image', image);

            const { data } = await axios.post(backendUrl + '/api/user/update-profile', formData, { headers: { token } });

            if (data.success) {
                toast.success(data.message);
                await loadUserProfileData();
                setIsEdit(false);
                setImage(false);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    return userData ? (
        <div className="max-w-lg mx-auto flex flex-col gap-4 text-sm pt-5 bg-white shadow-lg rounded-lg p-6 transition-all duration-300 hover:shadow-xl">
            <div className="flex flex-col items-center">
                {isEdit ? (
                    <label htmlFor="image">
                        <div className="relative cursor-pointer group">
                            <img
                                className="w-36 h-36 rounded-full border-2 border-dashed border-gray-300 object-cover group-hover:opacity-75 transition-all duration-300"
                                src={image ? URL.createObjectURL(image) : userData.image}
                                alt=""
                            />
                            <img
                                className="w-10 absolute bottom-4 right-4 opacity-80"
                                src={image ? '' : assets.upload_icon}
                                alt=""
                            />
                        </div>
                        <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden />
                    </label>
                ) : (
                    <img className="w-36 h-36 rounded-full border-4 border-primary object-cover" src={userData.image} alt="" />
                )}

                {isEdit ? (
                    <input
                        className="mt-4 bg-gray-50 text-2xl font-medium text-center rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                        type="text"
                        onChange={(e) => setUserData((prev) => ({ ...prev, name: e.target.value }))}
                        value={userData.name}
                    />
                ) : (
                    <p className="mt-4 font-medium text-3xl text-gray-800">{userData.firstName}</p>
                )}
            </div>

            <hr className="bg-gray-300 h-[1px] border-none" />

            <div>
                <p className="text-gray-600 underline mt-3">CONTACT INFORMATION</p>
                <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-gray-800">
                    <p className="font-medium">Email:</p>
                    <p className="text-blue-500">{userData.email}</p>

                    <p className="font-medium">Phone:</p>
                    {isEdit ? (
                        <input
                            className="bg-gray-50 rounded-md border border-gray-300 px-3 py-1 focus:outline-none focus:ring-2 focus:ring-primary"
                            type="text"
                            onChange={(e) => setUserData((prev) => ({ ...prev, phone: e.target.value }))}
                            value={userData.phone}
                        />
                    ) : (
                        <p className="text-blue-500">{userData.phone}</p>
                    )}

                    <p className="font-medium">Address:</p>
                    {isEdit ? (
                        <div>
                            <input
                                className="bg-gray-50 w-full rounded-md border border-gray-300 px-3 py-1 focus:outline-none focus:ring-2 focus:ring-primary"
                                type="text"
                                onChange={(e) => setUserData((prev) => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))}
                                value={userData.address.line1}
                            />
                            <input
                                className="mt-2 bg-gray-50 w-full rounded-md border border-gray-300 px-3 py-1 focus:outline-none focus:ring-2 focus:ring-primary"
                                type="text"
                                onChange={(e) => setUserData((prev) => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))}
                                value={userData.address.line2}
                            />
                        </div>
                    ) : (
                        <p className="text-gray-500">
                            {userData.address.line1} <br /> {userData.address.line2}
                        </p>
                    )}
                </div>
            </div>

            <div>
                <p className="text-gray-600 underline mt-3">BASIC INFORMATION</p>
                <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-gray-800">
                    <p className="font-medium">Gender:</p>
                    {isEdit ? (
                        <select
                            className="bg-gray-50 rounded-md border border-gray-300 px-3 py-1 focus:outline-none focus:ring-2 focus:ring-primary"
                            onChange={(e) => setUserData((prev) => ({ ...prev, gender: e.target.value }))}
                            value={userData.gender}
                        >
                            <option value="Not Selected">Not Selected</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    ) : (
                        <p className="text-gray-500">{userData.gender}</p>
                    )}

                    <p className="font-medium">Birthday:</p>
                    {isEdit ? (
                        <input
                            className="bg-gray-50 rounded-md border border-gray-300 px-3 py-1 focus:outline-none focus:ring-2 focus:ring-primary"
                            type="date"
                            onChange={(e) => setUserData((prev) => ({ ...prev, dob: e.target.value }))}
                            value={userData.dob}
                        />
                    ) : (
                        <p className="text-gray-500">{userData.dob}</p>
                    )}
                </div>
            </div>

            <div className="mt-10 flex justify-center">
                {isEdit ? (
                    <button
                        onClick={updateUserProfileData}
                        className="bg-primary text-white px-8 py-2 rounded-full shadow-lg hover:shadow-xl hover:bg-opacity-90 transition-all duration-300"
                    >
                        Save information
                    </button>
                ) : (
                    <button
                        onClick={() => setIsEdit(true)}
                        className="bg-primary text-white px-8 py-2 rounded-full shadow-lg hover:shadow-xl hover:bg-opacity-90 transition-all duration-300"
                    >
                        Edit
                    </button>
                )}
            </div>
        </div>
    ) : null;
};

export default MyProfile;
