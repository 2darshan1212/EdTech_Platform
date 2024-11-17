import Category from "../models/Category.js";

export const createCategory = async (req, res) => {
  try {
    //data fetching from the request body
    const { name, discription } = req.body;
    //validation
    if (!name || !discription) {
      return res
        .status(400)
        .json({ success: false, message: "All fields is required" });
    }
    //create a new Category
    const newCategory = await Category.create({
      name,
      discription,
    });
    return res.status(201).json({
      success: true,
      message: "Category created successfully",
      newCategory,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

//fetching all Categories

export const getAllCategories = async (req, res) => {
  try {
    //fetching all tags in which name and discription is required
    const categories = await Category.find({}, { name: 1, discription: 1 });
    return res.status(200).json({
      success: true,
      message: "All Categories fetched successfully",
      categories,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//category page details

export const categoryPageDetails = async (req, res) => {
  try {
    //get category id from the request
    const categoryId = req.body;
    //get category details for the given category id
    const selectedCategory = await Category.findById(categoryId)
      .populate("courses")
      .exec();
    //validation
    if (!selectedCategory) {
      return res.status(400).json({
        success: false,
        message: "No category found for the given category id",
      });
    }
    //get courses for the different categories
    const differentCategories = await Category.find({
      _id: { $ne: categoryId },
    })
      .populate("courses")
      .exec();

    //get top selling courses
    const topSellingCourses = await Course.find({ category: categoryId })
      .sort({ studentsEnrolled: -1 })
      .limit(5)
      .exec();

    //return response
    return res.status(200).json({
      success: true,
      data: {
        selectedCategory,
        differentCategories,
        topSellingCourses,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
