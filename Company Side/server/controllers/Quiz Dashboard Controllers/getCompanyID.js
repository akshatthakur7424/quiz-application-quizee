import { verifyJWT } from "../../utils/verifyJWT.js";

const getCompanyID = (req,resp) => {
    const tokenValue = req.cookies.token;
    const srkKey = "asdfasdjaperofspdkfneirfpsdferifskdnfiri";
    const token = verifyJWT(tokenValue, srkKey);
    console.log(token)
    const companyid = token.companyid;
    console.log("Company ID : ", companyid);

    resp.send({companyid : companyid}) 
}

export default getCompanyID;