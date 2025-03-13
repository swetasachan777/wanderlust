const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapasync.js");
const { listingSchema } = require("../schema.js");
const ExpressError = require("../utils/expressError.js");

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
router.get("/", wrapAsync(async (req, res) => {
    const allList = await Listing.find({});
    res.render("listings/index.ejs", { allList });
}));

// ✅ Form to Create New Listing
router.get("/new", (req, res) => {
    res.render("listings/new.ejs");
});

// ✅ Show a Single Listing
router.get("/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate("reviews");
    if (!listing) {
    
        req.flash("error", "Listing not found");
        return res.redirect("/listings");
       
    }
    res.render("listings/show.ejs", { listing });
}));

// ✅ Create a New Listing
router.post("/", validateListing, wrapAsync(async (req, res) => {
    let listing = new Listing(req.body.listing);
    await listing.save();
    req.flash("success", "New listing added successfully!");
    res.redirect("/listings"); // ✅ Redirecting to home page (all listings)
}));

// ✅ Edit Listing Form
router.get("/:id/edit", wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing not found");
        return res.redirect("/listings");
    }
    res.render("listings/edit.ejs", { listing });
}));

// ✅ Update a Listing
router.put("/:id", validateListing, wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    req.flash("success", " Listing updated successfully!");
    res.redirect(`/listings/${id}`);
}));

// ✅ Delete a Listing
router.delete("/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing deleted successfully!");
    res.redirect("/listings");
}));

module.exports = router;
