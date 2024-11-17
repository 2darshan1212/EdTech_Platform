import User from "../models/User.js";
import Course from "../models/Course.js";
import { uploadImage } from "../utils/imageUploader.js";
import Category from "../models/Category.js";

export const createCourse = async (req, res) => {
  try {
    //fetching data from the request body
    const { courseName, courseDescription, whatYouWillLearn, price, category } =
      req.body;
    //getting thumbnail from the request file
    const thumbnail = req.files.thumbnailImage;
    //validation
    if (
      !courseName ||
      !courseDescription ||
      !whatYouWillLearn ||
      !price ||
      !category ||
      !thumbnail
    ) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    //getting data for instructor from verification after auth middleware
    const instructorDetail = req.user._id;
    console.log(instructorDetail);

    if (instructorDetail) {
      return res
        .status(400)
        .json({ success: false, message: "Instructor not found" });
    }
    //getting category details
    const categoryDetails = await Category.findById(category);
    if (!categoryDetails) {
      return res
        .status(400)
        .json({ success: false, message: "category not found" });
    }
    //uploading the thumbnail image to cloudinary
    const thumbnailImage = await uploadImage(
      thumbnail,
      process.env.FOLDER_NAME
    );
    //creating entry for the course in the database
    const newCourse = await Course.create({
      courseName,
      courseDescription,
      whatYouWillLearn,
      price,
      category,
      instructor: instructorDetail._id,
      thumbnailImage: thumbnailImage.secure_url,
    });
    // add new course to the user schema of the instructor
    await User.findOneAndUpdate(
      {
        id: instructorDetail._id,
      },
      {
        $push: {
          courses: newCourse._id,
        },
      },
      { new: true }
    );

    await Category.findOneAndUpdate(
      {
        id: categoryDetails._id,
      },
      {
        $push: {
          courses: newCourse._id,
        },
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Course created successfully",
      data: newCourse,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

//getting all courses

export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find(
      {},
      {
        courseName: 1,
        price: 1,
        thumbnail: 1,
        instructor: 1,
        ratingAndReviews: 1,
        studentsEnrolled: 1,
      }
    )
      .populate("instructor")
      .exec();
    return res.status(200).json({
      success: true,
      message: "All courses fetched successfully",
      courses,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

//get course details
export const getCourseDetails = async (req, res) => {
  try {
    const { courseId } = req.body;
    if (!courseId) {
      return res
        .status(400)
        .json({ success: false, message: "Course Id is required" });
    }
    const courseDetails = await Course.find({ _id: courseId })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();
    //validation
    if (!courseDetails) {
      return res
        .status(400)
        .json({ success: false, message: "Course not found" });
    }
    //return response
    return res.status(200).json({
      success: true,
      message: "Course details fetched successfully",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
