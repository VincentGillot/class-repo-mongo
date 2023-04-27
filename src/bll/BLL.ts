import { Mailer } from "./Mailer";
import { DAL } from "../dal/DAL";
import mongoose from "mongoose";
import { UserBLL } from "./user/UserBLL";
import { SessionBLL } from "./session/SessionBLL";
import { UserSchema } from "../dal/user/schema";
import { SessionSchema } from "../dal/session/schema";
import { IUserSchema, UserModelType } from "../dal/user/type";
import { ISessionSchema, SessionModelType } from "../dal/session/type";
import { MainBLLType } from "../API";

export interface BLLOptions {
  mailer?: typeof Mailer;
}

export class BLL<BLLType = never> extends DAL {
  mailer: Mailer;

  user: UserBLL<BLLType>;
  session: SessionBLL<BLLType>;

  constructor(conn: mongoose.Connection, options?: BLLOptions) {
    super(conn);

    if (options?.mailer) {
      this.mailer = new options.mailer();
    } else {
      this.mailer = new Mailer();
    }

    // User
    const userModel = this.modelFactory<IUserSchema, UserModelType>(
      "User",
      UserSchema
    );
    this.user = new UserBLL(userModel, this as unknown as MainBLLType<BLLType>);

    // Session
    const sessionModel = this.modelFactory<ISessionSchema, SessionModelType>(
      "Session",
      SessionSchema
    );
    this.session = new SessionBLL(
      sessionModel,
      this as unknown as MainBLLType<BLLType>
    );
  }
}
