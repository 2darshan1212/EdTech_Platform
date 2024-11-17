import User from "../models/User.js";
import Profile from "../models/Profile.js";

export const updateProfile = async (req, res) => {
  try {
    //getting data
    const { dateOfBirth = "", about = "", contactNumber, gender } = req.body;
    //get userId
    const userId = req.user._id;
    //validation
    if (!contactNumber || !gender || !userId) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    //find profile
    const userDetails = await User.findById(id);
    const profileId = userDetails.additionalDetails;

    //update Profile
    const updateProfile = await Profile.findByIdAndUpdate(
      profileId,
      {
        dateOfBirth,
        gender,
        about,
        contactNumber,
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      updateProfile,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//delete Account
export const deleteAccount = async (req, res) => {
  try {
    //get id
    const id = req.user._id;
    //validation
    const userDetails = await User.findById(id);
    if (!userDetails) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }
    //delete profile
    await Profile.findByIdAndDelete({ _id: userDetails.additionalDetails });
    //todo: hw unenroll user from all enrolled coureses
    //delete user
    await User.findByIdAndDelete({ _id: id });
    return res.status(200).json({
      success: true,
      message: "Account deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//get Profile
export const getUserProfile=async(req,res)=>{
  try {
    //get id
    const id=req.user._id;
    //validation and get user profile details
    const userDetails = await User.findById(id).populate("additionalDetails").exec();
    if (!userDetails) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Profile fetched successfully",
      userDetails,
    });
    
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}
