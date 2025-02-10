import { createContext, useEffect, useState } from "react";

import { toast } from "react-toastify";
import axios from 'axios'

export const AppContext = createContext()


const AppContextProvider = (props) => {

    const currencySymbol = '₹'
    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const [doctors, setDoctors] = useState([])
    const [token, setToken] = useState(sessionStorage.getItem('token') ? sessionStorage.getItem('token') : '')
    const [userData, setUserData] = useState(false)
    const [appoint_doctor,setappoint_doctor]=useState([]);

    const [cart, setcart] = useState(() => {
        // Retrieve cart from localStorage if it exists, otherwise use an empty array
        const storedCart = JSON.parse(localStorage.getItem("cart"));
        return storedCart || [];
      });
    
      // Store cart in localStorage whenever it changes
      useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
      }, [cart]);

    // Getting Doctors using API
    const calculateAge = (dob) => {
        const today = new Date()
        const birthDate = new Date(dob)
        let age = today.getFullYear() - birthDate.getFullYear()
        return age
    }
    const getDoctosData = async () => {

        try {

            const { data } = await axios.get(backendUrl + '/api/doctor/list')
            if (data.success) {
                setDoctors(data.doctors)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }

    }

    // // Getting User Profile using API
    // const loadUserProfileData = async () => {
    //     if (!token) {
    //         console.error("No token found. Please log in.");
    //         return;
    //     }

    //     try {
    //          console.log(token);
             
    //         const { data } = await axios.get(`${backendUrl}/auth/user/get-profile`, {  headers: {
    //             Authorization: `Bearer ${token}`, // Prefix token with "Bearer"
    //         }, })

    //         if (data.success) {
    //             setUserData(data.userData)
    //         } else {
    //             toast.error(data.message)
    //         }

    //     } catch (error) {
    //         console.log(error)
    //         toast.error(error.message)
    //     }

    // }
    
    useEffect(() => {
        getDoctosData()
    }, [])

    // useEffect(() => {
    //     if (token) {
    //         loadUserProfileData()
    //     }
    // }, [token])
  
    

    const value = {
        doctors, 
        currencySymbol,
        backendUrl,
        token, setToken,
        userData,cart,
         setUserData,
        calculateAge,setcart,
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )

}

export default AppContextProvider