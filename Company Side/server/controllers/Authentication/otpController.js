import connection from "../../conig/config.js";
import { verifyJWT } from "../../utils/verifyJWT.js";
// import { otpNumber } from "../utils/generateOtp.js"

const otpController = async (req, resp) => {
  const tokenValue = req.cookies.token;
  const userEnteredOtp = req.body.otp;
  const srkKey = "asdfasdjaperofspdkfneirfpsdferifskdnfiri";
  const token = verifyJWT(tokenValue, srkKey);
  const JWTemail = token.email;
  console.log("Checking OTP given by ", JWTemail);

  const userCheckingQuery = ` SELECT * FROM clients WHERE email = "${JWTemail}" `

  connection.query(userCheckingQuery,(error,results,fields)=>{
    if (error) {
      console.log("Cannot check for the user in the database.",error);
    } else if (results[0].otp == userEnteredOtp) {
      console.log("OTP Matched");
      const data1 = {
        status : 'success',
        message : "OTP matched Successfully."
      }
      resp.send(JSON.stringify(data1))
    } else if (results[0].otp != userEnteredOtp) {
      console.log("Incorrect OTP");
      console.log(
        `User Entered OTP : ${userEnteredOtp} and Backend Generated OTP : ${results[0].otp}`
      );
      const data2 = {
        status: "error",
        message: "Invalid OTP. Please try again.",
      };
      resp.send(JSON.stringify(data2));
    } else {
      console.log("Invalid Json Web Token.")
    }
  })
  
};

export { otpController };
