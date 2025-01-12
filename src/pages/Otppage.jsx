import { BsFillShieldLockFill, BsTelephoneFill } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";

import OtpInput from "react-otp-input";
import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { auth } from "./firebase.config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { toast, Toaster } from "react-hot-toast";

const Otppage = () => {
  const [otp, setOtp] = useState("");
  const [ph, setPh] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [user, setUser] = useState(null);


    const sendOtp=async()=> {
          try {
            const recaptcha=new RecaptchaVerifier(auth,"recaptcha",{})
            const confirmation= await signInWithPhoneNumber(auth,ph,recaptcha)
            console.log(confirmation)
            setUser(confirmation)
            
        } catch (error) {
            console.log(error);
            
        }
    }

     const verifyOtp=async()=>{
        try {
          const data=  await  user.confirm(otp)
          console.log(data);
          
        } catch (error) {
            console.log(error);
            
        }
       
     }





  return (
       <div  style={{marginBottom:"300px"}}>
        <div>
        <PhoneInput
        country={"in"}
        value={ph}
        onChange={(ph)=>setPh("+"+ph)}
        
        />
       <button className="bg-primary " style={{marginTop:"20px"}} variant="contained"  onClick={sendOtp}>send otp</button>
       <div id="recaptcha"></div>
        </div>
        
        <label for="inputField">Enter your value:</label>
        <input  type="text" id="inputField" name="inputField" placeholder="Type something..." onChange={(e)=>setOtp(e.target.value)} />
        <button   type="button" onClick={verifyOtp}>Submit</button>
    

        
      
       </div>
      
  );
};

export default Otppage;