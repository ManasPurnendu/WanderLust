const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing");
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js");

const listingController = require("../controllers/listings.js");
const { renderNewForm } = require("../controllers/listings.js");


//Index route
router.get("/", wrapAsync(listingController.index));

//New Listing
router.get('/new', isLoggedIn, listingController.renderNewForm);

//Show Listing
router.get("/:id", wrapAsync(listingController.showListing));

//Add New Listing
router.post('/', isLoggedIn, validateListing, wrapAsync(listingController.createListing));

//Edit Listing
router.get('/:id/edit', isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));

//Update Listing
router.put("/:id",isLoggedIn, isOwner, validateListing, wrapAsync(listingController.updateListing));

//Delete Listing
router.delete('/:id', isLoggedIn, isOwner, wrapAsync(listingController.deleteListing));



module.exports= router;
