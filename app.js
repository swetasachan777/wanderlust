const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const wrapAsync = require("./utils/wrapasync.js");
const ExpressError = require("./utils/expressError.js");
const ejsmate = require("ejs-mate");
const {listingSchema}=require("./schema.js");

main()
    .then(() => { console.log("Connection successful"); })
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}

app.listen(8080, () => {
    console.log("Server is listening to port 8080");
});

const methodOverride = require("method-override");
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine('ejs', ejsmate);
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/public")));

app.get("/", (req, res) => {
    res.send("Hi, I am root");
});

const validateListing=(req,res,next)=>{
    let{error}=listingSchema.validate(req.body);
   
    if(error){
     throw new ExpressError(400,result.error);
    }
    else{
        next();
    }
}

app.get("/listings", async (req, res) => {
    const allList = await Listing.find({});
    res.render("listings/index.ejs", { allList });
});

// New route for creating a listing
app.get("/listings/new", (req, res) => {
    res.render("listings/new.ejs");
});

// Show route for a specific listing
app.get("/listings/:id", async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs", { listing });
});

// Create route for new listings
app.post("/listings",validateListing ,wrapAsync(async (req, res, next) => {
   
    let listing = new Listing(req.body.listing);
    await listing.save();
    res.redirect("/listings");
}));

// Edit route for listings
app.get("/listings/:id/edit", async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", { listing });
});

app.put("/listings/:id", validateListing,async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    res.redirect("/listings");
});

// Delete route for listings
app.delete("/listings/:id", async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
});

// 404 - Page Not Found error handling
app.all("*", (req, res, next) => {
    next(new ExpressError(404, "Page not found"));
});

// Global error handling middleware
app.use((err, req, res, next) => {
    const { statusCode = 500, message = "Something went wrong!" } = err;
    res.render("error.ejs",{message});
});
