import React, { useContext, useState } from "react";
import home_icon from "../assets/home_icon.svg";
import people_icon from "../assets/people_icon.svg";
import clockalert from "../assets/clock-alert.svg";
import appointment_icon from "../assets/appointment_icon.svg";
import { NavLink } from "react-router-dom";
import { DoctorContext } from "../context/DoctorContext";
import { FaBars, FaTimes } from "react-icons/fa";

const Sidebar = () => {
  const { profileData } = useContext(DoctorContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Control for mobile sidebar

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {/* Sidebar Container */}
      <div
        className={`fixed md:relative min-h-screen ${
          isSidebarOpen ? "w-64" : "w-16"
        } md:w-64 bg-[#D4F3E0] text-black transition-all duration-300 z-20`}
      >
        {/* Hamburger Menu (for mobile) */}
        <div className="flex items-center justify-between px-4 py-3 md:hidden">
          <h2 className="text-lg font-semibold text-[#178066]">
            {isSidebarOpen ? "Doctor Portal" : ""}
          </h2>
          <button
            onClick={toggleSidebar}
            className="text-[#178066] focus:outline-none"
          >
            {isSidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>

        {/* Sidebar Links */}
        <ul className="mt-5">
          {profileData && (
            <>
              <NavLink
                to={"/doctor-appointments"}
                className={({ isActive }) =>
                  `flex items-center gap-3 py-3 px-4 md:px-6 cursor-pointer ${
                    isActive ? "bg-[#B5E6CC] text-[#178066]" : "hover:bg-[#CDE9D8]"
                  }`
                }
              >
                <img className="w-6 h-6" src={appointment_icon} alt="Dashboard" />
                {isSidebarOpen && <p>Dashboard</p>}
              </NavLink>

              <NavLink
                to={"/doctor-availability"}
                className={({ isActive }) =>
                  `flex items-center gap-3 py-3 px-4 md:px-6 cursor-pointer ${
                    isActive ? "bg-[#B5E6CC] text-[#178066]" : "hover:bg-[#CDE9D8]"
                  }`
                }
              >
                <img
                  className="w-6 h-6"
                  src={clockalert}
                  alt="Manage Clinics"
                />
                {isSidebarOpen && <p>Manage Clinics</p>}
              </NavLink>

              <NavLink
                to={"/doctor-profile"}
                className={({ isActive }) =>
                  `flex items-center gap-3 py-3 px-4 md:px-6 cursor-pointer ${
                    isActive ? "bg-[#B5E6CC] text-[#178066]" : "hover:bg-[#CDE9D8]"
                  }`
                }
              >
                <img className="w-6 h-6" src={people_icon} alt="Profile" />
                {isSidebarOpen && <p>Profile</p>}
              </NavLink>
            </>
          )}
        </ul>
      </div>

      {/* Overlay for mobile when the sidebar is open */}
      {isSidebarOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
        ></div>
      )}
    </>
  );
};

export default Sidebar;
