import connection from "../../conig/config.js";

const UpdateQuestion = (req,resp) => {
    const {sno,question,option1,option2,option3,option4,answer} = req.body;
    const quizid = req.cookies.quizid;
    const questionid = req.cookies.questionid;
;
    console.log("Incoming Quiz ID : ",quizid)

    // const questionAdditionQuery = `INSERT INTO ${quizid} (sno,question, option1, option2, option3, option4, answer) VALUES('${sno}','${question}', '${option1}', '${option2}', '${option3}', '${option4}', '${answer}')`;
    const questionAdditionQuery = `UPDATE ${quizid} SET sno = "${sno}" , question = "${question}" , option1 = "${option1}" , option2 = "${option2}" , option3 = "${option3}" , option4 = "${option4}" , answer = "${answer}" WHERE questionid = "${questionid}"`;
    console.log(sno,question, option1, option2, option3, option4, answer, quizid,questionid);
    console.log(req.body)

    connection.query(questionAdditionQuery,(error,results,fields)=>{
        if (error) {
            console.log("Cannot Update Question to the Database. Error : ",error);
        } else {
            console.log("Question updated to database Successfully.",results);
            resp.send(results);
        }
    });
}

export default UpdateQuestion;