import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { DoctorContext } from '../context/DoctorContext';
import './Login.css'; // Import CSS file

const Login = () => {
  const [state, setState] = useState('Sign Up');
  const [first_name, setFirst_name] = useState('');
  const [alternatecontactno, setaltno] = useState('');
  const [last_name, setLast_name] = useState('');
  const [date_of_birth, setdate_of_birth] = useState('');
  const [contact, setContact] = useState('');
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('');
  const [statee, setstatee] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const { backendUrl, token, setToken, userData, setUserData } = useContext(AppContext);
  const { profileData, setProfileData } = useContext(DoctorContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (state === 'Sign Up') {
      const requestBody = {
        first_name,
        last_name,
        email,
        password,
        date_of_birth,
        contact,
        alternatecontactno,
        address,
        pincode,
        state,
      };

      try {
        const { data } = await axios.post(`${backendUrl}/auth/register`, requestBody);

        if (data.message === "User registered successfully") {
          toast.success("Registration successful!");
        } else {
          toast.error(data.error || "Registration failed. Please try again.");
        }
      } catch (error) {
        toast.error(error.response?.data?.error || "An error occurred during registration.");
      }
    } else {
      try {
        const response = await axios.post(`${backendUrl}/auth/login`, { email, password });
        const data = response.data;

        if (data) {
          if (data.loginuser) {
            sessionStorage.setItem("userType", "user");
            sessionStorage.setItem("userData", JSON.stringify(data.loginuser));
            setUserData(data.loginuser)
            console.log(userData);
          }
         
          toast.success("Login successful!");
          setEmail("");
          setPassword("");
        } else {
          toast.error(data.message || "Login failed. Please try again.");
        }
      } catch (error) {
        toast.error(error.response?.data?.error || "An error occurred during login.");
      }
    }
  };

  useEffect(() => {
    if (userData) {
      navigate('/');
      window.scrollTo(0, 0);
    }
  }, [userData]);

  useEffect(() => {
    if (profileData) {
      navigate('/doctor-appointments');
      window.scrollTo(0, 0);
    }
  }, [profileData]);

  return (
    <form onSubmit={onSubmitHandler} className='form-container'>
      <div className='form-content'>
        <p className='form-title'>{state === 'Sign Up' ? 'Create Account' : 'Login'}</p>
        <p className='form-subtitle'>Please {state === 'Sign Up' ? 'sign up' : 'log in'} to book appointment</p>
        {state === 'Sign Up' && (
          <>
            <div className='form-field'>
              <p>First Name</p>
              <input onChange={(e) => setFirst_name(e.target.value)} value={first_name} type="text" required />
            </div>
            <div className='form-field'>
              <p>Last Name</p>
              <input onChange={(e) => setLast_name(e.target.value)} value={last_name} type="text" required />
            </div>
            <div className='form-field'>
              <p>Date of Birth</p>
              <input onChange={(e) => setdate_of_birth(e.target.value)} value={date_of_birth} type="date" required />
            </div>
            <div className='form-field'>
              <p>Contact</p>
              <input onChange={(e) => setContact(e.target.value)} value={contact} type="number" required />
            </div>
            <div className='form-field'>
              <p>Address</p>
              <input onChange={(e) => setAddress(e.target.value)} value={address} type="text" required />
            </div>
            <div className='form-field'>
              <p>Pincode</p>
              <input onChange={(e) => setPincode(e.target.value)} value={pincode} type="text" required />
            </div>
            <div className='form-field'>
              <p>State</p>
              <input onChange={(e) => setstatee(e.target.value)} value={statee} type="text" required />
            </div>
            <div className='form-field'>
              <p>Alternate contact no</p>
              <input onChange={(e) => setaltno(e.target.value)} value={alternatecontactno} type="number" required />
            </div>
          </>
        )}
        <div className='form-field'>
          <p>Email</p>
          <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" required />
        </div>
        <div className='form-field'>
          <p>Password</p>
          <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" required />
        </div>
        <button className='form-button'>{state === 'Sign Up' ? 'Create account' : 'Login'}</button>
        {state === 'Sign Up' ? (
          <p>Already have an account?<br></br> <span onClick={() => setState('Login')} className='form-link'>Login as User</span> &nbsp;&nbsp;
          <span onClick={()=>navigate('/doctor-login')} className='form-link'>Login as Doctor</span></p>
        ) : (
          <p>Create a new account? <span onClick={() => setState('Sign Up')} className='form-link'>Click here</span></p>
        )}
        <p>Register as a Doctor <span onClick={() => navigate('/doctorregistration')} className='form-link'>Click here</span></p>
      </div>
    </form>
  );
};

export default Login;
