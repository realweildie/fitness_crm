import express from "express";

import checkAuth from "../utils/checkAuth.js";
import checkRoot from "../utils/checkRoot.js";

import { registerValidator } from "../validations/auth.js";

import { ClientController } from "../controllers/index.js";

export const clientRouter = express.Router();

// why dont we have checkAuth here
clientRouter.post(
  "/register",
  checkRoot,
  registerValidator,
  ClientController.register
);

clientRouter.post(
  "/setSubscription",
  checkAuth,
  checkRoot,
  ClientController.setSubscription
);

clientRouter.post(
  "/setTrainingsQuantity",
  checkAuth,
  checkRoot,
  ClientController.setTrainingsQuantity
);

clientRouter.get("/profile", ClientController.getProfile);

clientRouter.get(
  "/profiles",
  checkAuth,
  checkRoot,
  ClientController.getAllClients
);
