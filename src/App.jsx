import React from 'react'
import Navbar from './components/Navbar'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Doctors from './pages/Doctors'
import Login from './pages/Login'
import About from './pages/About'
import Contact from './pages/Contact'
import Appointment from './pages/Appointment'
import MyAppointments from './pages/MyAppointments'
import MyProfile from './pages/MyProfile'
import Footer from './components/Footer'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Verify from './pages/Verify'
import Findtest from './pages/Findtest'
import Otppage from './pages/Otppage'
import AuthPage from './pages/Authpage'
import DoctorRegistration from './pages/DoctorRegistration'
import DoctorProfile from './pages/Doctor/DoctorProfile'
import DoctorDashboard from './pages/Doctor/DoctorDashboard'
import DoctorPage from './pages/Doctor/DoctorPage'
import DoctorAppointments from './pages/Doctor/DoctorAppointments'
import DoctorAvailability from './pages/Doctor/DoctorAvailability'
import DoctorLogin from './pages/DoctorLogin'
import  {  useContext,useEffect } from 'react'
import { AppContext } from '../src/context/AppContext'
import { DoctorContext} from '../src/context/DoctorContext'
import UpdataClinic from '../src/pages/Doctor/UpdataClinic'
import DeleteClinic from '../src/pages/Doctor/DeleteClinic'

const App = () => {



  const { userData, setUserData } = useContext(AppContext)
  const { profileData, setProfileData } = useContext(DoctorContext);
  useEffect(() => {
    const savedUser = localStorage.getItem("userData");
    const savedDoctor=localStorage.getItem("doctorData")
    console.log("Saved user data on reload:", savedUser);
    if (savedUser) {
      setUserData(JSON.parse(savedUser));
    }else if(savedDoctor){
      setProfileData(JSON.parse(savedDoctor));
    }else{
      alert("please login")
    }
    
  }, []);

  return (
    <div className='mx-4 sm:mx-[10%]' style={{marginLeft:'0',marginRight:'0'}}>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/doctor-page' element={<DoctorPage/>}/>
        <Route path='/doctorregistration' element={<DoctorRegistration/>}/>
        <Route path='/doctor-dashboard' element={<DoctorDashboard/>} />
        <Route path='/doctor-availability' element={<DoctorAvailability/>} />
        <Route path='/doctor-login' element ={<DoctorLogin/>}/>
        <Route path='/doctor-appointments' element={<DoctorAppointments/>} />
        <Route path='/otp' element={<Otppage/>}/>
        <Route path='/authpage' element={<AuthPage/>}/>
        <Route path='/findtests' element={<Findtest/>}/>
        <Route path='/doctors' element={<Doctors />} />
        <Route path='/doctors/:speciality' element={<Doctors />} />
        <Route path='/login' element={<Login />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/appointment/:docId' element={<Appointment />} />
        <Route path='/my-appointments' element={<MyAppointments />} />
        <Route path='/my-profile' element={<MyProfile />} />
        <Route path='/verify' element={<Verify />} />
        <Route path='/doctor-profile' element={<DoctorProfile/>} />
        <Route path='/updata-clinic' element={<UpdataClinic/>} />
        <Route path='/delete-clinic' element={<DeleteClinic/>} />

      </Routes>
      <Footer />
    </div>
  )
}

export default App