import React, { useEffect, useState } from 'react'
import Typography from '@mui/material/Typography'
import { Box, Stack, Button, ImageListItem } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useNavigate } from 'react-router-dom';

const Quiz = () => {

  const [quizdata, Setquizdata] = useState('');
  const [question, Setquestion] = useState('');
  const [option1, Setoption1] = useState('');
  const [option2, Setoption2] = useState('');
  const [option3, Setoption3] = useState('');
  const [option4, Setoption4] = useState('');
  const [answer, setAnswer] = useState();
  const [media, setMedia] = useState('')
  const [quizdatalength, Setquizdatalength] = useState(0);
  var [count, setCount] = useState(0);
  const [selectedValue, setSelectedValue] = useState('');
  var [points, setPoints] = useState(0);

  const navigate = useNavigate();

  
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

  const userToken = getCookie("userToken");  // checking user is signed in or not.

  const data = {
    quizid: getCookie("quizid")
  }

  useEffect(() => {
    fetch("http://localhost:8080/quiz-question", {
      method: 'POST',
      credentials: 'include',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(response => {
        console.log(response);
        Setquizdata(response)
        Setquestion(response[0].question)
        Setoption1(response[0].option1)
        Setoption2(response[0].option2)
        Setoption3(response[0].option3)
        Setoption4(response[0].option4)
        setAnswer(response[0].answer)
        setMedia(response[0].media)
        Setquizdatalength(response.length)
        // startTimer(1);
        console.log("Number of Questions : ",response.length)
      })
  }, [])

  // changing the count on clicking next button
  const handleNextQuestion = () => {
    setCount(count++);
    if (count>quizdatalength) {
      alert("You Completed all the questions.")
      navigate("/quiz-results");
    }
  }

  // changing questions on count change
  useEffect(() => {
    // console.log(count)
    if (count >= 0 && count < quizdata.length) {
      Setquestion(quizdata[count].question);
      Setoption1(quizdata[count].option1);
      Setoption2(quizdata[count].option2);
      Setoption3(quizdata[count].option3);
      Setoption4(quizdata[count].option4);
      setAnswer(quizdata[count].answer);
      setMedia(quizdata[count].media);
    }
  }, [count, quizdata]);

  // updating points on count change if the previous count question answer was correct
  useEffect(() => {
    if (selectedValue == answer) {
      console.log("Correct Answer!");
      setPoints((prevPoints) => {
        const newPoints = prevPoints + 10;
  
        // Send the updated points to the backend
        fetch("http://localhost:8080/upload-points", {
          method: "POST",
          credentials: 'include',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ points: newPoints }),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
          });
  
        return newPoints;
      }); 
    } else {
      console.log("Wrong Answer!")
    }
  }, [count])

  // setting the value of selected option to a variable to compare it with the correct answer coming from the backend(database)
  const handleOptionClick1 = () => {
    setSelectedValue(1);
  }
  const handleOptionClick2 = () => {
    setSelectedValue(2);
  }
  const handleOptionClick3 = () => {
    setSelectedValue(3);
  }
  const handleOptionClick4 = () => {
    setSelectedValue(4);
  }

  // useEffect(() => {
  //   sendPoints();
  // }, [points]);


  // useEffect(() => {
  //   console.log(selectedValue)
  // }, [selectedValue])

  // Timer
  // function startTimer(minutes) {
  //   // Convert minutes to seconds
  //   let seconds = minutes * 60;
  //   // let seconds = 1000;

  //   // Function to update the time on the screen
  //   function updateDisplay() {
  //     const minutesDisplay = Math.floor(seconds / 60);
  //     const secondsDisplay = (seconds % 60).toString().padStart(2, '0');
  //     document.getElementById('timer-display').innerText = `${minutesDisplay}:${secondsDisplay}`;
  //   }

  //   // Initial display setup
  //   updateDisplay();

  //   // Update the timer every second
  //   const timerInterval = setInterval(function () {
  //     // Update the time on the screen
  //     updateDisplay();

  //     // Check if the timer has reached 0 seconds
  //     if (seconds === 0) {
  //       // Display an alert when the time is over
  //       clearInterval(timerInterval);
  //       alert('Time is up!');
  //       navigate("/quiz-results")
  //     } else {
  //       // Decrease the remaining time by 1 second
  //       seconds--;
  //     }
  //   }, 1000);
  // }

  return (
              // <Button variant="contained" color='warning' >Time = {" "}<div id='timer-display'></div></Button>
    <>
      <Box sx={{ width: "100vw", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }} >
        <Stack width="90vw" height="90vh" direction='column' alignItems="center" justifyContent="center" sx={{ boxShadow: "2px 2px 12px black", borderRadius: "8px", borderRadiua: '4px' }} >
          <Stack width="100%" height="10%" direction="row" alignItems="center" justifyContent="space-between" sx={{ backgroundColor: "rgb(0, 115, 192)", borderRadius: "8px 8px 0px 0px" }} >
            <Typography variant="h6" color="white" sx={{ padding: "0px 10px 0px 20px" }} >Q{count + 1}. {question}</Typography>
            <Stack gap={2} direction="row" sx={{ paddingRight: "20px" }} >
              <Button variant="contained" sx={{ backgroundColor: "white", color: "black" }} >Points : {points}</Button>
            </Stack>
          </Stack>
          <Stack width="100%" height='40%' direction="row" alignItems="center" justifyContent="flex-start">
            <Stack justifyContent='flex-start' height="90%" width="30%" sx={{backgroundColor:"white", marginLeft:"20px"}} >
              <ImageListItem sx={{ width: "100%", height: "auto" , overflow: "hidden", borderRadius: "6px" }}  >
              <img
                src={`http://localhost:7000/questionMedia/${media}`}
                alt="question image"
                loading="lazy"
              />
            </ImageListItem>
            </Stack>
          </Stack>
          <Stack direction="column" alignItems="start" justifyContent="space-evenly" width="99%" height="40%" sx={{ backgroundColor: "", marginLeft: "20px" }} >
            <Button variant="contained" color="primary" sx={{ width: "300px" }} onClick={handleOptionClick1} >{option1}</Button>
            <Button variant="contained" color="primary" sx={{ width: "300px" }} onClick={handleOptionClick2} >{option2}</Button>
            <Button variant="contained" color="primary" sx={{ width: "300px" }} onClick={handleOptionClick3} >{option3}</Button>
            <Button variant="contained" color="primary" sx={{ width: "300px" }} onClick={handleOptionClick4} >{option4}</Button>
          </Stack>
          <Stack direction="row" width="98%" height="10%" alignItems="center" justifyContent="flex-end" sx={{ marginRight: "20px", backgroundColor: "whitesmoke" }} >
            <Button variant="contained" color="success" startIcon={<NavigateNextIcon />} onClick={handleNextQuestion} >Next Question</Button>
          </Stack>
        </Stack>
      </Box>
    </>
  )
}

export default Quiz;



{/* <div className="quiz">
<div className="quizScreen">
    <div className="nav">
        <div className="question">
            <p>Q{count + 1}. {question}</p>
        </div>
        <div className="parameters">
            <div className="params">Points : {points}</div>
            <div className="params">Time : 10:00 </div>
        </div>
    </div>
    <div className="media">
        <img className="image"
            // src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80"
            src={`http://localhost:7000/questionMedia/${media}`}
            alt="image" />
    </div>
    <div className="quiz-options">
        <label>
            <input type="radio" name="option" value={1} onChange={handleOptionClick} />
            <span>{option1}</span>
        </label>
        <label>
            <input type="radio" name="option" value={2} onChange={handleOptionClick} />
            <span>{option2}</span>
        </label>
        <label>
            <input type="radio" name="option" value={3} onChange={handleOptionClick} />
            <span>{option3}</span>
        </label>
        <label>
            <input type="radio" name="option" value={4} onChange={handleOptionClick} />
            <span>{option4}</span>
        </label>
    </div>
    <div className="submit">
        {/* <button className="previous">Previous Question</button> */}
//         <button className="next" onClick={handleNextQuestion}>Next</button>
//     </div>
// </div>
// </div> */}