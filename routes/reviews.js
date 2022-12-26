const express = require("express");
const router = express.Router({ mergeParams: true });
const reviews = require("../controllers/reviews");

const Campground = require("../models/campground"); //import campground model
const Review = require("../models/review"); //import review model

const { reviewSchema } = require("../schemas");

const ExpressError = require("../utils/ExpressError");
const catchAsync = require("../utils/catchAsync");
const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware");

// REVIEW MAKER:
router.post("/", isLoggedIn, validateReview, catchAsync(reviews.createReview));
// DELETE REWIEW:
router.delete(
    "/:reviewId",
    isLoggedIn,
    isReviewAuthor,
    catchAsync(reviews.deleteReview)
);
module.exports = router;
