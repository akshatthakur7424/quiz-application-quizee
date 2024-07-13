import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import QuizStatus from "./Components/Quiz/Quiz Status/QuizStatus";
import Quiz from "./Components/Quiz/Quiz Pages/Quiz"
import "./App.css"
import Email from "./Components/Authentication/Email";
import Login from "./Components/Authentication/Login";
import LoginPassword from "./Components/Authentication/LoginPassword";
import Otp from "./Components/Authentication/Otp";
import Password from "./Components/Authentication/Password";
import Home from "./Components/Authentication/Home";
import Results from "./Components/Quiz/Quiz Results/Results";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Email />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login-password" element={<LoginPassword />} />
        <Route path="/otp" element={<Otp />} />
        <Route path="/password" element={<Password />} />
        <Route path="/home" element={<Home />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/quiz-status" element={<QuizStatus />} />
        <Route path="/quiz-results" element={<Results />} />
      </Routes>
    </Router>
  );
}

export default App;
