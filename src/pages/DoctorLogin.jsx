import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { DoctorContext } from '../context/DoctorContext';
import { FaEnvelope, FaLock } from 'react-icons/fa';

const DoctorLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { profileData, setProfileData } = useContext(DoctorContext);
    const { backendUrl } = useContext(AppContext);
    const navigate = useNavigate();

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${backendUrl}/auth/doctorlogin`, { email, password });

            const data = response.data;

            if (data) {
                sessionStorage.setItem("userType", "doctor");
                sessionStorage.setItem("doctorData", JSON.stringify(data.logindoctor));
                setProfileData(data.logindoctor);
                toast.success('Login successful!');
                setEmail('');
                setPassword('');
            } else {
                toast.error(data.message || 'Login failed. Please try again.');
            }
        } catch (error) {
            toast.error(error.response?.data?.error || 'An error occurred during login.');
        }
    };

    useEffect(() => {
        if (profileData) {
            navigate('/doctor-profile'); // Redirect to doctor profile page
        }
    }, [profileData, navigate]);

    return (
        <div
            className="flex flex-col gap-4 m-auto items-center p-8 w-full max-w-lg border rounded-xl text-[#5E5E5E] text-sm shadow-lg bg-white 
            transition-all duration-300 hover:shadow-2xl focus-within:ring-2 focus-within:ring-primary"
        >
            <h2 className="text-2xl font-bold text-center w-full text-gray-800 mb-6">
                Doctor Login
            </h2>
            <form onSubmit={onSubmitHandler} className="w-full">
                <div className="w-full mb-6">
                    <label htmlFor="email" className="block text-gray-600 mb-2">
                        Email
                    </label>
                    <div className="relative">
                        <FaEnvelope
                            className={`absolute top-3 left-3 text-gray-400 transition-opacity duration-200 ${
                                email ? 'opacity-0' : 'opacity-100'
                            }`}
                        />
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            className="border border-[#DADADA] rounded w-full p-2 pl-10 mt-1 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent 
                            transition-all duration-300 hover:shadow-md"
                            type="email"
                            required
                        />
                    </div>
                </div>
                <div className="w-full mb-6">
                    <label htmlFor="password" className="block text-gray-600 mb-2">
                        Password
                    </label>
                    <div className="relative">
                        <FaLock
                            className={`absolute top-3 left-3 text-gray-400 transition-opacity duration-200 ${
                                password ? 'opacity-0' : 'opacity-100'
                            }`}
                        />
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            className="border border-[#DADADA] rounded w-full p-2 pl-10 mt-1 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent 
                            transition-all duration-300 hover:shadow-md"
                            type="password"
                            required
                        />
                    </div>
                </div>
                <button
                    className="bg-primary text-white w-full py-3 rounded-md text-base font-semibold hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary 
                    focus:ring-opacity-50 transition-all duration-300 transform hover:scale-105"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default DoctorLogin;
