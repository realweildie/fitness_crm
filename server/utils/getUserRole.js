import ClientModel from "../models/Client.js";
import AdminModel from "../models/Admin.js";

export default async (userId) => {
  let role = "";

  const profile =
    (await ClientModel.findOne({ user: userId }).then((role = "client"))) ||
    (await AdminModel.findOne({ user: userId }).then((role = "admin")));

  if (!profile) {
    return res.status(400).json({ success: false, message: "no role?" });
  }

  return role;
};
