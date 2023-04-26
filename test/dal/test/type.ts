import { ObjectId } from "mongoose";
import { GenericModelType, GenericDocumentType } from "class-repo-mongo";

export interface ITest {
  key: string;
}

export interface ITestSchema extends ITest {
  _id: ObjectId;
}

export type TestModelType = GenericModelType<ITest, ITestSchema>;

export type TestDocumentType = GenericDocumentType<ITestSchema>;
