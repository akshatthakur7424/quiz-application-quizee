import connection from "../../conig/config.js";
import { verifyJWT } from "../../utils/verifyJWT.js";

const ShowQuizes = (req, resp) => {
    const tokenValue = req.cookies.token;
    const srkKey = "asdfasdjaperofspdkfneirfpsdferifskdnfiri";
    const token = verifyJWT(tokenValue, srkKey);
    console.log(token)
    const id = token.companyid;
    console.log("Company ID : ", id);

    const showQuiz = `SELECT * FROM ${id}`;
    connection.query(showQuiz, (error, results, fields) => {
        if (error) {
            console.log("Cannot get all the quizes. Error : ", error);
        } else {
            console.log("All Quiz Details accessed Successfully : ", results);
            resp.send(results);
        }
    })

}

export default ShowQuizes;