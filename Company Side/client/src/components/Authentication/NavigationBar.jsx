import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./stylesheets/NavigationBar.css";
import { useContext } from "react";
import { AuthContext } from "../../contextApi/authProvider.js";

export default function NavigationBar() {
  const navigate = useNavigate();
  const { isLoggedIn,setIsLoggedIn } = useContext(AuthContext);
  
  useEffect(() => {
    const tokenMatch = document.cookie.match(/token=([^;]+)/);
    if(tokenMatch) {
    setIsLoggedIn(true);
  } else {
    setIsLoggedIn(false);
  }
  }, [])
  


  const handleLogout = () => {
    deleteAllCookies();
    setIsLoggedIn(false);
    navigate("/login");
  };

  // Function to delete all cookies (unchanged)
  function deleteAllCookies() {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i];
      var eqPos = cookie.indexOf("=");
      var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
  }

  // Function to handle create quiz (unchanged)
  const handleCreateQuiz = () => {
    navigate("/create-quiz");
  };

  return (
    <div className="navbar">
      <div className="logo">
        <a>
          <h1>Quizee</h1>
        </a>
      </div>

      <div className="navItems">
        <ul>
          {isLoggedIn ? (
            <>
              <li>
                <a>
                  <button onClick={handleCreateQuiz} id="create-quiz">
                    Create Quiz
                  </button>
                </a>
              </li>
              <button className="logout" id="log-out" onClick={handleLogout}>
                Log Out
              </button>
            </>
          ) : (
            <>
              <button
                className="signup"
                id="sign-up"
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </button>
              <button
                className="login"
                id="log-in"
                onClick={() => navigate("/login")}
              >
                Log In
              </button>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}
