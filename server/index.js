import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import checkAuth from "./utils/checkAuth.js";
import checkRoot from "./utils/checkRoot.js";

import {
  subscriptionRouter,
  clientRouter,
  userRouter,
} from "./routes/index.js";

const app = express();

mongoose
  .connect(
    "mongodb+srv://Solovyev:wwww@cluster.i6dlg56.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("DB success");
  })
  .catch((err) => console.log(err));

app.use(express.json());
app.use(cors());

app.use("/subscription", checkAuth, checkRoot, subscriptionRouter);
app.use("/client", checkAuth, clientRouter);
app.use("/user", userRouter);

app.listen(3333, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("Server started successfuly.");
});
