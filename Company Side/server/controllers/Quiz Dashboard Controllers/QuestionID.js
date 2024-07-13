import connection from "../../conig/config.js";
import generateRandomId from "../../utils/generateID.js";

const QuestionID = (req,resp) => {
    const questionid = generateRandomId();
    const quizid = req.cookies.quizid;
    const QuestionIdAddingQuery = ` INSERT INTO  ${quizid} (questionid) VALUES ("${questionid}") `;
    console.log("Questionid : ",questionid);
    console.log("Quizid : ",quizid);
    const data = {
        questionid : questionid
    }
    connection.query(QuestionIdAddingQuery,(error,results,fields)=>{
        if (error) {
            console.log("Cannot add the generated question id in the database ",error)
        } else {
            console.log("Generated questionid successfully store in the database of this quiz.",results);
            resp.send(data)
        }
    })
}

export default QuestionID;