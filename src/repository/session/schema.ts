import { ObjectId } from "mongodb";
import { Schema } from "mongoose";
import { ISessionSchema, SessionModelType } from "./type";

export const SessionSchema = new Schema<ISessionSchema, SessionModelType>(
  {
    userId: {
      type: ObjectId,
      required: true,
    },
    active: {
      type: Boolean,
      default: true,
      required: true,
    },
    remoteAddress: {
      type: String,
      default: null,
    },
    ip: {
      type: String,
      default: null,
    },
    userAgent: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: true,
    },
  }
);
