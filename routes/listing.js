const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require ("../utils/ExpressErrors.js");
const {listingSchema} = require("../schema.js");
const Listing = require("../models/listing");


const validateListing=(req, res, next) =>{
    let {err} = listingSchema.validate(req.body);
    if(err){
        let errMsg = err.details.map((el) => el.message.join(","));
        throw new ExpressError(400, errMsg);
    }else{
        next();
    }
}

//Index route
router.get("/", wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", {allListings});
}));

//New Listing
router.get('/new', (req,res) => {
    res.render("listings/new.ejs");
})
//Show Listing
router.get("/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate("reviews");
    res.render("listings/show.ejs", { listing });
}));

//Add New Listing
router.post('/', validateListing, wrapAsync(async(req, res, next) => {
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings")
   
}));

//Edit Listing
router.get('/:id/edit', wrapAsync(async (req, res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", {listing});
}));

//Update Listing
router.put('/:id', validateListing, wrapAsync(async (req, res) => {
    let { id } = req.params;
    req.body.listing.image = {
        filename: "listingimage",
        url: req.body.listing.image,
    };

    await Listing.findByIdAndUpdate(id, req.body.listing);  
    res.redirect(`/listings/${id}`);
}));

//Delete Listing
router.delete('/:id', wrapAsync(async (req, res) =>{
    let {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    res.redirect(`/listings`);
}));

module.exports= router;