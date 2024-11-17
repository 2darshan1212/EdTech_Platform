import {} from "dotenv/config";
import jwt from "jsonwebtoken";

//auth
export const auth = async (req, res, next) => {
  try {
    //extracting token
    const token =
      req.cookie.token ||
      req.body.token ||
      req.header("Authorization").replace("Bearer ", "");
    //if token is missing
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token is missing",
      });
    }
    //verify the token and extract the payload
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      console.log(payload);
      req.user = payload;
    } catch (error) {
      //verification issue
      return res.status(401).json({
        success: false,
        message: "Token is invalid",
      });
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Authentication failed",
    });
  }
};

// isStudent middleware
export const isStudent = async (req, res, next) => {
  try {
    if (req.user.accountType === "Student") {
      next();
    } else {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to access this route",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Authorization failed",
    });
  }
};

// isInstructor middleware
export const isInstructor = async (req, res, next) => {
  try {
    if (req.user.accountType === "Instructor") {
      next();
    } else {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to access this route",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Authorization failed",
    });
  }
};

//isAdmin middleware
export const isAdmin = async (req, res, next) => {
  try {
    if (req.user.accountType === "Admin") {
      next();
    } else {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to access this route",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Authorization failed",
    });
  }
};
