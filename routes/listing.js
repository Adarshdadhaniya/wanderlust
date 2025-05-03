const express = require("express");
const router = express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
// const {listingSchema} = require("../schema.js");
const Listing = require("../models/listing.js");
// const ExpressError = require("../utils/ExpressError.js"); 
const {isLoggedIn,validateListing,isOwner} = require("../middlewear.js");
const listingController = require("../controllers/listings.js");
const multer  = require('multer')
const {storage} = require("../cloudConfig.js")
const upload = multer({ storage })


// const validateListing = (req, res, next) => {
//     let { error } = listingSchema.validate(req.body);
//     if (error) {
//       let errMsg = error.details.map((el) => el.message).join(",");
//       throw new ExpressError(400, errMsg);
//     } else {
//       next();
//     }
//   };


router.route("/")
//Index Route
.get(
  wrapAsync(listingController.index) )
//Create Route
.post(
  isLoggedIn,
  upload.single('listing[image]'),
  validateListing,
  (req, res, next) => {
    console.log("hello");
    next();
  },
  wrapAsync(listingController.createListing)
);



//New Route
router.get("/new", isLoggedIn,listingController.renderNewForm);

router.route("/:id")
//Show Route
.get(
  wrapAsync(listingController.showListing) )
//Update Route
.put(
  isLoggedIn,
  isOwner,
  upload.single('listing[image]'),
  validateListing,
  wrapAsync(listingController.updateListing)
)
//Delete Route
  .delete(
    isLoggedIn, 
    isOwner,
    wrapAsync(listingController.deleteListing)
  );

  
 
  
  //Edit Route
  router.get("/:id/edit", 
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.renderEditForm)
  );
  
  
  




  module.exports = router;