import { model } from "mongoose";
import { SessionSchema } from "./schema";
import { ISessionSchema, SessionModelType } from "./type";

export const SessionModel = model<ISessionSchema, SessionModelType>(
  "Session",
  SessionSchema
);
