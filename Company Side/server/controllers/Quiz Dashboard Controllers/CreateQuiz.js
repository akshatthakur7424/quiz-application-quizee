import connection from "../../conig/config.js";
import generateRandomId from "../../utils/generateID.js";
import { verifyJWT } from "../../utils/verifyJWT.js";

const InsertQuizID = (req, resp, next) => {
    const tokenValue = req.cookies.token;
    const srkKey = "asdfasdjaperofspdkfneirfpsdferifskdnfiri";
    const token = verifyJWT(tokenValue, srkKey);
    console.log(token)
    const companyid = token.companyid;
    console.log("Company ID : ", companyid)
    const quizid = generateRandomId();
    const quizname = req.body.quizname;
    console.log("Quiz ID from InsertQuizID function : ",quizid)

    // queries
    const insertQuizIDQuery = `INSERT INTO ${companyid}  (quizid,quizname) VALUES ("${quizid}","${quizname}")`;

    // inserting quiz id in the database
    connection.query(insertQuizIDQuery, (error, results, fields) => {
        if (error) {
            console.log("Error : ", error);
            console.log("Unable to create quizid")
        } else {
            console.log("Quiz id created and inserted in database : ", results)
            req.body.quizid = quizid;
            req.body.companyid = companyid;
            next();
        }
    });

}

const CreateQuizTable = (req, resp) => {
    const quizid = req.body.quizid;
    const companyid = req.body.compnyid;
    console.log("Quiz ID from CreateQuizTable function : ",quizid)
    // queries
    const createQuizTableQuery = `CREATE TABLE ${quizid} (
        sno INT,
        question VARCHAR(300),
        option1 VARCHAR(50),
        option2 VARCHAR(50),
        option3 VARCHAR(50),
        option4 VARCHAR(50),
        answer INT,
        media varchar(200),
        questionid varchar(10)
    )`;

    // creating new quiz table corresponding to the inserted quizid
    connection.query(createQuizTableQuery, (error, results, fields) => {
        if (error) {
            console.log("Error : ", error);
            console.log("Unable to create quiz table")
        } else {
            console.log("Quiz table created and inserted in database : ", results)
            resp.send({
                message: "Success",
                companyid : companyid
            })
        }
    });

}

export { InsertQuizID, CreateQuizTable };