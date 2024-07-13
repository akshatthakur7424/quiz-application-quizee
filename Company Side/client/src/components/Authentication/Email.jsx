import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./stylesheets/Email.css";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const Email = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const nameSetter = (event) => {
    setName(event.target.value);
  };

  const emailSetter = (event) => {
    setEmail(event.target.value);
  };

  const sendData = () => {
    console.log("Name : ", name);
    console.log("E-Mail : ", email);

    // Create the request body as a JSON object
    const requestBody = {
      name: name,
      email: email,
    };

    // Setting Json Web Token in the Cookies in the Client's Browser
    function setCookie(name, value, days) {
      const expires = new Date();
      expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
      document.cookie =
        name + "=" + value + ";expires=" + expires.toUTCString() + ";path=/";
    }

    fetch("http://localhost:7000/signup-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.message == "User already exists, please Login") {
          alert("User already exists, please Login");
        } else {
          // Check if the 'token' property exists in the 'data' object.
          if (data && data.token) {
            // Set the token in the browser's cookies
            setCookie("token", data.token, 7); // Set the token for 7 days
            console.log("Token set in the browser's cookies:", data.token);
          } else {
            console.log("Token not found in the response");
          }
          // navigating to next page in the authentication pipeline 
          navigate("/otp");
        }
      });
  };

  return (
    // <div className="fullScreen">
      <div className="mainCard">
        <div className="loginImage"></div>
        <div className="loginCard">
          <div className="heading">
            <p className="signUp">Sign Up</p>
          </div>
          <div className="entry-box">
            <Box>
            <TextField id="standard-basic" label="Name" variant="filled" onChange={nameSetter} sx={{width:"25vw"}}/>
            </Box>
            <Box >
            <TextField id="standard-basic" label="Email" variant="filled" onChange={emailSetter} sx={{width:"25vw", marginTop:"30px"}} />
            </Box>
          </div>
          <div className="submitBox">
            <button onClick={sendData}>Next</button>
          </div>
          <div>
            <p className="alreadyAccount">
              Already have an account,{" "}
              <Link to={"/login"} className="login-text">
                <label className="main-card-loginText">Login</label>
              </Link>
            </p>
          </div>
        </div>
      </div>
    // </div>
  );
};

export default Email;
