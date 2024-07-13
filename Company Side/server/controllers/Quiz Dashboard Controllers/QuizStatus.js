import connection from "../../conig/config.js";
import { verifyJWT } from "../../utils/verifyJWT.js";

const QuizStatus = (req,resp) => {
    const tokenValue = req.cookies.token;
    const srkKey = "asdfasdjaperofspdkfneirfpsdferifskdnfiri";
    const token = verifyJWT(tokenValue, srkKey);
    console.log(token)
    const companyid = token.companyid;
    console.log("Company ID : ", companyid)
    const {quizid,status} = req.body;

    const statusQuery = `SELECT status FROM ${companyid} WHERE quizid = "${quizid}"`

    connection.query(statusQuery,(error,results,fields)=>{
        if (error) {
            console.log("Cannot get the status of this quiz.",error);
        } else {
            console.log("Successfully fetched the status of the quiz from the database.",results);
            resp.send(results);
        }
    })
}

export default QuizStatus;