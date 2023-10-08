//Middleware for checking authentication via local strategy
export const isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
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
