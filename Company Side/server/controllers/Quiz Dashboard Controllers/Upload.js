import multer from "multer"
import connection from "../../conig/config.js";

const UploadMedia = (req,resp) => {
    const quizid = req.cookies.quizid;
    const questionid = req.cookies.questionid;

    console.log("File received in the backend successfully.");
    console.log("Image file coming from the frontend application : ",req.file);
    console.log("Request body coming from the frontend application : ",req.body);
    const fileName = req.file.filename;
    const filePath = req.file.path;
    console.log("File Name : ",fileName);
    console.log("File Path : ", filePath);
    console.log("Quiz ID : ",quizid);
    console.log("Question ID : ",questionid)

    const mediaQuery = ` UPDATE ${quizid} SET media = "${fileName}" WHERE questionid = "${questionid}" `

    connection.query(mediaQuery,(error,results,fields)=>{
        if (error) {
            console.log("Cannot save the image name in the database : ",error);
        } else {
            console.log("Image name saved in the databse successfully.",results);
            console.log("Generated Image URL from server : ",`http://localhost:7000/${filePath}`);
            resp.send(results);
        }
    })
}

export default UploadMedia;