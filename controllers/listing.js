const Listing = require('../models/listing.js');

module.exports.index =  (async (req, res) => {
  const allListing = await Listing.find({});
  res.render("listings/index", {allListing});
});

// new route
module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
};

// show route
module.exports.showListing =(async (req, res, next) => {
  const { id } = req.params;
  const listing = await Listing.findById(id).populate({ path: "reviews", populate: { path: "author" } }).populate("owner");
  if (!listing) {
    req.flash("error", "Cannot find that listing!");
    return res.redirect("/listings");
  }
  console.log("Found listing:", listing);
  res.render("listings/show", { listing });
});

// create route
module.exports.createListing = async (req, res, next) => {
    const newListing = new Listing(req.body.listing);
    // Multer upload.single("listing[image]") sets req.file for image
    if (req.file) {
      newListing.image = {
        filename: req.file.filename,
        url: req.file.path
      };
    }
    newListing.owner = req.user._id;
    await newListing.save();
    req.flash("success", "Successfully created a new listing!");
    res.redirect(`/listings/${newListing._id}`);
};

module.exports.renderEditForm = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  if(!listing){
    req.flash("error", "Cannot find that listing!");
    return res.redirect("/listings");
  }
  let originalImage = listing.image.url;
  originalImage = originalImage.replace("/upload/", "/upload/w_50/h_30");
  res.render("listings/edit.ejs", { listing, originalImage });
};

module.exports.updateListing = async (req, res, next) => {
  const { id } = req.params;
  // // If image URL is empty, set to undefined so Mongoose uses default
  // if (req.body.listing.image && (!req.body.listing.image.url || req.body.listing.image.url.trim() === "")) {
  //   req.body.listing.image.url = undefined;
  // }

  let listing = await Listing.findByIdAndUpdate(id, {...req.body.listing});

  if(typeof req.file !== "undefined") {
   let url=req.file.path;
   let filename=req.file.filename;
   listing.image = { url, filename };
  await listing.save();
  }
  req.flash("success", "Successfully updated the listing!");
  res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req, res, next) => {
  const { id } = req.params;
  await Listing.findByIdAndDelete(id);
  console.log("listing deleted");
  req.flash("success", "Successfully deleted the listing!");
  res.redirect("/listings");          
};
