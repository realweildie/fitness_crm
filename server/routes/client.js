import express from "express";

import checkRoot from "../utils/checkRoot.js";
import { registerValidator } from "../validations/auth.js";
import { ClientController } from "../controllers/index.js";

export const clientRouter = express.Router();

clientRouter.post(
  "/register",
  checkRoot,
  registerValidator,
  ClientController.register
);

clientRouter.get("/profile", ClientController.getProfile);
