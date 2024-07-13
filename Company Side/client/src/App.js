import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ShowQuiz from "./components/Quiz Dashboard/ShowQuiz/ShowQuiz";
import CreateQuiz from "./components/Quiz Dashboard/CreateQuiz/CreateQuiz";
import AddQuestion from "./components/Quiz Dashboard/QuestionsDashboard/AddQuestion";
import ViewQuestion from "./components/Quiz Dashboard/QuestionsDashboard/ViewQuestion";
import UpdateQuestion from "./components/Quiz Dashboard/QuestionsDashboard/UpdateQuestion";

import Email from "./components/Authentication/Email";
import Login from "./components/Authentication/Login";
import LoginPassword from "./components/Authentication/LoginPassword";
import Otp from "./components/Authentication/Otp";
import Password from "./components/Authentication/Password";
import NavigationBar from "./components/Authentication/NavigationBar";

function App() {
  // function hasTokenCookie() {
  //   const tokenMatch = document.cookie.match(/token=([^;]+)/);
  //   if (tokenMatch) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  return (
    <>
      <Router>
          <NavigationBar />
            <Routes>
              {/* quiz dashboard routes */}
            <Route path="/login" element={<Login />} />
              <Route path="/" element={<ShowQuiz />} />
              <Route path="/create-quiz" element={<CreateQuiz />} />
              <Route path="/quiz-questions-dashboard-add-question" element={<AddQuestion />} />
              <Route path="/quiz-questions-dashboard-view-question" element={<ViewQuestion />} />
              <Route path="/quiz-questions-dashboard-update-question/:quesid" element={<UpdateQuestion />} />        
              {/* auhentication routes */}
              <Route path="/signup" element={<Email />} />
              <Route path="/login" element={<Login />} />
              <Route path="/login-password" element={<LoginPassword />} />
              <Route path="/otp" element={<Otp />} />
              <Route path="/password" element={<Password />} />
          </Routes>
      </Router>
    </>
  );
}

export default App;
