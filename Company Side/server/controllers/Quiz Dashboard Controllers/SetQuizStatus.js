import connection from "../../conig/config.js";
import { verifyJWT } from "../../utils/verifyJWT.js";

const SetQuizStatus = (req,resp) => {
    const tokenValue = req.cookies.token;
    const srkKey = "asdfasdjaperofspdkfneirfpsdferifskdnfiri";
    const token = verifyJWT(tokenValue, srkKey);
    console.log(token)
    const companyid = token.companyid;
    console.log("Company ID : ", companyid)
    const {status,quizid} = req.body;
    console.log(req.body)

    const StatusSettingQuery = `UPDATE ${companyid} SET status = "${status}" WHERE quizid = "${quizid}" `

    connection.query(StatusSettingQuery,(error,results,fields)=>{
        if (error) {
           console.log("Cannot change the status of this quiz. Error : ",error)
        } else {
            console.log("Quiz status changed Sucessfully.",results);
            resp.send(results);
        }
    })
}


export default SetQuizStatus;