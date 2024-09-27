import express from "express";
import reviewRouter from "../routes/review.route";

export const mountedRoutes = function (app: any) {
  app.use(express.json());
  app.use("/api/v1/users", reviewRouter);
};
