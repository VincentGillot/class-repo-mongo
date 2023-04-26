import { mongoose } from "class-repo-mongo";
import { ITestSchema, TestModelType } from "./type";

export const TestSchema = new mongoose.Schema<ITestSchema, TestModelType>(
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
