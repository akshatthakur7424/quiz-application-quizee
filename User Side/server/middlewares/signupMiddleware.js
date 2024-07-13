import { otpNumber } from "../utils/generateOtp.js";
import { sendEmail } from "../utils/sendEmail.js";
// import { generateJWT } from "../utils/generateJWT.js";
import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv"
import connection from "../config/config.js";
dotenv.config();

// Email and Name saving to database function
const emailSaver = async (req, resp, next) => {

  const { name, email } = req.body;

  const userCheckingQuery = `SELECT * FROM consumers WHERE email = "${email}" `

  connection.query(userCheckingQuery, (error, results, fields) => {
    if (error) {
      const data1 = {
        message : "Cannot check if the user exist in the database or not."
      }
      console.log(data1,error);
      // resp.send(JSON.stringify(data1))
    } else if (results.length > 0) {
      const data2 = {
        message: "User already exists, please Login",
      };
      console.log(JSON.stringify(data2));
      // resp.send(JSON.stringify(data2));
    } else if (results.length == 0){
      const userInsertionQuery = `INSERT INTO consumers(name, email) VALUES('${name}', '${email}')`;
      connection.query(userInsertionQuery, (error, results, fields) => {
        if (error) {
          const data3 = {
            message : "Cannot add user to the Database"
          };
          console.log(data3);
          // resp.send(JSON.stringify(data3))
        } else {
          const data4 = {
            message : "User added to database Successfullly."
          }
          console.log(data4)
          // resp.send(JSON.stringify(data4))
          next();
        }
      })
    }
  })
};


// const emailSaver = async (req, resp, next) => {
//   try {
//     // Set a longer timeout (e.g., 30 seconds) for the findOne operation
//     const options = { maxTimeMS: 30000 };

//     const User = await user.findOne({ email: req.body.email }, null, options);
//     if (User) {
//       const data = {
//         message : "User already exists please Login"
//       }
//       console.log(JSON.stringify(data));
//       resp.send(JSON.stringify(data));
//     } else {
//       const { email, name } = req.body;
//       const consumer = new user({
//         name: name,
//         email: email,
//       });
//       const result = await consumer.save();
//       console.log(result);
//       next();
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };

// generating otp
// console.log(" OTP generated in the server : " + otpNumber);

// Saving otp to database
const otpSaver = async (req, resp, next) => {

  const { name, email } = req.body;

  const otpUpdatingQuery = `UPDATE consumers SET otp = "${otpNumber}" WHERE email = "${email}" `;

  connection.query(otpUpdatingQuery,(error,results,fields)=>{
    if (error) {
      const data5 = {
        message : "Cannot save the generated otp in the database."
      }
      console.log(data5);
      // resp.send(JSON.stringify(data5))
    } else {
      const data6 = {
        message : "Otp saved to database successfully."
      }
      console.log(data6)
      // resp.send(JSON.stringify(data6,results));
      console.log(otpNumber, " : OTP updated in the Database at ", req.body.email);
      next();
    }
  })
};

// Email to user sending function
const emailSender = async (req, resp, next) => {
  
  const {email} = req.body;

  const data7 = {
    message : "Cannot send otp to email"
  }

  try {
    sendEmail(email, otpNumber);
    next();
  } catch (error) {
    console.log(data7, error);
  }
};

// Generating JWT using user email and saving it in the clients browser
const generateJWT = async (req, resp, next) => {

  const {email} = req.body;
  
  try {
    const payload = { email: email }; // data which jwt will hold
    const securityKey = "asdfasdjaperofspdkfneirfpsdferifskdnfiri"; // jwt security key
    const token = jsonwebtoken.sign(payload, securityKey); // generating token using payload and security key
    console.log("Json Web Token : ", token);
    resp.json({ token });
    next();
  } catch (error) {
    console.log("Error : Cannot Generate Json Web Token. ", error);
  }
};

export { emailSaver, otpSaver, emailSender, generateJWT };

// // const sendingResponse = (req,resp,next) => {
// //   const data = {
// //     "token" : token,
// //     "message" : message
// //   }
// //   resp.send(JSON.stringify(data));
// //   next();
// // }


