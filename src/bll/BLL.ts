import { SessionRepo } from "../dal/session/SessionRepo";
import { UserRepo } from "../dal/user/UserRepo";
import { Password } from "./Password";
import { JWT } from "./JWT";
import { Mailer } from "./Mailer";

export interface BLLConstructor {
  customMailer?: typeof Mailer;
  customUserRepo?: typeof UserRepo;
  customSessionRepo?: typeof SessionRepo;
}

export class BLL {
  mailer = new Mailer();
  user = new UserRepo();
  session = new SessionRepo();

  constructor(constructors?: BLLConstructor) {
    if (constructors) {
      const { customMailer, customUserRepo, customSessionRepo } = constructors;
      if (customMailer) this.mailer = new customMailer();
      if (customUserRepo) this.user = new customUserRepo();
      if (customSessionRepo) this.session = new customSessionRepo();
    }
  }

  password = Password;
  jwt = JWT;
}
