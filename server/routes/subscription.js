import express from "express";
import { SubscriptionController } from "../controllers/index.js";
import { subscriptionValidator } from "../validations/subscription.js";

export const subscriptionRouter = express.Router();

subscriptionRouter.post(
  "/add",
  subscriptionValidator,
  SubscriptionController.add
);

subscriptionRouter.get("/getAll", SubscriptionController.getAll);
