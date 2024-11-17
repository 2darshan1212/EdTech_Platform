import Course from "../models/Course.js";
import Section from "../models/section.js";

export const createSection = async (req, res) => {
  try {
    //data fetching from the request body
    const { name, courseId } = req.body;
    //validation
    if (!name || !courseId) {
      return res.status(400).json({
        success: false,
        message: "Name is required",
      });
    }
    //create a new section
    const newSection = await Section.create({
      name,
    });
    //add new section to the course schema
    const updatedCourseDetails = await Course.findOneAndUpdate(
      courseId,
      {
        $push: {
          courseContent: newSection._id,
        },
      },
      {
        new: true,
      }
    );
    // *** use populate to get the section and subSection details in place of their id's

    return res.status(201).json({
      success: true,
      message: "Section created successfully",
      updatedCourseDetails,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateSection = async (req, res) => {
  try {
    //data input from the request body
    const { sectionId, name } = req.body;
    //validation
    if (!sectionId || !name) {
      return res.status(400).json({
        success: false,
        message: "Missing details",
      });
    }
    //update the section
    const updatedSection = await Section.findByIdAndUpdate(
      sectionId,
      {
        name,
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Section updated successfully",
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

export const deleteSection = async (req, res) => {
  try {
    //getId from the request params
    const { sectionId } = req.params;
    //validation
    await Section.findByIdAndDelete(sectionId);
    //*** deleting the entry from the course schema

    return res.status(200).json({
      success: true,
      message: "Section deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
