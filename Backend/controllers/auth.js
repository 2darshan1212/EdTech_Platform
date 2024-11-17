import User from "../models/User.js";
import OTP from "../models/OTP.js";
import otpGenerator from "otp-generator";
import bcrypt from "bcrypt";
import Profile from "../models/Profile.js";
import jwt from "jsonwebtoken";
import {} from "dotenv/config";
import mailSender from "../utils/mailSender.js";

//send OTP handler
export const sendOTP = async (req, res) => {
  try {
    //fetch email from request body
    const { email } = req.body;
    //check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    //generate OTP
    let otp = otpGenerator.generate(6, {
      upperCase: false,
      lowerCase: false,
      specialChars: false,
    });
    console.log(otp);
    // check uniqueness of otp
    let result = await OTP.findOne({ otp });
    while (result) {
      otp = otpGenerator.generate(6, {
        upperCase: false,
        lowerCase: false,
        specialChars: false,
      });
      result = await OTP.findOne({ otp });
    }
    const otpPayload = { email, otp };
    //create an entry for OTP in the database
    const otpBody = await OTP.create(otpPayload);
    console.log(otpBody);
    //return response successful
    res.status(200).json({
      success: true,
      message: "OTP Sent Successfully",
      otp,
    });
  } catch (err) {
    //return error response
    res.status(500).json({ success: false, message: err.message });
  }
};

//signUP handler

export const signUP = async (req, res) => {
  try {
    //data fetch from  request body
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      accountType,
      contactNumber,
      otp,
    } = req.body;
    //checking  validation of all fields
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !otp
    ) {
      return res.status(403).json({ message: "All fields are required" });
    }
    //check if password and confirm password are same
    if (password !== confirmPassword) {
      return res.status(403).json({ message: "Passwords do not match" });
    }
    //check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    // find the most resent OTP stored for the user in the database
    const recentOTP = await OTP.find({ email })
      .sort({ createdAt: -1 })
      .limit(1);
    console.log(recentOTP);
    //check if OTP is valid
    if (recentOTP.length === 0 || recentOTP.otp !== otp) {
      return res.status(403).json({ message: "Invalid OTP" });
    }
    //hashing the password
    const hashedPassword = await bcrypt.hash(password, 10);
    //creating entry for user in the database
    const profileDetails = await Profile.create({
      gender: null,
      dateOfBirth: null,
      about: null,
      contactNumber: null,
    });
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      accountType,
      contactNumber,
      additionalDetails: profileDetails._id,
      image: `http://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
    });
    //return response successful
    res
      .status(200)
      .json({ success: true, message: "User created successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

//login handler
export const login = async (req, res) => {
  try {
    //fetch email and password from request body
    const { email, password } = req.body;
    //checking for validation of all fields
    if (!email || !password) {
      return res.status(403).json({ message: "All fields are required" });
    }
    //check if user exists
    const user = await User.findOne({ email }).populate("additionalDetails");
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not registered, Please sign up" });
    }
    //check if password is correct
    if (await bcrypt.compare(password, user.password)) {
      const payload = {
        email: user.email,
        id: user._id,
        accountType: user.accountType,
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: `${process.env.JWT_EXPIRE}d`,
      });
      user.token = token;
      user.password = undefined;
      //create cookie and send response
      const options = {
        exires: new Date(
          Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
      };
      res.cookie("token", token, options).status(200).json({
        success: true,
        user,
        token,
        message: "Logged In Successfully",
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Password is Incorrect",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Login failed" });
  }
};

//change password handler
export const changePassword = async (req, res) => {
  try {
    //fetch email, old password and new password from request body
    const { email, oldPassword, newPassword } = req.body;
    //check for validation of all fields
    if (!email || !oldPassword || !newPassword) {
      return res.status(403).json({ message: "All fields are required" });
    }
    //check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    //check if old password is correct
    if (await bcrypt.compare(oldPassword, user.password)) {
      //hash the new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      //update the password in the database
      await User.findOneAndUpdate({ email }, { password: hashedPassword });
      //send mail to user password changed successfully
      mailSender(
        email,
        "Password Changed",
        "Your password has been changed successfully"
      );
      return res
        .status(200)
        .json({ success: true, message: "Password changed successfully" });
    } else {
      return res.status(401).json({ message: "Old password is incorrect" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Password change failed" });
  }
};
