import connection from "../../config/config.js";
import { verifyJWT } from "../../utils/verifyJWT.js";

const viewPoints = (req,resp) => {
    const srkKey = "asdfasdjaperofspdkfneirfpsdferifskdnfiri";
    const tokenValue = req.cookies.userToken;
    const JWTemail = verifyJWT(tokenValue, srkKey);

    const pointsUploadingQuery = ` SELECT points from consumers WHERE email = "${JWTemail}" `;

    connection.query(pointsUploadingQuery,(error,results,fields)=>{
        if (error) {
            console.log("Cannot update the points in tht database : ",error)
        } else {
            console.log("Points updated in the database successfully.",results);
            resp.send(results);
        }
    })
}

export default viewPoints;