import mongoose from "mongoose";
import mailSender from "../utils/mailSender";

const OTPSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 300, //expires in 5 minutes
  },
});

//for that we use pre middleware ,post and pre middleware are used after schema and before model creation

//a function to send mail to the user
async function sendVerificationEmail(email, otp) {
  try {
    const mailResponse = await mailSender(
      email,
      "OTP verification by D-CODER",
      otp
    );
    console.log("Email sent successfully", mailResponse);
  } catch (err) {
    console.log("error occured sending mail", err.message);
  }
}

// sending the otp before creating the user in the database
OTPSchema.pre("save", async function (next) {
  await sendVerificationEmail(this.email, this.otp);
  next();
});

export default mongoose.model("OTP", OTPSchema);
