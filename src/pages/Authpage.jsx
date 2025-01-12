import React, { useState } from "react";
import { auth } from "./firebase.config";
import { createUserWithEmailAndPassword,signInWithEmailAndPassword,sendEmailVerification, linkWithPhoneNumber } from "firebase/auth";

const AuthPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let dspemail=document.getElementById("displayemail");
  let status=document.getElementById("status");

  const handleRegister = () => {
    // Logic for registering a user
    console.log("Register:", { email, password });
    createUserWithEmailAndPassword(auth,email,password)
    .then((userCredentials)=>{
        sendEmailVerification(auth.currentUser)
        .then(()=>{
            alert("Email Verification link sent")
        });
        alert("user created successfully")
        const user =userCredentials.user;
        console.log(user);
        

    })
    // Add API call for registration here
  };

  const handleLogin = () => {
    // Logic for logging in a user
    console.log("Login:", { email, password });
    signInWithEmailAndPassword(auth,email,password)
    .then((userCredentials)=>{
       alert("user logged in successfully")
       const user=userCredentials.user;
       console.log(user);
       dspemail.textContent=user.email;
       status.textContent=user.emailVerified;
       

    })
    // Add API call for login here
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", textAlign: "center" }}>
      <h2>Authentication</h2>
      <div style={{ marginBottom: "20px" }}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
      </div>
      <div>
        <button
          onClick={handleRegister}
          style={{
            padding: "10px 20px",
            margin: "10px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Register
        </button>
        <button
          onClick={handleLogin}
          style={{
            padding: "10px 20px",
            margin: "10px",
            backgroundColor: "#008CBA",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Login
        </button>
      </div>
      <div className="userCredentials">
        <h3>email:</h3>
        <h5 id="displayemail">none</h5>
        <h3>verified:</h3>
        <h5 id="status">none</h5>

      </div>
    </div>
  );
};

export default AuthPage;
