import { body } from "express-validator";

export const registerValidator = [
  body("name").isLength({ min: 3 }),
  body("cardNumber").isNumeric(),
  body("phoneNumber").isMobilePhone("ru-RU"),
];

export const loginValidator = [
  body("phoneNumber").isMobilePhone("ru-RU"),
  body("password").isLength({ min: 5 }),
];
