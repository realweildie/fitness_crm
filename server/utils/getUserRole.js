import ClientModel from "../models/Client.js";
import AdminModel from "../models/Admin.js";

export default async (userId) => {
  let role = "";

  const profile =
    (await ClientModel.findOne({ user: userId }).then((role = "client"))) ||
    (await AdminModel.findOne({ user: userId }).then((role = "admin")));

  return profile ? role : new Error("no role?");
};
