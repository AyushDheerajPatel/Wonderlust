if(process.env.NODE_ENV !== "production"){
  require('dotenv').config();
}

const express= require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const ExpressError= require('./utils/ExpressError.js');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const passport=require("passport"); 
const LocalStrategy=require("passport-local");
const User = require('./models/user.js');


const listingRouter = require("./routes/listing.js");
const reviewsRouter = require("./routes/reviews.js");
const userRouter=require("./routes/user.js");

const dbUrl=process.env.ATLAS_URI;

main().then(()=>{
  console.log("connected to db");
}).catch((err)=>{
  console.log(err);
}); 

async function main(){
  await mongoose.connect(dbUrl);
}

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));
app.engine('ejs', ejsMate);

const store = MongoStore.create({
  mongoUrl: dbUrl,
  touchAfter: 24 * 60 * 60, // time period in seconds
  crypto: {
    secret: process.env.SECRET
  }
});
// Error handling for session store
store.on("error", function(e){
  console.log("SESSION STORE ERROR", e)
});

const sessionOption = {
  store: store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie:{
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true
  }
}
// simple route
// app.get("/",(req,res)=>{
//   res.send("helo too travelrest");
// });


app.use(session(sessionOption));
app.use(flash());


// always after session and flash middleware
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate())); // Use the LocalStrategy with passport
passport.serializeUser(User.serializeUser()); //user se related info store karate hai in session
passport.deserializeUser(User.deserializeUser()); //session se user ki info nikaalna


app.use((req, res, next) => {
  res.locals.success = req.flash("success"); 
  res.locals.error = req.flash("error");
  res.locals.currentUser = req.user; // current user ko local variable mein store karna
  next();
});

// Create a demo user
// app.get("/demouser",async(req,res)=>{
//   const fakeUser = new User({
//     email: "test1@example.com",
//     username: "testuser0111"
//   });
//   let registeredUser=await User.register(fakeUser,"helloworld")
//   res.send(registeredUser);
// });


app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewsRouter);
app.use("/", userRouter);


// app.get("/testListing", async (req, res) => {
//    let sampleListing = new listing({
//        title: "My new Villa",
//        description: "By the beach",
//       //  image: "https://unsplash.com/s/photos/random-photo",
//        price: 1200,
//        location: "Mumbai, Maharashtra",
//        country: "India"
//    });
//    await sampleListing.save();
//    res.send("Sample listing created");
//    console.log("Sample listing created:", sampleListing);
// });

app.listen(8080, () => {
  console.log('Server is running on port 8080');
});
// Error handling middleware
// This middleware will catch any errors that occur in the app
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
