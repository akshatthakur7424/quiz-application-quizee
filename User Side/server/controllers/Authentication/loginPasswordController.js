import bcrypt from "bcrypt";
import { verifyJWT } from "../../utils/verifyJWT.js";
import dotenv from "dotenv"
import connection from "../../config/config.js";
dotenv.config();


const loginPasswordController = async (req, resp) => {
  const userEnteredPassword = req.body.password;
  const tokenValue = req.cookies.userToken;
  const srkKey = "asdfasdjaperofspdkfneirfpsdferifskdnfiri";
  const JWTemail = verifyJWT(tokenValue, srkKey);

  const userCheckingQuery = ` SELECT * FROM consumers WHERE email = "${JWTemail}" `

  connection.query(userCheckingQuery,(error,results,fields)=>{
    if (error) {
      console.log("Cannot check for the user in the database.",error)
    } else {
      const storedPassword = results[0].password;
      console.log("Password in Database : ,", storedPassword);
      console.log("User Entered Password : ", userEnteredPassword);
      bcrypt.compare(userEnteredPassword, storedPassword, function (err, result) {
        // console.log(req.userDetail);
        // console.log(userEnteredPassword);
        console.log("Result : ",result);
        if (err) {
          // Handle error
          console.error("Error comparing passwords:", err);
          return;
        }
    
        if (result) {
          console.log("Password is correct");
          const data1 = {
            message: "Correct Password",
          };
          resp.send(JSON.stringify(data1));
        } else {
          console.log("Password is incorrect");
          const data2 = {
            message: "Incorrect Password",
          };
          resp.send(JSON.stringify(data2));
        }
      });
    }
  })
  
};

export { loginPasswordController };
