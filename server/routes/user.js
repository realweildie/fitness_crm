import express from "express";

import { loginValidator } from "../validations/auth.js";
import { UserController } from "../controllers/index.js";

export const userRouter = express.Router();

userRouter.post("/login", loginValidator, UserController.login);
