import SubscriptionModel from "../models/Subscription.js";
import { validationResult } from "express-validator";

export const add = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array());
  }

  try {
    const subscriptionDoc = new SubscriptionModel({
      title: req.body.title,
      duration: req.body.duration,
      trainings_quantity: req.body.trainings_quantity,
      price: req.body.price,
    });

    const subscription = await subscriptionDoc.save();

    if (!subscription) {
      return res.status(400).json({
        success: false,
        message: "Subscription creation error",
      });
    }

    return res.json({
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
    });
  }
};
