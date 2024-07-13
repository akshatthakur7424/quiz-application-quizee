import connection from "../../conig/config.js";
import { hashPassword } from "../../utils/hashedPassword.js";
import { verifyJWT } from "../../utils/verifyJWT.js";
import dotenv from "dotenv"
dotenv.config();

const passwordController = async (req, resp) => {
    const tokenValue = req.cookies.token;
    const srkKey = "asdfasdjaperofspdkfneirfpsdferifskdnfiri";
    const token = verifyJWT(tokenValue, srkKey);
    const JWTemail = token.email;
    console.log("Saving password of ", JWTemail)

    const plainPassword = req.body.password;
    const email = JWTemail;

    hashPassword(plainPassword).then(async (response) => {
        const passwordUpdatingQuery = ` UPDATE clients SET password = "${response}" WHERE email = "${email}" `
        console.log(passwordUpdatingQuery)
        connection.query(passwordUpdatingQuery, (error, results, fields) => {
            if (error) {
                console.log("Cannot hash the password", error)
            } else {
                console.log("Password hashed and saved in the database.")
                console.log(results)
                const data = {
                    "response": "Password Encrypted and Sent to Database Successfully."
                }
                resp.send(JSON.stringify(data))
            }
        })
    }).catch((error) => {
        console.log("cannot hash the password and save in the database : ", error)
    })

}


export { passwordController }