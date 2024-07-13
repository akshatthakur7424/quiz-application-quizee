import React, { useEffect, useState } from "react";
import "./stylesheets/Home.css";
import NavigationBar from "./NavigationBar";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { Box, display, height, Stack, width } from "@mui/system";
import { Typography } from "@mui/material";

export default function Home() {
  const navigate = useNavigate();

  const [companyid, setCompanyid] = useState("");
  const [quizid, setQuizid] = useState("");

  // Setting Json Web Token in the Cookies in the Client's Browser
  function setCookie(name, value, days) {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie =
      name + "=" + value + ";expires=" + expires.toUTCString() + ";path=/";
  }

  // Function to get a cookie by name
  function getCookie(name) {
    var nameEQ = name + "=";
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i];
      while (cookie.charAt(0) === " ") {
        cookie = cookie.substring(1, cookie.length);
      }
      if (cookie.indexOf(nameEQ) === 0) {
        return cookie.substring(nameEQ.length, cookie.length);
      }
    }
    return null;
  }

  const userToken = getCookie("userToken"); // checking user is signed in or not.


  useEffect(() => {
    // Get the URLSearchParams object from the current URL
    const urlSearchParams = new URLSearchParams(window.location.search);

    // Accessing individual parameters
    const quizid = urlSearchParams.get("quizid");
    const companyid = urlSearchParams.get("companyid");

    // Use the data in your React component
    console.log(`Company ID : ${quizid}, Quiz ID : ${companyid}`);
      setCookie("companyid", companyid, 7);
      setCookie("quizid", quizid, 7);

    if (!userToken) {
      navigate("/login");
    }
  }, []);

  const handleButton = () => {
    // setCookie("companyid", companyid, 7);
    // setCookie("quizid", quizid, 7);
    navigate("/quiz-status");
  };

  const handleCompany = (event) => {
    setCompanyid(event.target.value);
  };

  const handleQuiz = (event) => {
    setQuizid(event.target.value);
  };

  return (
    <>
      <NavigationBar />
      <div>
        <Stack
          width="100vw"
          height="100vh"
          alignItems="center"
          justifyContent="center"
        >
          <Stack
            width="800px"
            height="250px"
            alignItems="center"
            justifyContent="space-evenly"
            p="0px 20px 0px 20px"
            sx={{
              border: "none",
              borderRadius: "7px",
              boxShadow: "4px 4px 12px black",
            }}
          >
            <Typography variant="h5" color="initial" textAlign="center">
              You are ready for Quiz.
            </Typography>
            <Button variant="contained" color="success" onClick={handleButton}>
              Go to Quiz Page
            </Button>
          </Stack>
        </Stack>
        <Stack
          sx={{
            width: "100vw",
            height: "400px",
            paddingTop: "200px",
            alignItems: "center",
          }}
        >
        </Stack>
      </div>
    </>
  );
}
