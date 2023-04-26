import { mongoose } from "class-repo-mongo";
import { TestSchema } from "./schema";
import { ITestSchema, TestModelType } from "./type";

export const TestModel = mongoose.model<ITestSchema, TestModelType>(
  "Test",
  TestSchema
);
