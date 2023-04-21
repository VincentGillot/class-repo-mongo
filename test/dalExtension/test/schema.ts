import { Schema } from "mongoose";
import { ITestSchema, TestModelType } from "./type";

export const TestSchema = new Schema<ITestSchema, TestModelType>(
  {
    key: String,
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: true,
    },
  }
);
