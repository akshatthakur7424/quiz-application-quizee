import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button'
import Box from "@mui/material/Box"
import { Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const QuizStatus = () => {

    const navigate = useNavigate();

    var [status, setStatus] = useState('');

    // const data = {
    //     quizid: "dt8ouj7may",
    //     companyid: "s0pa5mjc20"
    // }

    // Function to get a cookie by name
    function getCookie(name) {
        var nameEQ = name + "=";
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i];
            while (cookie.charAt(0) === ' ') {
                cookie = cookie.substring(1, cookie.length);
            }
            if (cookie.indexOf(nameEQ) === 0) {
                return cookie.substring(nameEQ.length, cookie.length);
            }
        }
        return null;
    }

    const data = {
        quizid: getCookie("quizid"),
        companyid: getCookie("companyid")
    }

    useEffect(() => {
        fetch("http://localhost:8080/quiz-status", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(response => {
                console.log(response);
                if (response.length === 0) {
                    setStatus("deleted")
                } else if (response[0].status == "active") {
                    setStatus(response[0].status);
                } else if (response[0].status == "deactive") {
                    setStatus(response[0].status);
                }
            })
    }, [])

    // const handleStartQuiz = () => {
    //     navigate("/quiz")
    // }

    return (
        <Stack width="100vw" height="100vh" alignItems="center" justifyContent="center">
            <Stack width="800px" height="250px" alignItems="center" justifyContent="space-evenly" p="0px 20px 0px 20px" sx={{ border: "none", borderRadius: "7px", boxShadow: "4px 4px 12px black" }}>
                {
                    status === "active" ? <Typography variant="h5" color="initial" textAlign="center">Quiz is Live. Click the button to start the Quiz.</Typography> :
                        status === "deactive" ? <Typography variant="h5" color="initial" textAlign="center">Quiz has been Deactivated by the company. Please check when its LIVE again.</Typography> :
                            <Typography variant="h5" color="initial" textAlign="center">Quiz has been Completed. Please join when company oraganizes another quiz.</Typography>
                }

                {
                    status === "active" ? <Button variant="contained" color="success" onClick={()=>navigate("/quiz")}>Start Quiz</Button> :
                        status === "deactive" ? <Button variant="contained" color="error" >Okay</Button> :
                           <Button variant="text" color="warning">Close</Button> 
                                
                }

            </Stack>
        </Stack>
    )
}

export default QuizStatus


// "Quiz is Live. Click the button to start the Quiz."
// "Quiz has been Deactivated by the company. Please check when its LIVE again."
// "Quiz Deleted"