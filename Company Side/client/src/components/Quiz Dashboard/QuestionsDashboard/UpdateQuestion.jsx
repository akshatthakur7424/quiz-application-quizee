import React, { useEffect, useState } from 'react'
import "./UpdateQuestion.css"
import QuizDashboardNavbar from './QuizDashboardNavbar';
import { useNavigate, useParams } from 'react-router-dom';
import { AppBar, Box, Button, Stack, Typography, TextField } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import UpgradeIcon from '@mui/icons-material/Upgrade';

const UpdateQuestion = () => {

    const navigate = useNavigate()

    const { quesid } = useParams();

    const [sno, setSno] = useState('');
    const [question, setQuestion] = useState('');
    const [option1, setOption1] = useState('');
    const [option2, setOption2] = useState('');
    const [option3, setOption3] = useState('');
    const [option4, setOption4] = useState('');
    const [answer, setAnswer] = useState('');
    const [file, setFile] = useState();

    const fetchData = {
        questionid: quesid
    }

    // Setting Json Web Token in the Cookies in the Client's Browser
    function setCookie(name, value, days) {
        const expires = new Date();
        expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
        document.cookie =
            name + "=" + value + ";expires=" + expires.toUTCString() + ";path=/";
    }


    useEffect(() => {
        console.log("Cookie : ", document.cookie);
        console.log("Question ID : ", quesid)
        fetch("http://localhost:7000/view-particular-questions", {
            method: "POST",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(fetchData)
        }).then(response => response.json())
            .then(response => {
                console.log(response);
                setSno(response[0].sno);
                setQuestion(response[0].question);
                setOption1(response[0].option1);
                setOption2(response[0].option2);
                setOption3(response[0].option3);
                setOption4(response[0].option4);
                const answerFromResponse = parseInt(response[0].answer);
                setAnswer(answerFromResponse);
                setCookie('questionid',quesid,7);

                // Check radio buttons based on the updated answer value
                if (answerFromResponse === 1) {
                    var radioBtn1 = document.getElementById("radio1");
                    radioBtn1.checked = true;
                } else if (answerFromResponse === 2) {
                    var radioBtn2 = document.getElementById("radio2");
                    radioBtn2.checked = true;
                } else if (answerFromResponse === 3) {
                    var radioBtn3 = document.getElementById("radio3");
                    radioBtn3.checked = true;
                } else if (answerFromResponse === 4) {
                    var radioBtn4 = document.getElementById("radio4");
                    radioBtn4.checked = true;
                }
            });
    }, []);

    useEffect(() => {
        // Uncheck other checkboxes based on the updated answer value
        const radioBtn1 = document.getElementById("radio1");
        const radioBtn2 = document.getElementById("radio2");
        const radioBtn3 = document.getElementById("radio3");
        const radioBtn4 = document.getElementById("radio4");

        if (answer === 1) {
            radioBtn1.checked = true;
            radioBtn2.checked = false;
            radioBtn3.checked = false;
            radioBtn4.checked = false;
        } else if (answer === 2) {
            radioBtn1.checked = false;
            radioBtn2.checked = true;
            radioBtn3.checked = false;
            radioBtn4.checked = false;
        } else if (answer === 3) {
            radioBtn1.checked = false;
            radioBtn2.checked = false;
            radioBtn3.checked = true;
            radioBtn4.checked = false;
        } else if (answer === 4) {
            radioBtn1.checked = false;
            radioBtn2.checked = false;
            radioBtn3.checked = false;
            radioBtn4.checked = true;
        }
    }, [answer]);

    const data = {
        sno: sno,
        question: question,
        option1: option1,
        option2: option2,
        option3: option3,
        option4: option4,
        answer: answer,
        questionid: quesid
    }

    const handleUpdateQuestion = () => {
        console.log("Updated Data : ", data)
        fetch("http://localhost:7000/update-question", {
            method: "POST",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json(); // Parse the JSON response from the server
            })
            .then(data => {
                console.log(data); // Handle the response data here
            })
            .catch(error => {
                console.error("Error:", error); // Handle any errors that occurred during the fetch
            });
        navigate("/quiz-questions-dashboard-view-question");
    };


    const handleQuestionNumber = (event) => {
        // const questionNumber = parseInt(event.target.value);
        setSno(event.target.value);
    }
    const handleQuestion = (event) => {
        setQuestion(event.target.value)
    }

    const handleOption1 = (event) => {
        setOption1(event.target.value);
    }
    const handleOption2 = (event) => {
        setOption2(event.target.value);
    }
    const handleOption3 = (event) => {
        setOption3(event.target.value);
    }
    const handleOption4 = (event) => {
        setOption4(event.target.value);
    }
    const handleCorrectOption = (event) => {
        const correctAnswer = parseInt(event.target.value, 10);
        setAnswer(correctAnswer);
    }

    const handleUploadMedia = () => {
        const formData = new FormData();
        formData.append("file", file);
        fetch("http://localhost:7000/set-question-media", {
            method: "POST",
            credentials: 'include',
            headers: {
            },
            body: formData,
        })
            .then(response => {
                console.log(response)
            })
            .then(data => {
                console.log(data); // Handle the response data here
            })
            .catch(error => {
                console.error("Error:", error); // Handle any errors that occurred during the fetch
            });
    };

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });


    return (

        <>
            <QuizDashboardNavbar />

            <Stack width={"100vw"} height={"95vh"} alignItems={"center"} justifyContent={"center"} mt={"5vh"}>
                <Stack direction={"column"} sx={{ width: "80vw", height: "80%", boxShadow: "2px 2px 10px black", borderRadius: "5px" }} >
                    <Stack width={"100%"} height={"85%"} direction={"column"}>
                        <Stack direction={"row"} gap={2} alignItems={"center"} justifyContent={"center"} sx={{ height: "20%", marginTop: "10px" }} >
                            <TextField id="standard-basic" label="Q.No" variant="filled" value={sno} sx={{ width: "10vw" }} onChange={handleQuestionNumber} />
                            <TextField id="standard-basic" label="Enter Question " variant="outlined" value={question} sx={{ width: "50vw" }} onChange={handleQuestion} />
                        </Stack>
                        <Stack direction={"row"} gap={2} alignItems={"center"} justifyContent={"center"} sx={{ height: "10%", marginTop: "10px" }} >
                            {/* <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                                Upload Question Media File
                                <VisuallyHiddenInput type="file" />
                            </Button> */}
                            <input type="file" onChange={(e) => { setFile(e.target.files[0]) }} />
                            <Button component="label" variant="contained" startIcon={<CloudUploadIcon />} onClick={handleUploadMedia} >
                                Update Question Media
                            </Button>
                        </Stack>
                        <Stack direction={"row"} gap={2} alignItems={"center"} justifyContent={"center"} sx={{ height: "25%" }} >
                            <TextField id="standard-basic" label="First Option" variant="outlined" value={option1} sx={{ width: "35vw" }} onChange={handleOption1} />
                            <TextField id="standard-basic" label="Second Option" variant="outlined" value={option2} sx={{ width: "35vw" }} onChange={handleOption2} />
                        </Stack>
                        <Stack direction={"row"} gap={2} alignItems={"center"} justifyContent={"center"} sx={{ height: "25%" }} >
                            <TextField id="standard-basic" label="Third Option" variant="outlined" value={option3} sx={{ width: "35vw" }} onChange={handleOption3} />
                            <TextField id="standard-basic" label="Fourth Option" variant="outlined" value={option4} sx={{ width: "35vw" }} onChange={handleOption4} />
                        </Stack>
                        <Stack direction={"row"} gap={2} alignItems={"center"} justifyContent={"center"} sx={{ height: "20%" }} >
                            <FormControl>
                                {/* <FormLabel id="demo-row-radio-buttons-group-label">Correct Option</FormLabel> */}
                                {/* <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group" >
                                    <Typography variant="h6" color="GrayText" sx={{ marginTop: "4px", marginRight: "20px" }} >Correct Option :- </Typography>
                                    <FormControlLabel value='1' id="radio1" control={<Radio />} label="First Option" sx={{ color: "#00306b" }} onClick={handleCorrectOption} />
                                    <FormControlLabel value='2' id="radio2" control={<Radio />} label="Second Option" sx={{ color: "#00306b" }} onClick={handleCorrectOption} />
                                    <FormControlLabel value='3' id="radio3" control={<Radio />} label="Third Option" sx={{ color: "#00306b" }} onClick={handleCorrectOption} />
                                    <FormControlLabel value='4' id="radio4" control={<Radio />} label="Fourth Option" sx={{ color: "#00306b" }} onClick={handleCorrectOption} />
                                </RadioGroup> */}
                                <div className="correct-option-content">
                                    <div className="question-card-text"><p>Correct Option :- </p></div>
                                    <div className="correct-option-input">
                                        <div><input type="radio" className='radio-input' id='radio1' value='1' onChange={handleCorrectOption} /></div>
                                        <div className='num-text'>First Option</div>
                                    </div>
                                    <div className="correct-option-input">
                                        <div><input type="radio" className='radio-input' id='radio2' value='2' onChange={handleCorrectOption} /></div>
                                        <div className='num-text'>Second Option</div>
                                    </div>
                                    <div className="correct-option-input">
                                        <div><input type="radio" className='radio-input' id='radio3' value='3' onChange={handleCorrectOption} /></div>
                                        <div className='num-text'>Third Option</div>
                                    </div>
                                    <div className="correct-option-input">
                                        <div><input type="radio" className='radio-input' id='radio4' value='4' onChange={handleCorrectOption} /></div>
                                        <div className='num-text'>Fourth Option</div>
                                    </div>
                                </div>
                            </FormControl>
                        </Stack>
                    </Stack>
                    <Stack width={"100%"} height={"15%"} alignItems={"center"} direction={"row"} justifyContent={"center"} sx={{ backgroundColor: "aliceblue" }} >
                        <Button variant="contained" color="success" sx={{ marginRight: "10px" }} startIcon={<UpgradeIcon />} onClick={handleUpdateQuestion}>
                            Update Question
                        </Button>
                    </Stack>
                </Stack>
            </Stack>

        </>

        // <div className='questions-dashboard'>
        //     <QuizDashboardNavbar />
        //     <div className="dashboard-content">
        //         <div className="question-card">
        //             <div className="question">
        //                 <div className='question-card-text'>Question Number</div>
        //                 <div className=''><input type="number" value={sno} onChange={handleQuestionNumber} /></div>
        //             </div>
        //             <div className="question">
        //                 <div className='question-card-text'>Question</div>
        //                 <div className='question-card-input'><input type="text" value={question} onChange={handleQuestion} /></div>
        //             </div>
        //             <div className="question">
        //                 <div className='question-card-text'>First Option </div>
        //                 <div className='question-card-input'><input type="text" value={option1} onChange={handleOption1} /></div>
        //             </div>
        //             <div className="question">
        //                 <div className='question-card-text'>Second Option</div>
        //                 <div className='question-card-input'><input type="text" value={option2} onChange={handleOption2} /></div>
        //             </div>
        //             <div className="question">
        //                 <div className='question-card-text'>Third Option </div>
        //                 <div className='question-card-input'><input type="text" value={option3} onChange={handleOption3} /></div>
        //             </div>
        //             <div className="question">
        //                 <div className='question-card-text'>Fourth Option </div>
        //                 <div className='question-card-input'><input type="text" value={option4} onChange={handleOption4} /></div>
        //             </div>
        //             <div className="correct-option-content">
        //                 <div className="question-card-text"><p>Correct Option</p></div>
        //                 <div className="correct-option-input">
        //                     <div className='num-text'>1</div><div><input type="radio" className='radio-input' id='radio1' value='1' onChange={handleCorrectOption} /></div>
        //                 </div>
        //                 <div className="correct-option-input">
        //                     <div className='num-text'>2</div><div><input type="radio" className='radio-input' id='radio2' value='2' onChange={handleCorrectOption} /></div>
        //                 </div>
        //                 <div className="correct-option-input">
        //                     <div className='num-text'>3</div><div><input type="radio" className='radio-input' id='radio3' value='3' onChange={handleCorrectOption} /></div>
        //                 </div>
        //                 <div className="correct-option-input">
        //                     <div className='num-text'>4</div><div><input type="radio" className='radio-input' id='radio4' value='4' onChange={handleCorrectOption} /></div>
        //                 </div>
        //             </div>
        //             <div className="submit-section-box">
        //                 <button className='add-question' onClick={handleUpdateQuestion}>Update Question</button>
        //             </div>

        //         </div>
        //     </div>

        // </div>
    )
}

export default UpdateQuestion