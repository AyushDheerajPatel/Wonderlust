const express= require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync= require('../utils/wrapAsync.js');
const review = require('../models/reviews.js');
const Listing = require('../models/listing.js');
const { validateReview, isLoggedIn,isReviewAuthor } = require('../middleware.js');


const reviewControllers = require("../controllers/review.js");


// reviews
// Post route for reviews
router.post("/", isLoggedIn,validateReview, wrapAsync(reviewControllers.createReview));

// post delete route for reviews
router.delete("/:reviewId",isLoggedIn,isReviewAuthor,wrapAsync(reviewControllers.destroyReview));

module.exports = router;