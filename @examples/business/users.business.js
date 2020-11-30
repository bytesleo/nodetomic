// Models
import UserModel from "@/models/user.model";
// Libs
import mongoose from "mongoose";

const fcmUpdate = async (userId, token) => {
  return await UserModel.updateOne(
    {
      enabled: true,
      _id: mongoose.Types.ObjectId(userId),
    },
    {
      $addToSet: {
        push_notifications: token,
      },
    }
  );
};

const fcmClearGarbage = async (userId, tokens) => {
  await UserModel.findOneAndUpdate(
    {
      _id: mongoose.Types.ObjectId(userId),
    },
    {
      push_notifications: tokens,
    }
  );
};

export default {
  fcmUpdate,
  fcmClearGarbage,
};
