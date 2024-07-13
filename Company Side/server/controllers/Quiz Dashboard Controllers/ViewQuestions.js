import connection from "../../conig/config.js";

const ViewQuestions = async (req, resp) => {
    const quizid = req.cookies.quizid;

    const ViewQuestionQuery = `SELECT * FROM ${quizid}`;

    console.log("Quiz ID : ", quizid);

    connection.query(ViewQuestionQuery, async (error, results, fields) => {

        if (error) {
            console.log("Cannot fetch the quiz questions from the database. Error : ", error);
            resp.send("cannot get the data from the database. Error : ",error);
        } 
        else if (results.length < 1) {
            console.log("No questions yet")
            resp.send({message: "no questions"})
        }
        else {
            console.log("Questions fetched from the database successfully.");
            console.log(results);
            resp.send(results)
        }


    });
}


export default ViewQuestions;
