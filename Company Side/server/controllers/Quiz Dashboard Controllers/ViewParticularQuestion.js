import connection from "../../conig/config.js";

const ViewParticularQuestion = (req,resp) => {
    const questionid = req.body.questionid;
    const quizid = req.cookies.quizid;

    const particularQuestionquery = `SELECT * FROM ${quizid} WHERE questionid = "${questionid}"`

    connection.query(particularQuestionquery,(error,results,fields)=>{
        if (error) {
            console.log("Cannot get data of this question.")
            console.log("Error : ",error);
        } else {
            console.log("Fetched this question from database successfully.");
            console.log(results);
            resp.send(results);            
        }
    })
}

export default ViewParticularQuestion