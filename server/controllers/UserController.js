import UserModel from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import getUserRole from "../utils/getUserRole.js";

export const login = async (req, res) => {
  try {
    const user = await UserModel.findOne({
      phoneNumber: req.body.phoneNumber,
    });

    if (!user) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }

    const isPassValid = await bcrypt.compare(
      req.body.password,
      user._doc.passwordHash
    );

    if (!isPassValid) {
      return res.json({ status: false, message: "Wrong data" });
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
    const isAdmin = (await getUserRole(user._id)) === "admin";

    return res.json({
      success: true,
      user: {
        ...userData,
        isAdmin,
        token,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
