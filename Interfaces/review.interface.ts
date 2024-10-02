import { Document } from "mongoose";

export interface IUserLink
{
    title: string;
    link: string;
}

export interface IReview extends Document
{
    userFullname: string;
    userTitle: string;
    reviewText: string;
    reviewRating?: number;
    userPhoto?: string;
    gender?: string;
    userLinks?: IUserLink[];
    createdAt: Date;
    updatedAt: Date;
}
