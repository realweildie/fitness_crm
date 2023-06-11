import ClientModel from "../models/Client.js";
import UserModel from "../models/User.js";

import { validationResult } from "express-validator";
import { genPassword } from "../utils/genPassword.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

export const getProfile = async (req, res) => {
  try {
    const user = await ClientModel.findOne({
      user: req.userId,
    });

    if (!user) {
      return res.status(404).json({
        success: false,
      });
    }

    return res.json({ ...user._doc });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false });
  }
};
