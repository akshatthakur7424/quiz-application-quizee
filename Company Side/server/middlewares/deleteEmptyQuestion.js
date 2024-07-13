import connection from "../conig/config.js";
import util from 'util';

const deleteEmptyQuestion = async (req,resp,next) => {
    const quizid = req.cookies.quizid;
    const ViewQuestionQuery = `SELECT * FROM ${quizid}`;
    const queryAsync = util.promisify(connection.query).bind(connection);

    connection.query(ViewQuestionQuery, async (error, results, fields) => {
        for (const question of results) {
            if (
                question.question === null &&
                question.option1 === null &&
                question.option2 === null &&
                question.option3 === null &&
                question.option4 === null &&
                question.answer === null
            ) {
                const deleteQuestionQuery = `DELETE FROM ${quizid} WHERE questionid = "${question.questionid}"`;
                console.log("Executing delete query:", deleteQuestionQuery);
        
                await queryAsync(deleteQuestionQuery);
                console.log("Deleted empty question from the database.", question.questionid);
            }
        }
        next();
    })
    
}

export default deleteEmptyQuestion;


