const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing");
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js");


//Index route
router.get("/", wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", {allListings});
}));

//New Listing
router.get('/new', isLoggedIn, (req,res) => {
    res.render("listings/new.ejs");
})
//Show Listing
router.get("/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate({path:"reviews", populate:{path: "author"}}).populate("owner");
    if(!listing){
        req.flash("error", "The requested Listing does not exist!");
        return res.redirect("/listings");    
    }
    res.render("listings/show.ejs", { listing });
}));

//Add New Listing
router.post('/', isLoggedIn, validateListing, wrapAsync(async(req, res, next) => {
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    await newListing.save();
    req.flash("success", "New Listing Created!");
    res.redirect("/listings")
   
}));

//Edit Listing
router.get('/:id/edit', isLoggedIn, isOwner, wrapAsync(async (req, res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
        req.flash("error", "The requested Listing does not exist!");
        return res.redirect("/listings");    
    }
    res.render("listings/edit.ejs", {listing});
}));

//Update Listing
router.put(
    "/:id",
    isLoggedIn, isOwner,
    validateListing,
    wrapAsync(async (req, res) => {
        let { id } = req.params;
        req.body.listing.image = {
            filename: "listingimage",
            url: req.body.listing.image,
        };
        await Listing.findByIdAndUpdate(id, req.body.listing);
        req.flash("success", "Listing Updated Successfully!");
        res.redirect(`/listings/${id}`);
    })
);

//Delete Listing
router.delete('/:id', isLoggedIn, isOwner, wrapAsync(async (req, res) =>{
    let {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted Successfully!");
    res.redirect(`/listings`);
}));

module.exports= router;
