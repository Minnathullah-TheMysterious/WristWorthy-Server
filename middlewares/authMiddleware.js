import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

export const isLoggedIn = (req, res, next) => {
  const token = req.headers.authorization;
  try {
    if (!token || !process.env.JWT_SECRET_KEY) {
      res.status(401).json({ succuss: false, message: "Not A Logged In User" });
      return console.log(`Token or Secret Key not found`.bgRed.white);
    } else {
      try {
        // Verify and decode the token
        const decodedToken = JWT.verify(token, process.env.JWT_SECRET_KEY);
        req.userId = decodedToken._id;
        next();
      } catch (error) {
        if (error.name === "TokenExpiredError") {
          console.error("Token has expired".bgRed.white, error.message);
          return res
            .status(401)
            .json({ success: false, message: "Token has expired" });
        } else {
          console.error("Error in verifying token".bgRed.white, error);
          return res
            .status(401)
            .json({ success: false, message: "Error in verifying token" });
        }
      }
    }
  } catch (error) {
    res.status(500).json({
      succuss: false,
      message: "Something Went Wrong in isLoggedIn Middleware".bgRed.white,
      error,
    });
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.userId);
    if (user.role !== "admin") {
      return console.error("Unauthorized Access, Not An Admin".bgRed.white);
    } else {
      next();
    }
  } catch (error) {
    res.status(500).json({
      succuss: false,
      message: "Something Went Wrong in isAdmin Middleware".bgRed.white,
      error,
    });
  }
};
