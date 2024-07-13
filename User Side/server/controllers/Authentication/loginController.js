import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";
import connection from "../../config/config.js";
dotenv.config();

const loginController = async (req, resp) => {
  const userEmail = req.body.email;
  console.log("User Entered Email = ", userEmail);

  const userCheckingQuery = ` SELECT * FROM consumers WHERE email = "${userEmail}" `

  connection.query(userCheckingQuery,(error,results,fields)=>{
    if(error) {
      console.log("Cannot check for the user in the database.",error)
    } else if (results.length == 0) {
      const data1 = {
        message : "User Not found in Database"
      }
      console.log(data1)
      resp.send(JSON.stringify(data1))
    } else if (results.length != 0) {
      try {
        const payload = { email: req.body.email }; // data which jwt will hold
        const securityKey = "asdfasdjaperofspdkfneirfpsdferifskdnfiri"; // jwt security key
        const token = jsonwebtoken.sign(payload, securityKey); // generating token using payload and security key
        console.log("Json Web Token : ", token);
        const data2 = {
          message: "User found in Database",
          token: token,
        };
        resp.send(JSON.stringify(data2));
      } catch (error) {
        console.log("Error : Cannot Generate Json Web Token. ", error);
      }
    }
  })
};

export default loginController;
