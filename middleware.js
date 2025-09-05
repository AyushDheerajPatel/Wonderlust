const Listing = require("./models/listing");
const Review = require("./models/reviews");
const ExpressError = require("./utils/ExpressError");
const { listingSchema, reviewSchema } = require("./schema");


//middleware to check if the user is logged in
module.exports.isLoggedIn = (req,res,next)=>{
 if(!req.isAuthenticated()){
   req.session.redirectUrl = req.originalUrl;
    req.flash("error","you must be logged in to create listings");
    return res.redirect("/login");
 }
 next();
};
//middleware to save the redirect url
module.exports.saveRedirectUrl = (req,res,next)=>{
   if(req.session.redirectUrl){
     res.locals.redirectUrl = req.session.redirectUrl;
     delete req.session.redirectUrl; // Clear the redirect URL after using it
   }  
   next();
};
//iska kaam hai check karna ki user owner hai ya nahi hai listing ka so he/she can edit or delete the listing
module.exports.isOwner = async(req,res,next)=>{
  let {id} = req.params;
  let listing = await Listing.findById(id);
  if(!listing.owner.equals(res.locals.currentUser._id)){
    req.flash("error", "You are not the owner of this listing!");
    return res.redirect(`/listings/${id}`);
  }
  next();
};
//validation middleware for listings
module.exports.validateListing = (req,res,next)=>{
  const {error} = listingSchema.validate(req.body);
  if(error){
    let errMsg = error.details.map(el=>el.message).join(",");
    throw new ExpressError(errMsg,400);
  }else{
    next();
  }
};

//validation middleware for reviews
module.exports.validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    const errmsg = error.details.map(el => el.message).join(',');
    throw new ExpressError(400, errmsg);
  } else {
    next();
  }
};

// Authorisation middleware to check if the user is the author of the review
module.exports.isReviewAuthor = async(req,res,next)=>{
  let {id,reviewId} = req.params;
  let review = await Review.findById(reviewId);
  if(!review.author.equals(res.locals.currentUser._id)){
    req.flash("error", "You are not the author of this review!");
    return res.redirect(`/listings/${id}`);
  }
  next();
};
