import express, { json, urlencoded } from "express";
import colors from "colors";
import { config } from "dotenv";
import cors from "cors";
import dbConnect from "./config/db.js";
import userModel from "./models/userModel.js";
import authRoute from "./routes/authRoute.js";
import categoryRoute from "./routes/categoryRoute.js";

//Create an instance of express
const app = express();

//Enable CORS for all routes
app.use(cors());

//configure dotenv
config();
const port = process.env.PORT || 6000;

// Middleware to parse JSON payloads
app.use(json());

//Routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/category", categoryRoute);

//Example REST Api
app.get("/:email", async (req, res) => {
  const { email } = req.params;
  const user = await userModel.findOne({ email });
  res.send(user);
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
