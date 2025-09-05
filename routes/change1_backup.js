// Backup of the edit (PUT) route logic for handling empty image URLs (change1)
// Place this in routes/listing.js if you want to restore this logic

router.put("/:id", isLoggedIn, isOwner, validateListing, wrapAsync(async (req, res, next) => {
  const { id } = req.params;
  // If image URL is empty, set to undefined so Mongoose uses default
  if (req.body.listing.image && (!req.body.listing.image.url || req.body.listing.image.url.trim() === "")) {
    req.body.listing.image.url = undefined;
  }
  await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  req.flash("success", "Successfully updated the listing!");
  res.redirect(`/listings/${id}`);
}));
