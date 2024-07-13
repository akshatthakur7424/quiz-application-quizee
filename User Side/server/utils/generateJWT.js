import  jsonwebtoken  from "jsonwebtoken";
import dotenv from "dotenv"
dotenv.config();

const generateJWT = (userEmail) => {
    try {
        const payload = { email: userEmail };  // data which jwt will hold
        const securityKey = process.env.SECURITY_KEY;  // jwt security key
        const token = jsonwebtoken.sign(payload, securityKey);   // generating token using payload and security key
        console.log("Json Web Token : ", token);
        return token;
    } catch (error) {
        console.log("Error : Cannot Generate Json Web Token. ", error);
    }
}

export {generateJWT}