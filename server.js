import express, { json, urlencoded } from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import colors from "colors";
import { config } from "dotenv";
import cors from "cors";
import dbConnect from "./config/db.js";
import userModel from "./models/userModel.js";
import authRoute from "./routes/authRoute.js";
import categoryRoute from "./routes/categoryRoute.js";
import productRoute from "./routes/productRoute.js";
import brandRoute from "./routes/brandRoute.js";
import wishlistRoute from "./routes/wishlistRoute.js";

const app = express();

//configure dotenv
config();
const port = process.env.PORT || 6000;

const __filename = fileURLToPath(import.meta.url);
console.log(__filename)
const __dirname = dirname(__filename);
console.log(__dirname)

const staticDir = join(__dirname);

// Middlewares
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(express.static(staticDir));

//Routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/product", productRoute);
app.use("/api/v1/brand", brandRoute);
app.use("/api/v1/wishlist", wishlistRoute);

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
