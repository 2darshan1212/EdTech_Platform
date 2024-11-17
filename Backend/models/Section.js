import mongoose from "mongoose";

const sectionSchema = new mongoose.Schema({
  // courseId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Course",
  //   required: true,
  // },
  sectionName: {
    type: String,
    required: true,
  },
  subSection: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "subSection",
      required: true,
    },
  ],
});

export default mongoose.model("Section", sectionSchema);
