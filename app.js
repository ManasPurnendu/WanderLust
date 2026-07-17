const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Listing = require("./models/listing");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require ("./utils/ExpressErrors.js");

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
    })
    .catch((err) => {
        console.log(err);
    }) 



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
    console.log("hey");
    res.render("listings/new.ejs");
})

app.get("/listings/:id", wrapAsync(async (req, res, next) =>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs", {listing});
}));

app.post('/listings', wrapAsync(async(req, res, next) => {
    if(!req.body.listing){
        throw new ExpressError(400, "Send valid data for Listing");
    }
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings")
   
}));
app.get('/listings/:id/edit', wrapAsync(async (req, res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", {listing});
}));

app.put('/listings/:id', wrapAsync(async (req, res) => {
    if(!req.body.listing){
        throw new ExpressError(400, "Send valid data for Listing");
    }
    let { id } = req.params;
    req.body.listing.image = {
        filename: "listingimage",
        url: req.body.listing.image,
    };

    await Listing.findByIdAndUpdate(id, req.body.listing);
    res.redirect(`/listings/${id}`);
}));

app.delete('/listings/:id', wrapAsync(async (req, res) =>{
    let {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    res.redirect(`/listings`);
}));
 
app.all("/{*splat}", (req, res, next) => {
    next(new ExpressError(404, "Page Not Found!"));
});

app.use((err, req, res, next) => {
    let {statusCode = 500, message = "Something Went Wrong" } = err;
    res.render("error.ejs");
})

app.listen(8080, ()=>{
    console.log("Server is listening on port 8080");
});