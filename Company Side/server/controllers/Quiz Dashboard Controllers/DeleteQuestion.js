import connection from "../../conig/config.js";

const Deletequestion = (req,resp) => {
    const {questionid} = req.body;
    const quizid = req.cookies.quizid;
    console.log("Quiz ID : ",quizid," Question ID : ",questionid);
    const deleteQuery = `DELETE FROM ${quizid} WHERE questionid="${questionid}"`;

    connection.query(deleteQuery,(error,results,field)=>{
        if (error) {
            console.log("Cannot Delete the Question from database. Error : ",error);
            return;
        } else {
            console.log('Question deleted from the database successfuly.');
            resp.send(results);
        }
    })
}

export default Deletequestion;