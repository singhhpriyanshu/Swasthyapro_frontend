import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { DoctorContext } from '../context/DoctorContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import './Login.css'; // Import your CSS file

const Login = () => {
  const [state, setState] = useState('Sign Up');

  // Sign-up fields
  const [first_name, setFirst_name] = useState('');
  const [last_name, setLast_name] = useState('');
  const [date_of_birth, setdate_of_birth] = useState('');
  const [contact, setContact] = useState('');
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('');
  const [statee, setstatee] = useState('');
  const [alternatecontactno, setaltno] = useState('');

  // Common fields for sign-up & login
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // OTP state
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);

  // Show/hide form fields or OTP container
  const [showOtpStep, setShowOtpStep] = useState(false);

  const navigate = useNavigate();
  const { backendUrl, userData, setUserData } = useContext(AppContext);
  const { profileData } = useContext(DoctorContext);

  // -------------- API Calls --------------

  // 1) Send OTP for both Sign Up and Login
  const sendOtp = async () => {
    try {
      if (state === 'Sign Up') {
        // Sign Up flow
        const response = await axios.post(`${backendUrl}/auth/emailVerification`, { email });
        if (response) {
          setIsOtpSent(true);
          toast.success('OTP sent to your email!');
          // Hide form, show OTP container
          setShowOtpStep(true);
        }
      } else {
        // Login flow
        const response = await axios.post(`${backendUrl}/send_dml_otp/${email}`);
        if (response) {
          setIsOtpSent(true);
          toast.success('OTP sent to your email!');
          // Hide form, show OTP container
          setShowOtpStep(true);
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to send OTP');
    }
  };

  // 2) Verify the OTP
  const verifyOtp = async () => {
    try {
      const response = await axios.post(`${backendUrl}/auth/otpVerification/${email}`, { email, otp });
      if (response.data) {
        // If OTP is verified, decide next step
        if (state === 'Sign Up') {
          registerUser(); // proceed to sign-up
        } else {
          loginuser(); // proceed to login
        }
      } else {
        toast.error('Invalid OTP');
      }
    } catch (error) {
      toast.error(error.response?.data?.error || 'OTP verification failed');
    }
  };

  // 3) Actual login logic
  const loginuser = async () => {
    try {
      const response = await axios.post(`${backendUrl}/auth/login`, { email, password });
      const data = response.data;

      if (data && data.loginuser) {
        sessionStorage.setItem('userType', 'user');
        sessionStorage.setItem('userData', JSON.stringify(data.loginuser));
        setUserData(data.loginuser);
        toast.success('Login successful!');
        setEmail('');
        setPassword('');
      } else {
        toast.error(data?.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      toast.error(error.response?.data?.error || 'An error occurred during login.');
    }
  };

  // 4) Actual registration logic
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
      const { data } = await axios.post(`${backendUrl}/auth/register`, requestBody);
      if (data.message === 'User registered successfully') {
        toast.success('Registration successful!');
        setState('Login');
        setIsOtpSent(false);
        setShowOtpStep(false);
      } else {
        toast.error(data.error || 'Registration failed. Please try again.');
      }
    } catch (error) {
      toast.error(error.response?.data?.error || 'An error occurred during registration.');
    }
  };

  // -------------- Handlers --------------

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    // For both "Sign Up" and "Login", we now send OTP
    await sendOtp();
  };

  // -------------- Redirect if Logged In --------------
  useEffect(() => {
    if (userData) {
      navigate('/');
      window.scrollTo(0, 0);
    }
  }, [userData, navigate]);

  // -------------- Redirect if Doctor Logged In --------------
  useEffect(() => {
    if (profileData) {
      navigate('/doctor-appointments');
      window.scrollTo(0, 0);
    }
  }, [profileData, navigate]);

  // -------------- Render --------------
  return (
    <>
      <form onSubmit={onSubmitHandler} className="form-container">

        {/* If not showing OTP step, show the main form */}
        {!showOtpStep && (
          <div className="form-content">
            <p className="form-title">
              {state === 'Sign Up' ? 'Create Account' : 'Login'}
            </p>
            <p className="form-subtitle">
              Please {state === 'Sign Up' ? 'sign up' : 'log in'} to book appointment
            </p>

            {state === 'Sign Up' && (
              <>
                <div className="form-field">
                  <p>First Name</p>
                  <input
                    onChange={(e) => setFirst_name(e.target.value)}
                    value={first_name}
                    type="text"
                    required
                  />
                </div>
                <div className="form-field">
                  <p>Last Name</p>
                  <input
                    onChange={(e) => setLast_name(e.target.value)}
                    value={last_name}
                    type="text"
                    required
                  />
                </div>
                <div className="form-field">
                  <p>Date of Birth</p>
                  <input
                    onChange={(e) => setdate_of_birth(e.target.value)}
                    value={date_of_birth}
                    type="date"
                    required
                  />
                </div>
                <div className="form-field">
                  <p>Contact</p>
                  <input
                    onChange={(e) => setContact(e.target.value)}
                    value={contact}
                    type="number"
                    required
                  />
                </div>
                <div className="form-field">
                  <p>Address</p>
                  <input
                    onChange={(e) => setAddress(e.target.value)}
                    value={address}
                    type="text"
                    required
                  />
                </div>
                <div className="form-field">
                  <p>Pincode</p>
                  <input
                    onChange={(e) => setPincode(e.target.value)}
                    value={pincode}
                    type="text"
                    required
                  />
                </div>
                <div className="form-field">
                  <p>State</p>
                  <input
                    onChange={(e) => setstatee(e.target.value)}
                    value={statee}
                    type="text"
                    required
                  />
                </div>
                <div className="form-field">
                  <p>Alternate contact no</p>
                  <input
                    onChange={(e) => setaltno(e.target.value)}
                    value={alternatecontactno}
                    type="number"
                    required
                  />
                </div>
              </>
            )}

            {/* Common fields for Sign Up and Login */}
            <div className="form-field">
              <p>Email</p>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                required
              />
            </div>
            <div className="form-field">
              <p>Password</p>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                required
              />
            </div>

            <button className="form-button">
              {state === 'Sign Up' ? 'Create account' : 'Login'}
            </button>

            {state === 'Sign Up' ? (
              <p>
                Already have an account?
                <br />
                <span
                  onClick={() => setState('Login')}
                  className="form-link"
                  style={{ cursor: 'pointer' }}
                >
                  Login as User
                </span>
                &nbsp;&nbsp;
                <span
                  onClick={() => navigate('/doctor-login')}
                  className="form-link"
                  style={{ cursor: 'pointer' }}
                >
                  Login as Doctor
                </span>
              </p>
            ) : (
              <p>
                Create a new account?{' '}
                <span
                  onClick={() => setState('Sign Up')}
                  className="form-link"
                  style={{ cursor: 'pointer' }}
                >
                  Click here
                </span>
              </p>
            )}
            <p>
              Register as a Doctor{' '}
              <span
                onClick={() => navigate('/doctorregistration')}
                className="form-link"
                style={{ cursor: 'pointer' }}
              >
                Click here
              </span>
            </p>
          </div>
        )}

        {/* If we are in the OTP step, hide main form and show OTP fields */}
        {showOtpStep && (
          <div className="otp-container">
            <p className="form-subtitle">Enter the OTP sent to your email</p>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="border p-2 rounded w-64"
              style={{ marginBottom: '1rem' }}
            />
            <button onClick={verifyOtp} className="form-button">
              Submit OTP
            </button>
          </div>
        )}
      </form>
    </>
  );
};

export default Login;
