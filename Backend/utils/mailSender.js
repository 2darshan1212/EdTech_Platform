import nodemailer from "nodemailer";
import {} from "dotenv/config";

// for sending mail using nodemailer
// 1 - import nodemailer
// 2 - create transporter(transporter is an object that is used to send mail)
// 3 - send mail using transporter function sendMail

const mailSender = async (email, title, body) => {
  try {
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    let info = await transporter.sendMail({
      from: "EDTECH - by D-CODER",
      to: `${email}`,
      subject: `${title}`,
      html: `${body}`,
    });

    console.log(info);
    return info;
  } catch (err) {
    console.log(err.message);
  }
};

export default mailSender;
