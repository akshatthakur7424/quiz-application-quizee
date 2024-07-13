import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
// import "./CreateQuiz.css"
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Stack, Typography, Button } from '@mui/material';

const CreateQuiz = () => {

    const [name, setName] = useState('')
    const [companyid, setCompanyid] = useState('')

    const navigate = useNavigate();

    const changeRoute = () => {
        navigate("/")
    }

    const data = {
        quizname: name
    }

    useEffect(() => {
        fetch("http://localhost:7000/create-company-table", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
        })
            .then(response => response.json())
            .then(response => {
                console.log(response);
            })
    }, [])
    

    const handleCreateQuiz = () => {
        fetch("http://localhost:7000/create-quiz", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(response => {
                console.log(response);
                // setCompanyid(response.companyid)
                changeRoute();
            })
    }

    const handlequizNameChange = (event) => [
        setName(event.target.value)
    ]


    return (

        <Stack width="100vw" height="100vh" alignItems="center" justifyContent='center'>
            <Stack width="40vw" height="300px" alignItems="center" justifyContent='space-around' sx={{ backgroundColor: "white", boxShadow: "4px 4px 12px black", borderRadius: "5px" }} >
                <Typography variant='h5'>Create Quiz</Typography>
                <TextField id="outlined-basic" label="Enter Quiz Name" variant="outlined" onChange={handlequizNameChange} sx={{ width: "25vw" }} />
                <Button
                    variant="contained"
                    color="primary" onClick={handleCreateQuiz}>
                    Create 
                </Button>
            </Stack>
        </Stack>

        // <div className='create-quiz'>
        //     <div className="create-quiz-card">
        //         <div className="create-quiz-heading">
        //             <p>Creating Quiz</p>
        //         </div>
        //         <div className="create-quiz-input">
        //             <div className="create-quiz-name">
        //                 <Box>
        //                     <TextField id="standard-basic" label="Enter Quiz Name" variant="outlined" onChange={handlequizNameChange} sx={{ width: "25vw" }} />
        //                 </Box>
        //             </div>
        //             <div className='create-quiz-quizid'>
        //                 <p className='create-quiz-sub-heading'>Your Company ID : </p>
        //                 <input type="text" defaultValue="companyid" />
        //             </div>
        //         </div>
        //         <div>
        //             <button className="create-quiz-submit" onClick={handleCreateQuiz}>Create Quiz</button>
        //         </div>
        //     </div>
        // </div>
    )
}

export default CreateQuiz