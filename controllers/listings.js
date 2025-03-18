const Listing = require("../models/listing");
const ExpressError = require("../utils/expressError.js");

// ✅ Get All Listings
module.exports.index = async (req, res) => {
    const allList = await Listing.find({});
    res.render("listings/index.ejs", { allList });
};

// ✅ Show Form to Create New Listing
module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs");
};

// ✅ Create a New Listing
module.exports.createListing = async (req, res) => {
    let url=req.file.path;
    let filename=req.file.filename;
    let listing = new Listing(req.body.listing);
    listing.owner = req.user._id;
    listing.image={url,filename};
    await listing.save();
    req.flash("success", "New listing added successfully!");
    res.redirect("/listings");
};

// ✅ Show a Single Listing
module.exports.showListing = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id)
        .populate({ path: "reviews", populate: { path: "author" } })
        .populate("owner");
    
    if (!listing) {
        req.flash("error", "Listing not found");
        return res.redirect("/listings");
    }
    res.render("listings/show.ejs", { listing });
};

// ✅ Show Form to Edit Listing
module.exports.renderEditForm = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing not found");
        return res.redirect("/listings");
    }
    let original=listing.image.url;
    original = original.replace("/upload", "/upload/w_250,h_250,c_fit");

    res.render("listings/edit.ejs", { listing,original });
};

// ✅ Update a Listing
module.exports.updateListing = async (req, res) => {

    let { id } = req.params;
    let listing=await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    if(typeof req.file !=="undefined"){
    let url=req.file.path;
    let filename=req.file.filename;
    listing.image={url,filename};
    await listing.save();
    }
    req.flash("success", "Listing updated successfully!");
    res.redirect(`/listings/${id}`);
};

// ✅ Delete a Listing
module.exports.deleteListing = async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing deleted successfully!");
    res.redirect("/listings");
};
