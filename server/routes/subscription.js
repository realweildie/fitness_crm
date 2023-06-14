import express from "express";
import { SubscriptionController } from "../controllers/index.js";
import { subscriptionValidator } from "../validations/subscription.js";

export const subscriptionRouter = express.Router();

subscriptionRouter.post("/", subscriptionValidator, SubscriptionController.add);

subscriptionRouter.patch(
  "/",
  subscriptionValidator,
  SubscriptionController.edit
);

subscriptionRouter.get("/", SubscriptionController.getOne);

subscriptionRouter.get("/getAll", SubscriptionController.getAll);
