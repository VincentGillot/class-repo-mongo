import { Mailer } from "./Mailer";
import { DAL } from "../dal/DAL";
import mongoose from "mongoose";
import { UserBLL } from "./user/UserBLL";
import { SessionBLL } from "./session/SessionBLL";

export interface BLLOptions {
  mailer?: typeof Mailer;
}

export class BLL extends DAL {
  mailer: Mailer;

  user: UserBLL;
  session: SessionBLL;

  constructor(conn: mongoose.Connection, options?: BLLOptions) {
    super(conn);

    if (options?.mailer) {
      this.mailer = new options.mailer();
    } else {
      this.mailer = new Mailer();
    }

    this.user = this.userBLL;
    this.session = this.sessionBLL;
  }
}
