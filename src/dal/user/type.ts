import { ObjectId } from "mongoose";
import {
  GenericDocumentType,
  GenericModelType,
} from "../mongodb/interfaces/Generics";

export interface IUser {
  email: string;
  password: string;
  active: boolean;
  validated: boolean;
  validationToken?: string | null;
  active2FA?: boolean | null;
}

export interface IUserSchema extends IUser {
  _id: ObjectId;
}

export type UserModelType = GenericModelType<IUser, IUserSchema>;

export type UserDocumentType = GenericDocumentType<IUserSchema>;
