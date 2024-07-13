import mysql from "mysql";

const connection = mysql.createConnection({
    host: 'localhost',     
    user: 'root', 
    password: 'akshat@developer', 
    database: 'quizdb' 
})

export default connection;