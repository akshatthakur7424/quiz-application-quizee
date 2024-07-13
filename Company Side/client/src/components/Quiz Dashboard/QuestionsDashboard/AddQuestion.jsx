import React, { useEffect, useState } from 'react'
// import "./AddQuestion.css"
import QuizDashboardNavbar from './QuizDashboardNavbar';
import { AppBar, Box, Button, Stack, Typography, TextField } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

const AddQuestion = () => {

  const [sno, setSno] = useState();
  const [question, setQuestion] = useState('');
  const [option1, setOption1] = useState('');
  const [option2, setOption2] = useState('');
  const [option3, setOption3] = useState('');
  const [option4, setOption4] = useState('');
  const [answer, setAnswer] = useState();
  const [file, setFile] = useState();

  // Setting Json Web Token in the Cookies in the Client's Browser
  function setCookie(name, value, days) {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie =
      name + "=" + value + ";expires=" + expires.toUTCString() + ";path=/";
  }

 // Function for getting the value of the cookie
 const getCookieValue = (cookieName) => {
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(`${cookieName}=`)) {
      return cookie.substring(cookieName.length + 1);
    }
  }
  return null;
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

  useEffect(() => {
    console.log("Cookies : ", document.cookie);
    fetch("http://localhost:7000/set-questionid", {
      method: "POST",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(response => {
        console.log(response)
        const questionid = response.questionid;
        console.log("Question ID : ", questionid);
        setCookie("questionid", questionid, 7); // Setting the token for 7 days
      })
      .catch(error => {
        console.log(error)
      });
  }, [])

  const data = {
    sno: sno,
    question: question,
    option1: option1,
    option2: option2,
    option3: option3,
    option4: option4,
    answer: answer
  }

  const handleSubmitQuestion = () => {
    console.log(data)
    fetch("http://localhost:7000/add-question", {
      method: "POST",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        sno: sno,
        question: question,
        option1: option1,
        option2: option2,
        option3: option3,
        option4: option4,
        answer: answer,
      })
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
    window.location.reload();
  };

  const handleQuestionNumber = (event) => {
    const questionNumber = parseInt(event.target.value);
    setSno(questionNumber);
  }
  const handleQuestion = (event) => {
    setQuestion(event.target.value)
  }

  const handleOption1 = (event) => {
    setOption1(event.target.value)
  }
  const handleOption2 = (event) => {
    setOption2(event.target.value)
  }
  const handleOption3 = (event) => {
    setOption3(event.target.value)
  }
  const handleOption4 = (event) => {
    setOption4(event.target.value)
  }
  const handleCorrectOption = (event) => {
    const correctAnswer = parseInt(event.target.value);
    setAnswer(correctAnswer)
  }

  const handleMedia = (event) => {
    setFile(event.target.files[0])
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
        alert("media uploaded successfully.")
      })
      .catch(error => {
        console.error("Error:", error); // Handle any errors that occurred during the fetch
      });
  };

  return (
    <>
      <QuizDashboardNavbar />

      <Stack width={"100vw"} height={"95vh"} alignItems={"center"} justifyContent={"center"} mt={"5vh"}>
        <Stack direction={"column"} sx={{ width: "80vw", height: "80%", boxShadow: "2px 2px 10px black", borderRadius: "5px" }} >
          <Stack width={"100%"} height={"85%"} direction={"column"}>
            <Stack direction={"row"} gap={2} alignItems={"center"} justifyContent={"center"} sx={{ height: "20%", marginTop: "10px" }} >
              <TextField id="standard-basic" label="Q.No" variant="filled" sx={{ width: "10vw" }} onChange={handleQuestionNumber} />
              <TextField id="standard-basic" label="Enter Question " variant="outlined" sx={{ width: "50vw" }} onChange={handleQuestion} />
            </Stack>
            <Stack direction={"row"} gap={2} alignItems={"center"} justifyContent={"center"} sx={{ height: "10%", marginTop: "10px" }} >
              {/* <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}  >
                Upload Question Media File
                <VisuallyHiddenInput type="file" onChange={(e) => { setFile(e.target.files[0]); handleUploadMedia() }} />
              </Button> */}
              <input type="file" onChange={(e) => { setFile(e.target.files[0]) }} />
              <Button component="label" variant="contained" startIcon={<CloudUploadIcon />} onClick={handleUploadMedia} >
                Upload Question Media
              </Button>
            </Stack>
            <Stack direction={"row"} gap={2} alignItems={"center"} justifyContent={"center"} sx={{ height: "25%" }} >
              <TextField id="standard-basic" label="First Option" variant="outlined" sx={{ width: "35vw" }} onChange={handleOption1} />
              <TextField id="standard-basic" label="Second Option" variant="outlined" sx={{ width: "35vw" }} onChange={handleOption2} />
            </Stack>
            <Stack direction={"row"} gap={2} alignItems={"center"} justifyContent={"center"} sx={{ height: "25%" }} >
              <TextField id="standard-basic" label="Third Option" variant="outlined" sx={{ width: "35vw" }} onChange={handleOption3} />
              <TextField id="standard-basic" label="Fourth Option" variant="outlined" sx={{ width: "35vw" }} onChange={handleOption4} />
            </Stack>
            <Stack direction={"row"} gap={2} alignItems={"center"} justifyContent={"center"} sx={{ height: "20%" }} >
              <FormControl>
                {/* <FormLabel id="demo-row-radio-buttons-group-label">Correct Option</FormLabel> */}
                <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group" >
                  <Typography variant="h6" color="GrayText" sx={{ marginTop: "4px", marginRight: "20px" }} >Correct Option :- </Typography>
                  <FormControlLabel value={1} control={<Radio />} label="First Option" sx={{ color: "#00306b" }} onClick={handleCorrectOption} />
                  <FormControlLabel value={2} control={<Radio />} label="Second Option" sx={{ color: "#00306b" }} onClick={handleCorrectOption} />
                  <FormControlLabel value={3} control={<Radio />} label="Third Option" sx={{ color: "#00306b" }} onClick={handleCorrectOption} />
                  <FormControlLabel value={4} control={<Radio />} label="Fourth Option" sx={{ color: "#00306b" }} onClick={handleCorrectOption} />
                </RadioGroup>
              </FormControl>
            </Stack>
          </Stack>
          <Stack width={"100%"} height={"15%"} alignItems={"center"} direction={"row"} justifyContent={"center"} sx={{ backgroundColor: "aliceblue" }} >
            <Button variant="contained" color="success" sx={{ marginRight: "10px" }} startIcon={<AddIcon />} onClick={handleSubmitQuestion}>
              Add Question
            </Button>
          </Stack>
        </Stack>
      </Stack >

    </>

    // <div className='questions-dashboard'>
    //   <QuizDashboardNavbar />
    //   <div className="dashboard-content">
    //     <div className="question-card">
    //       <div className="question">
    //         <div className='question-card-text'>Question Number</div>
    //         <div className=''><input type="number" onChange={handleQuestionNumber} /></div>
    //       </div>
    //       <div className="question">
    //         <div className='question-card-text'>Question</div>
    //         <div className='question-card-input'><input type="text" onChange={handleQuestion} /></div>
    //       </div>
    //       <div className="question">
    //         <div className='question-card-text'>First Option </div>
    //         <div className='question-card-input'><input type="text" onChange={handleOption1} /></div>
    //       </div>
    //       <div className="question">
    //         <div className='question-card-text'>Second Option</div>
    //         <div className='question-card-input'><input type="text" onChange={handleOption2} /></div>
    //       </div>
    //       <div className="question">
    //         <div className='question-card-text'>Third Option </div>
    //         <div className='question-card-input'><input type="text" onChange={handleOption3} /></div>
    //       </div>
    //       <div className="question">
    //         <div className='question-card-text'>Fourth Option </div>
    //         <div className='question-card-input'><input type="text" onChange={handleOption4} /></div>
    //       </div>
    //       <div className="correct-option-content">
    //         <div className="question-card-text"><p>Correct Option</p></div>
    //         <div className="correct-option-input">
    //           <div className='num-text'>1</div><div><input type="radio" className='radio-input' value='1' onChange={handleCorrectOption}/></div>
    //         </div>
    //         <div className="correct-option-input">
    //           <div className='num-text'>2</div><div><input type="radio" className='radio-input' value='2' onChange={handleCorrectOption}/></div>
    //         </div>
    //         <div className="correct-option-input">
    //           <div className='num-text'>3</div><div><input type="radio" className='radio-input' value='3' onChange={handleCorrectOption}/></div>
    //         </div>
    //         <div className="correct-option-input">
    //           <div className='num-text'>4</div><div><input type="radio" className='radio-input' value='4' onChange={handleCorrectOption}/></div>
    //         </div>
    //       </div>
    //       <div className="submit-section-box">
    //         <button className='add-question' onClick={handleSubmitQuestion}>Add Question</button>
    //       </div>

    //     </div>
    //   </div>

    // </div>
  )
}

export default AddQuestion