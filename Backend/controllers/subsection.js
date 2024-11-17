import SubSection from "../models/SubSection.js";
import Section from "../models/Section.js";
import { uploadImage } from "../utils/uploadImage.js";
import {} from "dotenv/config";

export const createSubSection = async (req, res) => {
  try {
    //fetch data from the request body
    const { title, description, timeDuration, sectionId } = req.body;
    //extract the file/video
    const video = req.files.videoFile;
    //validation
    if (!title || !description || !timeDuration || !sectionId || !video) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    //uploading video to cloudinary to get secure url
    const videoUrl = await uploadImage(video, process.env.FOLDER_NAME);
    //create new sub section
    const newSubSection = new SubSection({
      title,
      description,
      timeDuration,
      videoUrl,
    });

    //update the section with the new sub section
    const updatedSection = await Section.findByIdAndUpdate(
      { _id: sectionId },
      {
        $push: {
          subSections: newSubSection._id,
        },
      },
      { new: true }
    ).populate("subSection");

    return res.status(200).json({
      success: true,
      message: "Sub section created successfully",
      updatedSection,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//update sub section





//delete sub section

