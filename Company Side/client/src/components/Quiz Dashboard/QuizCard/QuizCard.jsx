import React, { useEffect, useState } from 'react'
import "./QuizCard.css"
import { useNavigate } from "react-router-dom"
import { Box, Typography } from "@mui/material"

const QuizCard = (props) => {

    // const [status, setStatus] = useState(props.status)
    const [companyid,setCompanyid] = useState('')

    const navigate = useNavigate();

    const id = props.quizID;
    const name = props.quizName;
    // const companyid = "s0pa5mjc20";
    const sno = props.sno;
    const status = props.status;

    useEffect(() => {
        fetch("http://localhost:7000/get-company-id", {
            method: "POST",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(response => {
                console.log(response)
                const id = response.companyid;
                console.log("Company ID : ", id);
                setCompanyid(id)
            })
            .catch(error => {
                console.log(error)
            });
    }, [])

    const data = {
        quizid: id,
        quizname: name
    }

    const handleManageQuestion = () => {
        navigate("/quiz-questions-dashboard-view-question");
        document.cookie = `${`quizid = ${id}`}`;
    }

    const handleDeleteQuiz = () => {
        console.log("Deleting quiz", name, " with quiz id : ", id, " and sno ", sno);
        fetch("http://localhost:7000/delete-quiz", {
            method: 'POST',
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(response => {
                console.log(response);
                window.location.reload();
            })

    }



    const handleActivateQuiz = () => {
        if (status == "Activate") {
            // setStatus("Deactivate");
            console.log("Quiz Status changed to : ", status);
            fetch("http://localhost:7000/set-quiz-status", {
                method: 'POST',
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    quizid: id,
                    status: "active"
                })
            })
                .then(response => response.json())
                .then(response => {
                    console.log(response);
                    // window.location.reload();
                })
        } else if (status == "Deactivate") {
            // setStatus("Activate");
            console.log(status);
            fetch("http://localhost:7000/set-quiz-status", {
                method: 'POST',
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    quizid: id,
                    status: "deactive"
                })
            })
                .then(response => response.json())
                .then(response => {
                    console.log(response);
                    // window.location.reload();
                })
        }
        window.location.reload();
    }

    return (
        <>
            <div className='quiz-card'>
                <div className='quiz-card-items'>
                    <div className="quiz-card-sno"><p>{props.sno}</p></div>
                    <div className='quiz-content'>
                        <div className="quiz-name">Quiz Name : {props.quizName}</div>
                        <div className="quiz-id">Quiz Code : {props.quizID}</div>
                    </div>
                    <div className="quiz-controls">
                        <div><button id='settingup-button' className="manage-questions" onClick={handleManageQuestion}>Setup Quiz</button></div>
                        <div><button id='activation-button' className="start-quiz" onClick={handleActivateQuiz} >{props.status} Quiz</button></div>
                        <div><button id='deleting-button' className="delete-quiz" onClick={handleDeleteQuiz}>Delete Quiz</button></div>
                    </div>
                </div>
                <Box backgroundColor={"white"} width={'100%'} height={"35px"} sx={{ display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "0px 0px 5px 5px" }} >
                    <Typography variant="body3" color="initial">Quiz Link :- </Typography>
                    <Typography variant="body1" color="blueviolet">{`http://localhost:3001/home/?quizid=${encodeURIComponent(props.quizID)}&companyid=${encodeURIComponent(companyid)}`}</Typography>
                </Box>
            </div>
        </>
    )
}

export default QuizCard




// fetch("http://localhost:7000/set-quiz-status", {
//     method: 'POST',
//     headers: {
//         "Content-Type": "application/json"
//     },
//     body: JSON.stringify({
//         quizid: id,
//         companyid: companyid,
//         status: newStatus === "Activate" ? "active" : "deactive"
//     })
// })
//     .then(response => response.json())
//     .then(response => {
//         console.log(response);
//         // window.location.reload();
//     });
// }