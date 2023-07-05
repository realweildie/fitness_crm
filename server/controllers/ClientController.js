import ClientModel from "../models/Client.js";
import UserModel from "../models/User.js";
import SubscriptionModel from "../models/Subscription.js";

import { validationResult } from "express-validator";
import { genPassword } from "../utils/genPassword.js";
import bcrypt from "bcrypt";
import addAdminAction from "../utils/addAdminAction.js";

export const register = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    // try to find
    const clientFromDB = await ClientModel.findOne({
      cardNumber: req.body.cardNumber,
    });

    const userFromDB = await UserModel.findOne({
      phoneNumber: req.body.phoneNumber,
    });

    if (userFromDB || clientFromDB) {
      return res.status(400).json({
        success: false,
        message: "user or client exists",
      });
    }
    // end try to find

    const password = genPassword();
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const userDoc = new UserModel({
      name: req.body.name,
      passwordHash,
      phoneNumber: req.body.phoneNumber,
    });

    const user = await userDoc.save();

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User creation error",
      });
    }

    const clientDoc = new ClientModel({
      cardNumber: req.body.cardNumber,
      user: user._doc._id,
    });

    const client = await clientDoc.save();

    if (!client) {
      return res.status(400).json({
        success: false,
        message: "Client creation error",
      });
    }

    res.json({
      success: true,
      client: {
        phoneNumber: req.body.phoneNumber,
        password,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: "Unable to register client",
    });
  }
};

export const setSubscription = async (req, res) => {
  try {
    const subscription = await SubscriptionModel.findById(
      req.body.subscriptionTypeId
    );

    if (!subscription) {
      return res.json({ success: false, message: "No subscription like this" });
    }

    let moreDaysFromNow = new Date();
    moreDaysFromNow.setDate(moreDaysFromNow.getDate() + subscription.duration);
    console.log(subscription.duration, moreDaysFromNow);

    const updatedClient = await ClientModel.findByIdAndUpdate(
      { _id: req.body.clientId },
      {
        $set: {
          activeSubscription: {
            startDay: Date.now(),
            expirationDate: Date.parse(moreDaysFromNow),
            type: req.body.subscriptionTypeId,
            trainigsLeft: subscription.trainings_quantity,
            duration: subscription.duration,
          },
        },
      }
    );

    if (!updatedClient) {
      return res.json({ success: false, message: "Something went wrong" });
    }

    const user = await UserModel.findById(updatedClient.user);
    const action = `Установлен абонемент ${subscription.title} для ${user.name}`;

    addAdminAction(req.userId, action);

    return res.json({ success: true });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "Error" });
  }
};

export const setTrainingsQuantity = async (req, res) => {
  try {
    const client = await ClientModel.findOne({ user: req.body.clientId });

    const updatedClient = await ClientModel.findByIdAndUpdate(
      { _id: req.body.clientId },
      {
        $set: {
          activeSubscription: {
            trainigsLeft: req.body.trainigsQuantity,
          },
        },
      }
    );

    if (!updatedClient) {
      return res.json({ success: false, message: "Something went wrong" });
    }

    const user = await UserModel.findById(updatedClient.user);
    const oldTrainingsQuantity = client?.activeSubscription?.trainigsLeft || 0;
    const action = `Установлено количество занятий ${updatedClient.activeSubscription.trainigsLeft} вместо ${oldTrainingsQuantity} для ${user.name}`;

    addAdminAction(req.userId, action);

    return res.json({ success: true });
  } catch (error) {
    console.log(error);
  }
};

// TODO: edit it with no toke decription
export const getProfile = async (req, res) => {
  try {
    const client = await ClientModel.findOne({
      cardNumber: req.query.cardNumber,
    });
    const user = await UserModel.findById(client.user);

    let result = {
      name: user.name,
      phoneNumber: user.phoneNumber,
      cardNumber: client.cardNumber,
      startDate: client?.activeSubscription?.startDay,
      trainingsLeft: client?.activeSubscription?.trainigsLeft,
      subscription: client?.activeSubscription?.type,
      expirationDate: client?.activeSubscription?.expirationDate,
    };

    return res.json(result);
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false });
  }
};

export const getAllClients = async (req, res) => {
  try {
    const chunk = req.query.chunkNumber || 0;
    const chunkSize = req.query.chunkSize || 100;

    const clients = await ClientModel.find()
      .skip(chunk * chunkSize)
      .limit(chunkSize);

    const fullUsersInfo = await Promise.all(
      clients.map(async (client) => {
        const user = await UserModel.findById(client.user);

        let result = {
          name: user.name,
          phoneNumber: user.phoneNumber,
          cardNumber: client.cardNumber,
          startDate: client?.activeSubscription?.startDay,
          trainingsLeft: client?.activeSubscription?.trainigsLeft,
          subscription: client?.activeSubscription?.type,
          expirationDate: client?.activeSubscription?.expirationDate,
        };

        return result;
      })
    );

    return res.json(fullUsersInfo);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: false });
  }
};
