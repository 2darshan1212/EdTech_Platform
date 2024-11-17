import Course from "../models/Course.js";
import RatingAndReview from "../models/RatingAndReview.js";

//create rating
export const createRating = async (req, res) => {
  try {
    //get user id from the request
    const userId = req.user._id;
    //fetch from req body
    const { rating, review, courseId } = req.body;
    //check if user is enrolled in the course or not
    const courseDetails = await Course.findOne({
      _id: courseId,
      studentsEnrolled: { $elemMatch: { $eq: userId } },
    });
    if (!courseDetails) {
      return res.status(400).json({
        success: false,
        message: "Student is not enrolled in this course",
      });
    }

    //check if user has already reviewed the course
    const alreadyReviewed = await RatingAndReview.findOne({
      user: userId,
      course: courseId,
    });

    if (alreadyReviewed) {
      return res.status(400).json({
        success: false,
        message: "User already reviewed this course",
      });
    }
    //creating rating and review
    const newRatingAndReview = await RatingAndReview.create({
      user: userId,
      course: courseId,
      rating,
      review,
    });
    //update the course with the new rating and review
    const updatedCourseDetails = await Course.findByIdAndUpdate(
      courseId,
      {
        $push: {
          ratingAndReviews: newRatingAndReview._id,
        },
      },
      { new: true }
    );
    console.log(updatedCourseDetails);
    //return response
    return res.status(200).json({
      success: true,
      message: "Rating and review created successfully",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//get Average rating

export const getAverageRating = async (req, res) => {
  try {
    //get course Id
    const courseId = req.body.courseId;
    //calculate average rating
    const result = await RatingAndReview.aggregate([
      {
        $match: {
          course: new mongoose.Types.ObjectId(courseId),
        },
      },
      {
        $group: {
          _id: "$course",
          averageRating: { $avg: "$rating" },
        },
      },
    ]);
    //return rating
    if (result.length > 0) {
      return res.status(200).json({
        success: true,
        averageRating: result[0].averageRating,
      });
    }

    //if not rating/review found
    return res.status(400).json({
      success: false,
      message: "No rating/review found for this course",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//get all ratings and reviews
export const getAllRatingAndReviews = async (req, res) => {
  try {
    //get course Id
    const courseId = req.body.courseId;
    //fetch all rating and reviews
    const ratingAndReviews = await RatingAndReview.find({})
      .sort({ rating: -1 })
      .populate({
        path: "user",
        select: "firstName lastName email image",
      })
      .populate({
        path: "course",
        select: "courseName",
      })
      .exec();
    //return response
    return res.status(200).json({
      success: true,
      message: "All ratings and reviews fetched successfully",
      ratingAndReviews,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
