import mongoose from "mongoose";

const ClientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    cardNumber: {
      type: Number,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
      unique: true,
    },
    barcode: {
      type: Number,
      unique: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    subscription: {
      // link to subscription
    },
    startDay: {
      //
    },
    trainingsLeft: Number,
    subscriptionHistory: {
      // type of subscripion[]
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Client", ClientSchema);
