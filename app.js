const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require ("./utils/ExpressErrors.js");


const listings = require("./routes/listing.js");//Route for Listing related pages
const reviews = require("./routes/review.js");//Route for Review related pages


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
});

app.use('/listings', listings);//Listing Route
app.use('/listings/:id/reviews', reviews);//Review Route


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