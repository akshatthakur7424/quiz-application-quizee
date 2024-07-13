import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import "./ShowQuiz.css";
import QuizCard from "../QuizCard/QuizCard";
import { Stack, TextareaAutosize, Typography } from "@mui/material";

const ShowQuiz = () => {
  const navigate = useNavigate();

  const [quizData, setquizData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:7000/show-quizes", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        setquizData(response);
        console.log("Quiz Data coming from server : ", response);
      });
  }, []);


  function hasTokenCookie() {
    const tokenMatch = document.cookie.match(/token=([^;]+)/);
    if (tokenMatch) {
      return true;
    } else {
      return false;
    }
  }

  // function to delete token
  const logout = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    navigate("/signup");
  };

  const getStatus = (status) =>
    status === "active" ? "Deactivate" : "Activate";

  return (
    <div className="show-quiz">
      <div className="show-quiz-main">
        {hasTokenCookie() ? (
          quizData && quizData.length > 0 ? (
            quizData.map((quiz) => (
              <div key={quiz.quizid}>
                <QuizCard
                  sno={quiz.quizno}
                  quizName={quiz.quizname}
                  quizID={quiz.quizid}
                  status={getStatus(quiz.status)}
                />
              </div>
            ))
          ) : (
            <div className="show-quiz-main">
              <h2>You do not have any quiz. Create one.</h2>
            </div>
          )
        ) : (
          <Stack
            direction="row"
            width="93vw"
            height="15vh"
            alignItems="center"
            justifyContent="center"
            sx={{
              backgroundColor: "rgba(189, 12, 6, 0.56)",
              border: "2px solid rgba(189, 12, 6, 0.56)",
              borderRadius: "5px",
              marginTop: "30px",
              marginRight: "20px",
              padding: "10px 20px 10px 20px",
            }}
          >
            <Typography variant="body1" color="intial">
              Please Signup or Login to begin creating and setting up the Quizes{" "}
            </Typography>
          </Stack>
        )}
      </div>
    </div>
  );
};

export default ShowQuiz;
