if(process.env.NODE_ENV !="production"){
    require('dotenv').config();
}


const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");
const ExpressError = require("./utils/expressError.js");
const session=require("express-session");

const flash=require("connect-flash");
const listingRoutes = require("./routes/listing.js");
const reviewRoutes = require("./routes/review.js");
const passport=require("passport");
const LocalStrategy=require("passport-local");
const User=require("./models/user.js");

const userRoutes = require("./routes/user.js");
mongoose.connect("mongodb://127.0.0.1:27017/wanderlust")
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsMate);
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/public")));
app.use(methodOverride("_method"));




const sessionOptions={
    secret:"mysecret",
    resave:false,
    saveUninitialized: true,
    cookie:{
       expires:Date.now()+1000*60*60*24*7,
       maxAge: 1000*60*60*24*7,//persist till 7 days 
       httpOnly:true 
    },

};


app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

passport.use(new LocalStrategy(User.authenticate()));
app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    res.locals.currUser=req.user;
    next();
});
// Use the routes
app.use("/listings", listingRoutes);
app.use("/listings/:id/reviews", reviewRoutes);
app.use("/", userRoutes);



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
