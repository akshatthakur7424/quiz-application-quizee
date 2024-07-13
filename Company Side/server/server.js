import express from "express"
import connection from "./conig/config.js";
import cors from "cors"
import multer from "multer";
import bodyParser from "body-parser"

import { InsertQuizID, CreateQuizTable } from "./controllers/Quiz Dashboard Controllers/CreateQuiz.js"
import ShowQuizes from "./controllers/Quiz Dashboard Controllers/ShowQuizes.js";
import { DeleteQuizID, DeleteQuizTable } from "./controllers/Quiz Dashboard Controllers/DeleteQuiz.js";
import AddQuestion from "./controllers/Quiz Dashboard Controllers/AddQuestion.js"
import cookieParser from "cookie-parser";
import Deletequestion from "./controllers/Quiz Dashboard Controllers/DeleteQuestion.js";
import ViewQuestions from "./controllers/Quiz Dashboard Controllers/ViewQuestions.js";
import UpdateQuestion from "./controllers/Quiz Dashboard Controllers/UpdateQuestion.js";
import ViewParticularQuestion from "./controllers/Quiz Dashboard Controllers/ViewParticularQuestion.js";
import SetQuizStatus from "./controllers/Quiz Dashboard Controllers/SetQuizStatus.js";
import deleteEmptyQuestion from "./middlewares/deleteEmptyQuestion.js"

import {emailSaver,otpSaver,setClientID,emailSender,generateJWT} from "./middlewares/signupMiddleware.js";
import { signupController } from "./controllers/Authentication/signupController.js";
import { passwordController } from "./controllers/Authentication/passwordController.js";
import {otpController} from "./controllers/Authentication/otpController.js"
import loginController from "./controllers/Authentication/loginController.js"
import { loginPasswordController } from "./controllers/Authentication/loginPasswordController.js";
import {resendOtpController} from "./controllers/Authentication/resendOtp.js"
import CreateCompanyTable from "./controllers/Quiz Dashboard Controllers/CreateCompanyTable.js";
import UploadMedia from "./controllers/Quiz Dashboard Controllers/Upload.js";
import QuestionID from "./controllers/Quiz Dashboard Controllers/QuestionID.js";
import getCompanyID from "./controllers/Quiz Dashboard Controllers/getCompanyID.js";
import sendCompanyID from "./controllers/Quiz Dashboard Controllers/sendCompanyID.js";

// initialising modules
const app = express();

const domain = "http://localhost:3000"; // frontend domain

app.use(express.json());

app.use(express.urlencoded({extended : false}))   // parsing form data to json.

app.use('/questionMedia',express.static('questionMedia'));   // creating static url to fetch server resource (question medias)

app.use(cookieParser({
    secure: false
}));

// app.use(cors());
let corsData = {
    origin: domain,
    credentials: true
}
app.use(cors(corsData));
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' })); // Adjust the limit for JSON requests


// Enable CORS for all routes
app.use(cookieParser());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', domain);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './questionMedia'); // Specify the destination folder
    },
    filename: function (req, file, cb) {
      // Use the original file name with a timestamp to avoid overwriting
      cb(null, `${Date.now()}_${file.originalname}`);
    }
  });
  
const upload = multer({storage,limits: {
    fileSize: 1024 * 1024 * 10, // setting maximum file size as 10 MB
  },});

// API's
// authentication api's
app.post('/signup-email' ,emailSaver, otpSaver,setClientID , emailSender  , generateJWT,  signupController); // route for saving email to database , sending otp on it and saving otp in the database.
app.post('/signup-otp', otpController)  // route for matching user entered otp with the actual otp stored in database
app.post('/signup-password' , passwordController)  // route for saving password in database
app.post("/login",loginController)  // route for token generation on registered email used in login 
app.post("/login-password",loginPasswordController) // route for matching password in the login and resetting passwords
app.post('/authentication-resend-otp',resendOtpController)  // route for resending the otp
// quiz dashboard api's
app.get("get-companyid",sendCompanyID);
app.post("/create-company-table",CreateCompanyTable)
app.post("/create-quiz" ,InsertQuizID, CreateQuizTable);
app.post("/show-quizes", ShowQuizes)
app.post("/delete-quiz", DeleteQuizID, DeleteQuizTable)
app.post("/add-question", AddQuestion)
app.post("/delete-question",Deletequestion)
app.get("/view-questions",deleteEmptyQuestion, ViewQuestions)
app.post("/view-particular-questions",ViewParticularQuestion)
app.post("/update-question",UpdateQuestion)
app.post("/set-quiz-status",SetQuizStatus)
app.post("/set-questionid",QuestionID)
app.post("/get-company-id",getCompanyID)
// question media uploading api
app.post("/set-question-media",upload.single("file"),UploadMedia)

// conncting to database
connection.connect((error) => {
    if (error) {
        console.log("Error connecting to Database.")
    } else {
        console.log("Database connection establshed Successfully......")
    }
})

// assigning server a port
app.listen(7000, () => {
    console.log("Server litening on port 7000.")
})
