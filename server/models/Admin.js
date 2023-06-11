import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  actions: [
    {
      type: String,
    },
  ],
});

export default mongoose.model("Admin", AdminSchema);
