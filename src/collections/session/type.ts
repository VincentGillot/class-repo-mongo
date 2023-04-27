import { ObjectId } from "mongoose";
import {
  GenericDocumentType,
  GenericModelType,
} from "../../dal/mongodb/interfaces/Generics";

export interface ISession {
  userId?: string | null;
  active: boolean;
  remoteAddress?: string | null;
  ip?: string | null;
  userAgent?: string | null;
}

export interface ISessionSchema extends Omit<ISession, "userId"> {
  _id: ObjectId;
  userId: ObjectId | null;
}

export type SessionModelType = GenericModelType<ISession, ISessionSchema>;

export type SessionDocumentType = GenericDocumentType<ISessionSchema>;
