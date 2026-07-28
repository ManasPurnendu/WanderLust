const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");const passport = require("passport");
const { redirectUrl } = require("../middleware.js");
const { signUp } = require("../controllers/users.js");
  

const userController = require("../controllers/users.js")

//Render SignUp Form
router.get("/signup", userController.renderSignupForm);

//Sign Up 
router.post("/signup", wrapAsync(userController.signUp));

//Render Login Form
router.get("/login", userController.renderLoginForm);

//Login
router.post("/login",redirectUrl, passport.authenticate("local", { failureRedirect: "/login", failureFlash: true}), userController.login);

//Logout
router.get("/logout", userController.logout);

module.exports=router;