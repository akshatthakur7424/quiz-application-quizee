import { user } from "../models/userDetails.js";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken"

const checkUser = async (req, resp,) => {
  
};

const comparePassword = (req, resp, next) => {
  const userEnteredPassword = req.body.password;
  const storedPassword = req.userDetail.password;
  console.log("Password in Database : ,", storedPassword);
  console.log("User Entered Password : ", userEnteredPassword);
  bcrypt.compare(userEnteredPassword, storedPassword, function (err, result) {
    console.log(req.userDetail);
    console.log(userEnteredPassword);
    console.log(result);
    if (err) {
      // Handle error
      console.error("Error comparing passwords:", err);
      return;
    }

    if (result) {
      console.log("Password is correct");
      
    } else {
      console.log("Password is incorrect");
      const data2 = {
        message: "Incorrect Password",
      };
      resp.send(JSON.stringify(data2));
      next();
    }
  });
};


export { checkUser, comparePassword };
