const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapasync.js");
const { reviewSchema } = require("../schema.js");
const { isLoggedIn, isReviewAuthor } = require("../middleware.js");
const reviewsController = require("../controllers/reviews.js");
const ExpressError = require("../utils/expressError.js");
// ✅ Validation Middleware
const validateReview = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body);
    if (error) {
        let errorMsg = error.details.map(el => el.message).join(", ");
        throw new ExpressError(400, errorMsg);
    } else {
        next();
    }
};

// ✅ Add and Delete a Review
router.route("/")
    .post(isLoggedIn, validateReview, wrapAsync(reviewsController.createReview));

router.route("/:reviewId")
    .delete(isLoggedIn, isReviewAuthor, wrapAsync(reviewsController.deleteReview));

module.exports = router;