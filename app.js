const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Listing = require("./models/listing");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require ("./utils/ExpressErrors.js");
const {listingSchema, reviewSchema} = require("./schema.js");
const Review = require("./models/review.js");
console.log(mongoose.modelNames());

app.set("view engine","ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, "/public")));



const mongo_url="mongodb://127.0.0.1:27017/wanderlust";

async function main(){
    await mongoose.connect(mongo_url);
}
main()
    .then(() => {
        console.log("Connected to DB");
        console.log("Database:", mongoose.connection.name);
    })
    .catch((err) => {
        console.log(err);
    }) 

const validateListing=(req, res, next) =>{
    let {err} = listingSchema.validate(req.body);
    if(err){
        let errMsg = err.details.map((el) => el.message.join(","));
        throw new ExpressError(400, errMsg);
    }else{
        next();
    }
}

const validateReview = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
};

app.get('/', (req, res)=>{
    res.send("Server is working");
})
//Index Route
app.get("/listings", wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", {allListings});
}));

//New Listing
app.get('/listings/new', (req,res) => {
    res.render("listings/new.ejs");
})
//Show Listing
app.get("/listings/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate("reviews");
    res.render("listings/show.ejs", { listing });
}));

app.post('/listings', validateListing, wrapAsync(async(req, res, next) => {
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings")
   
}));

app.get('/listings/:id/edit', wrapAsync(async (req, res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", {listing});
}));

//Update Listing
app.put('/listings/:id', validateListing, wrapAsync(async (req, res) => {
    let { id } = req.params;
    req.body.listing.image = {
        filename: "listingimage",
        url: req.body.listing.image,
    };

    await Listing.findByIdAndUpdate(id, req.body.listing);  
    res.redirect(`/listings/${id}`);
}));
//Delete Listing
app.delete('/listings/:id', wrapAsync(async (req, res) =>{
    let {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    res.redirect(`/listings`);
}));

// Reviews
app.post( "/listings/:id/reviews", validateReview, wrapAsync(async (req, res) => {
        let listing = await Listing.findById(req.params.id);
        let newReview = new Review(req.body.review);
        listing.reviews.push(newReview);

        await newReview.save();
        await listing.save();

        res.redirect(`/listings/${listing._id}`);
    })
);

//Review Delete Route
app.delete("/listings/:id/reviews/:reviewID", wrapAsync(async(req, res)=>{
    let {id, reviewID} = req.params;

    await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewID}});
    await Review.findByIdAndDelete(reviewID);
    res.redirect(`/listings/${id}`);
}));



app.all("/{*splat}", (req, res, next) => {
    next(new ExpressError(404, "Page Not Found!"));
});

app.use((err, req, res, next) => {
    let {statusCode = 500, message = "Something Went Wrong" } = err;
    res.status(statusCode).render("error.ejs",{message});
})

app.listen(8080, ()=>{
    console.log("Server is listening on port 8080");
});