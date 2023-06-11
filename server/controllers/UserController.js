import UserModel from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  try {
    const user = await UserModel.findOne({
      phoneNumber: req.body.phoneNumber,
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isPassValid = await bcrypt.compare(
      req.body.password,
      user._doc.passwordHash
    );

    if (!isPassValid) {
      return res.status(404).json({ status: false, message: "Wrong data" });
    }

    const token = jwt.sign(
      {
        _id: user._id,
      },
      "key_from_env",
      {
        expiresIn: "30d",
      }
    );

    const { passwordHash, ...userData } = user._doc;

    return res.json({
      success: true,
      user: {
        ...userData,
        token,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
