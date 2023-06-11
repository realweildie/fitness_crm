import { body } from "express-validator";

export const subscriptionValidator = [
  body("title").isLength({ min: 3 }),
  body("duration").isNumeric(),
  body("trainings_quantity").isNumeric(),
  body("price").isNumeric(),
  body("is_old").isBoolean().optional(),
];
