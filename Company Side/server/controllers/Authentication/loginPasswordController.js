import bcrypt from "bcrypt";
import { verifyJWT } from "../../utils/verifyJWT.js";
import dotenv from "dotenv"
import connection from "../../conig/config.js";

dotenv.config();


const loginPasswordController = async (req, resp) => {
  const userEnteredPassword = req.body.password;
  const tokenValue = req.cookies.token;
  const srkKey = "asdfasdjaperofspdkfneirfpsdferifskdnfiri";
  const token = verifyJWT(tokenValue, srkKey);
  const JWTemail = token.email;
  console.log("User email to be checked in database : ",JWTemail)
  const userCheckingQuery = ` SELECT * FROM clients WHERE email = "${JWTemail}" `

  connection.query(userCheckingQuery,(error,results,fields)=>{
    if (error) {
      console.log("Cannot check for the user in the database.",error)
    } else {
      console.log(results)
      const storedPassword = results[0].password;
      console.log("Password in Database : ", storedPassword);
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
