import { model } from "mongoose";
import { SessionSchema } from "./schema";
export const SessionModel = model("Session", SessionSchema);
