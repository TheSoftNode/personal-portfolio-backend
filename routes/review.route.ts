import express from "express";
import { createReview, deleteReview, getAllReviews, getReview } from "../controllers/review.controller";

const router = express.Router();


router.route("/create-review").post(createReview);

router.route("/get-all-reviews").get(getAllReviews);

router.route("/get-review/:id").get(getReview);

router.route("/delete-review/:id").get(deleteReview);

export default router;
