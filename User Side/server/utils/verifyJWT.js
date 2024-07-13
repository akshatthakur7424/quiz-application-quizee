import jsonwebtoken from "jsonwebtoken";

const verifyJWT = (requestToken, securityKey) => {
    try {
        const payload = jsonwebtoken.verify(requestToken, securityKey);
        const email = payload.email;
        console.log("Email extracted from Json Web Token : ", email);
        return email;
    } catch (error) {
        console.log("Invalid Json Web Token.",error)
    }
}

export {verifyJWT}