import bcrypt from "bcrypt"

const hashPassword =  async (plainPassword) => {
    const saltRounds = 10;
    let hashedPassword = bcrypt.hash(plainPassword,saltRounds);
    return hashedPassword;    
}


export {hashPassword}