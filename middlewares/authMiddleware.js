import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

export const isLoggedIn = (req, res, next) => {
  const token = req.headers.authorization;
  try {
    if (!token || !process.env.JWT_SECRET_KEY) {
      res.status(401).json({ succuss: false, message: "Not A Logged In User" });
      return console.log(`Token or Secret Key not found`.bgRed.white);
    } else {
      // Verify and decode the token
      const { _id } = JWT.verify(token, process.env.JWT_SECRET_KEY);
      req.userId = _id;
      next();
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
