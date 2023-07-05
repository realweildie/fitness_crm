import mongoose from "mongoose";

const ActiveSubscripionSchema = new mongoose.Schema(
  {
    startDay: {
      type: Number,
      required: true,
    },
    trainigsLeft: {
      type: Number,
      required: true,
    },
    type: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subscription",
    },
    duration: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

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
