import mongoose from "mongoose";

const ActionSchema = new mongoose.Schema(
  {
    body: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const AdminSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  actions: [
    {
      type: ActionSchema,
    },
  ],
});

export default mongoose.model("Admin", AdminSchema);
