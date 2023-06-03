import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { registerValidator } from "./validations/auth.js";
import { validationResult } from "express-validator";

import ClientModel from "./models/Client.js";
import { genPassword } from "./utils/genPassword.js";

const app = express();

mongoose
  .connect(
    "mongodb+srv://Solovyev:wwww@cluster.i6dlg56.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("DB success");
  })
  .catch((err) => console.log(err));

app.use(express.json());

app.post("/register", registerValidator, async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    const password = genPassword();
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const doc = new ClientModel({
      name: req.body.name,
      cardNumber: req.body.cardNumber,
      phoneNumber: req.body.phoneNumber,
      passwordHash,
    });

    const client = await doc.save();

    // const token = jwt.sign(
    //   {
    //     _id: client._id,
    //   },
    //   "key_from_env",
    //   {
    //     expiresIn: "30d",
    //   }
    // );

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
});

app.post("/login", async (req, res) => {
  try {
    const client = await ClientModel.findOne({
      phoneNumber: req.body.phoneNumber,
    });

    if (!client) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isPassValid = await bcrypt.compare(
      req.body.password,
      client._doc.passwordHash
    );

    if (!isPassValid) {
      return res.status(404).json({ status: false, message: "Wrong data" });
    }

    const token = jwt.sign(
      {
        _id: client._id,
      },
      "key_from_env",
      {
        expiresIn: "30d",
      }
    );

    const { passwordHash, ...clientData } = client._doc;

    return res.json({
      success: true,
      user: {
        ...clientData,
        token,
      },
    });
  } catch (error) {
    console.log(error);
  }
});

app.listen(3333, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("Server started successfuly.");
});
