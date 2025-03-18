const Listing = require("../models/listing");
const Review = require("../models/review");
const ExpressError = require("../utils/expressError.js");

// ✅ Add a Review
module.exports.createReview = async (req, res) => {
    let listing = await Listing.findById(req.params.id);
    if (!listing) {
        throw new ExpressError(404, "Listing not found!");
    }
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    req.flash("success", "New review added successfully!");
    res.redirect(`/listings/${listing._id}`);
};

// ✅ Delete a Review
module.exports.deleteReview = async (req, res) => {
    let { id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Review deleted successfully!");
    res.redirect(`/listings/${id}`);
};
