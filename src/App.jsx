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
import Facility from './pages/Tests/Facility'
import TestDetails from './pages/Tests/TestsDetails'
import Cart from './pages/Tests/Cart'
import MyTest from './pages/MyTest'
import DML from './pages/DML'

const App = () => {



  const { userData, setUserData } = useContext(AppContext)
  const { profileData, setProfileData } = useContext(DoctorContext);
  useEffect(() => {
    
    window.scrollTo(0, 0);
    const userType = sessionStorage.getItem("userType");
    if (userType==="user") {
      setUserData(JSON.parse(sessionStorage.getItem("userData")));
    }
    else if(userType==="doctor"){
      setProfileData(JSON.parse(sessionStorage.getItem("doctorData")));
      
    }else{
      
    }
    
  }, []);
  return (
    <div style={{marginLeft:'0',marginRight:'0'}}>
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
        <Route path="/find-test" element={<Findtest />} />
        <Route path="/facility/:facilityId" element={<Facility />} />
        <Route path="/tests/:id" element={<TestDetails />} />
        <Route path="/my-cart" element={<Cart />} />
        <Route path="/my-test" element={<MyTest />} />
        <Route path="/dml" element={<DML />} />




        

      </Routes>
      <Footer />
    </div>
  )
}

export default App