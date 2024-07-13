import express from "express"
import connection from "./config/config.js" 
import cors from "cors"
import cookieParser from "cookie-parser";
import QuizQuestion from "./controllers/quiz controllers/QuizQuestion.js";
import QuizStatus from "./controllers/quiz controllers/QuizStatus.js";
import {emailSaver,otpSaver,emailSender,generateJWT} from "./middlewares/signupMiddleware.js";
import { signupController } from "./controllers/Authentication/signupController.js";
import { passwordController } from "./controllers/Authentication/passwordController.js";
import {otpController} from "./controllers/Authentication/otpController.js"
import loginController from "./controllers/Authentication/loginController.js"
import { loginPasswordController } from "./controllers/Authentication/loginPasswordController.js";
import {resendOtpController} from "./controllers/Authentication/resendOtp.js"
import uploadPoints from "./controllers/quiz controllers/uploadPoints.js";
import viewPoints from "./controllers/quiz controllers/viewPoints.js";


// initialising modules
const app = express();

const domain = "http://localhost:3001"; // frontend domain

app.use(express.json());

app.use(cookieParser({
    secure: false
}));

// app.use(cors());
let corsData = {
    origin: domain,
    credentials: true
}
app.use(cors(corsData));

// Enable CORS for all routes
app.use(cookieParser());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', domain);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// API's
// quiz api's
app.post("/quiz-question",QuizQuestion)
app.post("/quiz-status",QuizStatus)
app.post("/upload-points",uploadPoints)
app.post("/view-points",viewPoints)

// authentication api's
app.post('/signup-email' ,emailSaver, otpSaver , emailSender  , generateJWT,  signupController); // route for saving email to database , sending otp on it and saving otp in the database.
app.post('/signup-otp', otpController)  // route for matching user entered otp with the actual otp stored in database
app.post('/signup-password' , passwordController)  // route for saving password in database
app.post("/login",loginController)  // route for token generation on registered email used in login 
app.post("/login-password",loginPasswordController) // route for matching password in the login and resetting passwords
app.post('/authentication-resend-otp',resendOtpController)  // route for resending the otp

// conncting to database
connection.connect((error) => {
    if (error) {
        console.log("Error connecting to Database.")
    } else {
        console.log("Database connection establshed Successfully......")
    }
})

// assigning server a port
app.listen(8080, () => {
    console.log("Server litening on port 8080.")
})