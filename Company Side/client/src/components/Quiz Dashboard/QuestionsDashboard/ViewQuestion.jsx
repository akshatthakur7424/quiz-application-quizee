import React, { useEffect, useState } from 'react'
import QuizDashboardNavbar from './QuizDashboardNavbar'
import "./ViewQuestion.css"
import { useNavigate } from 'react-router-dom'
import { Box, Stack, Button, Typography } from '@mui/material'
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';


const ViewQuestion = () => {

  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      fetch("http://localhost:7000/view-questions", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
      })
        .then(response => response.json())
        .then(response => {
          console.log("Quiz Questions Data :", response);
          if (response.message == "no questions") {
            navigate("/quiz-questions-dashboard-add-question")
          }
          setQuestions(response);
        })
        .catch((error) => {
          console.log("Cannot fetch Questions from database. Error : ", error)
        })
    }, 2000);
  }, [])

  const handleDeleteQuestion = (questionid) => {

    const data = {
      questionid: questionid
    };

    fetch("http://localhost:7000/delete-question", {
      method: "POST",
      credentials: "include",
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(response => {
        console.log(response);
        window.location.reload();
      })
  }

  const handleUpdateQuestion = (quesid) => {
    navigate(`/quiz-questions-dashboard-update-question/${quesid}`)
  }
  return (
    <>
      <Box>
        <QuizDashboardNavbar />
        {
          questions == "" ?
            <Box height={"auto"} width={"100vw"} sx={{ paddingTop: "60px", paddingBottom: "100px" }} >
              <Stack direction={'column'} alignItems={"center"} justifyContent={"center"}>
                <Box marginTop={"40vh"}>
                  <Box ml={"60px"} mb={"10px"} ><span class="loader"></span></Box>
                  <Typography variant="h6" color="initial">Loading Questions.....</Typography>
                </Box>
              </Stack>
            </Box>
            :
            <Box height={"auto"} width={"100vw"} sx={{ paddingTop: "60px", paddingBottom: "100px" }} >
              <Stack direction={'column'} alignItems={"center"} justifyContent={"center"}>


                {
                  questions.map(question => (
                    <Stack key={question.questionid} width={"95vw"} height={"350px"} direction={"column"} alignItems={"center"} justifyContent={'center'} sx={{ backgroundColor: "white", marginTop: "30px", marginBottom: "5px", borderRadius: "6px", boxShadow: "2px 2px 10px black" }} >

                      <Stack width={"100%"} height={"15%"} alignItems={"flex-start"} justifyContent={"center"} sx={{ paddingLeft: "40px", backgroundColor: "aliceblue" }}>
                        <Typography variant="h6" color="initial">{question.sno}. {question.question} </Typography>
                      </Stack>
                      <Stack width={"100%"} height={"70%"} backgroundColor={"white"} direction={"row"}>
                        <Stack width={"50%"} alignItems={"flex-start"} justifyContent={"space-evenly"} sx={{ paddingLeft: "40px" }} >
                          <Typography variant="body1" color="initial">(1) {question.option1} </Typography>
                          <Typography variant="body1" color="initial">(2) {question.option2}</Typography>
                          <Typography variant="body1" color="initial">(3) {question.option3}</Typography>
                          <Typography variant="body1" color="initial">(4) {question.option4}</Typography>
                          <Typography variant="body1" color="initial">Correct Option = {question.answer} </Typography>
                        </Stack>
                        <Stack width={"50%"} alignItems={"center"} justifyContent={"center"} sx={{ borderLeft: "1px solid grey"}} >
                          <ImageList sx={{ width: 300, height: 300, marginTop: "3%", marginBottom: "3%" }} cols={1} rowHeight={164}>
                            <Stack sx={{ alignItems: 'center', justifyContent:'center' }} >
                            <ImageListItem>
                              <img
                                src={`http://localhost:7000/questionMedia/${question.media}`}
                                alt={"Question Media"}
                                loading="lazy"
                                className='question-card-image'
                              />
                              {console.log(`http://localhost:7000/questionMedia/${question.media}`)}
                            </ImageListItem>
                            </Stack>
                          </ImageList>
                        </Stack>
                      </Stack>
                      <Stack width={"100%"} height={"17%"} backgroundColor={"ButtonFace"} direction={"row"} justifyContent={"center"} alignItems={'center'} gap={2}>
                        <Button variant="outlined" color="primary" onClick={() => handleUpdateQuestion(question.questionid)}>Update Question</Button>
                        <Button variant="contained" color="error" onClick={() => handleDeleteQuestion(question.questionid)}>Delete Question</Button>
                      </Stack>

                    </Stack>
                  ))
                }
              </Stack>
            </Box>
        }
      </Box>

    </>

    // <div>
    //   <QuizDashboardNavbar />
    //   {
    //     questions.map(question => (
    //       <div key={question.questionid}>
    //         <div className="view-question-content">
    //           <div className="view-question-question-card">
    //             <div className="ques"><label>({question.sno})  </label>{question.question}</div>
    //             <div><p className="opt-text">(1) {question.option1}</p ></div>
    //             <div><p className="opt-text">(2) {question.option2}</p></div>
    //             <div><p className="opt-text">(3) {question.option3}</p></div>
    //             <div><p className="opt-text">(4) {question.option4}</p></div>
    //             <div><p className="opt-text">Answer : {question.answer}</p></div>
    //             <div className="view-question-controls">
    //               <button className="update-question" onClick={()=>handleUpdateQuestion(question.questionid)}>Update Question</button>
    //               <button className="delete-question" onClick={()=>handleDeleteQuestion(question.questionid)}>Delete Question</button>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     ))
    //   }
    // </div>
  )
}

export default ViewQuestion



// {
//   questions == "" ?
//     <Box>
//       <QuizDashboardNavbar />
//       <Box height={"auto"} width={"100vw"} sx={{ paddingTop: "60px", paddingBottom: "100px" }} >
//         <Stack direction={'column'} alignItems={"center"} justifyContent={"center"}>
//           <Box marginTop={"45vh"}>
//             <Box ml={"50px"} mb={"10px"} ><span class="loader"></span></Box>
//             <Typography variant="body1" color="initial">Loading Questions.....</Typography>
//           </Box>
//         </Stack>
//       </Box>
//     </Box>
//     :
//     <Box>
//       <QuizDashboardNavbar />
//       <Box height={"auto"} width={"100vw"} sx={{ paddingTop: "60px", paddingBottom: "100px" }} >
//         <Stack direction={'column'} alignItems={"center"} justifyContent={"center"}>


//           {
//             questions.map(question => (
//               <Stack key={question.questionid} width={"95vw"} height={"350px"} direction={"column"} alignItems={"center"} justifyContent={'center'} sx={{ backgroundColor: "white", marginTop: "30px", marginBottom: "5px", borderRadius: "6px", boxShadow: "2px 2px 10px black" }} >

//                 <Stack width={"100%"} height={"15%"} alignItems={"flex-start"} justifyContent={"center"} sx={{ paddingLeft: "40px", backgroundColor: "aliceblue" }}>
//                   <Typography variant="h6" color="initial">{question.sno}. {question.question} </Typography>
//                 </Stack>
//                 <Stack width={"100%"} height={"70%"} backgroundColor={"white"} direction={"row"}>
//                   <Stack width={"50%"} alignItems={"flex-start"} justifyContent={"space-evenly"} sx={{ paddingLeft: "40px" }} >
//                     <Typography variant="body1" color="initial">(1) {question.option1} </Typography>
//                     <Typography variant="body1" color="initial">(2) {question.option2}</Typography>
//                     <Typography variant="body1" color="initial">(3) {question.option3}</Typography>
//                     <Typography variant="body1" color="initial">(4) {question.option4}</Typography>
//                     <Typography variant="body1" color="initial">Correct Option = {question.answer} </Typography>
//                   </Stack>
//                   <Stack width={"50%"} alignItems={"center"} justifyContent={"space-around"} sx={{ borderLeft: "1px solid grey" }} >
//                     <ImageList sx={{ width: 200, height: 450, marginTop: "5%" }} cols={1} rowHeight={164}>
//                       <ImageListItem>
//                         <img
//                           src={`http://localhost:7000/questionMedia/${question.media}`}
//                           alt={"Question Media"}
//                           loading="lazy"
//                         />
//                         {console.log(`http://localhost:7000/questionMedia/${question.media}`)}
//                       </ImageListItem>
//                     </ImageList>
//                   </Stack>
//                 </Stack>
//                 <Stack width={"100%"} height={"15%"} backgroundColor={"ButtonFace"} direction={"row"} justifyContent={"center"} alignItems={'center'} gap={2}>
//                   <Button variant="outlined" color="primary" onClick={() => handleUpdateQuestion(question.questionid)}>Update Question</Button>
//                   <Button variant="contained" color="error" onClick={() => handleDeleteQuestion(question.questionid)}>Delete Question</Button>
//                 </Stack>

//               </Stack>
//             ))
//           }
//         </Stack>
//       </Box>
//     </Box>
// }







