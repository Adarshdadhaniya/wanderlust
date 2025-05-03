const express = require("express");
const router = express.Router({mergeParams: true });// mergeParams allows us to access the params of the parent route.Usually the parent routes parameters in this case id is not sent here.Inorder to access the id of the parent route we need to use mergeParams:true in the router.
const wrapAsync=require("../utils/wrapAsync.js");
// const ExpressError = require("../utils/ExpressError.js"); 
const Review = require("../models/review.js");
// const {reviewSchema} = require("../schema.js");
const Listing = require("../models/listing.js");
const {isLoggedIn,validateReview,isReviewAuthor } = require("../middlewear.js");
const reviewController = require("../controllers/review.js");


// const validateReview = (req, res, next) => {
//   let { error } = reviewSchema.validate(req.body);
//   if (error) {
//     let errMsg = error.details.map((el) => el.message).join(",");
//     throw new ExpressError(400, errMsg);
//   } else {
//     next();
//   }
// };





router.post("/", 
  isLoggedIn, 
  validateReview,
  wrapAsync(reviewController.createReview));

 
// Delete Review Route
router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  wrapAsync(reviewController.deleteReview)
);




module.exports = router;