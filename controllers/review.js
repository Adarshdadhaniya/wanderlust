const Listing = require("../models/listing");
const Review = require("../models/review");


module.exports.createReview=async (req, res) => {
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
   
    newReview.author = req.user._id; 
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    req.flash("success", "Successfully created a new review!");
    res.redirect(`/listings/${listing._id}`);
}



const mongoose = require("mongoose");

module.exports.deleteReview=async (req, res) => {
    let { id, reviewId } = req.params;
    try {
        console.log("Deleting review:", reviewId, "from listing:", id);
const objectReviewId = new mongoose.Types.ObjectId(reviewId);
        const updateResult = await Listing.findByIdAndUpdate(id, { $pull: { reviews: objectReviewId } });
        console.log("Update result:", updateResult);
        const deleteResult = await Review.findByIdAndDelete(reviewId);
        console.log("Delete result:", deleteResult);
        req.flash("success", "Successfully deleted review!");
        res.redirect(`/listings/${id}`);
    } catch (err) {
        console.error("Error deleting review:", err);
        req.flash("error", "Failed to delete review.");
        res.redirect(`/listings/${id}`);
    }
}
