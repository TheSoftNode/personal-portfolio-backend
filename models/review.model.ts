import mongoose, { Model, Schema } from "mongoose";
import { IReview } from "../Interfaces/review.interface";


const reviewSchema = new Schema<IReview>(
    {
        userFullname: {
            type: String,
            required: [true, "Please provide your full name"],
            unique: true
        },

        userTitle: {
            type: String,
            required: [true, "Please enter your title"],
            unique: true
        },

        reviewText: {
            type: String,
            required: [true, "Review can not be empty!"],
        },

        reviewRating: {
            type: Number,
            min: [1, "please kindly rate me. Thank you."],
            max: 5,
        },

        userPhoto: {
            type: String,
            default: "default.jpg"
        },

        userLinks: [{
            title: { type: String },
            link: { type: String}
        }]
    },
    { timestamps: true }
);


const Review: Model<IReview> = mongoose.model(
    "Review",
    reviewSchema
);
export default Review;