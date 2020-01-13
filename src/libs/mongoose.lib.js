import mongoose from "mongoose";

// Constants
import { URI_DB } from "@/constants/config.constant";

const connect = () =>
  new Promise((resolve, reject) => {
    mongoose.connect(URI_DB, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    });
    const db = mongoose.connection;

    db.once("connected", () => {
      console.log("->MongoDB: connected!");
      resolve();
    });

    db.on("error", error => {
      console.error("->MongoDB: error");
      reject(error);
    });
  });

export { connect };
