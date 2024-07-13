import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./stylesheets/Email.css"
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const Login = () => {
  const [email, setEmail] = useState("");

  const navigate = useNavigate();
  
  const emailSetter = (event) => {
    setEmail(event.target.value);
  };

  const sendData = () => {
    console.log("E-Mail : ", email);

    // Setting Json Web Token in the Cookies in the Client's Browser
    function setCookie(name, value, days) {
      const expires = new Date();
      expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
      document.cookie =
        name + "=" + value + ";expires=" + expires.toUTCString() + ";path=/";
    }
    
    // Create the request body as a JSON object
    const requestBody = {
      email: email,
    };

    fetch("http://localhost:7000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: 'include', // Include cookies in the request
      body: JSON.stringify(requestBody),
    })
      .then((response) => response.json())
      .then((data)=>{
        if (data.message == "User found in Database") {
          console.log(data.message);
          if (data && data.token) {
                // Set the token in the browser's cookies
                setCookie("token", data.token, 7); // Set the token for 7 days
                console.log("Token set in the browser's cookies:", data.token);
                navigate("/login-password")
              } else {
                console.log("Token not found in the response");
              } 
        }
        else if (data.message == "User Not found in Database") {
          alert("User not registered, please signup.")
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="fullScreen">
      <div className="mainCard">
      <div className="loginImage"></div>
      <div className="loginCard">
      <div className="heading">
        <p className="signUp">Login</p>
      </div>
        <div className="entry-box">
          
        <Box >
          <TextField id="standard-basic" label="Email" variant="filled" onChange={emailSetter} sx={{width:"25vw", marginTop:"30px"}} />
        </Box>

        </div>
        <div className="submitBox">
          <button onClick={sendData}>Next</button>
        </div>
        <div>
          <p className="alreadyAccount">Don't have an account, <Link to={"/signup"}className="login-text"><label className="loginText">Sign Up</label></Link></p>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Login;






// .then((data) => {

//   if (data.message === "Correct Password") {
//     // navigate('/home')
//     console.log(data.message)
//   } else if (data.message === "Incorrect Password") {
//     alert("Please Enter Correct Password")
//   } else {
//     alert("User not found. Sign Up.")
//   }

//   // Return the 'data' object to pass it to the next 'then' block
//   return data;
// })
// .then((data) => {
//   console.log(data);
  
//   // Check if the 'token' property exists in the 'data' object
//   if (data && data.token) {
//     // Set the token in the browser's cookies
//     setCookie("token", data.token, 7); // Set the token for 7 days
//     console.log("Token set in the browser's cookies:", data.token);
//     navigate("/login-password")
//   } else {
//     console.log("Token not found in the response");
//   } 
// })