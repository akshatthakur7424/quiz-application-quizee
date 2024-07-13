import { verifyJWT } from "../../utils/verifyJWT.js";

const sendCompanyID = (req,resp) => {
    const tokenValue = req.cookies.token;
    const srkKey = "asdfasdjaperofspdkfneirfpsdferifskdnfiri";
    const token = verifyJWT(tokenValue, srkKey);

    console.log(token)
    const id = token.companyid;
    console.log("Company ID : ", id);

    const data = {
        companyid : id
    }

    try {
        resp.status(200).send(data);
    } catch (error) {
        console.log("Cannot get company id from the server")
        console.log("Error : ", error)
    }
}


export default sendCompanyID;