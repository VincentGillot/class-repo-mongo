import { model } from "mongoose";
import { UserSchema } from "./schema";
export const UserModel = model("User", UserSchema);
