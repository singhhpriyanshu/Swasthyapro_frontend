import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { NavLink, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { DoctorContext } from '../context/DoctorContext';
import logo from '../assets/logo.png';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false); // Mobile hamburger
  const [showUserDropdown, setShowUserDropdown] = useState(false); // Desktop user dropdown

  const { token, setToken, userData, setUserData } = useContext(AppContext);
  const { profileData, setProfileData } = useContext(DoctorContext);

  // For patient user
  const logout = () => {
    sessionStorage.removeItem('userData');
    setToken(false);
    setUserData(false);
    navigate('/login');
  };

  // For doctor user
  const doctorlogout = () => {
    sessionStorage.removeItem('doctorData');
    setToken(false);
    setProfileData(false);
    navigate('/login');
  };

  // If the user is a doctor, show top bar with "Logout" only
  if (profileData) {
    return (
      <div
        className="flex items-center justify-between py-4 mb-5 border-b border-[#ADADAD] bg-[#D4F3E0] text-sm"
        style={{ height: '60px' }}
      >
        {/* Left side: Logo */}
        <div className="flex items-center px-5 py-6">
          <img src={logo} className="w-36" alt="Logo" />
        </div>

        {/* Right side: Logout + Mobile Menu */}
        <div className="flex items-center gap-4">
          {/* Doctor logout button (desktop) */}
          <div className="hidden md:flex items-center gap-4 px-4 py-2">
            <button
              onClick={doctorlogout}
              className="bg-green-600 text-white text-sm px-4 py-2 rounded-full hover:bg-green-700 transition"
            >
              Logout
            </button>
          </div>

          {/* Mobile Menu Icon */}
          <img
            onClick={() => setShowMenu(true)}
            className="w-6 md:hidden cursor-pointer"
            src={assets.menu_icon}
            alt="Menu"
          />

          {/* Mobile Menu */}
          {showMenu && (
            <div className="fixed inset-0 z-20 bg-white">
              <div className="flex items-center justify-between px-5 py-6 border-b border-gray-200">
                <img src={logo} className="w-36" alt="Logo" />
                <img
                  onClick={() => setShowMenu(false)}
                  src={assets.cross_icon}
                  className="w-7 cursor-pointer"
                  alt="Close"
                />
              </div>
              <ul className="flex flex-col items-center gap-5 mt-5 text-sm font-medium">
                {/* Minimal links for doctors; add as needed */}
                <li>
                  <button
                    onClick={doctorlogout}
                    className="bg-green-600 text-white px-4 py-2 rounded-full text-sm hover:bg-green-700 transition"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Otherwise, for normal (patient) users
  return (
    <div
      id="navbar"
      className="flex items-center justify-between py-4 mb-5 border-b border-[#ADADAD] bg-[#D4F3E0] text-sm"
      style={{ height: '60px' }}
    >
      {/* Left: Logo */}
      <NavLink to="/">
        <img id="img" src={logo} alt="Logo" />
      </NavLink>

      {/* Center: Main Nav (desktop only) */}
      <ul
        className="hidden md:flex items-center gap-5 font-medium"
        style={{ color: '#178066' }}
      >
        <NavLink to="/">
          <li className="py-1 text-sm">HOME</li>
        </NavLink>
        <NavLink to="/doctors">
          <li className="py-1 text-sm">FIND DOCTORS</li>
        </NavLink>
        <NavLink to="/findtests">
          <li className="py-1 text-sm">FIND TESTS</li>
        </NavLink>
        <NavLink to="/my-appointments">
          <li className="py-1 text-sm">APPOINTMENTS</li>
        </NavLink>
        <NavLink to="/about">
          <li className="py-1 text-sm">ABOUT</li>
        </NavLink>
        <NavLink to="/contact">
          <li className="py-1 text-sm">CONTACT</li>
        </NavLink>
      </ul>

      {/* Right: "Create account" or user dropdown (desktop only) + Mobile Menu */}
      <div className="flex items-center gap-4">
        {/* If user logged in => user dropdown; else => "Create account" button (DESKTOP ONLY) */}
        {userData ? (
          <div
            className="relative hidden md:flex items-center gap-2 cursor-pointer p-3"
            onClick={() => setShowUserDropdown(!showUserDropdown)}
          >
            {/* Dropdown icon */}
            <i className="fa-solid fa-circle-chevron-down text-xl text-[#178066]" />
            {/* Dropdown Menu */}
            {showUserDropdown && (
              <div className="absolute top-12 right-0 bg-gray-50 rounded shadow-lg p-4 text-gray-600 text-sm space-y-3 z-30">
                <p
                  onClick={() => {
                    setShowUserDropdown(false);
                    navigate('/my-profile');
                  }}
                  className="hover:text-black cursor-pointer"
                >
                  My Profile
                </p>
                <p
                  onClick={() => {
                    setShowUserDropdown(false);
                    navigate('/my-appointments');
                  }}
                  className="hover:text-black cursor-pointer"
                >
                  My Appointments
                </p>
                <p
                  onClick={() => {
                    setShowUserDropdown(false);
                    logout();
                  }}
                  className="hover:text-black cursor-pointer"
                >
                  Logout
                </p>
              </div>
            )}
          </div>
        ) : (
          /* Create Account button (DESKTOP ONLY) */
          <button
            onClick={() => navigate('/login')}
            className="hidden md:block bg-seagreen-200 text-white px-4 py-2 rounded-full text-sm hover:bg-green-600 transition"
          >
            Create account
          </button>
        )}

        {/* Mobile Menu Icon */}
        <img
          onClick={() => setShowMenu(true)}
          className="w-6 md:hidden cursor-pointer"
          src={assets.menu_icon}
          alt="Menu"
        />

        {/* Mobile Menu */}
        {showMenu && (
          <div className="fixed inset-0 z-20 bg-white">
            <div className="flex items-center justify-between px-5 py-6 border-b border-gray-200">
              <img src={logo} className="w-36" alt="Logo" />
              <img
                onClick={() => setShowMenu(false)}
                src={assets.cross_icon}
                className="w-7 cursor-pointer"
                alt="Close"
              />
            </div>
            <ul className="flex flex-col items-center gap-3 mt-5 px-5 text-sm font-medium">
              <NavLink onClick={() => setShowMenu(false)} to="/">
                <p className="px-4 py-2">HOME</p>
              </NavLink>
              <NavLink onClick={() => setShowMenu(false)} to="/doctors">
                <p className="px-4 py-2">FIND DOCTORS</p>
              </NavLink>
              <NavLink onClick={() => setShowMenu(false)} to="/findtests">
                <p className="px-4 py-2">FIND TESTS</p>
              </NavLink>
              <NavLink onClick={() => setShowMenu(false)} to="/my-appointments">
                <p className="px-4 py-2">APPOINTMENTS</p>
              </NavLink>
              <NavLink onClick={() => setShowMenu(false)} to="/about">
                <p className="px-4 py-2">ABOUT</p>
              </NavLink>
              <NavLink onClick={() => setShowMenu(false)} to="/contact">
                <p className="px-4 py-2">CONTACT</p>
              </NavLink>

              {userData ? (
                /* If user logged in => My Profile, My Appointments, Logout in hamburger */
                <>
                  <p
                    onClick={() => {
                      setShowMenu(false);
                      navigate('/my-profile');
                    }}
                    className="px-4 py-2"
                  >
                    My Profile
                  </p>
                  <p
                    onClick={() => {
                      setShowMenu(false);
                      navigate('/my-appointments');
                    }}
                    className="px-4 py-2"
                  >
                    My Appointments
                  </p>
                  <p
                    onClick={() => {
                      setShowMenu(false);
                      logout();
                    }}
                    className="px-4 py-2"
                  >
                    Logout
                  </p>
                </>
              ) : (
                /* Otherwise => 'Create account' in hamburger */
                <NavLink
                  onClick={() => setShowMenu(false)}
                  to="/login"
                >
                  <p className="px-4 py-2 font-bold">CREATE ACCOUNT</p>
                </NavLink>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
