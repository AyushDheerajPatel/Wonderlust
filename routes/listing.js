const express= require("express");
const router = express.Router();
const Listing = require('../models/listing.js');
const wrapAsync= require('../utils/wrapAsync.js');
const { isLoggedIn,isOwner,validateListing } = require("../middleware.js");
const listingControllers = require("../controllers/listing.js");
const { updateListing } = require("../controllers/listing.js");
const multer=require('multer');
const { cloudinary, storage } = require('../cloudconfig.js');
const upload=multer({ storage: storage });

router
  .route("/")
  // index route
  .get(wrapAsync(listingControllers.index))
  // create route (multipart form -> multer -> validate -> controller)
  .post(
    isLoggedIn,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingControllers.createListing)
  );
  // new route
  router.get("/new", isLoggedIn, listingControllers.renderNewForm);

router.route("/:id")
// show route for a single listing
  .get(wrapAsync(listingControllers.showListing))
  // update route
  .put(isLoggedIn,isOwner,upload.single("listing[image]"),
  validateListing, wrapAsync(listingControllers.updateListing))
  // delete route
  .delete(isLoggedIn,isOwner, wrapAsync(listingControllers.destroyListing));

//edit route
router.get("/:id/edit",isLoggedIn,isOwner , wrapAsync(listingControllers.renderEditForm));




module.exports = router;