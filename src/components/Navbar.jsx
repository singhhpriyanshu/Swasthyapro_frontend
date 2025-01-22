import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import Newlogo from '../assets/Newlogo.jpeg'
import { DoctorContext } from '../context/DoctorContext'
import Swasthya from '../assets/Swasthya.png';
import './Navbar.css'
const Navbar = () => {

  const navigate = useNavigate()

  const [showMenu, setShowMenu] = useState(false)
  const { token, setToken, userData, setUserData } = useContext(AppContext)
  const { profileData, setProfileData } = useContext(DoctorContext)

  const logout = () => {
    sessionStorage.removeItem("userData");
    setToken(false)
    setUserData(false)
    navigate('/login')
  }
  const doctorlogout = () => {
    sessionStorage.removeItem("doctorData");    setToken(false)
    setProfileData(false)
    navigate('/login')
  }

  return (
    profileData ?
     
    <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-[#ADADAD]' style={{ height: '60px', backgroundColor: "#178066", width: '100%' }}>
      <div><p style={{ marginLeft: "85px", color: "white", fontSize: "x-large", fontWeight: "900" }}></p></div>
      

        <div className='flex items-center gap-4 ' id=''>
          <div className='flex items-center justify-around  gap-96 px-4 py-2'>
         <img className=' pl-4 ml-4 h-9 absolute left-0 gap-4'  to='/' src={Swasthya} alt="" />



          <button  onClick={doctorlogout} class="bg-cadetblue text-white text-sm px-10 py-2 rounded-full">Logout</button>

          </div>


          <img onClick={() => setShowMenu(true)} className='w-6 md:hidden' src={assets.menu_icon} alt="" />

          {/* ---- Mobile Menu ---- */}
          <div className={`md:hidden ${showMenu ? 'fixed w-full' : 'h-0 w-0'} right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}>
            <div className='flex items-center justify-between px-5 py-6'>
              <img src={assets.Swasthya} className='w-36' alt="" />
              <img onClick={() => setShowMenu(false)} src={assets.cross_icon} className='w-7 ' alt="" />
            </div>
            <ul className='flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium'>
              <NavLink onClick={() => setShowMenu(false)} to='/'><p className='px-4 py-2 rounded full inline-block'>HOME</p></NavLink>
              <NavLink onClick={() => setShowMenu(false)} to='/doctors' ><p className='px-4 py-2 rounded full inline-block'>ALL DOCTORS</p></NavLink>
              <NavLink onClick={() => setShowMenu(false)} to='/about' ><p className='px-4 py-2 rounded full inline-block'>ABOUT</p></NavLink>
              <NavLink onClick={() => setShowMenu(false)} to='/contact' ><p className='px-4 py-2 rounded full inline-block'>CONTACT</p></NavLink>
            </ul>
          </div>
        </div>
      </div> :

      <div id='navbar' className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-[#ADADAD]' style={{ height: '60px', backgroundColor: "#178066" }}>
       <NavLink to='/'> <img id='img'  to='/' src={Swasthya} alt="" /></NavLink>
        <div>  <p style={{ marginLeft: "85px", color: "white", fontSize: "x-large", fontWeight: "900" }} > </p></div>
        <ul className='md:flex items-start gap-5 font-medium hidden' style={{ marginRight: "110px", color: "whitesmoke", fontSize: "medium", fontWeight: "500" }}>
          <NavLink to='/' >
            <li className='py-1'>HOME</li>
            <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
          </NavLink>
          <NavLink to='/doctors' >
            <li className='py-1'> FIND DOCTORS</li>
            <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
          </NavLink>
          <NavLink to='/findtests' >
            <li className='py-1'>FIND TESTS</li>
            <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
          </NavLink>
          <NavLink to='/my-appointments' >
            <li className='py-1'>APPOINTMENTS</li>
            <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
          </NavLink>
          <NavLink to='/my-appointments' >
            <li className='py-1'>MY TESTS</li>
            <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
          </NavLink>
          <NavLink to='/about' >
            <li className='py-1'>ABOUT</li>
            <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
          </NavLink>
          <NavLink to='/contact' >
            <li className='py-1'>CONTACT</li>
            <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
          </NavLink> 
        </ul>

        <div className='flex items-center gap-4 '>
          {
            userData 
              ? <div className='flex items-center gap-3 cursor-pointer group relative p-3'>
              {/* <img 
                className='w-8 rounded-full transition-transform transform hover:scale-110 hover:shadow-lg duration-300 ease-in-out' 
                src={userData.image} 
                alt="User Avatar" 
              /> */}
              <i 
                className='fa-solid fa-circle-chevron-down text-xl transition-transform transform hover:rotate-180 duration-300 ease-in-out' 
                aria-hidden='true'>
              </i>
              <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
                <div className='min-w-48 bg-gray-50 rounded flex flex-col gap-4 p-4 shadow-lg'>
                  <p 
                    onClick={() => navigate('/my-profile')} 
                    className='hover:text-black cursor-pointer transition-transform transform hover:scale-105 hover:shadow-md duration-200 ease-in-out'>
                    My Profile
                  </p>
                  <p 
                    onClick={() => navigate('/my-appointments')} 
                    className='hover:text-black cursor-pointer transition-transform transform hover:scale-105 hover:shadow-md duration-200 ease-in-out'>
                    My Appointments
                  </p>
                  <p 
                    onClick={logout} 
                    className='hover:text-black cursor-pointer transition-transform transform hover:scale-105 hover:shadow-md duration-200 ease-in-out'>
                    Logout
                  </p>
                </div>
              </div>
            </div>
            
            
              : <button onClick={() => navigate('/login')} className='bg-green-500 text-white px-1 py-2 mr-4 rounded-full font-light hidden md:block'>Create account</button>
          }
          <img onClick={() => setShowMenu(true)} className='w-6 md:hidden' src={assets.menu_icon} alt="" />

          {/* ---- Mobile Menu ---- */}
          <div className={`md:hidden ${showMenu ? 'fixed w-full' : 'h-0 w-0'} right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}>
            <div className='flex items-center px-5 py-6'>
              <img src={Swasthya} className='w-36' alt="" />
              <img onClick={() => setShowMenu(false)} src={assets.cross_icon} className='w-7 mx-28 ' alt="" />
            </div>
            <ul className='flex flex-col mx-36  gap-2 mt-3  text-lg font-medium'>
              <NavLink onClick={() => setShowMenu(false)} to='/'><p className='px-4 py-2 rounded full inline-block'>HOME</p></NavLink>
              <NavLink onClick={() => setShowMenu(false)} to='/doctors' ><p className='px-4 py-2 rounded full inline-block'>FIND DOCTORS</p></NavLink>
              <NavLink onClick={() => setShowMenu(false)} to='/findtests' ><p className='px-4 py-2 rounded full inline-block'>FIND
              TEST</p></NavLink>
              <NavLink onClick={() => setShowMenu(false)} to='/about' ><p className='px-4 py-2 rounded full inline-block'>ABOUT</p></NavLink>
              <NavLink onClick={() => setShowMenu(false)} to='/contact' ><p className='px-4 py-2 rounded full inline-block'>CONTACT</p></NavLink>
              <NavLink onClick={()=> setShowMenu(false)} to='/login'><p className='px-4 py-2 font-bold rounded full inline-block'>CREATE ACCOUNT</p></NavLink>
            </ul>
          </div>
        </div>
      </div>


  )
}

export default Navbar;
