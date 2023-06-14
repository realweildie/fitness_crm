import AdminModel from "../models/Admin.js";

export default async (userId, action) => {
  try {
    const updatedAdmin = await AdminModel.findOneAndUpdate(
      { user: userId },
      {
        $push: {
          actions: { body: action },
        },
      }
    );
    if (!updatedAdmin) {
      throw new Error("Error of action");
    }
  } catch (error) {
    console.log(error);
  }
};
