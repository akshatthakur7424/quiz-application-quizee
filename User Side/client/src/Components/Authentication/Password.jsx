import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./stylesheets/Email.css";

const Password = () => {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const navigate = useNavigate();

  const passwordSetter = (event) => {
    setPassword(event.target.value);
  };

  const conifirmPassword = (event) => {
    setConfirm(event.target.value);
  };

  const sendPassword = () => {
    if (password == confirm) {
      const requestBody = {
        "password": password,
      };
      console.log(password);
      fetch("http://localhost:8080/signup-password", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          navigate("/quiz-status");
        })
        .catch((error) => {
          console.log("Error : ", error);
        });
    } else {
      alert("Password in both the fields should be Same.");
    }
  };

  return (
    <div className="fullScreen">
      <div className="mainCard">
        <div className="loginImage"></div>
        <div className="loginCard">
          <div className="heading">
            <p className="signUp">Password</p>
          </div>
          <div className="entry-box">
            <input
              className="inputBox"
              type="text"
              placeholder="Enter Password"
              onChange={passwordSetter}
            />
            <p></p>
            <input
              className="inputBox"
              type="email"
              placeholder="Confirm Password"
              onChange={conifirmPassword}
            />
          </div>
          <div className="submitBox">
            <button onClick={sendPassword}>Next</button>
          </div>
          <div>
            {/* <p className="alreadyAccount">Don't have an account, <Link to={"/home"}className="login-text"><label className="loginText">Sign Up</label></Link></p> */}
          </div>
        </div>
      </div>
    </div>

    // <div>
    //   <div className="mainCard">
    //     <div className="entery-box">
    //         <p>Password : </p><input type="text" placeholder='Enter your Name here' onChange={passwordSetter}/>
    //         <p>Confirm Password : </p><input type="email" placeholder='Enter your Email here'/>
    //     </div>
    //     <div className="submitBox">
    //         <button onClick={sendPassword}>Next</button>
    //     </div>
    //   </div>
    // </div>
  );
};

export default Password;
