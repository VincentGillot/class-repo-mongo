import { model } from "mongoose";
import { UserSchema } from "./schema";
import { IUserSchema, UserModelType } from "./type";

export const UserModel = model<IUserSchema, UserModelType>("User", UserSchema);
