import connection from "../../config/config.js";

const QuizStatus = (req,resp) => {
    const {quizid,companyid} = req.body;

    console.log("***data****",quizid,companyid)
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