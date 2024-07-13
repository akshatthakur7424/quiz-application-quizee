import connection from "../../conig/config.js";
import { generateRandomCode } from "../../utils/generateOtp.js";
import { sendEmail } from "../../utils/sendEmail.js";
import { verifyJWT } from "../../utils/verifyJWT.js";
import dotenv from "dotenv"
dotenv.config();

const resendOtpController = async (req, resp, next) => {
  const tokenValue = req.cookies.token;
  const srkKey = "asdfasdjaperofspdkfneirfpsdferifskdnfiri";
  const token = verifyJWT(tokenValue, srkKey);
  const JWTemail = token.email;
  console.log("Resending OTP to ", JWTemail);
  const newOtp = generateRandomCode(); // generating new otp

  const updateOtpQuery = ` UPDATE clients SET otp = "${newOtp}" WHERE email = "${JWTemail}" `
  // updating old otp in database with new one
  connection.query(updateOtpQuery, (error, results, fields) => {
    if (error) {
      console.log("Cannot update the otp in the database.", error)
    } else {
      console.log(results);
      console.log(newOtp, " : OTP updated in the Database at ", JWTemail);

      // sending new otp with an email
      try {
        sendEmail(JWTemail, newOtp);
        const data = { "resendOtp Message": "Another Otp has been resended to the same E-Mail Successfully." }
        resp.send(JSON.stringify(data))
        next();
      } catch (error) {
        console.log("Error : ", error);
      }
    }
  })


};

export { resendOtpController };
