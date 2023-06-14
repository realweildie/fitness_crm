import mongoose from "mongoose";
import { validationResult } from "express-validator";

import SubscriptionModel from "../models/Subscription.js";

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
      is_old: req.body.is_old || false,
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

export const edit = async (req, res) => {
  try {
    const updatedSubscription = await SubscriptionModel.findOneAndUpdate(
      { _id: req.body.id },
      {
        $set: {
          title: req.body.title,
          duration: req.body.duration,
          trainings_quantity: req.body.trainings_quantity,
          price: req.body.price,
          is_old: req.body.is_old,
        },
      }
    );

    if (!updatedSubscription) {
      return res.status(400).json({
        success: false,
        message: "the same name or something else",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "editing error",
    });
  }

  return res.json({ success: true });
};

export const getOne = async (req, res) => {
  try {
    const subscription = await SubscriptionModel.findOne({ _id: req.body.id });

    return subscription
      ? res.json({ ...subscription._doc })
      : res.status(400).json({ success: false });
  } catch (error) {
    console.log(error);
    return res.json({ success: false });
  }
};

export const getAll = async (req, res) => {
  const filter = req.body.old === true ? null : { is_old: false };

  try {
    const subscriptions = await SubscriptionModel.find(filter);

    return subscriptions
      ? res.json({ ...subscriptions })
      : res.status(400).json({ success: false });
  } catch (error) {
    console.log(error);
    return res.json({ success: false });
  }
};
