import { model } from "mongoose";
import { TestSchema } from "./schema";
import { ITestSchema, TestModelType } from "./type";

export const TestModel = model<ITestSchema, TestModelType>("Test", TestSchema);
