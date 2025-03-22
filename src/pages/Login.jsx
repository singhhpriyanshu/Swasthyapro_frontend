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
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);

  const navigate = useNavigate();
  const { backendUrl, token, setToken, userData, setUserData } = useContext(AppContext);
  const { profileData, setProfileData } = useContext(DoctorContext);

  const sendOtp = async () => {
    if (state === "Sign Up") {
      try {
        const response = await axios.post(`${backendUrl}/api/auth/emailVerification`, { email });
        if (response) {
          setIsOtpSent(true);
          setShowOtpModal(true);
          toast.success("OTP sent to your email!");
        }
      } catch (error) {
        toast.error(error.response?.data?.error || "Failed to send OTP");
      }
    } else if (state === 'Loginwithcontact') {
      try {
        const response = await axios.post(`${backendUrl}/api/whatsappOtp/${contact}`);
        if (response) {
          setIsOtpSent(true);
          setShowOtpModal(true);
          toast.success("OTP sent to your contact!");
        }
      } catch (error) {
        toast.error(error.response?.data?.error || "Failed to send OTP");
      }
    } else {
      try {
        const response = await axios.post(`${backendUrl}/send_dml_otp/${email}`);
        if (response) {
          setIsOtpSent(true);
          setShowOtpModal(true);
          toast.success("OTP sent to your email!");
        }
      } catch (error) {
        toast.error(error.response?.data?.error || "Failed to send OTP");
      }
    }
  };

  const verifyOtp = async () => {
    try {
      if (state === 'Loginwithcontact') {
        const response = await axios.post(`${backendUrl}/api/auth/user/contactlogin`, { contact, otp });
        const data = response.data;

        if (data) {
          if (data.loginuser) {
            sessionStorage.setItem("userType", "user");
            sessionStorage.setItem("userData", JSON.stringify(data.loginuser));
            setUserData(data.loginuser);
            console.log(userData);
          }
          toast.success("Login successful!");
          setOtp("");
        } else {
          toast.error(data.message || "Login failed. Please try again.");
        }
      } else {
        const response = await axios.post(`${backendUrl}/api/auth/otpVerification`, { email, otp });
        if (response.data) {
          if (state === "Sign Up") {
            registerUser();
            setShowOtpModal(false);
          } else {
            loginuser();
            setShowOtpModal(false);
          }
        } else {
          toast.error("Invalid OTP");
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "OTP verification failed");
    }
  };

  const loginuser = async () => {
    try {
      const response = await axios.post(`${backendUrl}/api/auth/login`, { email, password });
      const data = response.data;

      if (data) {
        if (data.loginuser) {
          sessionStorage.setItem("userType", "user");
          sessionStorage.setItem("userData", JSON.stringify(data.loginuser));
          setUserData(data.loginuser);
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
  };

  const registerUser = async () => {
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
      state: statee,
    };

    try {
      const { data } = await axios.post(`${backendUrl}/api/auth/register`, requestBody);
      if (data.message === "User registered successfully") {
        toast.success("Registration successful!");
        setState('Login');
        setIsOtpSent(false);
      } else {
        toast.error(data.error || "Registration failed. Please try again.");
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "An error occurred during registration.");
    }
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    await sendOtp();
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
    <>
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
              <div className='form-field'>
                <p>Register</p>
                {/* <input onChange={(e) => setaltno(e.target.value)} value={alternatecontactno} type="number" required /> */}
              </div>
            </>
          )}
          {state === 'Loginwithcontact' && (
            <div className='form-field'>
              <p>Enter Contact No.</p>
              <input onChange={(e) => setContact(e.target.value)} value={contact} type="text" placeholder='Enter your contact no.' required />
              <button className='form-button'>Send OTP</button>
            </div>
          )}
          {state === 'Login' && (
            <>
              <div className='form-field'>
                <p>Email</p>
                <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" required />
              </div>
              <div className='form-field'>
                <p>Password</p>
                <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" required />
              </div>
              <button className='form-button'>{state === 'Sign Up' ? 'Create account' : 'Login'}</button>
            </>
          )}
          {state === 'Sign Up' ? (
            <p>Already have an account?<br></br> <span onClick={() => setState('Login')} className='form-link'>Login as User</span> &nbsp;&nbsp;
              <span onClick={() => navigate('/doctor-login')} className='form-link'>Login as Doctor</span></p>
          ) : (
            <>
              <p>Create a new account? <span onClick={() => setState('Sign Up')} className='form-link'>Click here</span></p>
              <p>Login in with Contact No.<span onClick={() => setState('Loginwithcontact')} className='form-link'>Click here</span></p>
            </>
          )}
          <p>Register as a Doctor <span onClick={() => navigate('/doctorregistration')} className='form-link'>Click here</span></p>
        </div>
      </form>

      {/* OTP Modal */}
      {showOtpModal && (
        <div style={{
          position: 'fixed',
          top: '0',
          left: '0',
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: '1000',
        }}>
          <div style={{
            backgroundColor: '#fff',
            padding: '20px',
            borderRadius: '8px',
            width: '300px',
            textAlign: 'center',
          }}>
            <h3>Enter OTP</h3>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                margin: '10px 0',
                borderRadius: '4px',
                border: '1px solid #ccc',
              }}
            />
            <button
              onClick={verifyOtp}
              style={{
                backgroundColor: '#3b82f6',
                color: '#fff',
                padding: '10px 20px',
                borderRadius: '4px',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Submit OTP
            </button>
            <button
              onClick={() => setShowOtpModal(false)}
              style={{
                backgroundColor: '#ef4444',
                color: '#fff',
                padding: '10px 20px',
                borderRadius: '4px',
                border: 'none',
                cursor: 'pointer',
                marginLeft: '10px',
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;