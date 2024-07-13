import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const LoginPassword = () => {
    const [password, setPassword] = useState("");
  
    const navigate = useNavigate();
  
    const passwordSetter = (event) => {
      setPassword(event.target.value);
    };

    const sendData = () => {    
        // Create the request body as a JSON object
        const requestBody = {
          password: password
        };

    
        fetch("http://localhost:8080/login-password", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.message === "Correct Password") {
                console.log(data.message)
                navigate('/quiz-status')
            } else if (data.message === "Incorrect Password") {
              alert("Please Enter Correct Password")
            } else {
              alert("Internal Server Error.")
            }
          })
          .catch((error) => {
            // Handle any errors that occur during the fetch request
            console.error("Error:", error);
          });
      };

    const forgotPassword = () => {
        fetch('http://localhost:8080/authentication-resend-otp', {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            }
          })
        .then((response)=>response.json)
        .then((data)=>{
          console.log(data)
          navigate('/otp')
        })
      }

  return (
    <div className="fullScreen">
    <div className="mainCard">
    <div className="loginImage"></div>
    <div className="loginCard">
    <div className="heading">
      <p className="signUp">Login Password</p>
    </div>
      <div className="entry-box">
        <input
        className="inputBox"
          type="email"
          placeholder="Enter your password here"
          onChange={passwordSetter}
        />
      <div className="forgotPassword" onClick={forgotPassword}><p>Forgot Password.</p></div>
      </div>
      <div className="submitBox">
        <button onClick={sendData}>Next</button>
      </div>
      <div>
        <p className="alreadyAccount">Don't have an account, <Link to={"/"}className="login-text"><label className="loginText">Sign Up</label></Link></p>
      </div>
      </div>
    </div>
  </div>
  )
}

export default LoginPassword
