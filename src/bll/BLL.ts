import { Mailer } from "./Mailer";
import { DAL } from "../dal/DAL";
import mongoose from "mongoose";
import { SessionSchema } from "../collections/session/schema";
import { MainBLLType } from "../API";
import { UserBLL } from "../collections/user/UserBLL";
import { UserSchema } from "../collections/user/schema";
import { IUserSchema, UserModelType } from "../collections/user/type";
import { ISessionSchema, SessionModelType } from "../collections/session/type";
import { SessionBLL } from "../collections/session/SessionBLL";

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
