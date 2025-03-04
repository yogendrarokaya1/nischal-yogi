const express = require("express");
const reviewController = require("../controllers/reviewController");
const router = express.Router();

router.post("/add-review", reviewController.addReview);
router.get("/get-reviews/:id", reviewController.getReviews);

module.exports = router;