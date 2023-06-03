import mongoose from "mongoose";

const SubscriptionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  trainings_quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

export default mongoose.model("Subscription", SubscriptionSchema);
