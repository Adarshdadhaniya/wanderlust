const ExpressError = require("./utils/ExpressError.js"); 
const {listingSchema} = require("./schema.js");
const {reviewSchema} = require("./schema.js");
const Listing = require("./models/listing.js");
const Review = require("./models/review.js");

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.redirecturl = req.originalUrl;
        req.flash("error", "you must be logged in to create listing!");
        return res.redirect("/login");
    }
    next();
}
 
//We need to store the redirecturl in the local variable so that we can use it in the login route as the session variable gets refreshed after the login
module.exports.saveRedirectUrl = (req, res, next) => {
    if(req.session.redirecturl) {
        res.locals.redirecturl = req.session.redirecturl;
    }
    console.log(res.locals.redirecturl);
    next();
}




module.exports.validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);
    if (error) {
      let errMsg = error.details.map((el) => el.message).join(",");
      throw new ExpressError(400, errMsg);
    } else {
      next();
    }
  };


module.exports. validateReview = (req, res, next) => {
      let { error } = reviewSchema.validate(req.body);
      if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
      } else {
        next();
      }
    };



    module.exports.isOwner = async (req, res, next) => {
        let { id } = req.params;
        let listing = await Listing.findById(id);
        if (!listing.owner.equals(res.locals.currUser._id)) {
          req.flash("error", "You are not authorized to do that! as you are not the owner of this listing!");
          return res.redirect(`/listings/${id}`);
        }
        next();
      }


      module.exports.isReviewAuthor = async (req, res, next) => {
        let { reviewId,id  } = req.params;
        let review = await Review.findById(reviewId);
        if (!review.author.equals(res.locals.currUser._id)) {
          req.flash("error", "You are not authorized to do that! as you are not the owner of this listing!");
          return res.redirect(`/listings/${id}`);
        }
        next();
      }
