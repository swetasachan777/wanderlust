const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");
const ExpressError = require("./utils/expressError.js");

const listingRoutes = require("./routes/listing.js");
const reviewRoutes = require("./routes/review.js");

mongoose.connect("mongodb://127.0.0.1:27017/wanderlust")
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsMate);
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/public")));
app.use(methodOverride("_method"));

// Use the routes
app.use("/listings", listingRoutes);
app.use("/listings/:id/reviews", reviewRoutes);

app.get("/", (req, res) => {
    res.send("Hi, I am root");
});

// 404 error handling
app.all("*", (req, res, next) => {
    next(new ExpressError(404, "Page not found"));
});

// Global error handling middleware
app.use((err, req, res, next) => {
    const { statusCode = 500, message = "Something went wrong!" } = err;
    res.status(statusCode).render("error.ejs", { message });
});

app.listen(8080, () => {
    console.log("Server is listening to port 8080");
});
