const review = require('../models/reviews.js');
const Listing = require('../models/listing.js');

module.exports.createReview =async(req,res)=>{
  let listing=await Listing.findById(req.params.id);
  if (!listing) {
    req.flash("error", "Cannot find that listing!");
    return res.redirect("/listings");
  }
  let newReview= new review(req.body.review);
  newReview.author = req.user._id;
  console.log(newReview);
  listing.reviews.push(newReview);
  await newReview.save();
  // console.log(newReview);
  await listing.save();
  req.flash("success", "Successfully created a new review!");
  res.redirect(`/listings/${listing._id}`);
  // console.log("new review saved");
};

module.exports.destroyReview = async (req,res) =>{
  let {id,reviewId}= req.params;
  let listing = await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
  if (!listing) {
    req.flash("error", "Cannot find that listing!");
    return res.redirect("/listings");
  }
  let reviewToDelete = await review.findByIdAndDelete(reviewId);
  if (!reviewToDelete) {
    req.flash("error", "Cannot find that review!");
    return res.redirect(`/listings/${id}`);
  }
  req.flash("success", "Successfully deleted the review!");
  res.redirect(`/listings/${id}`);

};