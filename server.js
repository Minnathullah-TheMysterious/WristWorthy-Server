import express, { json, urlencoded, static as static_ } from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import colors from "colors";
import { config as configDotenv } from "dotenv";
import cors from "cors";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JwtStrategy } from "passport-jwt";
import session from "express-session";
import cookieParser from "cookie-parser";
import Stripe from "stripe";
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

//create an instance of stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_API_KEY_);

/*********************************Stripe Webhook*********************** */
//TODO: We will capture actual order deploying on server live on public url
// This is Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET_KEY;

app.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  (request, response) => {
    const sig = request.headers["stripe-signature"];

    let event;

    try {
      event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    } catch (err) {
      response.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    // Handle the event
    switch (event.type) {
      case "payment_intent.amount_capturable_updated":
        const paymentIntentAmountCapturableUpdated = event.data.object;
        // Then define and call a function to handle the event payment_intent.amount_capturable_updated
        break;
      case "payment_intent.canceled":
        const paymentIntentCanceled = event.data.object;
        // Then define and call a function to handle the event payment_intent.canceled
        break;
      case "payment_intent.created":
        const paymentIntentCreated = event.data.object;
        // Then define and call a function to handle the event payment_intent.created
        break;
      case "payment_intent.partially_funded":
        const paymentIntentPartiallyFunded = event.data.object;
        // Then define and call a function to handle the event payment_intent.partially_funded
        break;
      case "payment_intent.payment_failed":
        const paymentIntentPaymentFailed = event.data.object;
        // Then define and call a function to handle the event payment_intent.payment_failed
        break;
      case "payment_intent.processing":
        const paymentIntentProcessing = event.data.object;
        // Then define and call a function to handle the event payment_intent.processing
        break;
      case "payment_intent.requires_action":
        const paymentIntentRequiresAction = event.data.object;
        // Then define and call a function to handle the event payment_intent.requires_action
        break;
      case "payment_intent.succeeded":
        const paymentIntentSucceeded = event.data.object;
        // Then define and call a function to handle the event payment_intent.succeeded
        break;
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    // Return a 200 response to acknowledge receipt of the event
    response.send();
  }
);

//JWT options
const opts = {};
opts.jwtFromRequest = cookieExtractor;
opts.secretOrKey = process.env.JWT_SECRET_KEY;

const port = process.env.PORT || 6000;

const __filename = fileURLToPath(import.meta.url);
console.log(__filename);

const __dirname = dirname(__filename);
console.log(__dirname);

const rootDir = join(__dirname);
console.log(rootDir);

const buildDir = join(__dirname, "build");
console.log(buildDir);

// Middlewares
app.use(static_(rootDir));
app.use(static_(buildDir));
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET_KEY,
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

/***************************Payments************************/
const calculateOrderAmount = (amount) => {
  return amount * 100;
};

app.post("/create-payment-intent", async (req, res) => {
  const { totalAmount, order_id } = req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(totalAmount),
    currency: "inr",
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true,
    },
    metadata: { order_id },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

// Handle all other routes by serving the main HTML file
app.get("*", (req, res) => {
  res.sendFile(join(__dirname, "build", "index.html"));
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
