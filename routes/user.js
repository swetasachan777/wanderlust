const express = require("express");
const router = express.Router();
const passport = require("passport");
const wrapAsync = require("../utils/wrapasync.js");
const { saveRedirectUrl } = require("../middleware.js");
const usersController = require("../controllers/users.js");

// ✅ Signup Routes
router.route("/signup")
    .get(usersController.renderSignupForm)
    .post(wrapAsync(usersController.signup));

// ✅ Login Routes
router.route("/login")
    .get(usersController.renderLoginForm)
    .post(
        saveRedirectUrl,
        passport.authenticate("local", {
            failureRedirect: "/login",
            failureFlash: true,
        }),
        usersController.login
    );

// ✅ Logout Route
router.get("/logout", usersController.logout);

module.exports = router;
