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


    const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        return null;
      };
    
      const isTokenExpired = (token) => {
        if (!token) return true; // If there's no token, consider it expired
        const payload = JSON.parse(atob(token.split('.')[1])); // Decode JWT to get the payload
        const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
        return payload.exp < currentTime; // Compare expiration time with current time
      };
      const refreshAccessToken = async () => {
        try {
          const refresh_token = localStorage.getItem('refresh_token');
      
          if (!refresh_token) {
            throw new Error("Refresh token not found in localStorage");
          }
      
          // Send refresh token in Authorization header
          const response = await axios.post(
            `${backendUrl}/api/refreshtoken`,
             // No body
            {
              headers: {
                Authorization: `Bearer ${refresh_token}`,
              },
            }
          );
      
          const { access_token, refresh_token: new_refresh_token } = response.data;
      
          // Store new tokens
          localStorage.setItem('access_token', access_token);
          localStorage.setItem('refresh_token', new_refresh_token);
      
          console.log("Tokens refreshed successfully!");
          return true;
        } catch (error) {
          console.error('Error refreshing access token:', error?.response?.data || error);
          return false;
        }
      };
      
      

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
    
    // useEffect(() => {
    //     getDoctosData()
    // }, [])

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
        calculateAge,setcart,getCookie,isTokenExpired,refreshAccessToken
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )

}

export default AppContextProvider