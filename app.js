if (process.env.NODE_ENV !== "production") {
  require('dotenv').config();
}

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const ExpressError = require('./utils/ExpressError.js');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require('./models/user.js');

const listingRouter = require("./routes/listing.js");
const reviewsRouter = require("./routes/reviews.js");
const userRouter = require("./routes/user.js");

// --- MongoDB Connection ---
const dbUrl = process.env.MONGO_URI; // FIXED: use consistent variable
console.log('Mongo URI:', dbUrl);

main().then(() => {
  console.log("Connected to MongoDB");
}).catch((err) => {
  console.error("Database connection error:", err);
});

async function main() {
  await mongoose.connect(dbUrl);
}

// --- Middleware ---
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));
app.engine('ejs', ejsMate);

// --- Session Store ---
const store = MongoStore.create({
  mongoUrl: dbUrl,
  touchAfter: 24 * 60 * 60, // 24 hours
  crypto: {
    secret: process.env.SECRET
  }
});

store.on("error", function (e) {
  console.log("SESSION STORE ERROR", e);
});

const sessionOptions = {
  store: store,
  secret: process.env.SECRET || "fallbackSecret", // fallback if not set
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7, // 7 days
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true
  }
};

app.use(session(sessionOptions));
app.use(flash());

// --- Passport Setup ---
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// --- Flash & User Middleware ---
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currentUser = req.user;
  next();
});

// --- Routes ---
app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewsRouter);
app.use("/", userRouter);

// --- Test Route ---
// app.get("/demouser", async (req, res) => {
//   const fakeUser = new User({
//     email: "test1@example.com",
//     username: "testuser0111"
//   });
//   let registeredUser = await User.register(fakeUser, "helloworld");
//   res.send(registeredUser);
// });

// --- Error Handling ---
app.get("/error-test", (req, res, next) => {
  next(new ExpressError(404, "This is a test error"));
});

app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page Not Found"));
});

app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = "Something went wrong!";
  res.status(statusCode).render("error", { err });
});

// --- Start Server ---
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
