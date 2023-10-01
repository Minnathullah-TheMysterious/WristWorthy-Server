import JWT from "jsonwebtoken";

//////////////Not In Use, instead using isAuthenticated() function from jwt strategy//////////////
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
    const { role } = req.user;
    if (role !== "admin") {
      console.error("Unauthorized Access, Ony Admin Can Access".bgRed.white);
      return res
        .status(401)
        .json({
          success: false,
          message: "Unauthorized Access, Only Admin Can Access",
        });
    } else {
      res.status(200)
      next();
    }
  } catch (error) {
    res.status(500).json({
      succuss: false,
      message: "Something Went Wrong in isAdmin Middleware".bgRed.white,
      error: error.message,
    });
  }
};

//Middleware for checking authentication via local strategy
export const isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
};
