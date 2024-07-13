import connection from "../../conig/config.js";
import { verifyJWT } from "../../utils/verifyJWT.js";

const CreateCompanyTable = (req, resp, next) => {
    const tokenValue = req.cookies.token;
    const srkKey = "asdfasdjaperofspdkfneirfpsdferifskdnfiri";
    const token = verifyJWT(tokenValue, srkKey);
    console.log(token)
    const companyid = token.companyid;
    console.log("Company ID : ", companyid)

    const CreateCompanyTableQuery = ` CREATE TABLE ${companyid} (quizno INT AUTO_INCREMENT PRIMARY KEY,quizid CHAR(10),quizname VARCHAR(50),status VARCHAR(10)) `;
    // const TableCheckingQuery = ` SELECT * FROM ${companyid} `
    const TableCheckingQuery = ` SELECT * FROM information_schema.tables WHERE table_schema = 'quizdb' AND table_name = '${companyid}' `;

    connection.query(TableCheckingQuery, (error, results, fields) => {
        if (error) {
            console.log("Cannot check for the table in the database : Error : ",error);
        }else if (results.length==0) {
            connection.query(CreateCompanyTableQuery, (error, results, fields) => {
                if (error) {
                    console.log("Cannot create company table of : ", companyid);
                    console.log("Error : ", error)
                } else {
                    console.log(`Company table of ${companyid} created Successfully.`, results);
                    resp.send(results)
                    next();
                }
            })
        } else {
            resp.send(JSON.stringify({ message: "table already exists." }))
        }
    })
}

export default CreateCompanyTable