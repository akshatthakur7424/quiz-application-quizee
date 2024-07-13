import React, { useState, useEffect  } from "react";
import "./QuizDashboardNavbar.css";
import { useNavigate } from "react-router-dom";
import { AppBar, Box, Button, Stack, Typography } from "@mui/material";

const QuizDashboardNavbar = () => {

  const navigate = useNavigate();

  const handleViewQuestion = () => {
    navigate("/quiz-questions-dashboard-view-question");
  };

  const handleAddQuestion = () => {
    navigate("/quiz-questions-dashboard-add-question");
  };

  const handleViewQuizes = () => {
    navigate("/");
  };

  return (
    <Box>
      <AppBar
        position="fixed"
        sx={{ height: "60px", backgroundColor: "#06284a" }}
      >
        <Stack
          alignItems={"center"}
          justifyContent={"space-between"}
          direction={"row"}
          sx={{ padding: "10px 20px 0px 20px" }}
        >
          <Box>
            <Typography variant="h5" color="white">
              Quizee
            </Typography>
          </Box>
          <Box>
            <Stack direction={"row"} gap={2}>
              {/* <Typography
                variant="body1"
                color="white"
                sx={{ marginTop: "10px" }}
              >
                Company ID : {companyid} 
              </Typography> */}
              {/* <Typography variant="body1" color="white" sx={{ marginTop: "10px" }} >Company ID = sdjarai</Typography> */}
            </Stack>
          </Box>
          <Box>
            <Stack direction={"row"} gap={2}>
              <Button
                variant="contained"
                color="inherit"
                sx={{
                  width: "170px",
                  color: "black",
                  "&:hover": {
                    backgroundColor: "white",
                    width: "175px",
                    color: "black",
                    transition: "width 0.2s ease-in-out",
                  },
                }}
                onClick={handleViewQuizes}
              >
                View Quizes
              </Button>
              <Button
                variant="contained"
                color="primary"
                sx={{
                  width: "170px",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "white",
                    width: "175px",
                    color: "black",
                    transition: "width 0.2s ease-in-out",
                  },
                }}
                onClick={handleViewQuestion}
              >
                View Questions
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleAddQuestion}
              >
                Add Questions
              </Button>
            </Stack>
          </Box>
        </Stack>
      </AppBar>
    </Box>

    // <div>
    //     <div className="dashboard-navbar">
    //     <div className='question-dashboard-navbar-content'>
    //       <p>Company Name : Microsoft</p>
    //       <p>{document.cookie}</p>
    //     </div>
    //     <div className="question-dashboard-navbar-controls">
    //       <button className='navbar-control-buttons' onClick={handleViewQuestion}>View Questions</button>
    //       <button className='navbar-control-buttons' onClick={handleAddQuestion}>Add Questions</button>
    //     </div>
    //   </div>
    // </div>
  );
};

export default QuizDashboardNavbar;
