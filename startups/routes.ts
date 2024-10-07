import express from "express";
import reviewRouter from "../routes/review.route";
import contactRouter from "../routes/contact.route";

export const mountedRoutes = function (app: any)
{
  app.use(express.json());
  app.use("/api/v1/users", reviewRouter);
  app.use("/api/v1/user-contact", contactRouter);
};
