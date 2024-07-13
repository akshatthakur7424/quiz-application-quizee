import connection from "../../conig/config.js";

const QuizQuestion = (req,resp) => {
    const {quizid} = req.body;

    const GetQuestionquery = `SELECT question , option1 , option2 , option3 , option4 , answer FROM ${quizid}`

    connection.query(GetQuestionquery,(error,results,fields)=>{
        if (error) {
            console.log("Cannot send quiz data to frontend. ",error)
        } else {
            console.log("Quiz data sended to database successfully");
            console.log(results);
            resp.send(results);
        }
    })
}

export default QuizQuestion;