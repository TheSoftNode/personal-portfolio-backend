import Review from "../models/review.model";
import { createOne, deleteOne, getAll, getOne } from "../services/GenericService";


export const createReview = createOne(Review);
export const getAllReviews = getAll(Review);
export const getReview = getOne(Review);
export const deleteReview = deleteOne(Review);