import connection from "../../conig/config.js";
import { verifyJWT } from "../../utils/verifyJWT.js";

const DeleteQuizID = (req, resp, next) => {
    const tokenValue = req.cookies.token;
    const srkKey = "asdfasdjaperofspdkfneirfpsdferifskdnfiri";
    const token = verifyJWT(tokenValue, srkKey);
    console.log(token)
    const companyid = token.companyid;
    console.log("Company ID : ", companyid)
    const quizid = req.body.quizid;
    const quizname = req.body.quizname;
    console.log("Deleting quiz with quizid ",quizid," and name : ",quizname)

    // queries
    const deleteQuizID = `DELETE FROM ${companyid}  WHERE quizid="${quizid}"`;

    // inserting quiz id in the database
    connection.query(deleteQuizID, (error, results, fields) => {
        if (error) {
            console.log("Error : ", error);
            console.log("Unable to delete quizid")
        } else {
            console.log("Quiz id deleted from database : ", results)
            next();
        }
    });

}

const DeleteQuizTable = (req,resp) => {
    const quizid = req.body.quizid;
    const quizname = req.body.quizname;
    console.log("Deleting quiz with quizid ",quizid," and name : ",quizname)
    // queries
    const deleteQuizTable = `DROP TABLE ${quizid}`;

    // creating new quiz table corresponding to the inserted quizid
    connection.query(deleteQuizTable, (error, results, fields) => {
        if (error) {
            console.log("Error : ", error);
            console.log("Unable to delete quiz table")
        } else {
            console.log("Quiz table deleted from database : ", results)
            resp.send({
                message: "Success"
            })
        }
    });

}

export {DeleteQuizID,DeleteQuizTable} 