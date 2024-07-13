import connection from "../../conig/config.js";
import generateRandomId from "../../utils/generateID.js";

const AddQuestion = (req,resp) => {
    const {sno,question,option1,option2,option3,option4,answer} = req.body;
    const quizid = req.cookies.quizid;
    const questionid = req.cookies.questionid;
    console.log("Incoming Quiz ID : ",quizid)

    // const questionAdditionQuery = `INSERT INTO ${quizid} (sno,question, option1, option2, option3, option4, answer) VALUES('${sno}','${question}', '${option1}', '${option2}', '${option3}', '${option4}', '${answer}')`;
    const snoValue = parseInt(sno); // convert sno to an integer
    const questionAdditionQuery = `UPDATE ${quizid} SET sno = ${sno} , question = "${question}", option1 = "${option1}", option2 =  "${option2}", option3 = "${option3}" , option4 = "${option4}", answer = ${answer} WHERE questionid = "${questionid}" `;
    console.log(sno,question, option1, option2, option3, option4, answer, quizid,questionid);
    console.log(req.body)

    connection.query(questionAdditionQuery,(error,results,fields)=>{
        if (error) {
            console.log("Cannot Add Question to the Database. Error : ",error);
        } else {
            console.log("Question added to database Successfully.",results);
            resp.send(results);
        }
    });
}

export default AddQuestion;