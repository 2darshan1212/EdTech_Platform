import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
  gender: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
  },
  about: {
    type: String,
    trim: true,
  },
  contactNumber: {
    type: Number,
    required: true,
  },
});

export default mongoose.model("Profile", profileSchema);
