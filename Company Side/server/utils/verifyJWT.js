import jsonwebtoken from "jsonwebtoken";

const verifyJWT = (requestToken, securityKey) => {
    try {
        const payload = jsonwebtoken.verify(requestToken, securityKey);
        // const email = payload.email;
        console.log("Data Object extracted from Json Web Token : ", payload);
        return payload;
    } catch (error) {
        console.log("Invalid Json Web Token.",error)
    }
}

export {verifyJWT}