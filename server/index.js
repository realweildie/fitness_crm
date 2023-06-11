import express from "express";
import mongoose from "mongoose";

import { loginValidator, registerValidator } from "./validations/auth.js";
import { subscriptionValidator } from "./validations/subscription.js";

import checkAuth from "./utils/checkAuth.js";
import checkRoot from "./utils/checkRoot.js";

import {
  ClientController,
  UserController,
  SubscriptionController,
} from "./controllers/index.js";

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

app.post("/client/register", registerValidator, ClientController.register);
app.get("/client/profile", checkAuth, ClientController.getProfile);

app.post("/login", loginValidator, UserController.login);

app.post(
  "/subscription/add",
  checkAuth,
  checkRoot,
  subscriptionValidator,
  SubscriptionController.add
);

app.listen(3333, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("Server started successfuly.");
});
