import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./stylesheets/Email.css";

const Otp = () => {
  const [otp, setOtp] = useState("");

  const navigate = useNavigate();

  const otpSetter = (event) => {
    setOtp(event.target.value);
    // setOtp(combinedValue);
  };

  const requestBody = {
    otp: otp,
  };

  const sendOtp = () => {
    console.log(otp);
    fetch("http://localhost:8080/signup-otp", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => response.json()) // Return the response.json() promise
      .then((data) => {
        console.log("Data Coming from the backend: ", data);
        if (data.status == "success") {
          console.log(data.status);
          navigate("/password");
        } else {
          alert("Invalid Otp : Enter Correct OTP.");
        }
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  };

  const resendOTP = () => {
    fetch("http://localhost:8080/authentication-resend-otp", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        alert("Another OTP sended to same E-Mail")
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  };


      // // Get all the input elements inside the otp-input div
      // const otpInputs = document.querySelectorAll('.otp-input input');

      // // Add event listeners to each input element
      // otpInputs.forEach((input, index) => {
      //     input.addEventListener('input', (event) => {
      //         const currentInput = event.target;
      //         const nextInput = otpInputs[index + 1];
  
      //         // If there is a next input, move focus to it
      //         if (nextInput) {
      //             nextInput.focus();
      //         }
  
      //         // Check if all inputs are filled
      //         const isFilled = Array.from(otpInputs).every(input => input.value !== '');
  
      //         if (isFilled) {
      //             // Combine the values from all inputs
      //             let otp = '';
      //             otpInputs.forEach(input => {
      //                 otp += input.value;
      //             });
  
      //             // Store the combined string in a variable
      //             const combinedValue = otp;
      //             console.log(combinedValue);
      //             otpSetter(combinedValue);
      //         }
      //     });
      // });
  

  return (
    <div className="fullScreen">
      <div className="mainCard">
        <div className="loginImage"></div>
        <div className="loginCard">
          <div className="heading">
            <p className="signUp">OTP</p>
          </div>
          <div className="entry-box">
            <input
              className="inputBox"
              type="email"
              placeholder="Enter Otp Here"
              onChange={otpSetter}
            />
            {/* <div class="otp-input">
              <input type="text" maxlength="1" />
              <input type="text" maxlength="1" />
              <input type="text" maxlength="1" />
              <input type="text" maxlength="1" />
            </div> */}
          </div>
          <div className="submitBox">
            <button onClick={sendOtp}>Next</button>
          </div>
          <div>
            <p className="alreadyAccount">
              Din't received otp,{" "}
              <label onClick={resendOTP} className="loginText">
                Resend OTP
              </label>
            </p>
          </div>
        </div>
      </div>
    </div>

    // <div>
    //   <p>Enter the OTP send to your Email</p>
    //   <input type="text" onChange={otpSetter} />
    //   <br />
    //   <button onClick={sendOtp}>Next</button>
    //   <p>
    //     Didn't received, <button onClick={resendOTP}>Resend OTP.</button>
    //   </p>
    // </div>
  );
};

export default Otp;
