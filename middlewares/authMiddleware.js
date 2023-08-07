import JWT from "jsonwebtoken";

export const isLoggedIn = (req, res, next) => {
  const token = req.headers.authorization;
  try {
    if (!token || !process.env.JWT_SECRET_KEY) {
      return console.log(`Token or Secret Key not found`.bgRed.white);
    } else {
      // Verify and decode the token
      const decodedToken = JWT.verify(token, process.env.JWT_SECRET_KEY);
      const { _id } = decodedToken;
      next();
    }
  } catch (error) {
    res.status(401).json({ succuss: false, message: "Unauthorized Access" });
  }
};
