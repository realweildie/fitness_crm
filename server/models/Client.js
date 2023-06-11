import mongoose from "mongoose";

const ActiveSubscripionSchema = new mongoose.Schema({
  startDay: {
    type: Number,
    required: true,
  },
  trainigsLeft: {
    type: Number,
    required: true,
  },
});

const ClientSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    cardNumber: {
      type: Number,
      required: true,
      unique: true,
    },
    subscriptionType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subscription",
    },
    activeSubscription: {
      type: ActiveSubscripionSchema,
    },
    subscriptionHistory: {
      // type of subscripion[]
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Client", ClientSchema);
