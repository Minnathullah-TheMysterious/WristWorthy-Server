import express, { json, urlencoded, static as static_ } from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import colors from "colors";
import { config as configDotenv } from "dotenv";
import cors from "cors";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import session from "express-session";
import cookieParser from "cookie-parser";
import dbConnect from "./config/db.js";
import userModel from "./models/userModel.js";
import authRoute from "./routes/authRoute.js";
import userRoute from "./routes/userRoute.js";
import categoryRoute from "./routes/categoryRoute.js";
import productRoute from "./routes/productRoute.js";
import brandRoute from "./routes/brandRoute.js";
import wishlistRoute from "./routes/wishlistRoute.js";
import cartRoute from "./routes/cartRoute.js";
import orderRoute from "./routes/orderRoute.js";
import {
  comparePassword,
  cookieExtractor,
  isAuthenticated,
  sanitizeUser,
} from "./helpers/authHelper.js";

//create an instance of express
const app = express();

//configure dotenv
configDotenv();

//JWT options
const opts = {};
opts.jwtFromRequest = cookieExtractor;
opts.secretOrKey = process.env.JWT_SECRET_KEY;

const port = process.env.PORT || 6000;

const __filename = fileURLToPath(import.meta.url);
console.log(__filename);
const __dirname = dirname(__filename);
console.log(__dirname);

const staticDir = join(__dirname);

// Middlewares
app.use(static_("build"));
app.use(cookieParser())
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(express.static(staticDir));

//Routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/user", isAuthenticated(), userRoute);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/product", productRoute);
app.use("/api/v1/brand", brandRoute);
app.use("/api/v1/wishlist", isAuthenticated(), wishlistRoute);
app.use("/api/v1/cart", isAuthenticated(), cartRoute);
app.use("/api/v1/order", isAuthenticated(), orderRoute);

//local strategy
passport.use(
  "local",
  new LocalStrategy(async (username, password, done) => {
    console.log(`username: ${username} \n password:${password}`);
    try {
      const user = await userModel.findOne({
        $or: [{ email: username }, { phone: username }],
      });
      if (!user) {
        return done(null, false, { message: "Invalid User Or Password" });
      } else {
        const matchedPassword = await comparePassword(password, user.password);
        if (!matchedPassword) {
          return done(null, false, { message: "Invalid User Or Password" });
        } else {
          return done(null, user); //calls the serializer and sends user to it
        }
      }
    } catch (error) {
      return done(error.message);
    }
  })
);

//jwt strategy
passport.use(
  "jwt",
  new JwtStrategy(opts, async function (jwt_payload, done) {
    console.log("jwt_payload:", jwt_payload);
    console.log("jwt_payload._id", jwt_payload._id);
    try {
      const user = await userModel.findOne({ _id: jwt_payload._id });
      console.log("user", user);
      if (user) {
        return done(null, sanitizeUser(user)); //calls serializer
      } else {
        console.log("Im here");
        return done(null, false);
        // or you could create a new account
      }
    } catch (error) {
      return done(err, false);
    }
  })
);

//serializer
passport.serializeUser((user, done) => {
  console.log("from serializer:", user);
  if (user) {
    console.log(user);
    return done(null, user._id);
  }
  return done(null, false);
});

//deserializer
passport.deserializeUser(async (id, done) => {
  if (id) {
    try {
      const user = await userModel.findById(id);
      if (!user) {
        return done(null, false);
      }
      return done(null, user);
    } catch (error) {
      done(error.message);
    }
  }
});

//Example REST Api
app.get("/", async (req, res) => {
  res.send("Welcome to WristWorthy");
});

//Handling invalid pages
app.use("*", (req, res) => {
  res.status(404).json({ error: "Page Not Found" });
});

//Connecting to Database
dbConnect().then(() => {
  try {
    app.listen(port, () => {
      console.log(`App Listening On Port ${port}`.bgMagenta.white);
    });
  } catch (error) {
    console.log(`Something Went Wrong in Listening the app`.bgRed.white, error);
  }
});
