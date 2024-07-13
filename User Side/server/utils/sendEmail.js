import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const sendEmail = async (email, otpNumber, resp) => {
  // const ownerEmail = process.env.OWNER_EMAIL;
  // const ownerEmailPassword = process.env.OWNER_EMAIL_PASSWORD;
  const ownerEmail = "developerakshatsingh@gmail.com";
  const ownerEmailPassword = "upko wesn ntcw dvec";
  console.log("Owner Email comming from environment variables : ", ownerEmail);
  console.log("Owner EMail Password coming from environment variables : ", ownerEmailPassword);

  let emailSendingData = {
    service: "gmail",
    auth: {
      user: ownerEmail,
      pass: ownerEmailPassword,
    }
  };

  // Sending Email
  const transporter = nodemailer.createTransport(emailSendingData);

  const mailOptions = {
    from: ownerEmail,
    to: email,
    subject: "Email Verification",
    html: `<h1> This email is sended by Akshat Singh Thakur for email verification process </h1> <h3>This is your otp</h3> ${otpNumber}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error : ", error);
    } else {
      console.log(
        "Email Sent Successfully : ",
        info.response,
        "OTP Number : ",
        otpNumber
      );
      resp.status(201).send(info);
    }
  });
};

export { sendEmail };
