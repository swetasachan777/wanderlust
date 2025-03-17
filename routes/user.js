const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapasync.js");
const User = require("../models/user.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

// Signup route (GET)
router.get("/signup", (req, res) => {
    res.render("users/signup.ejs");
});

// Signup route (POST)
router.post(
    "/signup",
    wrapAsync(async (req, res, next) => {
        try {
            let { username, email, password } = req.body;
            const newUser = new User({ email, username });
            const registeredUser = await User.register(newUser, password);
            console.log(registeredUser);

            req.login(registeredUser, (err) => {
                if (err) return next(err); // Ensure proper error handling
                req.flash("success", "Welcome to Wanderlust");
                res.redirect("/listings");
            });
        } catch (error) {
            req.flash("error", error.message);
            res.redirect("/signup");
        }
    })
);

// Login route (GET)
router.get("/login", (req, res) => {
    res.render("users/login.ejs");
});

// Login route (POST)
router.post(
    "/login",
    saveRedirectUrl, // Make sure this runs before authentication
    passport.authenticate("local", {
        failureRedirect: "/login",
        failureFlash: true,
    }),
    (req, res) => {
        req.flash("success", "Welcome back to Wanderlust!");
        const redirectUrl = res.locals.redirectUrl || "/listings"; // Always fallback to "/listings"
        res.redirect(redirectUrl);
    }
);


// Logout route (GET)
router.get("/logout", (req, res, next) => {
    req.logout(function(err) {
        if (err) {
            return next(err); // Pass error to Express error handler
        }
        req.flash("success", "You have been logged out successfully");
        res.redirect("/listings");
    });
});


module.exports = router;
