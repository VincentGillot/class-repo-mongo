import { Schema } from "mongoose";
import { IUserSchema, UserModelType } from "./type";

export const UserSchema = new Schema<IUserSchema, UserModelType>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      required: true,
      default: true,
    },
    validated: {
      type: Boolean,
      required: true,
      default: false,
    },
    validationToken: {
      type: String,
      default: null,
    },
    active2FA: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: true,
    },
  }
);
