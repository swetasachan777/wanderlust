const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapasync.js");
const { listingSchema } = require("../schema.js");
const { isLoggedIn, isOwner } = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer  = require('multer');
const {storage}=require("../cloudConfig.js");
const upload = multer({storage});

// ✅ Validation Middleware
const validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);
    if (error) {
        let errorMsg = error.details.map(el => el.message).join(", ");
        throw new ExpressError(400, errorMsg);
    } else {
        next();
    }
};

// ✅ All Listings
router.route("/")
    .get(wrapAsync(listingController.index))
    .post(isLoggedIn,
         upload.single('image'),
          wrapAsync(listingController.createListing));
    
    
// ✅ Form to Create New Listing
router.get("/new", isLoggedIn, listingController.renderNewForm);

// ✅ Show, Update, and Delete a Single Listing
router.route("/:id")
    .get(wrapAsync(listingController.showListing))
    .put(isLoggedIn, isOwner, upload.single('image'), validateListing, wrapAsync(listingController.updateListing))
    .delete(isLoggedIn, isOwner, wrapAsync(listingController.deleteListing));

// ✅ Edit Listing Form
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));

module.exports = router;
